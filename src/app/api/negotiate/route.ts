import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildNegotiatorPrompt } from "@/lib/agent/negotiator-prompt";
import { buildBillingRepPrompt } from "@/lib/agent/billing-rep-prompt";
import { extractAmount, isNegotiationComplete } from "@/lib/agent/negotiation-helpers";
import { streamDemoNegotiation } from "@/lib/demo-scripts/negotiate-demo";

export interface NegotiateRequest {
  originalBill: number;
  fairValue: number;
  hospitalName: string;
  errors: Array<{ title: string; estimated_overcharge: number; evidence: string }>;
  benchmarks: Array<{ description: string; billed_amount: number; medicare_rate: number; fair_rate: number; markup_ratio: number }>;
  protections: Array<{ name: string; description: string; action: string }>;
  strategy: Array<{ action: string; talking_points: string[]; expected_savings: number | null }>;
  charityCareEligible: boolean;
  demo_mode?: boolean;
  speed?: number;
}

const MAX_TURNS = 12;

export async function POST(request: NextRequest) {
  let body: NegotiateRequest;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Demo mode
  if (body.demo_mode) {
    return streamDemoNegotiation(body.speed || 1);
  }

  // Real mode — use client key or env key
  const clientKey = request.headers.get("x-api-key");
  const apiKey = clientKey || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return streamDemoNegotiation(body.speed || 1);
  }

  const anthropic = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const negotiatorSystem = buildNegotiatorPrompt({
    errors: body.errors,
    benchmarks: body.benchmarks,
    protections: body.protections,
    strategy: body.strategy,
    originalBill: body.originalBill,
    fairValue: body.fairValue,
    charityCareEligible: body.charityCareEligible,
  });

  const repSystem = buildBillingRepPrompt({
    originalBill: body.originalBill,
    hospitalName: body.hospitalName,
    floorAmount: Math.round(body.fairValue * 0.8),
  });

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      try {
        const negotiatorHistory: Anthropic.Messages.MessageParam[] = [];
        const repHistory: Anthropic.Messages.MessageParam[] = [];

        // Rep opens the call
        send({ type: "system", content: "Connected to billing department..." });

        const repOpener = await anthropic.messages.create({
          model: "claude-opus-4-6",
          max_tokens: 300,
          system: repSystem,
          messages: [{ role: "user", content: "A patient is calling about their bill. Greet them professionally." }],
        });

        const repOpenerText = repOpener.content[0].type === "text" ? repOpener.content[0].text : "";
        send({
          type: "rep_message",
          content: repOpenerText,
          amount: extractAmount(repOpenerText),
        });

        repHistory.push(
          { role: "user", content: "A patient is calling about their bill. Greet them professionally." },
          { role: "assistant", content: repOpenerText },
        );
        negotiatorHistory.push({ role: "user", content: `The billing representative says: "${repOpenerText}"\n\nRespond with your opening statement.` });

        for (let turn = 0; turn < MAX_TURNS; turn++) {
          // Negotiator speaks
          const negotiatorResponse = await anthropic.messages.create({
            model: "claude-opus-4-6",
            max_tokens: 300,
            system: negotiatorSystem,
            messages: negotiatorHistory,
          });

          const negotiatorText = negotiatorResponse.content[0].type === "text" ? negotiatorResponse.content[0].text : "";
          const negotiatorAmount = extractAmount(negotiatorText);

          send({
            type: "negotiator_message",
            content: negotiatorText.replace(/NEGOTIATION_COMPLETE\s*/i, "").trim(),
            amount: negotiatorAmount,
          });

          negotiatorHistory.push({ role: "assistant", content: negotiatorText });

          if (isNegotiationComplete(negotiatorText)) {
            send({ type: "negotiation_complete", final_amount: negotiatorAmount || body.fairValue });
            break;
          }

          // Rep responds
          repHistory.push({ role: "user", content: `The patient's advocate says: "${negotiatorText}"` });

          const repResponse = await anthropic.messages.create({
            model: "claude-opus-4-6",
            max_tokens: 300,
            system: repSystem,
            messages: repHistory,
          });

          const repText = repResponse.content[0].type === "text" ? repResponse.content[0].text : "";
          const repAmount = extractAmount(repText);

          send({
            type: "rep_message",
            content: repText.replace(/AGREEMENT_REACHED\s*/i, "").trim(),
            amount: repAmount,
          });

          repHistory.push({ role: "assistant", content: repText });

          if (isNegotiationComplete(repText)) {
            send({ type: "negotiation_complete", final_amount: repAmount || body.fairValue });
            break;
          }

          negotiatorHistory.push({ role: "user", content: `The billing representative responds: "${repText}"` });
        }
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
