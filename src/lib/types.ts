// ============================================================================
// Shared types for BillShredder — used by both real and demo mode
// ============================================================================

export type DemoType = "er" | "baby" | "collections";
export type BillType = "er" | "hospital" | "urgent_care" | "other";
export type InsuranceStatus = "insured" | "uninsured" | "underinsured";
export type StageName = "parse" | "audit" | "benchmark" | "rights" | "strategy" | "letters";

// ============================================================================
// API Request
// ============================================================================

export interface AuditRequest {
  bill_text: string;
  bill_type: BillType;
  state: string;
  hospital_name: string;
  insurance_status: InsuranceStatus;
  household_income?: number;
  household_size?: number;
  demo_mode?: boolean;
  demo_id?: DemoType;
  speed?: number;
}

// ============================================================================
// Data structures emitted by agent tools
// ============================================================================

export type LineItem = {
  id: number;
  revenue_code: string | null;
  cpt_code: string | null;
  description: string;
  quantity: number;
  unit_charge: number;
  total_charge: number;
  department: string | null;
};

export type ParsedBill = {
  hospital: {
    name: string;
    nonprofit_status: "nonprofit" | "for_profit" | "unknown";
    address: string;
  };
  patient: {
    account_number: string;
    date_of_service: string;
  };
  line_items: LineItem[];
  total_charges: number;
  patient_responsibility: number;
};

export type BillingError = {
  line_item_id: number;
  error_type: "duplicate" | "upcoding" | "unbundling" | "phantom" | "quantity" | "facility_fee" | "balance_billing" | "other";
  severity: "critical" | "high" | "medium";
  title: string;
  description: string;
  explanation: string;
  estimated_overcharge: number;
  evidence: string;
  actionable: string;
};

export type PriceBenchmark = {
  line_item_id: number;
  description: string;
  billed_amount: number;
  medicare_rate: number;
  fair_rate: number;
  cash_rate: number;
  markup_ratio: number;
  status: "extreme" | "high" | "moderate" | "reasonable";
};

export type BenchmarkSummary = {
  total_billed: number;
  total_fair_value: number;
  total_medicare_value: number;
  potential_savings: number;
  average_markup: number;
};

export type LegalProtection = {
  type: "federal_law" | "state_law" | "hospital_policy" | "collections_protection";
  name: string;
  applies: boolean;
  impact: "high" | "medium" | "low";
  description: string;
  action: string;
  citation: string;
};

export type CharityCareResult = {
  hospital_is_nonprofit: boolean;
  likely_eligible: boolean;
  fpl_percentage: number | null;
  estimated_discount: string | null;
  how_to_apply: string;
};

export type StrategyStep = {
  order: number;
  action: string;
  category: "error_dispute" | "charity_care" | "legal_protection" | "negotiation" | "payment_plan" | "collections_defense";
  description: string;
  talking_points: string[];
  expected_savings: number | null;
  confidence: "high" | "medium" | "low";
  timeline: string;
};

export type Outcome = {
  final_amount: number;
  total_savings: number;
  savings_percentage: number;
};

export type DraftLetter = {
  id: string;
  title: string;
  recipient: string;
  purpose: string;
  content: string;
  key_citations: string[];
};

export type AuditSummary = {
  original_bill: number;
  errors_found: number;
  total_overcharges: number;
  fair_value: number;
  potential_savings: number;
  protections_found: number;
  letters_generated: number;
  best_case_outcome: Outcome;
  realistic_outcome: Outcome;
};

// ============================================================================
// Call coaching types
// ============================================================================

export type JourneyPhase = "upload" | "call1" | "audit" | "call2" | "results";

export type CallScript = {
  id: string;
  title: string;
  hospital: string;
  department: string;
  estimated_real_duration: string;
  messages: CallMessage[];
};

export type CallMessage = {
  id: string;
  type: "rep" | "you" | "system";
  content: string;
  delay_ms: number;
  coaching?: CoachingCard;
  bill_impact?: {
    label: string;
    amount?: number;
  };
};

export type CoachingCard = {
  type: "prep" | "suggest" | "explain" | "alert" | "success";
  title: string;
  content: string;
  copy_text?: string;
};

// ============================================================================
// The universal event stream — both real and demo mode emit these
// ============================================================================

export type AuditEvent =
  // Stage lifecycle
  | { type: "stage_start"; stage: StageName; title: string; description: string }
  | { type: "stage_complete"; stage: StageName; summary: Record<string, unknown> }

  // Stage 1: Parse
  | { type: "parse_item"; item: LineItem }
  | { type: "parse_complete"; bill: ParsedBill }

  // Stage 2: Audit
  | { type: "audit_finding"; finding: BillingError }
  | { type: "audit_clean"; line_item_id: number; description: string }
  | { type: "audit_complete"; total_errors: number; total_overcharges: number }

  // Stage 3: Benchmark
  | { type: "benchmark_item"; benchmark: PriceBenchmark }
  | { type: "benchmark_complete"; summary: BenchmarkSummary }

  // Stage 4: Rights
  | { type: "right_found"; protection: LegalProtection }
  | { type: "charity_care_result"; result: CharityCareResult }
  | { type: "rights_complete"; total_protections: number }

  // Stage 5: Strategy
  | { type: "strategy_step"; step: StrategyStep }
  | { type: "strategy_complete"; best_case: Outcome; realistic: Outcome }

  // Stage 6: Letters
  | { type: "letter_start"; letter_id: string; title: string }
  | { type: "letter_chunk"; letter_id: string; chunk: string }
  | { type: "letter_complete"; letter: DraftLetter }
  | { type: "letters_complete"; count: number }

  // Overall
  | { type: "audit_complete_all"; summary: AuditSummary }
  | { type: "error"; message: string };
