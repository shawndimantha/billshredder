import Anthropic from "@anthropic-ai/sdk";

type Tool = Anthropic.Messages.Tool;

export const PARSE_BILL_TOOL: Tool = {
  name: "parse_bill",
  description: "Extract structured line items from a hospital bill. Parse every charge with its billing codes, description, quantity, and amount. Also extract hospital info, patient info, and totals.",
  input_schema: {
    type: "object" as const,
    properties: {
      hospital: {
        type: "object",
        description: "Information about the hospital or facility",
        properties: {
          name: { type: "string", description: "Hospital or facility name" },
          nonprofit_status: { type: "string", enum: ["nonprofit", "for_profit", "unknown"], description: "Whether the hospital is a 501(c)(3) nonprofit" },
          address: { type: "string", description: "Hospital address" },
        },
        required: ["name", "nonprofit_status", "address"],
      },
      patient: {
        type: "object",
        description: "Patient account information",
        properties: {
          account_number: { type: "string", description: "Patient account or invoice number" },
          date_of_service: { type: "string", description: "Date of service (or date range)" },
        },
        required: ["account_number", "date_of_service"],
      },
      line_items: {
        type: "array",
        description: "Every individual charge on the bill",
        items: {
          type: "object",
          properties: {
            id: { type: "number", description: "Sequential line item number starting at 1" },
            revenue_code: { type: ["string", "null"], description: "4-digit UB-04 revenue code (e.g., 0450, 0300). Null if not present." },
            cpt_code: { type: ["string", "null"], description: "CPT or HCPCS code (e.g., 99285, J1100). Null if not present." },
            description: { type: "string", description: "Description of the charge as it appears on the bill" },
            quantity: { type: "number", description: "Number of units billed" },
            unit_charge: { type: "number", description: "Price per unit in dollars" },
            total_charge: { type: "number", description: "Total charge for this line item (quantity × unit_charge)" },
            department: { type: ["string", "null"], description: "Department or category (e.g., Emergency, Laboratory, Pharmacy)" },
          },
          required: ["id", "description", "quantity", "unit_charge", "total_charge"],
        },
      },
      total_charges: { type: "number", description: "Sum of all line item charges before adjustments" },
      patient_responsibility: { type: "number", description: "Final amount the patient owes after insurance payments and adjustments" },
    },
    required: ["hospital", "patient", "line_items", "total_charges", "patient_responsibility"],
  },
};

export const AUDIT_CHARGES_TOOL: Tool = {
  name: "audit_charges",
  description: "Audit each line item for billing errors. Check for duplicates, upcoding, unbundling, phantom charges, facility fee abuse, balance billing violations, incorrect quantities, and wrong modifiers. Be thorough and aggressive.",
  input_schema: {
    type: "object" as const,
    properties: {
      errors: {
        type: "array",
        description: "Every billing error found",
        items: {
          type: "object",
          properties: {
            line_item_id: { type: "number", description: "ID of the line item with the error" },
            error_type: { type: "string", enum: ["duplicate", "upcoding", "unbundling", "phantom", "quantity", "facility_fee", "balance_billing", "other"], description: "Category of billing error" },
            severity: { type: "string", enum: ["critical", "high", "medium"], description: "How significant the error is. Critical = clear fraud/violation, High = likely error worth disputing, Medium = questionable but worth mentioning" },
            title: { type: "string", description: "Short, specific title for this error (e.g., 'Duplicate CT Abdomen/Pelvis Scan')" },
            description: { type: "string", description: "Brief description of the error" },
            explanation: { type: "string", description: "Plain language explanation of why this is wrong, written for the patient" },
            estimated_overcharge: { type: "number", description: "Estimated dollar amount of the overcharge" },
            evidence: { type: "string", description: "Specific evidence: cite line item IDs, CPT codes, dates, or billing rules" },
            actionable: { type: "string", description: "Exact words the patient should say to the hospital to dispute this charge" },
          },
          required: ["line_item_id", "error_type", "severity", "title", "description", "explanation", "estimated_overcharge", "evidence", "actionable"],
        },
      },
      clean_items: {
        type: "array",
        description: "IDs of line items that appear correctly billed",
        items: { type: "number" },
      },
      total_errors: { type: "number", description: "Total number of errors found" },
      total_estimated_overcharges: { type: "number", description: "Sum of all estimated overcharges in dollars" },
    },
    required: ["errors", "clean_items", "total_errors", "total_estimated_overcharges"],
  },
};

export const BENCHMARK_PRICES_TOOL: Tool = {
  name: "benchmark_prices",
  description: "Compare each line item against fair market value using Medicare rates as the baseline. For each CPT code, provide the Medicare rate, fair commercial rate (175% of Medicare), estimated cash-pay rate, and markup ratio.",
  input_schema: {
    type: "object" as const,
    properties: {
      benchmarks: {
        type: "array",
        description: "Price benchmarks for each line item",
        items: {
          type: "object",
          properties: {
            line_item_id: { type: "number", description: "ID of the line item being benchmarked" },
            description: { type: "string", description: "Description of the charge" },
            billed_amount: { type: "number", description: "Amount billed on the hospital bill" },
            medicare_rate: { type: "number", description: "Approximate Medicare national average reimbursement rate for this code" },
            fair_rate: { type: "number", description: "Fair commercial rate, approximately 175% of Medicare" },
            cash_rate: { type: "number", description: "Estimated cash-pay rate (what hospital would accept from uninsured paying cash)" },
            markup_ratio: { type: "number", description: "Ratio of billed amount to Medicare rate (e.g., 10.5 means 10.5x Medicare)" },
            status: { type: "string", enum: ["extreme", "high", "moderate", "reasonable"], description: "Markup severity. Extreme = >10x Medicare, High = 5-10x, Moderate = 2-5x, Reasonable = <2x" },
          },
          required: ["line_item_id", "description", "billed_amount", "medicare_rate", "fair_rate", "markup_ratio", "status"],
        },
      },
      summary: {
        type: "object",
        description: "Overall pricing summary",
        properties: {
          total_billed: { type: "number", description: "Total amount billed" },
          total_fair_value: { type: "number", description: "Total fair commercial value (sum of fair_rate for all items)" },
          total_medicare_value: { type: "number", description: "Total Medicare value (sum of medicare_rate for all items)" },
          potential_savings: { type: "number", description: "Difference between billed and fair value" },
          average_markup: { type: "number", description: "Average markup ratio across all items" },
        },
        required: ["total_billed", "total_fair_value", "total_medicare_value", "potential_savings", "average_markup"],
      },
    },
    required: ["benchmarks", "summary"],
  },
};

export const CHECK_ELIGIBILITY_TOOL: Tool = {
  name: "check_eligibility",
  description: "Determine the patient's legal rights, charity care eligibility, and applicable protections under federal and state law. Check No Surprises Act, 501(r) charity care, state-specific laws, FDCPA, and credit reporting rules.",
  input_schema: {
    type: "object" as const,
    properties: {
      protections: {
        type: "array",
        description: "Every applicable legal protection or right",
        items: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["federal_law", "state_law", "hospital_policy", "collections_protection"], description: "Category of protection" },
            name: { type: "string", description: "Name of the law, regulation, or policy" },
            applies: { type: "boolean", description: "Whether this protection applies to the patient's situation" },
            impact: { type: "string", enum: ["high", "medium", "low"], description: "How much this could reduce the bill. High = could eliminate most/all, Medium = significant reduction, Low = helpful but limited" },
            description: { type: "string", description: "Plain language explanation of what this means for the patient" },
            action: { type: "string", description: "What the patient should do to invoke this protection" },
            citation: { type: "string", description: "Specific legal citation (e.g., '42 U.S.C. § 300gg-111')" },
          },
          required: ["type", "name", "applies", "impact", "description", "action", "citation"],
        },
      },
      charity_care: {
        type: "object",
        description: "Charity care / financial assistance eligibility assessment",
        properties: {
          hospital_is_nonprofit: { type: "boolean", description: "Whether the hospital is a 501(c)(3) nonprofit" },
          likely_eligible: { type: "boolean", description: "Whether the patient is likely eligible for financial assistance" },
          fpl_percentage: { type: ["number", "null"], description: "Patient's estimated Federal Poverty Level percentage based on income and household size" },
          estimated_discount: { type: ["string", "null"], description: "Estimated discount level (e.g., '100% (free care)' or '75% discount')" },
          how_to_apply: { type: "string", description: "Steps to apply for financial assistance at this hospital" },
        },
        required: ["hospital_is_nonprofit", "likely_eligible", "how_to_apply"],
      },
    },
    required: ["protections", "charity_care"],
  },
};

export const BUILD_STRATEGY_TOOL: Tool = {
  name: "build_strategy",
  description: "Synthesize all audit findings, benchmarks, and legal protections into a prioritized negotiation strategy with specific talking points, expected outcomes, and fallback plans.",
  input_schema: {
    type: "object" as const,
    properties: {
      strategy_steps: {
        type: "array",
        description: "Ordered list of negotiation steps, highest impact first",
        items: {
          type: "object",
          properties: {
            order: { type: "number", description: "Step number (1 = do first)" },
            action: { type: "string", description: "What to do (e.g., 'Dispute billing errors')" },
            category: { type: "string", enum: ["error_dispute", "charity_care", "legal_protection", "negotiation", "payment_plan", "collections_defense"], description: "Category of action" },
            description: { type: "string", description: "Detailed description of what to do and how" },
            talking_points: { type: "array", items: { type: "string" }, description: "Exact phrases and talking points to use when calling or writing" },
            expected_savings: { type: ["number", "null"], description: "Expected dollar savings from this step" },
            confidence: { type: "string", enum: ["high", "medium", "low"], description: "How likely this step is to succeed" },
            timeline: { type: "string", description: "When to do this (e.g., 'Do this first', 'Within 30 days')" },
          },
          required: ["order", "action", "category", "description", "talking_points", "confidence", "timeline"],
        },
      },
      best_case_outcome: {
        type: "object",
        description: "Best possible outcome if everything goes well",
        properties: {
          final_amount: { type: "number", description: "Lowest possible final bill amount" },
          total_savings: { type: "number", description: "Total savings from original bill" },
          savings_percentage: { type: "number", description: "Percentage reduction from original bill" },
        },
        required: ["final_amount", "total_savings", "savings_percentage"],
      },
      realistic_outcome: {
        type: "object",
        description: "Most likely outcome with reasonable negotiation",
        properties: {
          final_amount: { type: "number", description: "Expected final bill amount" },
          total_savings: { type: "number", description: "Expected total savings" },
          savings_percentage: { type: "number", description: "Expected percentage reduction" },
        },
        required: ["final_amount", "total_savings", "savings_percentage"],
      },
    },
    required: ["strategy_steps", "best_case_outcome", "realistic_outcome"],
  },
};

export const DRAFT_LETTERS_TOOL: Tool = {
  name: "draft_letters",
  description: "Generate ready-to-send dispute and negotiation letters. Always generate an error dispute letter. Generate a financial assistance letter if the hospital is nonprofit or the patient may be income-eligible. Generate a debt validation letter if the bill is in collections. Self-critique each letter after drafting.",
  input_schema: {
    type: "object" as const,
    properties: {
      letters: {
        type: "array",
        description: "The generated letters",
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "Unique letter ID (e.g., 'dispute', 'charity', 'debt_validation')" },
            title: { type: "string", description: "Letter title (e.g., 'Itemized Bill Request & Error Dispute Letter')" },
            recipient: { type: "string", description: "Who the letter is addressed to" },
            purpose: { type: "string", description: "Brief description of the letter's purpose" },
            content: { type: "string", description: "Full letter text, formatted with line breaks. Include date, addresses, salutation, body, closing." },
            key_citations: { type: "array", items: { type: "string" }, description: "Legal citations referenced in the letter" },
          },
          required: ["id", "title", "recipient", "purpose", "content", "key_citations"],
        },
      },
      next_steps: {
        type: "array",
        description: "What the patient should do after sending the letters",
        items: { type: "string" },
      },
    },
    required: ["letters", "next_steps"],
  },
};
