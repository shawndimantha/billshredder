import { type ScriptEntry } from "./demo-runner";

export const ER_DEMO_SCRIPT: ScriptEntry[] = [
  // ========== STAGE 1: PARSE (~ 3 seconds) ==========
  { delay_ms: 300, event: { type: "stage_start", stage: "parse", title: "Parsing Your Bill", description: "Extracting every line item and billing code..." } },
  { delay_ms: 200, event: { type: "parse_item", item: { id: 1, revenue_code: "0450", cpt_code: "99285", description: "Emergency Room Visit - Level 5", quantity: 1, unit_charge: 6800, total_charge: 6800, department: "Emergency" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 2, revenue_code: "0450", cpt_code: null, description: "ER Facility Fee", quantity: 1, unit_charge: 8200, total_charge: 8200, department: "Emergency" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 3, revenue_code: "0350", cpt_code: "73060", description: "X-Ray Forearm, 2 Views", quantity: 1, unit_charge: 1250, total_charge: 1250, department: "Radiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 4, revenue_code: "0350", cpt_code: "74177", description: "CT Abdomen/Pelvis w/ Contrast", quantity: 1, unit_charge: 4800, total_charge: 4800, department: "Radiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 5, revenue_code: "0350", cpt_code: "74177", description: "CT Abdomen/Pelvis w/ Contrast", quantity: 1, unit_charge: 4800, total_charge: 4800, department: "Radiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 6, revenue_code: "0360", cpt_code: null, description: "Operating Room Services", quantity: 1, unit_charge: 4500, total_charge: 4500, department: "Surgery" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 7, revenue_code: "0440", cpt_code: "29125", description: "Splint Application, Short Arm", quantity: 1, unit_charge: 1800, total_charge: 1800, department: "Emergency" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 8, revenue_code: "0250", cpt_code: null, description: "Pharmacy - General", quantity: 1, unit_charge: 890, total_charge: 890, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 9, revenue_code: "0250", cpt_code: "J1100", description: "Dexamethasone 1mg injection", quantity: 2, unit_charge: 185, total_charge: 370, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 10, revenue_code: "0250", cpt_code: "J2310", description: "Nalbuphine HCl 10mg injection", quantity: 1, unit_charge: 245, total_charge: 245, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 11, revenue_code: "0300", cpt_code: "85025", description: "CBC w/ Differential", quantity: 1, unit_charge: 380, total_charge: 380, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 12, revenue_code: "0300", cpt_code: "80048", description: "Basic Metabolic Panel", quantity: 1, unit_charge: 620, total_charge: 620, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 13, revenue_code: "0300", cpt_code: "84295", description: "Sodium, Serum", quantity: 1, unit_charge: 185, total_charge: 185, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 14, revenue_code: "0300", cpt_code: "84132", description: "Potassium, Serum", quantity: 1, unit_charge: 195, total_charge: 195, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 15, revenue_code: "0300", cpt_code: "82435", description: "Chloride, Serum", quantity: 1, unit_charge: 175, total_charge: 175, department: "Laboratory" } } },
  { delay_ms: 200, event: {
    type: "parse_complete",
    bill: {
      hospital: { name: "City General Hospital", nonprofit_status: "nonprofit", address: "1200 Market Street, San Francisco, CA 94102" },
      patient: { account_number: "CGH-2024-88291", date_of_service: "01/15/2025" },
      line_items: [
        { id: 1, revenue_code: "0450", cpt_code: "99285", description: "Emergency Room Visit - Level 5", quantity: 1, unit_charge: 6800, total_charge: 6800, department: "Emergency" },
        { id: 2, revenue_code: "0450", cpt_code: null, description: "ER Facility Fee", quantity: 1, unit_charge: 8200, total_charge: 8200, department: "Emergency" },
        { id: 3, revenue_code: "0350", cpt_code: "73060", description: "X-Ray Forearm, 2 Views", quantity: 1, unit_charge: 1250, total_charge: 1250, department: "Radiology" },
        { id: 4, revenue_code: "0350", cpt_code: "74177", description: "CT Abdomen/Pelvis w/ Contrast", quantity: 1, unit_charge: 4800, total_charge: 4800, department: "Radiology" },
        { id: 5, revenue_code: "0350", cpt_code: "74177", description: "CT Abdomen/Pelvis w/ Contrast", quantity: 1, unit_charge: 4800, total_charge: 4800, department: "Radiology" },
        { id: 6, revenue_code: "0360", cpt_code: null, description: "Operating Room Services", quantity: 1, unit_charge: 4500, total_charge: 4500, department: "Surgery" },
        { id: 7, revenue_code: "0440", cpt_code: "29125", description: "Splint Application, Short Arm", quantity: 1, unit_charge: 1800, total_charge: 1800, department: "Emergency" },
        { id: 8, revenue_code: "0250", cpt_code: null, description: "Pharmacy - General", quantity: 1, unit_charge: 890, total_charge: 890, department: "Pharmacy" },
        { id: 9, revenue_code: "0250", cpt_code: "J1100", description: "Dexamethasone 1mg injection", quantity: 2, unit_charge: 185, total_charge: 370, department: "Pharmacy" },
        { id: 10, revenue_code: "0250", cpt_code: "J2310", description: "Nalbuphine HCl 10mg injection", quantity: 1, unit_charge: 245, total_charge: 245, department: "Pharmacy" },
        { id: 11, revenue_code: "0300", cpt_code: "85025", description: "CBC w/ Differential", quantity: 1, unit_charge: 380, total_charge: 380, department: "Laboratory" },
        { id: 12, revenue_code: "0300", cpt_code: "80048", description: "Basic Metabolic Panel", quantity: 1, unit_charge: 620, total_charge: 620, department: "Laboratory" },
        { id: 13, revenue_code: "0300", cpt_code: "84295", description: "Sodium, Serum", quantity: 1, unit_charge: 185, total_charge: 185, department: "Laboratory" },
        { id: 14, revenue_code: "0300", cpt_code: "84132", description: "Potassium, Serum", quantity: 1, unit_charge: 195, total_charge: 195, department: "Laboratory" },
        { id: 15, revenue_code: "0300", cpt_code: "82435", description: "Chloride, Serum", quantity: 1, unit_charge: 175, total_charge: 175, department: "Laboratory" },
      ],
      total_charges: 47283,
      patient_responsibility: 47283,
    },
  } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "parse", summary: { items: 15 } } },

  // ========== STAGE 2: AUDIT (~ 8 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "audit", title: "Auditing for Errors", description: "Checking every charge for billing errors..." } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 5,
    error_type: "duplicate",
    severity: "critical",
    title: "Duplicate CT Abdomen/Pelvis Scan",
    description: "CPT 74177 (CT Abdomen/Pelvis with Contrast) appears twice on the same date of service.",
    explanation: "You were billed $4,800 twice for the exact same CT scan. This is a textbook duplicate charge — the same CPT code 74177 appears on lines 4 and 5 with identical charges. Even one CT abdomen/pelvis is questionable for a forearm fracture, but billing it twice is a clear error.",
    estimated_overcharge: 4800,
    evidence: "Line items #4 and #5 both show CPT 74177 'CT Abdomen/Pelvis w/ Contrast' at $4,800 each, same date 01/15/2025. CMS billing guidelines prohibit duplicate charges for the same procedure on the same date without modifier 76 (repeat procedure).",
    actionable: "Request immediate removal of the duplicate CT scan charge on line #5. State: 'CPT 74177 was billed twice on 01/15/2025 without a modifier 76 indicating a repeat procedure. Please remove the duplicate charge of $4,800.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 1,
    error_type: "upcoding",
    severity: "critical",
    title: "Upcoded ER Visit — Level 5 for Simple Fracture",
    description: "Billed as CPT 99285 (Level 5, highest severity) for a straightforward radius fracture with no complications.",
    explanation: "A Level 5 ER visit (CPT 99285) is reserved for patients with high-severity conditions requiring immediate, significant, and usually life-threatening evaluation. A simple forearm fracture with splinting — no surgery, no ICU admission, discharged same day in ~5 hours — is typically a Level 3 (99283) visit. This upcoding adds roughly $2,800 to your bill.",
    estimated_overcharge: 2800,
    evidence: "Diagnosis S52.501A (unspecified fracture of lower end of radius) is a moderate-complexity condition. Patient was admitted at 14:22 and discharged at 19:47 (5.4 hours). Treatment was X-ray, splint application, and pain management — consistent with Level 3 (99283), not Level 5 (99285). AMA CPT guidelines: Level 5 requires high severity with threat to life or function.",
    actionable: "Request downgrade from CPT 99285 to 99283. State: 'The documentation for a simple radius fracture treated with splinting does not support a Level 5 ER visit code. I am requesting a downgrade to CPT 99283 (Level 3), which is appropriate for this presentation.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 6,
    error_type: "phantom",
    severity: "critical",
    title: "Phantom Operating Room Charge",
    description: "Operating Room services billed at $4,500 (Rev Code 0360), but the splint application was performed in the ER.",
    explanation: "You were charged $4,500 for Operating Room services, but your medical records should show that the splint application (CPT 29125) was done in the Emergency Department, not in an operating room. A short arm splint does not require an OR — it's a bedside procedure. This is a phantom charge for a service location that was never used.",
    estimated_overcharge: 4500,
    evidence: "Revenue Code 0360 (Operating Room) billed alongside CPT 29125 (Short Arm Splint Application) which is a minor procedure routinely performed at the bedside in the ED. No surgical CPT codes are present on the bill. Discharge was same-day (5.4 hours total stay), inconsistent with OR usage.",
    actionable: "Request removal of the OR charge. State: 'Revenue Code 0360 Operating Room Services of $4,500 should be removed. The splint application (CPT 29125) is a bedside procedure performed in the ED. No operating room was used during my visit, and no surgical procedures are documented.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 13,
    error_type: "unbundling",
    severity: "high",
    title: "Unbundled Lab Tests — Individual Electrolytes Billed with BMP",
    description: "Sodium (84295), Potassium (84132), and Chloride (82435) billed separately while BMP (80048) already includes these tests.",
    explanation: "The Basic Metabolic Panel (CPT 80048) already includes sodium, potassium, chloride, CO2, glucose, BUN, creatinine, and calcium. Billing the individual electrolyte tests on top of the BMP is called 'unbundling' — charging separately for components already included in a panel. This adds $555 in unnecessary charges.",
    estimated_overcharge: 555,
    evidence: "Line #12: BMP (80048) at $620 includes electrolytes. Lines #13-15: Sodium (84295, $185), Potassium (84132, $195), Chloride (82435, $175) are components of the BMP. CCI edits (Correct Coding Initiative) prohibit billing 84295, 84132, and 82435 separately when 80048 is billed on the same date.",
    actionable: "Request removal of individual electrolyte charges. State: 'CPT codes 84295, 84132, and 82435 are component tests included in the Basic Metabolic Panel (80048) already billed. Per NCCI edits, these cannot be billed separately. Please remove $555 in unbundled lab charges.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 4,
    error_type: "other",
    severity: "high",
    title: "Medically Unnecessary CT Abdomen/Pelvis for Arm Fracture",
    description: "A CT scan of the abdomen and pelvis (CPT 74177) was performed for a patient presenting with a forearm fracture. No abdominal symptoms documented.",
    explanation: "You came in with a broken arm (radius fracture, ICD-10 S52.501A), but were billed for a CT scan of your abdomen and pelvis. Unless there was trauma to your torso that isn't reflected in the diagnosis codes, this scan was not medically necessary for your presenting condition. Even if clinically justified, the hospital should be able to explain why an abdominal CT was needed for an arm fracture.",
    estimated_overcharge: 4800,
    evidence: "Primary diagnosis S52.501A is a forearm fracture. CPT 74177 is CT Abdomen/Pelvis with Contrast — no abdominal or pelvic diagnosis codes on the bill. An arm fracture from a simple fall does not typically warrant abdominal imaging unless there is concern for multi-system trauma, which is not documented.",
    actionable: "Request medical justification for the CT scan. State: 'Please provide clinical documentation justifying CPT 74177 (CT Abdomen/Pelvis) for a diagnosis of S52.501A (radius fracture). If no abdominal pathology was suspected, this charge should be removed as medically unnecessary.'"
  } } },

  { delay_ms: 400, event: { type: "audit_complete", total_errors: 5, total_overcharges: 17455 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "audit", summary: { errors: 5, overcharges: 17455 } } },

  // ========== STAGE 3: BENCHMARK (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "benchmark", title: "Benchmarking Fair Value", description: "Comparing every charge to Medicare rates and fair market value..." } },

  { delay_ms: 400, event: { type: "benchmark_item", benchmark: { line_item_id: 1, description: "ER Visit Level 5 (99285)", billed_amount: 6800, medicare_rate: 637, fair_rate: 1115, cash_rate: 2720, markup_ratio: 10.7, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 2, description: "ER Facility Fee", billed_amount: 8200, medicare_rate: 508, fair_rate: 889, cash_rate: 3280, markup_ratio: 16.1, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 3, description: "X-Ray Forearm (73060)", billed_amount: 1250, medicare_rate: 28, fair_rate: 49, cash_rate: 500, markup_ratio: 44.6, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 4, description: "CT Abdomen/Pelvis (74177)", billed_amount: 4800, medicare_rate: 302, fair_rate: 529, cash_rate: 1920, markup_ratio: 15.9, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 7, description: "Splint Application (29125)", billed_amount: 1800, medicare_rate: 98, fair_rate: 172, cash_rate: 720, markup_ratio: 18.4, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 11, description: "CBC w/ Differential (85025)", billed_amount: 380, medicare_rate: 10, fair_rate: 18, cash_rate: 152, markup_ratio: 38.0, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 12, description: "Basic Metabolic Panel (80048)", billed_amount: 620, medicare_rate: 15, fair_rate: 26, cash_rate: 248, markup_ratio: 41.3, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 9, description: "Dexamethasone injection (J1100)", billed_amount: 370, medicare_rate: 2, fair_rate: 4, cash_rate: 148, markup_ratio: 185.0, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 10, description: "Nalbuphine injection (J2310)", billed_amount: 245, medicare_rate: 8, fair_rate: 14, cash_rate: 98, markup_ratio: 30.6, status: "extreme" } } },

  { delay_ms: 400, event: { type: "benchmark_complete", summary: { total_billed: 47283, total_fair_value: 8247, total_medicare_value: 4715, potential_savings: 39036, average_markup: 23.4 } } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "benchmark", summary: { total_billed: 47283, total_fair_value: 8247, average_markup: 23.4 } } },

  // ========== STAGE 4: RIGHTS (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "rights", title: "Checking Your Rights", description: "Identifying every law, policy, and program that protects you..." } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "federal_law",
    name: "No Surprises Act — Emergency Services Protection",
    applies: true,
    impact: "high",
    description: "Under the No Surprises Act, emergency services are protected regardless of whether the hospital is in your insurance network. Since you are uninsured, the hospital cannot charge you more than the Qualifying Payment Amount (median in-network rate). This alone could cap your bill at a fraction of the chargemaster price.",
    action: "Invoke the No Surprises Act in your dispute letter. State that as an emergency patient, you are entitled to the protections under 42 U.S.C. § 300gg-111 and request that charges be adjusted to the qualifying payment amount.",
    citation: "42 U.S.C. § 300gg-111; Public Law 116-260, Division BB, Title I"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "hospital_policy",
    name: "501(r) Nonprofit Hospital — Mandatory Financial Assistance",
    applies: true,
    impact: "high",
    description: "City General Hospital is a 501(c)(3) nonprofit organization. Under IRS Section 501(r), they MUST have a written Financial Assistance Policy (FAP), cannot charge FAP-eligible patients more than the amounts generally billed to insured patients, and must wait 240 days before initiating extraordinary collection actions. They are legally required to help you.",
    action: "Request the hospital's Financial Assistance Policy and application. Apply immediately. The hospital must process your application before pursuing collections.",
    citation: "IRC § 501(r)(4)-(6); 26 CFR § 1.501(r)-4"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "state_law",
    name: "California SB 1021 — Medicare Rate Cap for Uninsured",
    applies: true,
    impact: "high",
    description: "California law caps what hospitals can charge uninsured patients at no more than the Medicare rate or the average amount paid by other payers. Your bill of $47,283 should be capped at approximately the Medicare rate of $4,715. This single law could reduce your bill by over 90%.",
    action: "Cite California Health & Safety Code § 127405 in your dispute letter. Demand that all charges be adjusted to the Medicare rate as required by law for uninsured patients.",
    citation: "California Health & Safety Code § 127400-127446 (SB 1021)"
  } } },

  { delay_ms: 800, event: { type: "right_found", protection: {
    type: "state_law",
    name: "California Charity Care — Income-Based Free/Reduced Care",
    applies: true,
    impact: "high",
    description: "With a household income of $52,000 for a single person, you are at approximately 280% of the Federal Poverty Level. California requires nonprofit hospitals to provide free or discounted care to patients under 400% FPL. At 280% FPL, you likely qualify for a 50-75% discount, and possibly full charity care depending on the hospital's specific FAP thresholds.",
    action: "Apply for the hospital's charity care program. Provide proof of income (pay stubs, tax return). California law requires the hospital to respond and apply their FAP criteria.",
    citation: "California Health & Safety Code § 127400-127446"
  } } },

  { delay_ms: 400, event: { type: "charity_care_result", result: {
    hospital_is_nonprofit: true,
    likely_eligible: true,
    fpl_percentage: 280,
    estimated_discount: "75-100% (likely free care or minimal copay)",
    how_to_apply: "1. Call City General Hospital billing at (415) 555-0192 and request a Financial Assistance Application. 2. Complete the application with proof of income (recent pay stubs, W-2, or tax return). 3. Submit within 240 days of the first bill. 4. The hospital must respond and cannot send to collections while your application is pending."
  } } },

  { delay_ms: 300, event: { type: "rights_complete", total_protections: 4 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "rights", summary: { protections: 4 } } },

  // ========== STAGE 5: STRATEGY (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "strategy", title: "Building Your Strategy", description: "Creating your step-by-step negotiation playbook..." } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 1,
    action: "Dispute billing errors — demand removal of $17,455 in overcharges",
    category: "error_dispute",
    description: "Send a certified letter disputing the 5 billing errors found: duplicate CT scan ($4,800), upcoded ER visit ($2,800), phantom OR charge ($4,500), unbundled labs ($555), and questionable CT for arm fracture ($4,800). These are objective errors that the hospital should correct regardless of any other negotiation.",
    talking_points: [
      "I have identified 5 billing errors totaling $17,455 in overcharges.",
      "CPT 74177 appears twice — please remove the duplicate.",
      "A Level 5 ER visit code is not supported by the documentation for a simple radius fracture.",
      "No operating room was used during my visit — the $4,500 OR charge must be removed.",
      "Individual electrolyte tests cannot be billed alongside a Basic Metabolic Panel per NCCI edits."
    ],
    expected_savings: 17455,
    confidence: "high",
    timeline: "Do this FIRST — send within 7 days"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 2,
    action: "Apply for charity care / financial assistance",
    category: "charity_care",
    description: "As a 501(c)(3) nonprofit, City General Hospital is legally required to have a Financial Assistance Policy under IRS 501(r). At approximately 280% FPL, you likely qualify for 75-100% discount. Many California nonprofit hospitals provide free care up to 300% FPL.",
    talking_points: [
      "I am requesting your Financial Assistance Policy and application as required under IRC § 501(r).",
      "My household income places me at approximately 280% of the Federal Poverty Level.",
      "Under California Health & Safety Code § 127400, I am entitled to reduced-cost care.",
      "Please do not initiate any collection activity while my application is pending, as required by the 240-day waiting period under 501(r)."
    ],
    expected_savings: 35462,
    confidence: "high",
    timeline: "Submit within 14 days of receiving the error dispute response"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 3,
    action: "Invoke California SB 1021 Medicare rate cap",
    category: "legal_protection",
    description: "California law caps charges to uninsured patients at the Medicare rate. Even if charity care doesn't fully cover the bill, invoke SB 1021 to cap remaining charges at approximately $4,715 (total Medicare value). This is your strongest legal lever — the hospital is required by state law to comply.",
    talking_points: [
      "Under California Health & Safety Code § 127405, charges to uninsured patients cannot exceed the Medicare rate.",
      "The Medicare value of my services is approximately $4,715. My bill of $47,283 is 10x the legal maximum.",
      "I request that all charges be adjusted to comply with SB 1021."
    ],
    expected_savings: 42568,
    confidence: "high",
    timeline: "Include in your initial dispute letter"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 4,
    action: "Negotiate cash-pay discount on any remaining balance",
    category: "negotiation",
    description: "If any balance remains after error corrections, charity care, and legal protections, negotiate a cash-pay discount. Hospitals routinely accept 40-60% of chargemaster prices from cash-paying patients. Anchor your negotiation to the Medicare rate and offer to pay a lump sum.",
    talking_points: [
      "I would like to discuss a cash-pay settlement for any remaining balance.",
      "Based on fair market value benchmarking, the fair commercial rate for my services is approximately $8,247.",
      "I am prepared to pay $_____ as a lump-sum settlement today if we can agree on a fair amount."
    ],
    expected_savings: null,
    confidence: "medium",
    timeline: "After steps 1-3 are resolved"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 5,
    action: "Request interest-free payment plan if needed",
    category: "payment_plan",
    description: "If a balance remains, request a 0% interest payment plan. Nonprofit hospitals are generally prohibited from charging interest on medical debt during the 501(r) process. Aim for monthly payments you can afford — $50-100/month is common.",
    talking_points: [
      "If a balance remains after all adjustments, I am requesting a 0% interest payment plan.",
      "I can afford $_____/month. Under 501(r), the hospital cannot charge interest while a FAP application is pending or for FAP-eligible patients."
    ],
    expected_savings: null,
    confidence: "high",
    timeline: "As final step after all other negotiations"
  } } },

  { delay_ms: 500, event: { type: "strategy_complete",
    best_case: { final_amount: 0, total_savings: 47283, savings_percentage: 100 },
    realistic: { final_amount: 2400, total_savings: 44883, savings_percentage: 95 }
  } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "strategy", summary: {} } },

  // ========== STAGE 6: LETTERS (~ 8 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "letters", title: "Drafting Your Letters", description: "Generating ready-to-send dispute and negotiation letters..." } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "dispute", title: "Itemized Bill Request & Error Dispute Letter" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Date: [TODAY'S DATE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "City General Hospital\nBilling Department / Patient Financial Services\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "1200 Market Street\nSan Francisco, CA 94102\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Re: Account #CGH-2024-88291 — Billing Dispute\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Date of Service: January 15, 2025\nAmount Billed: $47,283.00\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Dear Billing Department:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I am writing to formally dispute the charges on the above-referenced account. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I have conducted a thorough review of the itemized statement and identified " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "five (5) billing errors totaling $17,455 in overcharges. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I am also requesting that all charges be adjusted to comply with California " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Health & Safety Code § 127405 (SB 1021), which caps charges to uninsured " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "patients at no more than the Medicare rate.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "BILLING ERRORS IDENTIFIED:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "1. DUPLICATE CT SCAN — $4,800\nCPT 74177 (CT Abdomen/Pelvis with Contrast) " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "appears twice on the same date without modifier 76. Please remove the " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "duplicate charge.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "2. UPCODED ER VISIT — $2,800\nCPT 99285 (Level 5) was billed for a " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "straightforward radius fracture (S52.501A) treated with splinting. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "This presentation supports CPT 99283 (Level 3) per AMA guidelines.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "3. PHANTOM OPERATING ROOM CHARGE — $4,500\nRevenue Code 0360 was " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "billed but no surgical procedure was performed. The splint application " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "(CPT 29125) is a bedside procedure done in the ED.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "4. UNBUNDLED LABORATORY TESTS — $555\nIndividual electrolytes (CPT " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "84295, 84132, 82435) were billed alongside BMP (CPT 80048) which " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "already includes these tests. This violates NCCI edits.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "5. MEDICALLY UNNECESSARY CT — $4,800\nPlease provide clinical " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "documentation justifying an abdominal/pelvic CT for a forearm fracture.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "LEGAL NOTICE:\nUnder California Health & Safety Code § 127405, charges " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "to uninsured patients may not exceed the Medicare rate. The Medicare " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "value of my services is approximately $4,715.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I request a corrected bill within 30 days. Please do not initiate " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "collection activity while this dispute is pending, consistent with " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "your obligations under IRC § 501(r) and California law.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: California " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Department of Managed Health Care\ncc: Hospital Patient Advocate" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "dispute",
    title: "Itemized Bill Request & Error Dispute Letter",
    recipient: "City General Hospital — Billing Department",
    purpose: "Dispute 5 billing errors totaling $17,455 and invoke California SB 1021 Medicare rate cap",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nCity General Hospital\nBilling Department / Patient Financial Services\n1200 Market Street\nSan Francisco, CA 94102\n\nRe: Account #CGH-2024-88291 — Billing Dispute\nDate of Service: January 15, 2025\nAmount Billed: $47,283.00\n\nDear Billing Department:\n\nI am writing to formally dispute the charges on the above-referenced account. I have conducted a thorough review of the itemized statement and identified five (5) billing errors totaling $17,455 in overcharges. I am also requesting that all charges be adjusted to comply with California Health & Safety Code § 127405 (SB 1021), which caps charges to uninsured patients at no more than the Medicare rate.\n\nBILLING ERRORS IDENTIFIED:\n\n1. DUPLICATE CT SCAN — $4,800\nCPT 74177 (CT Abdomen/Pelvis with Contrast) appears twice on the same date without modifier 76. Please remove the duplicate charge.\n\n2. UPCODED ER VISIT — $2,800\nCPT 99285 (Level 5) was billed for a straightforward radius fracture (S52.501A) treated with splinting. This presentation supports CPT 99283 (Level 3) per AMA guidelines.\n\n3. PHANTOM OPERATING ROOM CHARGE — $4,500\nRevenue Code 0360 was billed but no surgical procedure was performed. The splint application (CPT 29125) is a bedside procedure done in the ED.\n\n4. UNBUNDLED LABORATORY TESTS — $555\nIndividual electrolytes (CPT 84295, 84132, 82435) were billed alongside BMP (CPT 80048) which already includes these tests. This violates NCCI edits.\n\n5. MEDICALLY UNNECESSARY CT — $4,800\nPlease provide clinical documentation justifying an abdominal/pelvic CT for a forearm fracture.\n\nLEGAL NOTICE:\nUnder California Health & Safety Code § 127405, charges to uninsured patients may not exceed the Medicare rate. The Medicare value of my services is approximately $4,715.\n\nI request a corrected bill within 30 days. Please do not initiate collection activity while this dispute is pending, consistent with your obligations under IRC § 501(r) and California law.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: California Department of Managed Health Care\ncc: Hospital Patient Advocate",
    key_citations: ["California Health & Safety Code § 127405 (SB 1021)", "IRC § 501(r)(4)-(6)", "NCCI Correct Coding Initiative", "42 U.S.C. § 300gg-111 (No Surprises Act)"]
  } } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "charity", title: "Financial Assistance Application Cover Letter" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "charity", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Date: [TODAY'S DATE]\n\nCity General Hospital\nPatient Financial Services\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "1200 Market Street\nSan Francisco, CA 94102\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Re: Financial Assistance Application — Account #CGH-2024-88291\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Dear Patient Financial Services:\n\nI am writing to apply for financial " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "assistance under your hospital's Financial Assistance Policy (FAP), as " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "required by IRC § 501(r) for tax-exempt nonprofit hospitals.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "My annual household income is approximately $52,000 for a household of 1, " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "which places me at approximately 280% of the Federal Poverty Level. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Under California Health & Safety Code § 127400, I believe I qualify for " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "reduced-cost or free care.\n\nEnclosed: Recent pay stubs, most recent tax " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "return, and completed Financial Assistance Application.\n\nPlease note " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "that under 26 CFR § 1.501(r)-6, your hospital may not initiate " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "extraordinary collection actions while this application is pending.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "charity",
    title: "Financial Assistance Application Cover Letter",
    recipient: "City General Hospital — Patient Financial Services",
    purpose: "Apply for charity care / financial assistance as a patient at 280% FPL at a nonprofit hospital",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nCity General Hospital\nPatient Financial Services\n1200 Market Street\nSan Francisco, CA 94102\n\nRe: Financial Assistance Application — Account #CGH-2024-88291\n\nDear Patient Financial Services:\n\nI am writing to apply for financial assistance under your hospital's Financial Assistance Policy (FAP), as required by IRC § 501(r) for tax-exempt nonprofit hospitals.\n\nMy annual household income is approximately $52,000 for a household of 1, which places me at approximately 280% of the Federal Poverty Level. Under California Health & Safety Code § 127400, I believe I qualify for reduced-cost or free care.\n\nEnclosed: Recent pay stubs, most recent tax return, and completed Financial Assistance Application.\n\nPlease note that under 26 CFR § 1.501(r)-6, your hospital may not initiate extraordinary collection actions while this application is pending.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]",
    key_citations: ["IRC § 501(r)(4)-(6)", "26 CFR § 1.501(r)-6", "California Health & Safety Code § 127400-127446"]
  } } },

  { delay_ms: 300, event: { type: "letters_complete", count: 2 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "letters", summary: { letters: 2 } } },

  // ========== FINAL SUMMARY ==========
  { delay_ms: 500, event: { type: "audit_complete_all", summary: {
    original_bill: 47283,
    errors_found: 5,
    total_overcharges: 17455,
    fair_value: 8247,
    potential_savings: 39036,
    protections_found: 4,
    letters_generated: 2,
    best_case_outcome: { final_amount: 0, total_savings: 47283, savings_percentage: 100 },
    realistic_outcome: { final_amount: 2400, total_savings: 44883, savings_percentage: 95 },
  } } },
];
