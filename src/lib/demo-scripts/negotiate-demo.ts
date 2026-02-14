type NegotiationEvent = {
  type: string;
  content?: string;
  amount?: number;
  final_amount?: number;
};

const DEMO_NEGOTIATION: Array<{ event: NegotiationEvent; delay_ms: number }> = [
  {
    delay_ms: 800,
    event: { type: "system", content: "Connected to billing department..." },
  },
  {
    delay_ms: 1500,
    event: {
      type: "rep_message",
      content: "Thank you for calling City General Hospital billing department. This is Sandra speaking. How can I help you today?",
    },
  },
  {
    delay_ms: 2000,
    event: {
      type: "negotiator_message",
      content: "Hi Sandra, I'm calling about account CGH-2024-88291. I've had this bill professionally audited and found several serious billing errors that need to be corrected immediately. First, there are duplicate CT scan charges — two identical chest CTs billed on the same date of service, which is a clear duplicate totaling $4,800 in overcharges.",
    },
  },
  {
    delay_ms: 2000,
    event: {
      type: "rep_message",
      content: "I see the account. Let me pull up the charges... I do see two CT scan entries. Let me check with our coding department — if one is indeed a duplicate, we can certainly remove it. That would bring the bill down by $2,400.",
      amount: 44883,
    },
  },
  {
    delay_ms: 2200,
    event: {
      type: "negotiator_message",
      content: "Both CT scans are duplicates — identical CPT code 71260, same date, same time. That's $4,800, not $2,400. I also found a phantom charge: an operating room fee of $4,500 for what was an ER visit with no surgical procedure. There's no corresponding surgeon note or procedure code to justify an OR charge.",
    },
  },
  {
    delay_ms: 1800,
    event: {
      type: "rep_message",
      content: "You're right, I apologize. I can see both CT entries are identical. I'll submit a correction for the full $4,800. Regarding the operating room charge, let me look... I don't see a procedure note linked to that either. I'll flag that for review as well.",
      amount: 37983,
    },
  },
  {
    delay_ms: 2000,
    event: {
      type: "negotiator_message",
      content: "Thank you. There's also an upcoding issue — the ER visit is coded as 99285, a level 5 critical visit, but the medical records show a simple fracture reduction. That should be 99283 at most, which is a $2,800 difference. Beyond errors, your remaining charges are far above fair market value. Your total is 4.2 times the Medicare rate for these services.",
    },
  },
  {
    delay_ms: 1800,
    event: {
      type: "rep_message",
      content: "I understand your concerns about the pricing. I can offer a 15% courtesy discount on the remaining balance after we remove the duplicate and OR charges. Our rates are standard for the region, and we're not required to match Medicare rates.",
      amount: 30050,
    },
  },
  {
    delay_ms: 2200,
    event: {
      type: "negotiator_message",
      content: "A 15% discount still leaves the bill well above fair market value. I should mention that City General is a 501(c)(3) nonprofit hospital, which means you're required under IRS Section 501(r) to have a financial assistance policy. The patient's household income qualifies for your charity care program. Additionally, if we need to escalate this, the No Surprises Act and California's balance billing protections give us strong grounds for a formal complaint.",
    },
  },
  {
    delay_ms: 2000,
    event: {
      type: "rep_message",
      content: "I see. Let me transfer you to our financial counseling department — they can review the financial assistance application and have more authority to adjust the account. One moment please.",
    },
  },
  {
    delay_ms: 1500,
    event: { type: "system", content: "Transferred to financial counseling..." },
  },
  {
    delay_ms: 1800,
    event: {
      type: "rep_message",
      content: "Hi, this is Sandra from financial counseling. I've reviewed your account and the errors flagged. After removing the duplicate CT scans ($4,800), the operating room charge ($4,500), and correcting the ER level coding ($2,800), your adjusted bill is $35,183. Based on the financial assistance application, I can apply a 75% charity care discount to the remaining balance.",
      amount: 8796,
    },
  },
  {
    delay_ms: 2000,
    event: {
      type: "negotiator_message",
      content: "I appreciate the charity care discount. However, even at $8,796, that's still significantly above what Medicare would pay for these services, which is approximately $5,200. Given the billing errors we've already identified — which suggest systemic issues — I think a fair resolution would be closer to the Medicare rate. Can you do $4,100 with a 12-month payment plan?",
    },
  },
  {
    delay_ms: 2000,
    event: {
      type: "rep_message",
      content: "I can meet you at $4,100 with a 12-month interest-free payment plan at $342 per month. I'll also waive the billing errors we discussed and apply the charity care adjustment. Shall I finalize this?",
      amount: 4100,
    },
  },
  {
    delay_ms: 1500,
    event: {
      type: "negotiator_message",
      content: "Yes, $4,100 with 12-month interest-free payments works. Please send written confirmation of this agreement, including the error corrections, charity care adjustment, and payment plan terms. Thank you, Sandra.",
    },
  },
  {
    delay_ms: 1000,
    event: { type: "negotiation_complete", final_amount: 4100 },
  },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function streamDemoNegotiation(speed: number = 1): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for (const entry of DEMO_NEGOTIATION) {
          await sleep(entry.delay_ms / speed);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(entry.event)}\n\n`),
          );
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", message: String(err) })}\n\n`),
        );
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
