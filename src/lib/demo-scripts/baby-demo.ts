import { type ScriptEntry } from "./demo-runner";

export const BABY_DEMO_SCRIPT: ScriptEntry[] = [
  // ========== STAGE 1: PARSE (~ 3 seconds) ==========
  { delay_ms: 300, event: { type: "stage_start", stage: "parse", title: "Parsing Your Bill", description: "Extracting every line item and billing code..." } },
  { delay_ms: 200, event: { type: "parse_item", item: { id: 1, revenue_code: "0720", cpt_code: "59510", description: "Total OB Care — C-Section Delivery", quantity: 1, unit_charge: 14200, total_charge: 14200, department: "Obstetrics" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 2, revenue_code: "0120", cpt_code: null, description: "Semi-Private Room (per diem)", quantity: 3, unit_charge: 2800, total_charge: 8400, department: "Room & Board" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 3, revenue_code: "0170", cpt_code: null, description: "Nursery Room (per diem)", quantity: 2, unit_charge: 1400, total_charge: 2800, department: "Nursery" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 4, revenue_code: "0360", cpt_code: null, description: "Operating Room Services", quantity: 1, unit_charge: 6500, total_charge: 6500, department: "Surgery" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 5, revenue_code: "0370", cpt_code: "01967", description: "Neuraxial Labor Analgesia/Delivery", quantity: 1, unit_charge: 4200, total_charge: 4200, department: "Anesthesia" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 6, revenue_code: "0170", cpt_code: "99460", description: "Initial Newborn Care, per day", quantity: 1, unit_charge: 1420, total_charge: 1420, department: "Neonatal" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 7, revenue_code: "0170", cpt_code: "99462", description: "Subsequent Newborn Care, per day", quantity: 1, unit_charge: 850, total_charge: 850, department: "Neonatal" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 8, revenue_code: "0300", cpt_code: "80053", description: "Comprehensive Metabolic Panel", quantity: 1, unit_charge: 725, total_charge: 725, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 9, revenue_code: "0300", cpt_code: "85025", description: "CBC w/ Automated Differential", quantity: 1, unit_charge: 463, total_charge: 463, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 10, revenue_code: "0300", cpt_code: "84132", description: "Potassium, Serum", quantity: 1, unit_charge: 195, total_charge: 195, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 11, revenue_code: "0300", cpt_code: "84295", description: "Sodium, Serum", quantity: 1, unit_charge: 185, total_charge: 185, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 12, revenue_code: "0300", cpt_code: "82435", description: "Chloride, Serum", quantity: 1, unit_charge: 175, total_charge: 175, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 13, revenue_code: "0300", cpt_code: "82247", description: "Bilirubin, Total — Newborn", quantity: 2, unit_charge: 198, total_charge: 396, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 14, revenue_code: "0300", cpt_code: "82947", description: "Glucose, Quantitative", quantity: 2, unit_charge: 156, total_charge: 312, department: "Laboratory" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 15, revenue_code: "0320", cpt_code: "76805", description: "OB Ultrasound, Complete", quantity: 1, unit_charge: 2156, total_charge: 2156, department: "Radiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 16, revenue_code: "0300", cpt_code: "92551", description: "Newborn Hearing Screen", quantity: 1, unit_charge: 287, total_charge: 287, department: "Audiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 17, revenue_code: "0300", cpt_code: "92551", description: "Newborn Hearing Screen", quantity: 1, unit_charge: 287, total_charge: 287, department: "Audiology" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 18, revenue_code: "0250", cpt_code: "J0690", description: "Cefazolin Sodium 500mg", quantity: 2, unit_charge: 234, total_charge: 468, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 19, revenue_code: "0250", cpt_code: "J2405", description: "Ondansetron (Zofran) 4mg", quantity: 3, unit_charge: 87, total_charge: 261, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 20, revenue_code: "0250", cpt_code: "J7040", description: "Normal Saline 1000ml", quantity: 3, unit_charge: 287, total_charge: 861, department: "Pharmacy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 21, revenue_code: "0260", cpt_code: "96374", description: "IV Push, Single Drug", quantity: 2, unit_charge: 734, total_charge: 1468, department: "IV Therapy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 22, revenue_code: "0260", cpt_code: "96360", description: "IV Infusion, Initial (up to 1hr)", quantity: 1, unit_charge: 987, total_charge: 987, department: "IV Therapy" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 23, revenue_code: "0770", cpt_code: "90471", description: "Immunization Admin, 1st Component", quantity: 1, unit_charge: 178, total_charge: 178, department: "Immunizations" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 24, revenue_code: "0770", cpt_code: "90744", description: "Hepatitis B Vaccine, Peds", quantity: 1, unit_charge: 342, total_charge: 342, department: "Immunizations" } } },
  { delay_ms: 100, event: { type: "parse_item", item: { id: 25, revenue_code: "0942", cpt_code: "S9473", description: "Lactation Consultant Visit", quantity: 1, unit_charge: 423, total_charge: 423, department: "Other Services" } } },
  { delay_ms: 200, event: {
    type: "parse_complete",
    bill: {
      hospital: { name: "St. Mary's Medical Center", nonprofit_status: "nonprofit", address: "450 Clarkson Avenue, Brooklyn, NY 11203" },
      patient: { account_number: "SMC-2025-011287", date_of_service: "03/08/2025 - 03/10/2025" },
      line_items: [
        { id: 1, revenue_code: "0720", cpt_code: "59510", description: "Total OB Care — C-Section Delivery", quantity: 1, unit_charge: 14200, total_charge: 14200, department: "Obstetrics" },
        { id: 2, revenue_code: "0120", cpt_code: null, description: "Semi-Private Room (per diem)", quantity: 3, unit_charge: 2800, total_charge: 8400, department: "Room & Board" },
        { id: 3, revenue_code: "0170", cpt_code: null, description: "Nursery Room (per diem)", quantity: 2, unit_charge: 1400, total_charge: 2800, department: "Nursery" },
        { id: 4, revenue_code: "0360", cpt_code: null, description: "Operating Room Services", quantity: 1, unit_charge: 6500, total_charge: 6500, department: "Surgery" },
        { id: 5, revenue_code: "0370", cpt_code: "01967", description: "Neuraxial Labor Analgesia/Delivery", quantity: 1, unit_charge: 4200, total_charge: 4200, department: "Anesthesia" },
        { id: 6, revenue_code: "0170", cpt_code: "99460", description: "Initial Newborn Care, per day", quantity: 1, unit_charge: 1420, total_charge: 1420, department: "Neonatal" },
        { id: 7, revenue_code: "0170", cpt_code: "99462", description: "Subsequent Newborn Care, per day", quantity: 1, unit_charge: 850, total_charge: 850, department: "Neonatal" },
        { id: 8, revenue_code: "0300", cpt_code: "80053", description: "Comprehensive Metabolic Panel", quantity: 1, unit_charge: 725, total_charge: 725, department: "Laboratory" },
        { id: 9, revenue_code: "0300", cpt_code: "85025", description: "CBC w/ Automated Differential", quantity: 1, unit_charge: 463, total_charge: 463, department: "Laboratory" },
        { id: 10, revenue_code: "0300", cpt_code: "84132", description: "Potassium, Serum", quantity: 1, unit_charge: 195, total_charge: 195, department: "Laboratory" },
        { id: 11, revenue_code: "0300", cpt_code: "84295", description: "Sodium, Serum", quantity: 1, unit_charge: 185, total_charge: 185, department: "Laboratory" },
        { id: 12, revenue_code: "0300", cpt_code: "82435", description: "Chloride, Serum", quantity: 1, unit_charge: 175, total_charge: 175, department: "Laboratory" },
        { id: 13, revenue_code: "0300", cpt_code: "82247", description: "Bilirubin, Total — Newborn", quantity: 2, unit_charge: 198, total_charge: 396, department: "Laboratory" },
        { id: 14, revenue_code: "0300", cpt_code: "82947", description: "Glucose, Quantitative", quantity: 2, unit_charge: 156, total_charge: 312, department: "Laboratory" },
        { id: 15, revenue_code: "0320", cpt_code: "76805", description: "OB Ultrasound, Complete", quantity: 1, unit_charge: 2156, total_charge: 2156, department: "Radiology" },
        { id: 16, revenue_code: "0300", cpt_code: "92551", description: "Newborn Hearing Screen", quantity: 1, unit_charge: 287, total_charge: 287, department: "Audiology" },
        { id: 17, revenue_code: "0300", cpt_code: "92551", description: "Newborn Hearing Screen", quantity: 1, unit_charge: 287, total_charge: 287, department: "Audiology" },
        { id: 18, revenue_code: "0250", cpt_code: "J0690", description: "Cefazolin Sodium 500mg", quantity: 2, unit_charge: 234, total_charge: 468, department: "Pharmacy" },
        { id: 19, revenue_code: "0250", cpt_code: "J2405", description: "Ondansetron (Zofran) 4mg", quantity: 3, unit_charge: 87, total_charge: 261, department: "Pharmacy" },
        { id: 20, revenue_code: "0250", cpt_code: "J7040", description: "Normal Saline 1000ml", quantity: 3, unit_charge: 287, total_charge: 861, department: "Pharmacy" },
        { id: 21, revenue_code: "0260", cpt_code: "96374", description: "IV Push, Single Drug", quantity: 2, unit_charge: 734, total_charge: 1468, department: "IV Therapy" },
        { id: 22, revenue_code: "0260", cpt_code: "96360", description: "IV Infusion, Initial (up to 1hr)", quantity: 1, unit_charge: 987, total_charge: 987, department: "IV Therapy" },
        { id: 23, revenue_code: "0770", cpt_code: "90471", description: "Immunization Admin, 1st Component", quantity: 1, unit_charge: 178, total_charge: 178, department: "Immunizations" },
        { id: 24, revenue_code: "0770", cpt_code: "90744", description: "Hepatitis B Vaccine, Peds", quantity: 1, unit_charge: 342, total_charge: 342, department: "Immunizations" },
        { id: 25, revenue_code: "0942", cpt_code: "S9473", description: "Lactation Consultant Visit", quantity: 1, unit_charge: 423, total_charge: 423, department: "Other Services" },
      ],
      total_charges: 49293,
      patient_responsibility: 32100,
    },
  } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "parse", summary: { items: 25 } } },

  // ========== STAGE 2: AUDIT (~ 8 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "audit", title: "Auditing for Errors", description: "Checking every charge for billing errors..." } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 1,
    error_type: "upcoding",
    severity: "critical",
    title: "Upcoded Delivery — Vaginal Birth Billed as C-Section",
    description: "Billed as CPT 59510 (Total OB Care including Cesarean delivery) for $14,200, but diagnosis O80 indicates an uncomplicated vaginal delivery.",
    explanation: "Your medical records show diagnosis code O80 'Encounter for full-term uncomplicated delivery' — this is the standard code for a vaginal birth, not a C-section. CPT 59510 is specifically for cesarean delivery. The correct code for total OB care with vaginal delivery is CPT 59400, which typically costs $1,750-$2,500 less. This is a major upcoding error that inflates your bill by thousands of dollars.",
    estimated_overcharge: 1750,
    evidence: "Line #1 bills CPT 59510 (Cesarean delivery) at $14,200, but the diagnosis code is O80 (uncomplicated vaginal delivery). CPT 59510 is exclusively for C-sections. Newborn diagnosis Z38.00 indicates 'single liveborn infant, born in hospital' via vaginal delivery. The correct code should be CPT 59400 (routine obstetric care including vaginal delivery), typically priced around $12,450.",
    actionable: "Request immediate correction from CPT 59510 to CPT 59400. State: 'Diagnosis code O80 documents an uncomplicated vaginal delivery. CPT 59510 (Cesarean delivery) is incorrectly billed. Please correct to CPT 59400 (vaginal delivery) and adjust the charge accordingly.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 4,
    error_type: "phantom",
    severity: "critical",
    title: "Phantom Operating Room Charge — Delivery in L&D Suite",
    description: "Operating Room services billed at $6,500 (Rev Code 0360), but vaginal deliveries occur in Labor & Delivery suites, not operating rooms.",
    explanation: "You were charged $6,500 for Operating Room services. However, uncomplicated vaginal deliveries (diagnosis O80) take place in Labor & Delivery suites, not operating rooms. ORs are used for C-sections, emergency surgeries, or complicated deliveries requiring surgical intervention. Since your medical records show a routine vaginal birth with no surgical complications, this OR charge is a phantom charge for a facility you never used.",
    estimated_overcharge: 6500,
    evidence: "Revenue Code 0360 (Operating Room Services) billed at $6,500. Primary diagnosis O80 indicates uncomplicated vaginal delivery. No surgical CPT codes present (no C-section code 59510 should actually be there, no forceps delivery 59400 variants). Standard of care: routine vaginal deliveries occur in L&D rooms with revenue code 0720 or 0721, not operating rooms (0360).",
    actionable: "Request removal of the OR charge. State: 'Revenue Code 0360 Operating Room Services of $6,500 should be removed. My delivery was an uncomplicated vaginal birth (O80) performed in a Labor & Delivery suite, not an operating room. No surgical procedure requiring an OR was performed.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 17,
    error_type: "duplicate",
    severity: "critical",
    title: "Duplicate Newborn Hearing Screen",
    description: "CPT 92551 (Newborn Hearing Screen) appears twice on the bill at $287 each, for the same infant on the same dates of service.",
    explanation: "You were billed $287 twice for the same newborn hearing screening (CPT 92551). Newborn hearing screens are performed once per infant per birth admission as part of standard newborn care. Unless a repeat test was medically necessary (which would require modifier 76), billing it twice is a clear duplicate charge. The hospital likely conducted one screening and accidentally billed it twice in their system.",
    estimated_overcharge: 287,
    evidence: "Line items #16 and #17 both show CPT 92551 'Newborn Hearing Screen' at $287 each, same date range 03/08/2025-03/10/2025 for the same newborn. Standard practice is one hearing screen per birth admission. CMS billing guidelines prohibit duplicate charges for the same procedure on the same date without modifier 76 (repeat procedure) or 77 (repeat by another physician).",
    actionable: "Request immediate removal of the duplicate hearing screen charge on line #17. State: 'CPT 92551 was billed twice on the same dates of service for the same infant without a modifier 76 indicating a medically necessary repeat procedure. Please remove the duplicate charge of $287.'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 10,
    error_type: "unbundling",
    severity: "high",
    title: "Unbundled Lab Tests — Individual Electrolytes Billed with CMP",
    description: "Sodium (84295), Potassium (84132), and Chloride (82435) billed separately while Comprehensive Metabolic Panel (80053) already includes these tests.",
    explanation: "The Comprehensive Metabolic Panel (CPT 80053) already includes sodium, potassium, chloride, CO2, glucose, BUN, creatinine, calcium, albumin, total protein, alkaline phosphatase, ALT, AST, and bilirubin. Billing the individual electrolyte tests on top of the CMP is called 'unbundling' — charging separately for components already included in a panel. This adds $555 in unnecessary charges and violates NCCI (National Correct Coding Initiative) edits.",
    estimated_overcharge: 555,
    evidence: "Line #8: CMP (80053) at $725 includes all electrolytes. Lines #10-12: Potassium (84132, $195), Sodium (84295, $185), Chloride (82435, $175) are component tests of the CMP. CCI edits prohibit billing 84132, 84295, and 82435 separately when 80053 is billed on the same date. This is a textbook unbundling violation.",
    actionable: "Request removal of individual electrolyte charges. State: 'CPT codes 84132, 84295, and 82435 are component tests included in the Comprehensive Metabolic Panel (80053) already billed. Per NCCI edits, these cannot be billed separately. Please remove $555 in unbundled lab charges (lines #10, #11, #12).'"
  } } },

  { delay_ms: 1200, event: { type: "audit_finding", finding: {
    line_item_id: 3,
    error_type: "other",
    severity: "high",
    title: "Excessive Nursery Charges — Potential Facility Fee Abuse",
    description: "Nursery room charges of $1,400 per day for 2 days ($2,800 total) appear excessive, especially when billed alongside separate newborn care CPT codes.",
    explanation: "You were charged $1,400 per day for 2 days of 'Nursery Room' (total $2,800), in addition to separate CPT codes for newborn care: 99460 (Initial Newborn Care, $1,420) and 99462 (Subsequent Newborn Care, $850). This creates a potential 'double-dipping' situation where you're paying both a facility fee for the nursery and professional fees for newborn care services. Many hospitals include basic nursery care in the room charge, but some unbundle these to inflate bills. Reasonable nursery per-diem rates typically range from $400-$800, not $1,400.",
    estimated_overcharge: 1200,
    evidence: "Line #3: Nursery Room at $1,400/day × 2 days = $2,800. Lines #6-7: Separate newborn professional care codes (99460 + 99462 = $2,270). Combined nursery facility + professional charges = $5,070 for routine newborn care. Medicare Hospital Outpatient Prospective Payment System (OPPS) data shows average allowed nursery per-diem of $500-$700. $1,400/day represents a 2-3× markup over reasonable rates.",
    actionable: "Request justification for the $1,400/day nursery charge and potential reduction. State: 'The nursery per-diem charge of $1,400 appears excessive compared to regional standards of $500-$800/day. Please provide an itemized breakdown of what services are included in this charge and why it is significantly above market rates. I request an adjustment to a fair market rate.'"
  } } },

  { delay_ms: 400, event: { type: "audit_complete", total_errors: 5, total_overcharges: 10292 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "audit", summary: { errors: 5, overcharges: 10292 } } },

  // ========== STAGE 3: BENCHMARK (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "benchmark", title: "Benchmarking Fair Value", description: "Comparing every charge to Medicare rates and fair market value..." } },

  { delay_ms: 400, event: { type: "benchmark_item", benchmark: { line_item_id: 1, description: "Total OB Care — Delivery (59510)", billed_amount: 14200, medicare_rate: 1856, fair_rate: 3250, cash_rate: 5680, markup_ratio: 7.7, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 2, description: "Semi-Private Room", billed_amount: 8400, medicare_rate: 892, fair_rate: 1562, cash_rate: 3360, markup_ratio: 9.4, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 3, description: "Nursery Room", billed_amount: 2800, medicare_rate: 423, fair_rate: 741, cash_rate: 1120, markup_ratio: 6.6, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 4, description: "Operating Room Services", billed_amount: 6500, medicare_rate: 0, fair_rate: 0, cash_rate: 0, markup_ratio: 0, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 5, description: "Neuraxial Labor Analgesia (01967)", billed_amount: 4200, medicare_rate: 438, fair_rate: 767, cash_rate: 1680, markup_ratio: 9.6, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 15, description: "OB Ultrasound Complete (76805)", billed_amount: 2156, medicare_rate: 189, fair_rate: 331, cash_rate: 862, markup_ratio: 11.4, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 8, description: "Comprehensive Metabolic Panel (80053)", billed_amount: 725, medicare_rate: 15, fair_rate: 26, cash_rate: 290, markup_ratio: 48.3, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 9, description: "CBC w/ Differential (85025)", billed_amount: 463, medicare_rate: 10, fair_rate: 18, cash_rate: 185, markup_ratio: 46.3, status: "extreme" } } },
  { delay_ms: 300, event: { type: "benchmark_item", benchmark: { line_item_id: 21, description: "IV Push Single Drug (96374)", billed_amount: 1468, medicare_rate: 56, fair_rate: 98, cash_rate: 587, markup_ratio: 26.2, status: "extreme" } } },

  { delay_ms: 400, event: { type: "benchmark_complete", summary: { total_billed: 49293, total_fair_value: 10842, total_medicare_value: 6198, potential_savings: 38451, average_markup: 17.3 } } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "benchmark", summary: { total_billed: 49293, total_fair_value: 10842, average_markup: 17.3 } } },

  // ========== STAGE 4: RIGHTS (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "rights", title: "Checking Your Rights", description: "Identifying every law, policy, and program that protects you..." } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "federal_law",
    name: "No Surprises Act — Out-of-Network Anesthesia Protection",
    applies: true,
    impact: "high",
    description: "Under the No Surprises Act, the out-of-network anesthesiologist charge of $4,200 (Dr. James Whitfield) cannot exceed the in-network rate since you did not choose this provider. Anesthesia during a hospital delivery is considered an ancillary service at an in-network facility. The hospital must bill you at the in-network rate, and you can dispute any balance billing.",
    action: "Invoke the No Surprises Act for the out-of-network anesthesia charge. State that as a patient receiving care at an in-network facility (St. Mary's), you did not have the ability to choose your anesthesiologist, and under 42 U.S.C. § 300gg-111, you are protected from surprise billing. Demand that the $4,200 charge be adjusted to the in-network rate.",
    citation: "42 U.S.C. § 300gg-111; Public Law 116-260, Division BB, Title I; 45 CFR § 149.410"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "hospital_policy",
    name: "501(r) Nonprofit Hospital — Mandatory Financial Assistance",
    applies: true,
    impact: "high",
    description: "St. Mary's Medical Center is a 501(c)(3) nonprofit organization. Under IRS Section 501(r), they MUST have a written Financial Assistance Policy (FAP), cannot charge FAP-eligible patients more than the amounts generally billed to insured patients (typically the Medicare rate plus 10-20%), and must wait 240 days before initiating extraordinary collection actions. They are legally required to evaluate you for assistance.",
    action: "Request the hospital's Financial Assistance Policy and application. Apply immediately. The hospital must process your application before pursuing collections. With a household income of $65,000 for a family of 3, you are at approximately 260% of the Federal Poverty Level and likely qualify for significant discounts.",
    citation: "IRC § 501(r)(4)-(6); 26 CFR § 1.501(r)-4"
  } } },

  { delay_ms: 1000, event: { type: "right_found", protection: {
    type: "state_law",
    name: "New York Public Health Law § 2807-k(9-a) — Charity Care Requirements",
    applies: true,
    impact: "high",
    description: "New York law requires hospitals to provide charity care to patients under 300% of the Federal Poverty Level. With a household income of $65,000 for 3 people, you are at approximately 260% FPL. You qualify for a sliding-scale discount, potentially 75-100% off your remaining balance. The hospital must apply their charity care policy and cannot pursue aggressive collections without first screening you for eligibility.",
    action: "Apply for New York charity care under Public Health Law § 2807-k. Provide proof of income (pay stubs, tax return). The hospital must respond within 30 days and apply their charity care discount schedule. Cite this law in your application to ensure they comply.",
    citation: "New York Public Health Law § 2807-k(9-a); 10 NYCRR § 405.31"
  } } },

  { delay_ms: 800, event: { type: "right_found", protection: {
    type: "federal_law",
    name: "Insurance Appeal Rights — Denied Services of $21,200",
    applies: true,
    impact: "high",
    description: "Your Explanation of Benefits shows $21,200 in 'Non-Covered / Denied Services.' You have the right to appeal any insurance denials under ERISA (if employer-sponsored insurance) or the Affordable Care Act. Common denial reasons include 'not medically necessary,' 'bundled with other services,' or 'coding errors.' Many denials are overturned on appeal, especially when medical documentation supports the services rendered.",
    action: "Request a detailed Explanation of Benefits (EOB) showing which specific line items were denied and why. File an internal appeal with Empire BCBS within 180 days of the denial. Provide medical records from Dr. Rivera documenting medical necessity for all billed services. If internal appeal fails, request an external review by an independent reviewer.",
    citation: "29 U.S.C. § 1133 (ERISA); 42 U.S.C. § 300gg-19 (ACA); 45 CFR § 147.136"
  } } },

  { delay_ms: 400, event: { type: "charity_care_result", result: {
    hospital_is_nonprofit: true,
    likely_eligible: true,
    fpl_percentage: 260,
    estimated_discount: "50-75% (sliding scale based on income)",
    how_to_apply: "1. Call St. Mary's Medical Center billing at (718) 555-0347 and request a Financial Assistance Application. 2. Complete the application with proof of income (recent pay stubs, W-2, or tax return). 3. Submit within 240 days of the first bill. 4. The hospital must respond and cannot send to collections while your application is pending."
  } } },

  { delay_ms: 300, event: { type: "rights_complete", total_protections: 4 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "rights", summary: { protections: 4 } } },

  // ========== STAGE 5: STRATEGY (~ 6 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "strategy", title: "Building Your Strategy", description: "Creating your step-by-step negotiation playbook..." } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 1,
    action: "Dispute billing errors — demand removal of $10,292 in overcharges",
    category: "error_dispute",
    description: "Send a certified letter disputing the 5 billing errors found: upcoded delivery from C-section to vaginal ($1,750), phantom OR charge ($6,500), duplicate hearing screen ($287), unbundled labs ($555), and excessive nursery charges ($1,200). These are objective errors that the hospital should correct regardless of any other negotiation.",
    talking_points: [
      "I have identified 5 billing errors totaling $10,292 in overcharges.",
      "CPT 59510 (C-section) was billed, but diagnosis O80 documents a vaginal delivery. The correct code is CPT 59400.",
      "Operating Room charges of $6,500 should be removed — my vaginal delivery occurred in a Labor & Delivery suite, not an OR.",
      "CPT 92551 (newborn hearing screen) appears twice — please remove the duplicate.",
      "Individual electrolyte tests cannot be billed alongside a Comprehensive Metabolic Panel per NCCI edits.",
      "The nursery per-diem charge of $1,400 is 2-3× the regional average of $500-$800. Please justify or reduce to fair market rate."
    ],
    expected_savings: 10292,
    confidence: "high",
    timeline: "Do this FIRST — send within 7 days"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 2,
    action: "Appeal insurance denials for $21,200 in denied services",
    category: "legal_protection",
    description: "Your EOB shows $21,200 in 'Non-Covered / Denied Services.' This is a huge red flag — insurance shouldn't deny most charges for a standard childbirth. Common denial reasons include upcoding (which we already identified), bundling issues, or administrative errors. File an internal appeal with Empire BCBS to challenge these denials.",
    talking_points: [
      "I request a detailed Explanation of Benefits showing which line items were denied and the specific denial reason codes.",
      "I am filing an internal appeal for all denied services totaling $21,200.",
      "The billing errors I identified (wrong CPT codes, unbundled labs, phantom OR charge) may have triggered improper denials. Once corrected, many of these services should be covered.",
      "Please provide the medical necessity criteria your plan uses for denying these obstetric and newborn care services."
    ],
    expected_savings: 15000,
    confidence: "medium",
    timeline: "File appeal within 14 days of receiving corrected bill from hospital"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 3,
    action: "Invoke No Surprises Act for out-of-network anesthesia ($4,200)",
    category: "legal_protection",
    description: "The No Surprises Act protects you from balance billing by out-of-network providers at in-network facilities. Since St. Mary's is in-network with Empire BCBS, and you did not choose your anesthesiologist (Dr. Whitfield, Regional Anesthesia Associates), you cannot be charged more than the in-network rate for anesthesia services.",
    talking_points: [
      "Under 42 U.S.C. § 300gg-111 (No Surprises Act), I am protected from balance billing for out-of-network ancillary services at in-network facilities.",
      "I did not have the ability to choose my anesthesiologist during my delivery at St. Mary's Medical Center.",
      "The out-of-network anesthesia charge of $4,200 must be adjusted to the in-network rate. Please provide the in-network allowed amount for CPT 01967.",
      "I am disputing this charge under the No Surprises Act and requesting initiation of the Independent Dispute Resolution (IDR) process if the provider refuses to adjust."
    ],
    expected_savings: 3200,
    confidence: "high",
    timeline: "Send No Surprises Act dispute letter within 30 days of receiving the bill"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 4,
    action: "Apply for charity care / financial assistance",
    category: "charity_care",
    description: "As a 501(c)(3) nonprofit, St. Mary's is legally required to have a Financial Assistance Policy under IRS 501(r). At approximately 260% FPL (household income $65,000 for 3 people), you likely qualify for a 50-75% discount on your remaining balance after insurance. Many New York nonprofit hospitals provide full or nearly-full charity care up to 300% FPL.",
    talking_points: [
      "I am requesting your Financial Assistance Policy and application as required under IRC § 501(r).",
      "My household income of $65,000 for 3 people places me at approximately 260% of the Federal Poverty Level.",
      "Under New York Public Health Law § 2807-k(9-a), I am entitled to charity care based on my income.",
      "Please do not initiate any collection activity while my application is pending, as required by the 240-day waiting period under 501(r)."
    ],
    expected_savings: 20000,
    confidence: "high",
    timeline: "Submit within 14 days of receiving the error dispute response"
  } } },

  { delay_ms: 800, event: { type: "strategy_step", step: {
    order: 5,
    action: "Negotiate cash-pay discount or payment plan on any remaining balance",
    category: "negotiation",
    description: "If any balance remains after error corrections, insurance appeals, No Surprises Act protections, and charity care, negotiate a cash-pay settlement or interest-free payment plan. Hospitals routinely accept 30-50% of remaining balances from patients who have exhausted other avenues. Nonprofit hospitals are generally prohibited from charging interest under 501(r).",
    talking_points: [
      "After all corrections, appeals, and financial assistance, I request a final cash-pay settlement for any remaining balance.",
      "Based on fair market value benchmarking, the total fair commercial rate for my services is approximately $10,842. My remaining balance should not exceed this amount.",
      "I am prepared to pay $_____ as a lump-sum settlement today if we can agree on a fair amount.",
      "If a lump-sum payment is not feasible, I request a 0% interest payment plan of $_____/month. Under 501(r), the hospital cannot charge interest while a FAP application is pending or for FAP-eligible patients."
    ],
    expected_savings: null,
    confidence: "medium",
    timeline: "After steps 1-4 are resolved"
  } } },

  { delay_ms: 500, event: { type: "strategy_complete",
    best_case: { final_amount: 0, total_savings: 32100, savings_percentage: 100 },
    realistic: { final_amount: 3500, total_savings: 28600, savings_percentage: 89 }
  } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "strategy", summary: {} } },

  // ========== STAGE 6: LETTERS (~ 8 seconds) ==========
  { delay_ms: 800, event: { type: "stage_start", stage: "letters", title: "Drafting Your Letters", description: "Generating ready-to-send dispute and negotiation letters..." } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "dispute", title: "Itemized Bill Request & Error Dispute Letter" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Date: [TODAY'S DATE]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "St. Mary's Medical Center\nBilling Department / Patient Financial Services\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "450 Clarkson Avenue\nBrooklyn, NY 11203\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Re: Account #SMC-2025-011287 — Billing Dispute\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Date of Service: March 8-10, 2025\nAmount Billed: $49,293.00\nPatient Responsibility: $32,100.00\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Dear Billing Department:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I am writing to formally dispute the charges on the above-referenced account. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I have conducted a thorough review of the itemized statement and identified " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "five (5) billing errors totaling $10,292 in overcharges.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "BILLING ERRORS IDENTIFIED:\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "1. UPCODED DELIVERY — $1,750 (minimum)\nCPT 59510 (Cesarean delivery) was " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "billed at $14,200, but diagnosis code O80 documents an uncomplicated vaginal " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "delivery. The correct code is CPT 59400 (vaginal delivery). Please correct " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "this coding error and adjust the charge to the appropriate rate for vaginal delivery.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "2. PHANTOM OPERATING ROOM CHARGE — $6,500\nRevenue Code 0360 (Operating " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Room Services) was billed, but my uncomplicated vaginal delivery occurred " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "in a Labor & Delivery suite, not an operating room. No surgical procedure " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "requiring an OR was performed. This charge must be removed.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "3. DUPLICATE NEWBORN HEARING SCREEN — $287\nCPT 92551 appears twice " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "(lines #16 and #17) without modifier 76 indicating a medically necessary " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "repeat procedure. Please remove the duplicate charge.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "4. UNBUNDLED LABORATORY TESTS — $555\nIndividual electrolytes (CPT " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "84132, 84295, 82435) were billed alongside Comprehensive Metabolic Panel " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "(CPT 80053) which already includes these tests. This violates NCCI edits. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Please remove lines #10, #11, and #12.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "5. EXCESSIVE NURSERY CHARGES — $1,200 (requested adjustment)\nNursery " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "room charges of $1,400 per day are 2-3 times the regional average of " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "$500-$800 per day. Please provide an itemized breakdown justifying this " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "charge or adjust to fair market rate (estimated $600/day reduction = $1,200).\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "I request a corrected bill within 30 days. Please do not initiate " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "collection activity while this dispute is pending, consistent with " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "your obligations under IRC § 501(r) and New York Public Health Law § 2807-k.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: New York State " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "dispute", chunk: "Department of Health\ncc: Hospital Patient Advocate" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "dispute",
    title: "Itemized Bill Request & Error Dispute Letter",
    recipient: "St. Mary's Medical Center — Billing Department",
    purpose: "Dispute 5 billing errors totaling $10,292 in overcharges",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nSt. Mary's Medical Center\nBilling Department / Patient Financial Services\n450 Clarkson Avenue\nBrooklyn, NY 11203\n\nRe: Account #SMC-2025-011287 — Billing Dispute\nDate of Service: March 8-10, 2025\nAmount Billed: $49,293.00\nPatient Responsibility: $32,100.00\n\nDear Billing Department:\n\nI am writing to formally dispute the charges on the above-referenced account. I have conducted a thorough review of the itemized statement and identified five (5) billing errors totaling $10,292 in overcharges.\n\nBILLING ERRORS IDENTIFIED:\n\n1. UPCODED DELIVERY — $1,750 (minimum)\nCPT 59510 (Cesarean delivery) was billed at $14,200, but diagnosis code O80 documents an uncomplicated vaginal delivery. The correct code is CPT 59400 (vaginal delivery). Please correct this coding error and adjust the charge to the appropriate rate for vaginal delivery.\n\n2. PHANTOM OPERATING ROOM CHARGE — $6,500\nRevenue Code 0360 (Operating Room Services) was billed, but my uncomplicated vaginal delivery occurred in a Labor & Delivery suite, not an operating room. No surgical procedure requiring an OR was performed. This charge must be removed.\n\n3. DUPLICATE NEWBORN HEARING SCREEN — $287\nCPT 92551 appears twice (lines #16 and #17) without modifier 76 indicating a medically necessary repeat procedure. Please remove the duplicate charge.\n\n4. UNBUNDLED LABORATORY TESTS — $555\nIndividual electrolytes (CPT 84132, 84295, 82435) were billed alongside Comprehensive Metabolic Panel (CPT 80053) which already includes these tests. This violates NCCI edits. Please remove lines #10, #11, and #12.\n\n5. EXCESSIVE NURSERY CHARGES — $1,200 (requested adjustment)\nNursery room charges of $1,400 per day are 2-3 times the regional average of $500-$800 per day. Please provide an itemized breakdown justifying this charge or adjust to fair market rate (estimated $600/day reduction = $1,200).\n\nI request a corrected bill within 30 days. Please do not initiate collection activity while this dispute is pending, consistent with your obligations under IRC § 501(r) and New York Public Health Law § 2807-k.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: New York State Department of Health\ncc: Hospital Patient Advocate",
    key_citations: ["IRC § 501(r)(4)-(6)", "New York Public Health Law § 2807-k", "NCCI Correct Coding Initiative"]
  } } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "no_surprises", title: "No Surprises Act — Out-of-Network Anesthesia Dispute" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Date: [TODAY'S DATE]\n\nRegional Anesthesia Associates\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Attn: Dr. James Whitfield, MD\nBilling Department\n[PROVIDER ADDRESS]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Re: No Surprises Act Dispute — Balance Billing for Out-of-Network Anesthesia\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Account: SMC-2025-011287\nDate of Service: March 8, 2025\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Amount Billed: $4,200.00\nCPT Code: 01967 (Neuraxial Labor Analgesia)\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Dear Billing Department:\n\nI am writing to dispute the balance bill of $4,200 " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "for anesthesia services provided by Dr. James Whitfield on March 8, 2025, " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "at St. Mary's Medical Center in Brooklyn, NY.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Under the No Surprises Act (42 U.S.C. § 300gg-111), I am protected from " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "balance billing for out-of-network services provided at an in-network facility. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "St. Mary's Medical Center is in-network with my insurance plan (Empire BCBS). " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "I did not have the ability to choose my anesthesiologist during my delivery.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Per 45 CFR § 149.410, I cannot be charged more than the in-network " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "cost-sharing amount for ancillary services (including anesthesia) at an " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "in-network facility. The out-of-network charge of $4,200 must be adjusted " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "to the in-network rate.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "I am requesting:\n1. Immediate adjustment of this charge to the in-network rate.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "2. A corrected bill reflecting the proper cost-sharing amount.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "3. Removal of this balance from any collection activity.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "If you believe you have grounds to dispute this under the Independent " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Dispute Resolution (IDR) process, please initiate that process with my " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "insurer. However, I should not be billed for any amount beyond my in-network " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "cost-sharing while the IDR is pending.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: Empire BlueCross BlueShield\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "no_surprises", chunk: "cc: U.S. Department of Health & Human Services, No Surprises Help Desk" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "no_surprises",
    title: "No Surprises Act — Out-of-Network Anesthesia Dispute",
    recipient: "Regional Anesthesia Associates — Dr. James Whitfield",
    purpose: "Dispute $4,200 out-of-network anesthesia balance bill under the No Surprises Act",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nRegional Anesthesia Associates\nAttn: Dr. James Whitfield, MD\nBilling Department\n[PROVIDER ADDRESS]\n\nRe: No Surprises Act Dispute — Balance Billing for Out-of-Network Anesthesia\nAccount: SMC-2025-011287\nDate of Service: March 8, 2025\nAmount Billed: $4,200.00\nCPT Code: 01967 (Neuraxial Labor Analgesia)\n\nDear Billing Department:\n\nI am writing to dispute the balance bill of $4,200 for anesthesia services provided by Dr. James Whitfield on March 8, 2025, at St. Mary's Medical Center in Brooklyn, NY.\n\nUnder the No Surprises Act (42 U.S.C. § 300gg-111), I am protected from balance billing for out-of-network services provided at an in-network facility. St. Mary's Medical Center is in-network with my insurance plan (Empire BCBS). I did not have the ability to choose my anesthesiologist during my delivery.\n\nPer 45 CFR § 149.410, I cannot be charged more than the in-network cost-sharing amount for ancillary services (including anesthesia) at an in-network facility. The out-of-network charge of $4,200 must be adjusted to the in-network rate.\n\nI am requesting:\n1. Immediate adjustment of this charge to the in-network rate.\n2. A corrected bill reflecting the proper cost-sharing amount.\n3. Removal of this balance from any collection activity.\n\nIf you believe you have grounds to dispute this under the Independent Dispute Resolution (IDR) process, please initiate that process with my insurer. However, I should not be billed for any amount beyond my in-network cost-sharing while the IDR is pending.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]\n\ncc: Empire BlueCross BlueShield\ncc: U.S. Department of Health & Human Services, No Surprises Help Desk",
    key_citations: ["42 U.S.C. § 300gg-111 (No Surprises Act)", "45 CFR § 149.410", "Public Law 116-260, Division BB, Title I"]
  } } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "charity", title: "Financial Assistance Application Cover Letter" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "charity", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Date: [TODAY'S DATE]\n\nSt. Mary's Medical Center\nPatient Financial Services\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "450 Clarkson Avenue\nBrooklyn, NY 11203\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Re: Financial Assistance Application — Account #SMC-2025-011287\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Dear Patient Financial Services:\n\nI am writing to apply for financial " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "assistance under your hospital's Financial Assistance Policy (FAP), as " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "required by IRC § 501(r) for tax-exempt nonprofit hospitals.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "My annual household income is approximately $65,000 for a household of 3, " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "which places me at approximately 260% of the Federal Poverty Level. " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Under New York Public Health Law § 2807-k(9-a), I believe I qualify for " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "reduced-cost or free care based on this income level.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Enclosed: Recent pay stubs, most recent tax return, and completed " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Financial Assistance Application.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Please note that under 26 CFR § 1.501(r)-6, your hospital may not " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "initiate extraordinary collection actions while this application is " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "pending, and must wait at least 240 days from the first post-discharge " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "billing statement before pursuing collections.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "I request prompt review of my application and notification of the " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "discount or assistance I am eligible to receive.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "charity", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "charity",
    title: "Financial Assistance Application Cover Letter",
    recipient: "St. Mary's Medical Center — Patient Financial Services",
    purpose: "Apply for charity care / financial assistance as a patient at 260% FPL at a nonprofit hospital",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nSt. Mary's Medical Center\nPatient Financial Services\n450 Clarkson Avenue\nBrooklyn, NY 11203\n\nRe: Financial Assistance Application — Account #SMC-2025-011287\n\nDear Patient Financial Services:\n\nI am writing to apply for financial assistance under your hospital's Financial Assistance Policy (FAP), as required by IRC § 501(r) for tax-exempt nonprofit hospitals.\n\nMy annual household income is approximately $65,000 for a household of 3, which places me at approximately 260% of the Federal Poverty Level. Under New York Public Health Law § 2807-k(9-a), I believe I qualify for reduced-cost or free care based on this income level.\n\nEnclosed: Recent pay stubs, most recent tax return, and completed Financial Assistance Application.\n\nPlease note that under 26 CFR § 1.501(r)-6, your hospital may not initiate extraordinary collection actions while this application is pending, and must wait at least 240 days from the first post-discharge billing statement before pursuing collections.\n\nI request prompt review of my application and notification of the discount or assistance I am eligible to receive.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]",
    key_citations: ["IRC § 501(r)(4)-(6)", "26 CFR § 1.501(r)-6", "New York Public Health Law § 2807-k(9-a)"]
  } } },

  { delay_ms: 600, event: { type: "letter_start", letter_id: "insurance_appeal", title: "Insurance Appeal Letter — Denied Services" } },
  { delay_ms: 100, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Via Certified Mail, Return Receipt Requested\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Date: [TODAY'S DATE]\n\nEmpire BlueCross BlueShield\nAppeals Department\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "[INSURANCE ADDRESS]\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Re: Internal Appeal — Denied Services for Childbirth\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Subscriber Name: [NAME]\nMember ID: [MEMBER ID]\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Claim Number: [CLAIM NUMBER]\nDate of Service: March 8-10, 2025\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Provider: St. Mary's Medical Center, Brooklyn, NY\nAmount Denied: $21,200.00\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Dear Appeals Department:\n\nI am filing a formal internal appeal under " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "29 U.S.C. § 1133 (ERISA) and 42 U.S.C. § 300gg-19 (ACA) regarding the " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "denial of $21,200 in services related to my childbirth at St. Mary's " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Medical Center on March 8-10, 2025.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "I request a detailed Explanation of Benefits (EOB) showing:\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "1. Which specific line items were denied\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "2. The denial reason codes for each line item\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "3. The specific plan policy language that supports each denial\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "I have identified billing errors in the hospital's claim that may have " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "triggered improper denials:\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "- The hospital incorrectly billed CPT 59510 (C-section) when the correct " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "code is CPT 59400 (vaginal delivery) per diagnosis O80.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "- Operating Room charges (Rev Code 0360) were billed in error for a " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "vaginal delivery that occurred in a Labor & Delivery suite.\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "- Individual electrolyte tests were unbundled from the Comprehensive " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Metabolic Panel in violation of NCCI edits.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "I have requested that the hospital correct these billing errors. Once " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "corrected, I request that Empire BCBS re-adjudicate this claim with the " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "proper CPT codes and reverse any denials that were based on incorrect coding.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Additionally, all services rendered during my childbirth were medically " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "necessary as documented by Dr. Angela Rivera, MD. I request full coverage " } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "for all properly coded obstetric and newborn care services.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Enclosed: Medical records, itemized bill, corrected coding documentation.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "I request a written response within 30 days as required by federal law.\n\n" } },
  { delay_ms: 80, event: { type: "letter_chunk", letter_id: "insurance_appeal", chunk: "Sincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]" } },

  { delay_ms: 300, event: { type: "letter_complete", letter: {
    id: "insurance_appeal",
    title: "Insurance Appeal Letter — Denied Services",
    recipient: "Empire BlueCross BlueShield — Appeals Department",
    purpose: "Appeal $21,200 in denied services for childbirth",
    content: "Via Certified Mail, Return Receipt Requested\n\nDate: [TODAY'S DATE]\n\nEmpire BlueCross BlueShield\nAppeals Department\n[INSURANCE ADDRESS]\n\nRe: Internal Appeal — Denied Services for Childbirth\nSubscriber Name: [NAME]\nMember ID: [MEMBER ID]\nClaim Number: [CLAIM NUMBER]\nDate of Service: March 8-10, 2025\nProvider: St. Mary's Medical Center, Brooklyn, NY\nAmount Denied: $21,200.00\n\nDear Appeals Department:\n\nI am filing a formal internal appeal under 29 U.S.C. § 1133 (ERISA) and 42 U.S.C. § 300gg-19 (ACA) regarding the denial of $21,200 in services related to my childbirth at St. Mary's Medical Center on March 8-10, 2025.\n\nI request a detailed Explanation of Benefits (EOB) showing:\n1. Which specific line items were denied\n2. The denial reason codes for each line item\n3. The specific plan policy language that supports each denial\n\nI have identified billing errors in the hospital's claim that may have triggered improper denials:\n- The hospital incorrectly billed CPT 59510 (C-section) when the correct code is CPT 59400 (vaginal delivery) per diagnosis O80.\n- Operating Room charges (Rev Code 0360) were billed in error for a vaginal delivery that occurred in a Labor & Delivery suite.\n- Individual electrolyte tests were unbundled from the Comprehensive Metabolic Panel in violation of NCCI edits.\n\nI have requested that the hospital correct these billing errors. Once corrected, I request that Empire BCBS re-adjudicate this claim with the proper CPT codes and reverse any denials that were based on incorrect coding.\n\nAdditionally, all services rendered during my childbirth were medically necessary as documented by Dr. Angela Rivera, MD. I request full coverage for all properly coded obstetric and newborn care services.\n\nEnclosed: Medical records, itemized bill, corrected coding documentation.\n\nI request a written response within 30 days as required by federal law.\n\nSincerely,\n[PATIENT NAME]\n[ADDRESS]\n[PHONE]",
    key_citations: ["29 U.S.C. § 1133 (ERISA)", "42 U.S.C. § 300gg-19 (ACA)", "45 CFR § 147.136"]
  } } },

  { delay_ms: 300, event: { type: "letters_complete", count: 4 } },
  { delay_ms: 200, event: { type: "stage_complete", stage: "letters", summary: { letters: 4 } } },

  // ========== FINAL SUMMARY ==========
  { delay_ms: 500, event: { type: "audit_complete_all", summary: {
    original_bill: 49293,
    errors_found: 5,
    total_overcharges: 10292,
    fair_value: 10842,
    potential_savings: 38451,
    protections_found: 4,
    letters_generated: 4,
    best_case_outcome: { final_amount: 0, total_savings: 32100, savings_percentage: 100 },
    realistic_outcome: { final_amount: 3500, total_savings: 28600, savings_percentage: 89 },
  } } },
];
