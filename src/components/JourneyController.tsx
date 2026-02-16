"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import type { JourneyPhase } from "@/lib/types";
import type { AuditState } from "@/hooks/useAuditStream";
import { GET_ITEMIZED_BILL_SCRIPT } from "@/lib/call-scripts/get-itemized-bill";
import { NEGOTIATE_BILL_SCRIPT } from "@/lib/call-scripts/negotiate-bill";
import JourneyPhaseIndicator from "./JourneyPhaseIndicator";
import CallCoach from "./CallCoach";
import LiveNegotiation from "./LiveNegotiation";
import PhaseTransition from "./PhaseTransition";
import ProgressStepper from "./ProgressStepper";
import SavingsHero from "./SavingsHero";
import DocumentCards from "./DocumentCards";
import FindingsDashboard from "./FindingsDashboard";
import ResultsCelebration from "./ResultsCelebration";
import type { StageName } from "@/lib/types";

interface JourneyControllerProps {
  auditState: AuditState;
  expandedSections: StageName[];
  onToggleSection: (section: StageName) => void;
  demoMode: boolean;
  speed: number;
  /** true when user uploaded their own bill (skip call1) */
  isRealBill: boolean;
  /** called when call1 finishes and we should start the audit */
  onStartAudit: () => void;
  /** enable live AI vs AI negotiation instead of scripted */
  liveNegotiation?: boolean;
  /** user-provided Anthropic API key */
  apiKey?: string | null;
}

type TransitionState = "none" | "call1-to-audit" | "audit-to-call2" | "call2-to-results";

export default function JourneyController({
  auditState,
  expandedSections,
  onToggleSection,
  demoMode,
  speed,
  isRealBill,
  onStartAudit,
  liveNegotiation = false,
  apiKey,
}: JourneyControllerProps) {
  // For real bills, skip call1 and go straight to audit
  const initialPhase: JourneyPhase = isRealBill ? "audit" : "call1";
  const [phase, setPhase] = useState<JourneyPhase>(initialPhase);
  const [transition, setTransition] = useState<TransitionState>("none");
  const [negotiatedAmount, setNegotiatedAmount] = useState<number | undefined>(undefined);

  const handleCall1Complete = useCallback(() => {
    setTransition("call1-to-audit");
  }, []);

  const handleTransitionToAudit = useCallback(() => {
    setTransition("none");
    setPhase("audit");
    onStartAudit();
  }, [onStartAudit]);

  const handleTransitionToCall2 = useCallback(() => {
    setTransition("none");
    setPhase("call2");
  }, []);

  const handleCall2Complete = useCallback((finalAmount?: number) => {
    if (finalAmount) setNegotiatedAmount(finalAmount);
    setTransition("call2-to-results");
  }, []);

  const handleTransitionToResults = useCallback(() => {
    setTransition("none");
    setPhase("results");
  }, []);

  // Auto-transition from audit to call2 when audit completes
  const auditComplete = auditState.status === "complete";
  if (phase === "audit" && auditComplete && transition === "none" && demoMode) {
    setTimeout(() => setTransition("audit-to-call2"), 1500);
  }

  // Build negotiation context from audit state
  const negotiationContext = {
    originalBill: auditState.bill?.total_charges || 47283,
    fairValue: auditState.benchmarkSummary?.total_fair_value || 11258,
    hospitalName: auditState.bill?.hospital?.name || "City General Hospital",
    errors: auditState.errors.map(e => ({
      title: e.title,
      estimated_overcharge: e.estimated_overcharge,
      evidence: e.evidence,
    })),
    benchmarks: auditState.benchmarks.map(b => ({
      description: b.description,
      billed_amount: b.billed_amount,
      medicare_rate: b.medicare_rate,
      fair_rate: b.fair_rate,
      markup_ratio: b.markup_ratio,
    })),
    protections: auditState.protections.filter(p => p.applies).map(p => ({
      name: p.name,
      description: p.description,
      action: p.action,
    })),
    strategy: auditState.strategySteps.map(s => ({
      action: s.action,
      talking_points: s.talking_points,
      expected_savings: s.expected_savings,
    })),
    charityCareEligible: auditState.charityCare?.likely_eligible || false,
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Journey phase indicator */}
      <JourneyPhaseIndicator currentPhase={phase} />

      {/* Audit sub-stepper (only during audit phase) */}
      {phase === "audit" && transition === "none" && (
        <ProgressStepper
          currentStage={auditState.currentStage}
          isComplete={auditState.status === "complete"}
        />
      )}

      {/* Phase transitions */}
      <AnimatePresence mode="wait">
        {transition === "call1-to-audit" && (
          <PhaseTransition
            key="t1"
            message="Itemized bill received. Analyzing..."
            duration={2500}
            speed={speed}
            onComplete={handleTransitionToAudit}
          />
        )}

        {transition === "audit-to-call2" && (
          <PhaseTransition
            key="t2"
            message={liveNegotiation ? "Strategy ready. Launching AI negotiator..." : "Strategy ready. Time to call."}
            duration={2500}
            speed={speed}
            onComplete={handleTransitionToCall2}
          />
        )}

        {transition === "call2-to-results" && (
          <PhaseTransition
            key="t3"
            message="Negotiation complete!"
            duration={2000}
            speed={speed}
            onComplete={handleTransitionToResults}
          />
        )}
      </AnimatePresence>

      {/* Phase content */}
      {transition === "none" && (
        <>
          {phase === "call1" && (
            <CallCoach
              title="Getting Your Itemized Bill"
              subtitle="BillShredder coaches you through every word"
              script={GET_ITEMIZED_BILL_SCRIPT}
              onComplete={handleCall1Complete}
              speed={speed}
              autoPlay={demoMode}
              skipLabel="Skip to Analysis"
            />
          )}

          {phase === "audit" && (
            <div className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 overflow-y-auto">
              {auditState.savingsVisible && auditState.benchmarkSummary && (
                <SavingsHero
                  originalBill={auditState.benchmarkSummary.total_billed}
                  fairValue={auditState.benchmarkSummary.total_fair_value}
                  bestCase={auditState.bestCase}
                  realistic={auditState.realistic}
                />
              )}

              {auditState.documentsReady && (
                <DocumentCards letters={auditState.letters} />
              )}

              <FindingsDashboard
                state={auditState}
                expandedSections={expandedSections}
                onToggleSection={onToggleSection}
              />

              {/* Manual transition to call2 for non-demo mode */}
              {auditComplete && !demoMode && (
                <button
                  onClick={() => setPhase("call2")}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: "#D4A574", color: "#0C0C0F" }}
                >
                  {liveNegotiation ? "Launch AI Negotiator" : "Continue to Negotiation Call"}
                </button>
              )}
            </div>
          )}

          {phase === "call2" && (
            <>
              {/* Ammunition banner */}
              <div className="px-4 py-2 text-center" style={{ background: "#D4A57410", borderBottom: "1px solid #D4A57430" }}>
                <p className="text-xs" style={{ color: "#D4A574" }}>
                  <span className="font-semibold">Your ammunition:</span>
                  {" "}{auditState.errors.length} errors (${auditState.errors.reduce((s, e) => s + e.estimated_overcharge, 0).toLocaleString()}),
                  {" "}fair value ${auditState.benchmarkSummary?.total_fair_value.toLocaleString() || "N/A"} ({auditState.benchmarkSummary?.average_markup || 0}x markup),
                  {" "}charity care eligible
                </p>
              </div>

              {liveNegotiation ? (
                <LiveNegotiation
                  title="AI Negotiating Your Bill"
                  subtitle="Opus vs Opus — watch your AI advocate fight for every dollar"
                  originalBill={negotiationContext.originalBill}
                  fairValue={negotiationContext.fairValue}
                  hospitalName={negotiationContext.hospitalName}
                  errors={negotiationContext.errors}
                  benchmarks={negotiationContext.benchmarks}
                  protections={negotiationContext.protections}
                  strategy={negotiationContext.strategy}
                  charityCareEligible={negotiationContext.charityCareEligible}
                  onComplete={(amount) => handleCall2Complete(amount)}
                  speed={speed}
                  demoMode={demoMode}
                  skipLabel="Skip to Results"
                  apiKey={apiKey}
                />
              ) : (
                <CallCoach
                  title="Negotiating Your Bill Down"
                  subtitle="BillShredder coaches you through the negotiation"
                  script={NEGOTIATE_BILL_SCRIPT}
                  onComplete={() => handleCall2Complete()}
                  speed={speed}
                  autoPlay={demoMode}
                  skipLabel="Skip to Results"
                  originalBill={auditState.bill?.total_charges || 47283}
                />
              )}
            </>
          )}

          {phase === "results" && (
            <ResultsCelebration
              state={auditState}
              expandedSections={expandedSections}
              onToggleSection={onToggleSection}
              negotiatedAmount={negotiatedAmount}
            />
          )}
        </>
      )}
    </div>
  );
}
