import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { type AuditRequest, type StageName } from "@/lib/types";
import { streamDemoEvents } from "@/lib/demo-scripts/demo-runner";
import {
  PARSE_BILL_TOOL, AUDIT_CHARGES_TOOL, BENCHMARK_PRICES_TOOL,
  CHECK_ELIGIBILITY_TOOL, BUILD_STRATEGY_TOOL, DRAFT_LETTERS_TOOL,
} from "@/lib/agent/tools";
import {
  PARSE_SYSTEM_PROMPT, AUDIT_SYSTEM_PROMPT, BENCHMARK_SYSTEM_PROMPT,
  RIGHTS_SYSTEM_PROMPT, STRATEGY_SYSTEM_PROMPT, LETTERS_SYSTEM_PROMPT,
} from "@/lib/agent/system-prompts";

type StageConfig = {
  stage: StageName;
  title: string;
  description: string;
  model: string;
  tool: Anthropic.Messages.Tool;
  systemPrompt: string;
};

const STAGES: StageConfig[] = [
  { stage: "parse", title: "Parsing Your Bill", description: "Extracting every line item and billing code...", model: "claude-sonnet-4-5-20250929", tool: PARSE_BILL_TOOL, systemPrompt: PARSE_SYSTEM_PROMPT },
  { stage: "audit", title: "Auditing for Errors", description: "Checking every charge for billing errors...", model: "claude-sonnet-4-5-20250929", tool: AUDIT_CHARGES_TOOL, systemPrompt: AUDIT_SYSTEM_PROMPT },
  { stage: "benchmark", title: "Benchmarking Fair Value", description: "Comparing every charge to Medicare rates...", model: "claude-sonnet-4-5-20250929", tool: BENCHMARK_PRICES_TOOL, systemPrompt: BENCHMARK_SYSTEM_PROMPT },
  { stage: "rights", title: "Checking Your Rights", description: "Identifying laws and protections that apply to you...", model: "claude-opus-4-6", tool: CHECK_ELIGIBILITY_TOOL, systemPrompt: RIGHTS_SYSTEM_PROMPT },
  { stage: "strategy", title: "Building Your Strategy", description: "Creating your negotiation playbook...", model: "claude-opus-4-6", tool: BUILD_STRATEGY_TOOL, systemPrompt: STRATEGY_SYSTEM_PROMPT },
  { stage: "letters", title: "Drafting Your Letters", description: "Generating ready-to-send dispute letters...", model: "claude-opus-4-6", tool: DRAFT_LETTERS_TOOL, systemPrompt: LETTERS_SYSTEM_PROMPT },
];

function buildUserPrompt(stage: StageName, req: AuditRequest, prev: Record<string, unknown>): string {
  const ctx = `Patient State: ${req.state}\nHospital: ${req.hospital_name}\nBill Type: ${req.bill_type}\nInsurance: ${req.insurance_status}${req.household_income ? `\nHousehold Income: $${req.household_income}` : ""}${req.household_size ? `\nHousehold Size: ${req.household_size}` : ""}\n\nBill Text:\n${req.bill_text}`;

  switch (stage) {
    case "parse":
      return `Parse this medical bill into structured data. Extract every line item. Use the parse_bill tool.\n\n${ctx}`;
    case "audit":
      return `Audit EVERY line item for billing errors. Be aggressive. Use the audit_charges tool.\n\nParsed Bill:\n${JSON.stringify(prev.parse, null, 2)}\n\nOriginal:\n${req.bill_text}`;
    case "benchmark":
      return `Benchmark EVERY line item against fair market value. Use the benchmark_prices tool.\n\nParsed Bill:\n${JSON.stringify(prev.parse, null, 2)}`;
    case "rights":
      return `Determine ALL applicable legal protections for this patient in ${req.state}. Use the check_eligibility tool.\n\n${ctx}\n\nParsed Bill:\n${JSON.stringify(prev.parse, null, 2)}\n\nAudit:\n${JSON.stringify(prev.audit, null, 2)}`;
    case "strategy":
      return `Build a prioritized negotiation strategy. Use the build_strategy tool.\n\nAudit:\n${JSON.stringify(prev.audit, null, 2)}\n\nBenchmarks:\n${JSON.stringify(prev.benchmark, null, 2)}\n\nRights:\n${JSON.stringify(prev.rights, null, 2)}`;
    case "letters":
      return `Generate dispute and negotiation letters. Use the draft_letters tool.\n\nHospital: ${req.hospital_name}\nState: ${req.state}\n\nErrors:\n${JSON.stringify(prev.audit, null, 2)}\n\nBenchmarks:\n${JSON.stringify(prev.benchmark, null, 2)}\n\nRights:\n${JSON.stringify(prev.rights, null, 2)}\n\nStrategy:\n${JSON.stringify(prev.strategy, null, 2)}`;
    default:
      return ctx;
  }
}

export async function POST(request: NextRequest) {
  let body: AuditRequest;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Defaults
  body.state = body.state || "California";
  body.hospital_name = body.hospital_name || "Unknown Hospital";
  body.bill_type = body.bill_type || "er";
  body.insurance_status = body.insurance_status || "uninsured";

  // Demo mode — return pre-scripted events
  if (body.demo_mode && body.demo_id) {
    return streamDemoEvents(body.demo_id, body.speed || 1);
  }

  // Real mode — use client key or env key
  const clientKey = request.headers.get("x-api-key");
  const apiKey = clientKey || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Auto-fallback to demo mode if no API key
    const fallbackDemo = body.demo_id || "er";
    return streamDemoEvents(fallbackDemo, body.speed || 1);
  }

  if (!body.bill_text || typeof body.bill_text !== "string") {
    return new Response("Missing bill_text", { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      const prev: Record<string, unknown> = {};

      try {
        for (const config of STAGES) {
          send({ type: "stage_start", stage: config.stage, title: config.title, description: config.description });

          const response = await anthropic.messages.create({
            model: config.model,
            max_tokens: 4096,
            system: config.systemPrompt,
            tools: [config.tool],
            tool_choice: { type: "tool", name: config.tool.name },
            messages: [{ role: "user", content: buildUserPrompt(config.stage, body, prev) }],
          });

          // Extract tool result
          for (const block of response.content) {
            if (block.type !== "tool_use") continue;
            const result = block.input as Record<string, unknown>;
            prev[config.stage] = result;

            // Emit granular events matching AuditEvent types
            switch (config.stage) {
              case "parse": {
                const items = (result.line_items as Array<Record<string, unknown>>) || [];
                for (const item of items) send({ type: "parse_item", item });
                send({ type: "parse_complete", bill: result });
                break;
              }
              case "audit": {
                const errors = (result.errors as Array<Record<string, unknown>>) || [];
                for (const finding of errors) send({ type: "audit_finding", finding });
                const clean = (result.clean_items as number[]) || [];
                for (const id of clean) send({ type: "audit_clean", line_item_id: id, description: "" });
                send({ type: "audit_complete", total_errors: result.total_errors, total_overcharges: result.total_estimated_overcharges });
                break;
              }
              case "benchmark": {
                const benchmarks = (result.benchmarks as Array<Record<string, unknown>>) || [];
                for (const b of benchmarks) send({ type: "benchmark_item", benchmark: b });
                send({ type: "benchmark_complete", summary: result.summary });
                break;
              }
              case "rights": {
                const protections = (result.protections as Array<Record<string, unknown>>) || [];
                for (const p of protections) send({ type: "right_found", protection: p });
                if (result.charity_care) send({ type: "charity_care_result", result: result.charity_care });
                send({ type: "rights_complete", total_protections: protections.filter((p) => p.applies).length });
                break;
              }
              case "strategy": {
                const steps = (result.strategy_steps as Array<Record<string, unknown>>) || [];
                for (const step of steps) send({ type: "strategy_step", step });
                send({ type: "strategy_complete", best_case: result.best_case_outcome, realistic: result.realistic_outcome });
                break;
              }
              case "letters": {
                const letters = (result.letters as Array<Record<string, unknown>>) || [];
                for (const letter of letters) {
                  send({ type: "letter_start", letter_id: letter.id, title: letter.title });
                  // Send content as a single chunk for real mode
                  send({ type: "letter_chunk", letter_id: letter.id, chunk: letter.content as string });
                  send({ type: "letter_complete", letter });
                }
                send({ type: "letters_complete", count: letters.length });
                break;
              }
            }

            send({ type: "stage_complete", stage: config.stage, summary: {} });
          }
        }

        // Build final summary
        const audit = prev.audit as Record<string, unknown> | undefined;
        const benchmark = prev.benchmark as Record<string, unknown> | undefined;
        const benchSummary = benchmark?.summary as Record<string, unknown> | undefined;
        const strategy = prev.strategy as Record<string, unknown> | undefined;
        const rights = prev.rights as Record<string, unknown> | undefined;
        const letters = prev.letters as Record<string, unknown> | undefined;

        send({
          type: "audit_complete_all",
          summary: {
            original_bill: (prev.parse as Record<string, unknown>)?.total_charges || 0,
            errors_found: audit?.total_errors || 0,
            total_overcharges: audit?.total_estimated_overcharges || 0,
            fair_value: benchSummary?.total_fair_value || 0,
            potential_savings: benchSummary?.potential_savings || 0,
            protections_found: ((rights?.protections as Array<Record<string, unknown>>) || []).filter(p => p.applies).length,
            letters_generated: ((letters?.letters as unknown[]) || []).length,
            best_case_outcome: strategy?.best_case_outcome || {},
            realistic_outcome: strategy?.realistic_outcome || {},
          },
        });
      } catch (error) {
        send({ type: "error", message: String(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
