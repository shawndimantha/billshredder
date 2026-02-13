"use client";

import { useReducer, useCallback, useRef } from "react";
import type {
  AuditEvent, AuditRequest, StageName, ParsedBill, BillingError,
  PriceBenchmark, BenchmarkSummary, LegalProtection, CharityCareResult,
  StrategyStep, Outcome, DraftLetter, AuditSummary,
} from "@/lib/types";

export type AuditStatus = "idle" | "streaming" | "complete" | "error";

export interface AuditState {
  status: AuditStatus;
  currentStage: StageName | null;
  stageTitle: string;
  bill: ParsedBill | null;
  errors: BillingError[];
  cleanItems: number[];
  benchmarks: PriceBenchmark[];
  benchmarkSummary: BenchmarkSummary | null;
  protections: LegalProtection[];
  charityCare: CharityCareResult | null;
  strategySteps: StrategyStep[];
  bestCase: Outcome | null;
  realistic: Outcome | null;
  letters: DraftLetter[];
  letterChunks: Record<string, string>;
  summary: AuditSummary | null;
  errorMessage: string | null;
  events: AuditEvent[];
  // UI state
  expandedSections: StageName[];
  savingsVisible: boolean;
  documentsReady: boolean;
}

const initialState: AuditState = {
  status: "idle",
  currentStage: null,
  stageTitle: "",
  bill: null,
  errors: [],
  cleanItems: [],
  benchmarks: [],
  benchmarkSummary: null,
  protections: [],
  charityCare: null,
  strategySteps: [],
  bestCase: null,
  realistic: null,
  letters: [],
  letterChunks: {},
  summary: null,
  errorMessage: null,
  events: [],
  expandedSections: [],
  savingsVisible: false,
  documentsReady: false,
};

type Action =
  | { type: "reset" }
  | { type: "start" }
  | { type: "event"; event: AuditEvent }
  | { type: "toggle_section"; section: StageName };

function reducer(state: AuditState, action: Action): AuditState {
  switch (action.type) {
    case "reset":
      return initialState;
    case "start":
      return { ...initialState, status: "streaming" };
    case "toggle_section": {
      const s = action.section;
      const expanded = state.expandedSections.includes(s)
        ? state.expandedSections.filter(x => x !== s)
        : [...state.expandedSections, s];
      return { ...state, expandedSections: expanded };
    }
    case "event": {
      const e = action.event;
      const events = [...state.events, e];

      switch (e.type) {
        case "stage_start": {
          // Expand new section, collapse previous
          const expanded = [e.stage];
          return { ...state, events, currentStage: e.stage, stageTitle: e.title, expandedSections: expanded };
        }
        case "stage_complete":
          return { ...state, events };
        case "parse_item":
          return { ...state, events };
        case "parse_complete":
          return { ...state, events, bill: e.bill };
        case "audit_finding":
          return { ...state, events, errors: [...state.errors, e.finding] };
        case "audit_clean":
          return { ...state, events, cleanItems: [...state.cleanItems, e.line_item_id] };
        case "audit_complete":
          return { ...state, events };
        case "benchmark_item":
          return { ...state, events, benchmarks: [...state.benchmarks, e.benchmark] };
        case "benchmark_complete":
          return { ...state, events, benchmarkSummary: e.summary, savingsVisible: true };
        case "right_found":
          return { ...state, events, protections: [...state.protections, e.protection] };
        case "charity_care_result":
          return { ...state, events, charityCare: e.result };
        case "rights_complete":
          return { ...state, events };
        case "strategy_step":
          return { ...state, events, strategySteps: [...state.strategySteps, e.step] };
        case "strategy_complete":
          return { ...state, events, bestCase: e.best_case, realistic: e.realistic };
        case "letter_start":
          return { ...state, events };
        case "letter_chunk":
          return {
            ...state, events,
            letterChunks: {
              ...state.letterChunks,
              [e.letter_id]: (state.letterChunks[e.letter_id] || "") + e.chunk,
            },
          };
        case "letter_complete":
          return { ...state, events, letters: [...state.letters, e.letter] };
        case "letters_complete":
          return { ...state, events, documentsReady: true };
        case "audit_complete_all":
          return {
            ...state, events, status: "complete", summary: e.summary,
            expandedSections: ["audit", "benchmark"],
          };
        case "error":
          return { ...state, events, status: "error", errorMessage: e.message };
        default:
          return { ...state, events };
      }
    }
    default:
      return state;
  }
}

export function useAuditStream() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortRef = useRef<AbortController | null>(null);

  const startAudit = useCallback(async (request: AuditRequest) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "start" });

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        dispatch({ type: "event", event: { type: "error", message: `HTTP ${res.status}: ${res.statusText}` } });
        return;
      }

      if (!res.body) {
        dispatch({ type: "event", event: { type: "error", message: "No response body" } });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const data = line.replace(/^data: /, "").trim();
          if (!data || data === "[DONE]") continue;
          try {
            const event = JSON.parse(data) as AuditEvent;
            dispatch({ type: "event", event });
          } catch {
            // skip malformed
          }
        }
      }

      // If we finished streaming but never got audit_complete_all, mark complete
      if (state.status === "streaming") {
        dispatch({ type: "event", event: { type: "audit_complete_all", summary: {
          original_bill: state.bill?.total_charges || 0,
          errors_found: state.errors.length,
          total_overcharges: state.errors.reduce((s, e) => s + e.estimated_overcharge, 0),
          fair_value: state.benchmarkSummary?.total_fair_value || 0,
          potential_savings: state.benchmarkSummary?.potential_savings || 0,
          protections_found: state.protections.filter(p => p.applies).length,
          letters_generated: state.letters.length,
          best_case_outcome: state.bestCase || { final_amount: 0, total_savings: 0, savings_percentage: 0 },
          realistic_outcome: state.realistic || { final_amount: 0, total_savings: 0, savings_percentage: 0 },
        }}});
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      dispatch({ type: "event", event: { type: "error", message: String(err) } });
    }
  }, [state.status, state.bill, state.errors, state.benchmarkSummary, state.protections, state.letters, state.bestCase, state.realistic]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: "reset" });
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const toggleSection = useCallback((section: StageName) => {
    dispatch({ type: "toggle_section", section });
  }, []);

  return { state, startAudit, reset, stop, toggleSection };
}
