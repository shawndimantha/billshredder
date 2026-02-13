import {
  AuditRequest, AgentStep, BillItem, AuditResult,
  AuditError, BenchmarkItem, Protection, StrategyStep, Letter
} from "./types";

describe("types", () => {
  test("AuditRequest has all required fields", () => {
    const req: AuditRequest = {
      bill_text: "test bill",
      bill_type: "er",
      state: "California",
      hospital_name: "Test Hospital",
      insurance_status: "uninsured",
    };
    expect(req.bill_text).toBeTruthy();
    expect(req.bill_type).toBe("er");
  });

  test("AuditRequest supports optional income fields", () => {
    const req: AuditRequest = {
      bill_text: "test",
      bill_type: "er",
      state: "CA",
      hospital_name: "Test",
      insurance_status: "uninsured",
      household_income: 45000,
      household_size: 3,
      demo_mode: true,
    };
    expect(req.household_income).toBe(45000);
    expect(req.household_size).toBe(3);
  });

  test("AgentStep can be constructed", () => {
    const step: AgentStep = {
      id: "test-1",
      type: "finding",
      title: "Upcoded ER Visit",
      content: "Level 5 code used for moderate severity",
      status: "complete",
      severity: "error",
      savings: 4200,
      timestamp: Date.now(),
    };
    expect(step.type).toBe("finding");
    expect(step.savings).toBe(4200);
  });

  test("AuditError captures billing errors", () => {
    const error: AuditError = {
      line_item_id: 1,
      error_type: "upcoding",
      severity: "critical",
      description: "Level 5 ER visit billed for moderate visit",
      explanation: "CPT 99285 is for critical care; visit was moderate",
      estimated_overcharge: 5000,
      evidence: "No critical care documentation",
      actionable: "Request downgrade to 99283",
    };
    expect(error.error_type).toBe("upcoding");
    expect(error.estimated_overcharge).toBe(5000);
  });

  test("BenchmarkItem tracks markups", () => {
    const item: BenchmarkItem = {
      line_item_id: 1,
      description: "Chest X-ray",
      billed_amount: 1847,
      medicare_rate: 45,
      fair_commercial_rate: 79,
      estimated_cash_rate: 100,
      markup_vs_medicare: 41,
      markup_vs_fair: 23.4,
      status: "extreme",
      note: null,
    };
    expect(item.status).toBe("extreme");
    expect(item.markup_vs_medicare).toBe(41);
  });

  test("Protection tracks legal protections", () => {
    const p: Protection = {
      type: "federal_law",
      name: "No Surprises Act",
      applies: true,
      impact: "high",
      description: "Emergency services protected",
      action: "Invoke NSA protections",
      citation: "Public Law 116-260, Division BB, Title I",
    };
    expect(p.applies).toBe(true);
    expect(p.impact).toBe("high");
  });

  test("StrategyStep has all negotiation fields", () => {
    const step: StrategyStep = {
      order: 1,
      action: "Dispute billing errors",
      category: "error_dispute",
      description: "Send dispute letter",
      talking_points: ["Upcoding found", "Duplicates found"],
      expected_savings: 15000,
      confidence: "high",
      leverage: "Clear documentation errors",
      fallback: "Escalate to patient advocate",
      timeline: "Do this first",
    };
    expect(step.talking_points).toHaveLength(2);
    expect(step.confidence).toBe("high");
  });

  test("Letter has content and review", () => {
    const letter: Letter = {
      id: "letter-1",
      title: "Error Dispute Letter",
      recipient: "Billing Department",
      purpose: "Dispute billing errors",
      content: "Dear Billing Department...",
      key_citations: ["No Surprises Act", "HIPAA"],
      review_notes: "All citations verified",
    };
    expect(letter.key_citations).toContain("HIPAA");
    expect(letter.review_notes).toBeTruthy();
  });
});
