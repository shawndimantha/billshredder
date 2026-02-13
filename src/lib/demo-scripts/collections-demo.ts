import { type ScriptEntry } from "./demo-runner";

export const COLLECTIONS_DEMO_SCRIPT: ScriptEntry[] = [
  // ========== STAGE 1: PARSE (~ 3 seconds) ==========
  { delay_ms: 300, event: { type: "stage_start", stage: "parse", title: "Parsing Your Bill", description: "Extracting every line item and billing code..." } },
  { delay_ms: 200, event: { type: "parse_item", item: { id: 1, revenue_code: "0510", cpt_code: "99215", description: "Office Visit, Estab, Level 5", quantity: 1, unit_charge: 845, total_charge: 845, department: "Outpatient" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 2, revenue_code: "0510", cpt_code: null, description: "Outpatient Hospital Facility Fee", quantity: 1, unit_charge: 1800, total_charge: 1800, department: "Outpatient" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 3, revenue_code: "0320", cpt_code: "71046", description: "Chest X-ray, 2 Views", quantity: 1, unit_charge: 950, total_charge: 950, department: "Radiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 4, revenue_code: "0300", cpt_code: "80053", description: "Comprehensive Metabolic Panel", quantity: 1, unit_charge: 520, total_charge: 520, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 5, revenue_code: "0300", cpt_code: "85025", description: "CBC w/ Automated Differential", quantity: 1, unit_charge: 380, total_charge: 380, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 6, revenue_code: "0300", cpt_code: "87804", description: "Rapid Influenza Antigen Test", quantity: 1, unit_charge: 245, total_charge: 245, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 7, revenue_code: "0300", cpt_code: "87880", description: "Rapid Strep Test (Group A)", quantity: 1, unit_charge: 195, total_charge: 195, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 8, revenue_code: "0300", cpt_code: "36415", description: "Venipuncture", quantity: 1, unit_charge: 142, total_charge: 142, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 9, revenue_code: "0410", cpt_code: "94640", description: "Pressurized Nebulizer Treatment", quantity: 1, unit_charge: 675, total_charge: 675, department: "Respiratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 10, revenue_code: "0460", cpt_code: "94760", description: "Pulse Oximetry, Single Reading", quantity: 1, unit_charge: 234, total_charge: 234, department: "Respiratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 11, revenue_code: "0260", cpt_code: "96374", description: "IV Push, Single Drug", quantity: 1, unit_charge: 534, total_charge: 534, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 12, revenue_code: "0250", cpt_code: "J7040", description: "Normal Saline 500ml", quantity: 1, unit_charge: 287, total_charge: 287, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 13, revenue_code: "0250", cpt_code: "J3301", description: "Triamcinolone Acetonide 10mg", quantity: 1, unit_charge: 198, total_charge: 198, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 14, revenue_code: "0250", cpt_code: "J7613", description: "Albuterol, Inhalation Solution", quantity: 1, unit_charge: 145, total_charge: 145, department: "Pharmacy" } } },
  { delay_ms: 200, event: {
    type: "parse_complete",
    bill: {
      hospital: { name: "Pacific Urgent Care", nonprofit_status: "for_profit", address: "8901 Wilshire Blvd, Los Angeles, CA 90211" },
      patient: { account_number: "ABC-2024-881234", date_of_service: "08/22/2024" },
      line_items: [
        { id: 1, revenue_code: "0510", cpt_code: "99215", description: "Office Visit, Estab, Level 5", quantity: 1, unit_charge: 845, total_charge: 845, department: "Outpatient" },
        { id: 2, revenue_code: "0510", cpt_code: null, description: "Outpatient Hospital Facility Fee", quantity: 1, unit_charge: 1800, total_charge: 1800, department: "Outpatient" },
        { id: 3, revenue_code: "0320", cpt_code: "71046", description: "Chest X-ray, 2 Views", quantity: 1, unit_charge: 950, total_charge: 950, department: "Radiology" },
        { id: 4, revenue_code: "0300", cpt_code: "80053", description: "Comprehensive Metabolic Panel", quantity: 1, unit_charge: 520, total_charge: 520, department: "Laboratory" },
        { id: 5, revenue_code: "0300", cpt_code: "85025", description: "CBC w/ Automated Differential", quantity: 1, unit_charge: 380, total_charge: 380, department: "Laboratory" },
        { id: 6, revenue_code: "0300", cpt_code: "87804", description: "Rapid Influenza Antigen Test", quantity: 1, unit_charge: 245, total_charge: 245, department: "Laboratory" },
        { id: 7, revenue_code: "0300", cpt_code: "87880", description: "Rapid Strep Test (Group A)", quantity: 1, unit_charge: 195, total_charge: 195, department: "Laboratory" },
        { id: 8, revenue_code: "0300", cpt_code: "36415", description: "Venipuncture", quantity: 1, unit_charge: 142, total_charge: 142, department: "Laboratory" },
        { id: 9, revenue_code: "0410", cpt_code: "94640", description: "Pressurized Nebulizer Treatment", quantity: 1, unit_charge: 675, total_charge: 675, department: "Respiratory" },
        { id: 10, revenue_code: "0460", cpt_code: "94760", description: "Pulse Oximetry, Single Reading", quantity: 1, unit_charge: 234, total_charge: 234, department: "Respiratory" },
        { id: 11, revenue_code: "0260", cpt_code: "96374", description: "IV Push, Single Drug", quantity: 1, unit_charge: 534, total_charge: 534, department: "Pharmacy" },
        { id: 12, revenue_code: "0250", cpt_code: "J7040", description: "Normal Saline 500ml", quantity: 1, unit_charge: 287, total_charge: 287, department: "Pharmacy" },
        { id: 13, revenue_code: "0250", cpt_code: "J3301", description: "Triamcinolone Acetonide 10mg", quantity: 1, unit_charge: 198, total_charge: 198, department: "Pharmacy" },
        { id: 14, revenue_code: "0250", cpt_code: "J7613", description: "Albuterol, Inhalation Solution", quantity: 1, unit_charge: 145, total_charge: 145, department: "Pharmacy" },
      ],
      total_charges: 7150,
      patient_responsibility: 8500,
    },
  } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "parse", summary: { items: 14 } } },

  // ========== STAGE 2: AUDIT (~ 8 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "audit", title: "Auditing for Errors", description: "Checking every charge for billing errors..." } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 1,
    error_type: "upcoding",
    severity: "critical",
    title: "Upcoded Office Visit — Level 5 for Respiratory Symptoms",
    description: "Billed as CPT 99215 (Level 5, highest complexity) for an established patient with respiratory symptoms at an urgent care facility.",
    explanation: "A Level 5 office visit (CPT 99215) requires high complexity medical decision-making and typically involves multiple chronic conditions, prescription drug management, and extensive counseling. An urgent care visit for acute respiratory symptoms (cough, shortness of breath) treated with nebulizer, IV steroids, and sent home — even with diagnostic testing — is typically a Level 3 or 4 visit (99213 or 99214). This upcoding adds approximately $300-400 to your bill.",
    estimated_overcharge: 350,
    evidence: "Urgent care for acute respiratory symptoms with nebulizer treatment, chest X-ray, and IV steroid is consistent with moderate complexity (99214) at most. Level 5 visits typically require 40+ minutes and management of multiple chronic conditions with high risk of complications. Treatment was completed in a single urgent care visit with discharge home.",
    actionable: "Request downgrade from CPT 99215 to 99214. State: 'CPT 99215 (Level 5) is not supported by the documentation for an urgent care visit for acute respiratory symptoms. I am requesting a downgrade to CPT 99214 (Level 4), which is appropriate for this presentation.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 2,
    error_type: "balance_billing",
    severity: "critical",
    title: "Improper Facility Fee for Urgent Care Visit",
    description: "Outpatient Hospital Facility Fee of $1,800 charged at an out-of-network for-profit urgent care center for an uninsured patient.",
    explanation: "Pacific Urgent Care billed you an 'Outpatient Hospital Facility Fee' of $1,800 on top of the office visit charge. For uninsured patients seeking emergency or urgent care, facilities cannot balance bill at full chargemaster rates. The facility fee itself may be legitimate, but the amount charged is likely excessive. Many urgent care centers do not charge facility fees at all, or they are capped at much lower rates.",
    estimated_overcharge: 1200,
    evidence: "For-profit urgent care facilities often charge excessive facility fees to uninsured patients. The $1,800 facility fee is roughly 2x the physician visit charge, which is disproportionate. Medicare allows facility fees for hospital-based clinics, but the rate would be approximately $200-400, not $1,800. This appears to be balance billing at chargemaster rates.",
    actionable: "Challenge the facility fee amount. State: 'The $1,800 Outpatient Hospital Facility Fee is excessive for an urgent care visit. As an uninsured patient, I should not be charged full chargemaster rates. Request adjustment to a reasonable cash-pay rate (approximately $400-600 maximum).'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 10,
    error_type: "unbundling",
    severity: "high",
    title: "Pulse Oximetry Billed Separately from Nebulizer Treatment",
    description: "CPT 94760 (Pulse Oximetry) billed separately at $234 while CPT 94640 (Nebulizer Treatment) already includes oxygen saturation monitoring.",
    explanation: "Pulse oximetry is a standard component of nebulizer treatment and respiratory assessment. Billing CPT 94760 separately when providing nebulizer treatment (CPT 94640) is unbundling — charging separately for a service that's already included in the primary procedure. The NCCI (Correct Coding Initiative) typically bundles pulse oximetry into respiratory treatments.",
    estimated_overcharge: 234,
    evidence: "CPT 94640 (Pressurized Nebulizer Treatment) includes all components of respiratory therapy administration, including oxygen saturation monitoring. CPT 94760 should not be billed separately on the same date as 94640 per NCCI edits. Standard of care for nebulizer treatment includes pulse oximetry before, during, and after treatment.",
    actionable: "Request removal of pulse oximetry charge. State: 'CPT 94760 (Pulse Oximetry) is bundled into CPT 94640 (Nebulizer Treatment) per NCCI edits and should not be billed separately. Please remove the $234 charge.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 0,
    error_type: "other",
    severity: "critical",
    title: "Illegal Collection Agency Fees and Interest",
    description: "Collection agency added $1,072.50 in fees (15%) and $277.50 in interest to the original $7,150 balance.",
    explanation: "Under the Fair Debt Collection Practices Act (FDCPA), collection agencies cannot add fees or interest unless explicitly authorized by the original contract or state law. California law prohibits collection agencies from adding fees to medical debt unless the original creditor (Pacific Urgent Care) included such provisions in writing at the time of service. You likely never agreed to pay collection fees or interest, making these charges illegal.",
    estimated_overcharge: 1350,
    evidence: "Collection notice shows 'Collection Agency Fee (15%): $1,072.50' and 'Interest Accrued (1.5% per month, 3 months): $277.50' totaling $1,350 in added charges. No evidence of written agreement at time of service authorizing such fees. California Civil Code § 1788.14 prohibits collection agencies from adding unauthorized fees to consumer debts.",
    actionable: "Dispute collection fees and interest. State: 'I dispute the $1,350 in collection agency fees and interest. Under the Fair Debt Collection Practices Act (15 U.S.C. § 1692f) and California Civil Code § 1788.14, you cannot add fees or interest unless explicitly authorized in the original contract. Please provide proof of authorization or remove these charges immediately.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 0,
    error_type: "phantom",
    severity: "critical",
    title: "Missing Medical Records and Itemized Bill Verification",
    description: "Collection agency has not provided verification of the debt or itemized medical records from the original creditor.",
    explanation: "Under the FDCPA, you have the right to request verification of the debt within 30 days of receiving the collection notice. The collection agency must provide documentation proving: (1) you received the services, (2) the amounts charged are accurate, and (3) they have the legal right to collect. Many collection agencies cannot provide complete medical records or itemized bills, and if they fail to verify the debt, they must cease collection activity.",
    estimated_overcharge: 0,
    evidence: "Collection notice dated [date received]. Under 15 U.S.C. § 1692g, consumer has 30 days to dispute the debt in writing. If disputed, collection agency must obtain verification (itemized bill, medical records, proof of assignment) and mail it to consumer. Failure to verify means they must stop all collection activity and cannot report to credit bureaus.",
    actionable: "Send a debt validation letter within 30 days of receiving the collection notice. State: 'I am exercising my rights under 15 U.S.C. § 1692g to dispute this debt and request validation. Please provide: (1) itemized bill from Pacific Urgent Care with CPT codes and dates of service, (2) copy of the original signed agreement with Pacific Urgent Care, (3) proof that your agency is licensed to collect debts in California, and (4) verification of the amount owed including a breakdown of any fees or interest. Cease all collection activity until verification is provided.'"
  } } },

  { delay_ms: 400, event: { type: "audit_complete", total_errors: 5, total_overcharges: 3134 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "audit", summary: { errors: 5, overcharges: 3134 } } },

  // ========== STAGE 3: BENCHMARK (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "benchmark", title: "Benchmarking Fair Value", description: "Comparing every charge to Medicare rates and fair market value..." } },

  { delay_ms: 400, event: { type: "benchmark_item", benchmark: { line_item_id: 1, description: "Office Visit Level 5 (99215)", billed_amount: 845, medicare_rate: 218, fair_rate: 382, cash_rate: 338, markup_ratio: 3.9, status: "high" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 2, description: "Outpatient Facility Fee", billed_amount: 1800, medicare_rate: 385, fair_rate: 673, cash_rate: 720, markup_ratio: 4.7, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 3, description: "Chest X-ray (71046)", billed_amount: 950, medicare_rate: 39, fair_rate: 68, cash_rate: 380, markup_ratio: 24.4, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 4, description: "CMP (80053)", billed_amount: 520, medicare_rate: 18, fair_rate: 32, cash_rate: 208, markup_ratio: 28.9, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 5, description: "CBC (85025)", billed_amount: 380, medicare_rate: 10, fair_rate: 18, cash_rate: 152, markup_ratio: 38.0, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 9, description: "Nebulizer Treatment (94640)", billed_amount: 675, medicare_rate: 17, fair_rate: 30, cash_rate: 270, markup_ratio: 39.7, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 11, description: "IV Push (96374)", billed_amount: 534, medicare_rate: 67, fair_rate: 117, cash_rate: 214, markup_ratio: 8.0, status: "high" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 13, description: "Triamcinolone (J3301)", billed_amount: 198, medicare_rate: 5, fair_rate: 9, cash_rate: 79, markup_ratio: 39.6, status: "extreme" } } },

  { delay_ms: 400, event: { type: "benchmark_complete", summary: { total_billed: 7150, total_fair_value: 1823, total_medicare_value: 1042, potential_savings: 5327, average_markup: 18.4 } } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "benchmark", summary: { total_billed: 7150, total_fair_value: 1823, average_markup: 18.4 } } },

  // ========== STAGE 4: RIGHTS (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "rights", title: "Checking Your Rights", description: "Identifying every law, policy, and program that protects you..." } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "federal_law",
    name: "Fair Debt Collection Practices Act (FDCPA) — Debt Validation Rights",
    applies: true,
    impact: "high",
    description: "Under the FDCPA, you have the right to dispute this debt and request validation within 30 days of receiving the collection notice. The collection agency must verify the debt with documentation from the original creditor, including an itemized bill and proof of assignment. If they cannot verify the debt, they must cease all collection activity and cannot report it to credit bureaus.",
    action: "Send a debt validation letter via certified mail within 30 days of receiving the collection notice. Request: (1) itemized bill from Pacific Urgent Care with dates and CPT codes, (2) original signed agreement, (3) proof the agency is licensed in California, and (4) verification of the amount owed. All collection activity must stop until they provide verification.",
    citation: "15 U.S.C. § 1692g (Fair Debt Collection Practices Act)"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "federal_law",
    name: "FDCPA — Prohibition on Unfair Fees and Interest",
    applies: true,
    impact: "high",
    description: "The FDCPA prohibits debt collectors from adding fees, charges, or interest unless expressly authorized by the original agreement or permitted by state law. The $1,350 in collection fees and interest added to your bill are likely illegal unless you signed a contract with Pacific Urgent Care that explicitly authorized such charges. California law also restricts what fees collectors can add to medical debt.",
    action: "Dispute the collection fees and interest in writing. State that you never agreed to pay collection agency fees or interest, and demand proof of authorization from the original contract. If they cannot provide evidence of your agreement, these charges must be removed.",
    citation: "15 U.S.C. § 1692f; California Civil Code § 1788.14"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "state_law",
    name: "California Rosenthal Fair Debt Collection Practices Act",
    applies: true,
    impact: "high",
    description: "California's Rosenthal Act provides additional protections beyond the federal FDCPA. It prohibits debt collectors from using threats, harassment, or deceptive practices. It also requires collectors to be licensed in California and limits what fees can be added to consumer debts. Medical debt collectors cannot threaten wage garnishment without a court judgment, and they cannot add fees or interest without written authorization.",
    action: "Verify that ABC Collections Agency is licensed to operate in California. Request their license number. If they are not licensed, they are operating illegally and must cease all collection activity. Additionally, dispute any unauthorized fees under the Rosenthal Act.",
    citation: "California Civil Code § 1788-1788.32 (Rosenthal Act)"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "state_law",
    name: "California SB 1281 — Medical Debt Protections for Low-Income Patients",
    applies: true,
    impact: "high",
    description: "With a household income of $38,000 for a single person, you are at approximately 204% of the Federal Poverty Level. California law prohibits for-profit hospitals and clinics from charging low-income uninsured patients more than the amounts generally billed to insured patients (AGB). Even though Pacific Urgent Care is for-profit, they cannot charge you full chargemaster rates. You may be entitled to a significant discount retroactively.",
    action: "Contact Pacific Urgent Care (the original creditor, not the collection agency) directly and request financial assistance or a reduced rate under California law. State that as an uninsured patient at 204% FPL, you are entitled to reduced charges under California Health & Safety Code § 127400. Request that they recall the debt from collections and adjust your bill to a fair cash-pay rate.",
    citation: "California Health & Safety Code § 127400-127446"
  } } },

  { delay_ms: 800, event: { type: "right_found", protection: {
    type: "state_law",
    name: "California Medical Debt — No Credit Reporting for 1 Year",
    applies: true,
    impact: "medium",
    description: "California law prohibits credit reporting agencies from reporting medical debt on consumer credit reports until 1 year after the debt first became delinquent. Since your date of service was 08/22/2024 and the debt went to collections on 11/15/2024, it cannot be reported to credit bureaus until at least 08/22/2025. If ABC Collections is threatening credit reporting before that date, they are violating California law.",
    action: "If the collection agency threatens to report this debt to credit bureaus before 08/22/2025, inform them that they are violating California Civil Code § 1785.25.1 and demand they cease the threat. Monitor your credit report and dispute any erroneous reporting.",
    citation: "California Civil Code § 1785.25.1"
  } } },

  { delay_ms: 400, event: { type: "charity_care_result", result: {
    hospital_is_nonprofit: false,
    likely_eligible: true,
    fpl_percentage: 204,
    estimated_discount: "50-75% discount or cash-pay adjustment",
    how_to_apply: "1. Contact Pacific Urgent Care directly (not the collection agency) at the billing department. 2. Request financial assistance or a cash-pay discount under California Health & Safety Code § 127400. 3. Provide proof of income (pay stubs or tax return). 4. Request that they recall the debt from collections while your request is processed. 5. Even for-profit facilities in California must offer reduced rates to low-income uninsured patients."
  } } },

  { delay_ms: 300, event: { type: "rights_complete", total_protections: 5 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "rights", summary: { protections: 5 } } },

  // ========== STAGE 5: STRATEGY (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "strategy", title: "Building Your Strategy", description: "Creating your step-by-step negotiation playbook..." } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 1,
    action: "Send FDCPA debt validation letter to collection agency",
    category: "legal_protection",
    description: "Within 30 days of receiving the collection notice, send a certified letter to ABC Collections Agency exercising your right to dispute the debt and request validation under 15 U.S.C. § 1692g. This forces them to prove the debt is valid and stops all collection activity until they provide verification. Many collection agencies cannot provide adequate verification and will be forced to drop the debt.",
    talking_points: [
      "I am exercising my rights under the Fair Debt Collection Practices Act (15 U.S.C. § 1692g) to dispute this debt.",
      "Please provide: (1) itemized bill from Pacific Urgent Care with all CPT codes and dates of service, (2) copy of any signed agreement authorizing collection fees or interest, (3) proof your agency is licensed in California, and (4) verification that you have legal authority to collect this debt.",
      "Cease all collection activity, including phone calls and credit reporting, until verification is provided.",
      "This is not a refusal to pay, but a request for validation as required by federal law."
    ],
    expected_savings: null,
    confidence: "high",
    timeline: "Do this IMMEDIATELY — send within 30 days of collection notice (critical deadline)"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 2,
    action: "Dispute illegal collection fees and interest",
    category: "error_dispute",
    description: "The collection agency added $1,350 in fees (15% agency fee + 1.5% monthly interest for 3 months). Under the FDCPA and California law, they cannot add fees or interest unless explicitly authorized in writing by the original creditor. Demand removal of these charges immediately.",
    talking_points: [
      "I dispute the $1,350 in collection agency fees and interest charges.",
      "Under 15 U.S.C. § 1692f and California Civil Code § 1788.14, you cannot add fees or interest without my written authorization.",
      "I never signed an agreement with Pacific Urgent Care authorizing collection fees or interest.",
      "Provide proof of written authorization or remove these charges immediately."
    ],
    expected_savings: 1350,
    confidence: "high",
    timeline: "Include in your debt validation letter (within 30 days)"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 3,
    action: "Contact original creditor to dispute billing errors and request financial assistance",
    category: "error_dispute",
    description: "Bypass the collection agency and go directly to Pacific Urgent Care to dispute the 3 billing errors (upcoded visit: $350, excessive facility fee: $1,200, unbundled pulse oximetry: $234) totaling $1,784. Also request financial assistance as a low-income uninsured patient under California law. Many providers will recall debts from collections if you engage in good faith.",
    talking_points: [
      "I am contacting you directly regarding account #PUC-2024-4412 to dispute billing errors before proceeding further.",
      "CPT 99215 (Level 5 visit) is not supported for an urgent care visit — request downgrade to 99214.",
      "The $1,800 facility fee is excessive for uninsured patients — California law requires reasonable cash-pay rates for low-income patients.",
      "CPT 94760 (pulse oximetry) is bundled into CPT 94640 (nebulizer treatment) and cannot be billed separately.",
      "I am also requesting financial assistance as an uninsured patient at 204% FPL under California Health & Safety Code § 127400."
    ],
    expected_savings: 1784,
    confidence: "high",
    timeline: "After sending debt validation letter (within 45-60 days)"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 4,
    action: "Negotiate cash-pay settlement with original creditor",
    category: "negotiation",
    description: "After disputing errors and requesting financial assistance, negotiate a cash-pay settlement with Pacific Urgent Care. Offer to pay a lump sum based on fair market value (approximately $1,823) or Medicare rates (approximately $1,042). Urgent care centers typically accept 25-40% of billed charges for cash-paying patients. Aim to settle for $1,500-2,000.",
    talking_points: [
      "After correction of billing errors, the adjusted original balance should be approximately $5,366 (down from $7,150).",
      "As an uninsured patient, I should not be charged chargemaster rates. The fair market value of my services is approximately $1,823.",
      "I am prepared to pay $_____  as a lump-sum cash settlement if we can resolve this directly and recall the debt from collections.",
      "I would prefer to pay you directly rather than the collection agency."
    ],
    expected_savings: null,
    confidence: "medium",
    timeline: "After error dispute and financial assistance discussions (60-90 days)"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 5,
    action: "Request pay-for-delete agreement if paying collection agency",
    category: "negotiation",
    description: "If Pacific Urgent Care will not recall the debt and you must deal with ABC Collections, negotiate a 'pay-for-delete' agreement. Offer to pay a reduced amount (50-60% of the disputed balance) in exchange for the agency removing the debt from your credit report and providing written confirmation that the debt is satisfied in full.",
    talking_points: [
      "I am willing to settle this account for $_____  if you agree to delete this entry from my credit report (pay-for-delete).",
      "I need written confirmation before payment that: (1) the account will be reported as 'paid in full' or deleted entirely, (2) no remaining balance will be owed, and (3) you will not sell or transfer this debt.",
      "Payment is contingent on receiving a written pay-for-delete agreement signed by your agency."
    ],
    expected_savings: null,
    confidence: "medium",
    timeline: "Only if original creditor will not negotiate (90-120 days)"
  } } },

  { delay_ms: 500, event: { type: "strategy_complete",
    best_case: { final_amount: 1500, total_savings: 7000, savings_percentage: 82 },
    realistic: { final_amount: 2800, total_savings: 5700, savings_percentage: 67 }
  } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "strategy", summary: {} } },

  // ========== STAGE 6: LETTERS (~ 8 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "letters", title: "Drafting Your Letters", description: "Generating ready-to-send dispute and negotiation letters..." } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "dispute_creditor", title: "Billing Error Dispute to Original Creditor" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Date: [TODAY'S DATE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Pacific Urgent Care\nBilling Department / Patient Financial Services\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "8901 Wilshire Blvd\nLos Angeles, CA 90211\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Re: Account #PUC-2024-4412 — Billing Dispute & Financial Assistance Request\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Date of Service: August 22, 2024\nOriginal Amount Billed: $7,150.00\nAccount in Collections: ABC Collections Agency #ABC-2024-881234\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Dear Billing Department:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "I am writing to formally dispute billing errors on the above-referenced " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "account and to request financial assistance as a low-income uninsured " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "patient under California Health & Safety Code § 127400.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "BILLING ERRORS IDENTIFIED:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "1. UPCODED OFFICE VISIT — $350\nCPT 99215 (Level 5) was billed for an " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "urgent care visit for acute respiratory symptoms. This presentation " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "supports CPT 99214 (Level 4) per AMA guidelines. Level 5 requires high " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "complexity medical decision-making typically not present in a single " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "urgent care encounter.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "2. EXCESSIVE FACILITY FEE — $1,200\nThe $1,800 Outpatient Hospital " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Facility Fee is grossly excessive for an uninsured patient. Under " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "California law, uninsured patients cannot be charged full chargemaster " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "rates. The reasonable cash-pay rate for this service is approximately " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "$400-600.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "3. UNBUNDLED PULSE OXIMETRY — $234\nCPT 94760 (Pulse Oximetry) is " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "bundled into CPT 94640 (Nebulizer Treatment) per NCCI edits and should " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "not be billed separately.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Total Billing Errors: $1,784\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "FINANCIAL ASSISTANCE REQUEST:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "My annual household income is approximately $38,000 for a household of 1, " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "which places me at 204% of the Federal Poverty Level. Under California " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Health & Safety Code § 127400, low-income uninsured patients are entitled " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "to reduced charges. I request that my bill be adjusted to a fair cash-pay " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "rate or discounted based on my income.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "REQUEST FOR ACTION:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "1. Recall this account from ABC Collections Agency immediately.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "2. Provide a corrected itemized bill with billing errors removed.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "3. Apply a financial assistance discount or cash-pay adjustment.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "4. Provide information on payment plan options for any remaining balance.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "I am prepared to resolve this account directly with your facility. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Please respond within 30 days.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "Enclosures: Proof of income (pay stubs/tax return)\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute_creditor", chunk: "cc: ABC Collections Agency\ncc: California Department of Consumer Affairs" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "dispute_creditor",
    title: "Billing Error Dispute to Original Creditor",
    recipient: "Pacific Urgent Care — Billing Department",
    purpose: "Dispute 3 billing errors totaling $1,784 and request financial assistance as low-income uninsured patient",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nPacific Urgent Care\nBilling Department / Patient Financial Services\n8901 Wilshire Blvd\nLos Angeles, CA 90211\n\nRe: Account #PUC-2024-4412 — Billing Dispute & Financial Assistance Request\nDate of Service: August 22, 2024\nOriginal Amount Billed: $7,150.00\nAccount in Collections: ABC Collections Agency #ABC-2024-881234\n\nDear Billing Department:\n\nI am writing to formally dispute billing errors on the above-referenced account and to request financial assistance as a low-income uninsured patient under California Health & Safety Code § 127400.\n\nBILLING ERRORS IDENTIFIED:\n\n1. UPCODED OFFICE VISIT — $350\nCPT 99215 (Level 5) was billed for an urgent care visit for acute respiratory symptoms. This presentation supports CPT 99214 (Level 4) per AMA guidelines. Level 5 requires high complexity medical decision-making typically not present in a single urgent care encounter.\n\n2. EXCESSIVE FACILITY FEE — $1,200\nThe $1,800 Outpatient Hospital Facility Fee is grossly excessive for an uninsured patient. Under California law, uninsured patients cannot be charged full chargemaster rates. The reasonable cash-pay rate for this service is approximately $400-600.\n\n3. UNBUNDLED PULSE OXIMETRY — $234\nCPT 94760 (Pulse Oximetry) is bundled into CPT 94640 (Nebulizer Treatment) per NCCI edits and should not be billed separately.\n\nTotal Billing Errors: $1,784\n\nFINANCIAL ASSISTANCE REQUEST:\n\nMy annual household income is approximately $38,000 for a household of 1, which places me at 204% of the Federal Poverty Level. Under California Health & Safety Code § 127400, low-income uninsured patients are entitled to reduced charges. I request that my bill be adjusted to a fair cash-pay rate or discounted based on my income.\n\nREQUEST FOR ACTION:\n\n1. Recall this account from ABC Collections Agency immediately.\n2. Provide a corrected itemized bill with billing errors removed.\n3. Apply a financial assistance discount or cash-pay adjustment.\n4. Provide information on payment plan options for any remaining balance.\n\nI am prepared to resolve this account directly with your facility. Please respond within 30 days.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\nEnclosures: Proof of income (pay stubs/tax return)\n\ncc: ABC Collections Agency\ncc: California Department of Consumer Affairs",
    key_citations: ["California Health & Safety Code § 127400-127446", "NCCI Correct Coding Initiative", "AMA CPT Guidelines"]
  } } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "validation", title: "FDCPA Debt Validation Letter" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "validation", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Date: [TODAY'S DATE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "ABC Collections Agency\nPO Box 45678\nLos Angeles, CA 90001\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Re: Debt Validation Request — Account #ABC-2024-881234\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Original Creditor: Pacific Urgent Care\nOriginal Account #: PUC-2024-4412\nAmount Claimed: $8,500.00\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Dear Sir or Madam:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "This letter is sent pursuant to the Fair Debt Collection Practices Act " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "(FDCPA), 15 U.S.C. § 1692g, to notify you that I dispute the validity of " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "the alleged debt referenced above.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Under the FDCPA, you are required to cease all collection activities " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "until you provide verification of this debt. I am exercising my right " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "to request validation within thirty (30) days of receiving your initial " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "collection notice.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "SPECIFIC REQUESTS FOR VALIDATION:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Please provide the following documentation:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "1. Complete itemized bill from Pacific Urgent Care showing all CPT/HCPCS " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "codes, revenue codes, dates of service, and unit charges.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "2. Copy of any written agreement I signed with Pacific Urgent Care " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "authorizing collection agency fees, interest charges, or other fees " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "added to the original balance.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "3. Proof that ABC Collections Agency is licensed to collect debts in " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "the State of California, including your California collection agency " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "license number.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "4. Documentation showing that you have legal authority to collect this " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "debt (e.g., assignment agreement from Pacific Urgent Care).\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "5. Complete accounting of how the alleged debt of $8,500.00 was " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "calculated, including a breakdown of the original charges ($7,150.00), " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "collection agency fees ($1,072.50), and interest ($277.50).\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "DISPUTE OF UNAUTHORIZED FEES:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "I specifically dispute the $1,350.00 in collection agency fees and " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "interest that have been added to the original balance. Under 15 U.S.C. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "§ 1692f and California Civil Code § 1788.14, you cannot add fees or " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "interest unless expressly authorized by the original agreement or " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "permitted by law. I never signed any agreement with Pacific Urgent Care " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "authorizing such charges.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "CEASE AND DESIST PENDING VALIDATION:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Until you provide complete verification of this debt as requested above, " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "you must immediately cease all collection activities, including:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "- Telephone calls or written communications demanding payment\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "- Reporting this debt to credit reporting agencies\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "- Threats of legal action or wage garnishment\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "- Any other collection activities whatsoever\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "This letter is not a refusal to pay a valid debt. It is a request for " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "validation as required and permitted by the FDCPA. If you cannot provide " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "adequate verification, you must cease all collection efforts and notify " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "credit reporting agencies to remove any negative reporting.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "All future communications regarding this account must be in writing only. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Do not call my phone number for any reason.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "I expect a complete response within thirty (30) days of your receipt of " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "this letter.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "Sincerely,\n[YOUR NAME]\n[ADDRESS]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "cc: Consumer Financial Protection Bureau\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "cc: California Department of Financial Protection and Innovation\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "validation", chunk: "cc: Pacific Urgent Care" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "validation",
    title: "FDCPA Debt Validation Letter",
    recipient: "ABC Collections Agency",
    purpose: "Dispute debt validity and request verification under FDCPA; cease all collection activity until verified",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nABC Collections Agency\nPO Box 45678\nLos Angeles, CA 90001\n\nRe: Debt Validation Request — Account #ABC-2024-881234\nOriginal Creditor: Pacific Urgent Care\nOriginal Account #: PUC-2024-4412\nAmount Claimed: $8,500.00\n\nDear Sir or Madam:\n\nThis letter is sent pursuant to the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g, to notify you that I dispute the validity of the alleged debt referenced above.\n\nUnder the FDCPA, you are required to cease all collection activities until you provide verification of this debt. I am exercising my right to request validation within thirty (30) days of receiving your initial collection notice.\n\nSPECIFIC REQUESTS FOR VALIDATION:\n\nPlease provide the following documentation:\n\n1. Complete itemized bill from Pacific Urgent Care showing all CPT/HCPCS codes, revenue codes, dates of service, and unit charges.\n\n2. Copy of any written agreement I signed with Pacific Urgent Care authorizing collection agency fees, interest charges, or other fees added to the original balance.\n\n3. Proof that ABC Collections Agency is licensed to collect debts in the State of California, including your California collection agency license number.\n\n4. Documentation showing that you have legal authority to collect this debt (e.g., assignment agreement from Pacific Urgent Care).\n\n5. Complete accounting of how the alleged debt of $8,500.00 was calculated, including a breakdown of the original charges ($7,150.00), collection agency fees ($1,072.50), and interest ($277.50).\n\nDISPUTE OF UNAUTHORIZED FEES:\n\nI specifically dispute the $1,350.00 in collection agency fees and interest that have been added to the original balance. Under 15 U.S.C. § 1692f and California Civil Code § 1788.14, you cannot add fees or interest unless expressly authorized by the original agreement or permitted by law. I never signed any agreement with Pacific Urgent Care authorizing such charges.\n\nCEASE AND DESIST PENDING VALIDATION:\n\nUntil you provide complete verification of this debt as requested above, you must immediately cease all collection activities, including:\n\n- Telephone calls or written communications demanding payment\n- Reporting this debt to credit reporting agencies\n- Threats of legal action or wage garnishment\n- Any other collection activities whatsoever\n\nThis letter is not a refusal to pay a valid debt. It is a request for validation as required and permitted by the FDCPA. If you cannot provide adequate verification, you must cease all collection efforts and notify credit reporting agencies to remove any negative reporting.\n\nAll future communications regarding this account must be in writing only. Do not call my phone number for any reason.\n\nI expect a complete response within thirty (30) days of your receipt of this letter.\n\nSincerely,\n[YOUR NAME]\n[ADDRESS]\n\ncc: Consumer Financial Protection Bureau\ncc: California Department of Financial Protection and Innovation\ncc: Pacific Urgent Care",
    key_citations: ["15 U.S.C. § 1692g (FDCPA)", "15 U.S.C. § 1692f (FDCPA)", "California Civil Code § 1788.14"]
  } } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "settlement", title: "Settlement Negotiation Letter" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Date: [TODAY'S DATE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Pacific Urgent Care\nBilling Department\n8901 Wilshire Blvd\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Los Angeles, CA 90211\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Re: Settlement Offer — Account #PUC-2024-4412\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Date of Service: August 22, 2024\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Dear Billing Department:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "I am writing to propose a settlement for the above-referenced account, " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "which is currently with ABC Collections Agency.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "As detailed in my previous correspondence, I have identified billing " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "errors totaling $1,784 and have requested financial assistance as a " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "low-income uninsured patient under California law.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "After correction of billing errors, the adjusted balance should be " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "approximately $5,366. Based on fair market value benchmarking, the " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "reasonable cash-pay rate for the services I received is approximately " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "$1,823 (equivalent to the median commercial insurance rate).\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "SETTLEMENT PROPOSAL:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "I am prepared to pay $2,000 as a lump-sum settlement to resolve this " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "account in full, provided that:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "1. Pacific Urgent Care recalls this account from ABC Collections Agency " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "and confirms in writing that the account is satisfied in full.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "2. No remaining balance will be owed, and no additional fees or interest " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "will be added.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "3. Pacific Urgent Care will request that ABC Collections Agency remove " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "any negative reporting to credit bureaus associated with this account.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "4. Pacific Urgent Care provides a written settlement agreement confirming " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "the above terms before payment is made.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "This offer represents a reasonable cash-pay settlement based on: (1) " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "correction of billing errors, (2) my status as a low-income uninsured " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "patient, and (3) fair market value benchmarking. It is higher than the " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Medicare rate (~$1,042) and the fair commercial rate (~$1,823).\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "I am motivated to resolve this matter promptly and avoid further " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "collection activity. If you agree to this settlement, I can provide " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "payment within 10 business days of receiving the written settlement " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "agreement.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "This offer is valid for 30 days from the date of this letter. Please " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "respond in writing with your acceptance or counteroffer.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "settlement", chunk: "cc: ABC Collections Agency" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "settlement",
    title: "Settlement Negotiation Letter",
    recipient: "Pacific Urgent Care — Billing Department",
    purpose: "Propose lump-sum cash settlement at fair market value to resolve account and remove from collections",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nPacific Urgent Care\nBilling Department\n8901 Wilshire Blvd\nLos Angeles, CA 90211\n\nRe: Settlement Offer — Account #PUC-2024-4412\nDate of Service: August 22, 2024\n\nDear Billing Department:\n\nI am writing to propose a settlement for the above-referenced account, which is currently with ABC Collections Agency.\n\nAs detailed in my previous correspondence, I have identified billing errors totaling $1,784 and have requested financial assistance as a low-income uninsured patient under California law.\n\nAfter correction of billing errors, the adjusted balance should be approximately $5,366. Based on fair market value benchmarking, the reasonable cash-pay rate for the services I received is approximately $1,823 (equivalent to the median commercial insurance rate).\n\nSETTLEMENT PROPOSAL:\n\nI am prepared to pay $2,000 as a lump-sum settlement to resolve this account in full, provided that:\n\n1. Pacific Urgent Care recalls this account from ABC Collections Agency and confirms in writing that the account is satisfied in full.\n\n2. No remaining balance will be owed, and no additional fees or interest will be added.\n\n3. Pacific Urgent Care will request that ABC Collections Agency remove any negative reporting to credit bureaus associated with this account.\n\n4. Pacific Urgent Care provides a written settlement agreement confirming the above terms before payment is made.\n\nThis offer represents a reasonable cash-pay settlement based on: (1) correction of billing errors, (2) my status as a low-income uninsured patient, and (3) fair market value benchmarking. It is higher than the Medicare rate (~$1,042) and the fair commercial rate (~$1,823).\n\nI am motivated to resolve this matter promptly and avoid further collection activity. If you agree to this settlement, I can provide payment within 10 business days of receiving the written settlement agreement.\n\nThis offer is valid for 30 days from the date of this letter. Please respond in writing with your acceptance or counteroffer.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: ABC Collections Agency",
    key_citations: ["California Health & Safety Code § 127400", "Fair market value benchmarking"]
  } } },

  { delay_ms: 300, event: { type: "letters_complete", count: 3 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "letters", summary: { letters: 3 } } },

  // ========== FINAL SUMMARY ==========
  { delay_ms: 500, event: { type: "audit_complete_all", summary: {
    original_bill: 8500,
    errors_found: 5,
    total_overcharges: 3134,
    fair_value: 1823,
    potential_savings: 5327,
    protections_found: 5,
    letters_generated: 3,
    best_case_outcome: { final_amount: 1500, total_savings: 7000, savings_percentage: 82 },
    realistic_outcome: { final_amount: 2800, total_savings: 5700, savings_percentage: 67 },
  } } },
];
