import type { CallMessage, CoachingCard } from "@/lib/types";

export type NegotiationTurn = {
  role: "negotiator" | "rep";
  content: string;
  amount_mentioned?: number;
};

/**
 * Parse a negotiation response into a CallMessage for the transcript.
 */
export function turnToMessage(
  turn: NegotiationTurn,
  index: number,
): CallMessage {
  const isNegotiator = turn.role === "negotiator";

  return {
    id: `live-${index}`,
    type: isNegotiator ? "you" : "rep",
    content: turn.content.replace(/NEGOTIATION_COMPLETE\s*/i, "").replace(/AGREEMENT_REACHED\s*/i, "").trim(),
    delay_ms: 0,
    coaching: isNegotiator ? generateCoaching(turn) : undefined,
    bill_impact: turn.amount_mentioned ? {
      label: `Proposed: $${turn.amount_mentioned.toLocaleString()}`,
      amount: undefined,
    } : undefined,
  };
}

function generateCoaching(turn: NegotiationTurn): CoachingCard | undefined {
  const content = turn.content.toLowerCase();

  if (content.includes("error") || content.includes("duplicate") || content.includes("phantom")) {
    return {
      type: "alert",
      title: "Disputing billing errors",
      content: "The negotiator is citing specific billing errors found in your audit. These are strong arguments — documented errors must be corrected.",
    };
  }

  if (content.includes("medicare") || content.includes("fair") || content.includes("benchmark")) {
    return {
      type: "explain",
      title: "Citing fair market rates",
      content: "Comparing billed charges to Medicare rates shows the markup. Hospitals rarely match Medicare exactly, but it establishes a strong anchor.",
    };
  }

  if (content.includes("charity") || content.includes("financial assistance")) {
    return {
      type: "success",
      title: "Financial assistance invoked",
      content: "Nonprofit hospitals are required to offer charity care programs. This is often the biggest single discount available.",
    };
  }

  if (content.includes("supervisor") || content.includes("complaint") || content.includes("attorney general")) {
    return {
      type: "alert",
      title: "Escalation tactic",
      content: "Mentioning regulatory complaints or requesting a supervisor signals you're serious. Most reps will become more flexible at this point.",
    };
  }

  return undefined;
}

/**
 * Extract a dollar amount mentioned in text (e.g., "$4,100" or "$4100").
 */
export function extractAmount(text: string): number | undefined {
  const match = text.match(/\$[\d,]+(?:\.\d{2})?/);
  if (!match) return undefined;
  return parseFloat(match[0].replace(/[$,]/g, ""));
}

/**
 * Check if the negotiation has concluded.
 */
export function isNegotiationComplete(text: string): boolean {
  return /NEGOTIATION_COMPLETE|AGREEMENT_REACHED/i.test(text);
}
