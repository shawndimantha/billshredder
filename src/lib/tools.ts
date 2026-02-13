import Anthropic from "@anthropic-ai/sdk";

type Tool = Anthropic.Messages.Tool;

export const AUDIT_TOOLS: Tool[] = [
  {
    name: "parse_bill",
    description: "Extract structured line items from the raw hospital bill text. Parse every charge, code, and summary total.",
    input_schema: {
      type: "object" as const,
      properties: {
        hospital: {
          type: "object",
          properties: {
            name: { type: "string" },
            address: { type: "string" },
            nonprofit_status: { type: "string", enum: ["nonprofit", "for_profit", "unknown"] },
            npi: { type: ["string", "null"] },
          },
          required: ["name", "address", "nonprofit_status"],
        },
        patient: {
          type: "object",
          properties: {
            account_number: { type: ["string", "null"] },
            date_of_service: { type: "string" },
            admit_date: { type: ["string", "null"] },
            discharge_date: { type: ["string", "null"] },
          },
          required: ["date_of_service"],
        },
        line_items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              description: { type: "string" },
              cpt_code: { type: ["string", "null"] },
              hcpcs_code: { type: ["string", "null"] },
              revenue_code: { type: ["string", "null"] },
              icd10_code: { type: ["string", "null"] },
              quantity: { type: "number" },
              unit_charge: { type: "number" },
              total_charge: { type: "number" },
              department: { type: ["string", "null"] },
            },
            required: ["id", "description", "quantity", "total_charge"],
          },
        },
        summary: {
          type: "object",
          properties: {
            total_charges: { type: "number" },
            insurance_adjustments: { type: ["number", "null"] },
            insurance_paid: { type: ["number", "null"] },
            patient_responsibility: { type: "number" },
          },
          required: ["total_charges", "patient_responsibility"],
        },
      },
      required: ["hospital", "patient", "line_items", "summary"],
    },
  },
  {
    name: "audit_charges",
    description: "Check each line item for billing errors: duplicates, upcoding, unbundling, phantom charges, incorrect quantities, facility fee abuse, wrong modifiers.",
    input_schema: {
      type: "object" as const,
      properties: {
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              line_item_id: { type: "number" },
              error_type: { type: "string", enum: ["duplicate", "upcoding", "unbundling", "phantom", "quantity", "facility_fee", "modifier", "other"] },
              severity: { type: "string", enum: ["critical", "high", "medium"] },
              description: { type: "string" },
              explanation: { type: "string" },
              estimated_overcharge: { type: "number" },
              evidence: { type: "string" },
              actionable: { type: "string" },
            },
            required: ["line_item_id", "error_type", "severity", "description", "explanation", "estimated_overcharge", "evidence", "actionable"],
          },
        },
        clean_items: { type: "array", items: { type: "number" } },
        total_errors: { type: "number" },
        total_estimated_overcharges: { type: "number" },
      },
      required: ["errors", "clean_items", "total_errors", "total_estimated_overcharges"],
    },
  },
  {
    name: "benchmark_prices",
    description: "Compare each line item against fair market value using Medicare rates as baseline. Calculate markup ratios and identify extreme pricing.",
    input_schema: {
      type: "object" as const,
      properties: {
        benchmarks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              line_item_id: { type: "number" },
              description: { type: "string" },
              billed_amount: { type: "number" },
              medicare_rate: { type: "number" },
              fair_commercial_rate: { type: "number" },
              estimated_cash_rate: { type: "number" },
              markup_vs_medicare: { type: "number" },
              markup_vs_fair: { type: "number" },
              status: { type: "string", enum: ["extreme", "high", "moderate", "reasonable"] },
              note: { type: ["string", "null"] },
            },
            required: ["line_item_id", "description", "billed_amount", "medicare_rate", "fair_commercial_rate", "markup_vs_medicare", "status"],
          },
        },
        summary: {
          type: "object",
          properties: {
            total_billed: { type: "number" },
            total_fair_value: { type: "number" },
            total_medicare_value: { type: "number" },
            total_potential_savings: { type: "number" },
            average_markup: { type: "number" },
          },
          required: ["total_billed", "total_fair_value", "total_potential_savings", "average_markup"],
        },
      },
      required: ["benchmarks", "summary"],
    },
  },
  {
    name: "check_eligibility",
    description: "Determine patient's legal rights, charity care eligibility, and applicable protections under federal and state law.",
    input_schema: {
      type: "object" as const,
      properties: {
        protections: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["federal_law", "state_law", "hospital_policy", "collections_protection"] },
              name: { type: "string" },
              applies: { type: "boolean" },
              impact: { type: "string", enum: ["high", "medium", "low"] },
              description: { type: "string" },
              action: { type: "string" },
              citation: { type: "string" },
            },
            required: ["type", "name", "applies", "impact", "description", "action", "citation"],
          },
        },
        charity_care: {
          type: "object",
          properties: {
            hospital_is_nonprofit: { type: "boolean" },
            likely_eligible: { type: "boolean" },
            fpl_percentage: { type: ["number", "null"] },
            estimated_discount: { type: ["string", "null"] },
            how_to_apply: { type: "string" },
          },
          required: ["hospital_is_nonprofit", "likely_eligible", "how_to_apply"],
        },
        collections_status: {
          type: "object",
          properties: {
            is_in_collections: { type: "boolean" },
            statute_of_limitations_years: { type: "number" },
            credit_reporting_rules: { type: "string" },
            fdcpa_protections: { type: "array", items: { type: "string" } },
          },
          required: ["is_in_collections"],
        },
      },
      required: ["protections", "charity_care", "collections_status"],
    },
  },
  {
    name: "build_strategy",
    description: "Synthesize all findings into a prioritized, step-by-step negotiation strategy with talking points, expected outcomes, and fallbacks.",
    input_schema: {
      type: "object" as const,
      properties: {
        strategy_steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              order: { type: "number" },
              action: { type: "string" },
              category: { type: "string", enum: ["error_dispute", "charity_care", "legal_protection", "negotiation", "payment_plan", "collections_defense"] },
              description: { type: "string" },
              talking_points: { type: "array", items: { type: "string" } },
              expected_savings: { type: ["number", "null"] },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              leverage: { type: "string" },
              fallback: { type: "string" },
              timeline: { type: "string" },
            },
            required: ["order", "action", "category", "description", "talking_points", "confidence", "leverage", "fallback", "timeline"],
          },
        },
        best_case_outcome: {
          type: "object",
          properties: {
            final_amount: { type: "number" },
            total_savings: { type: "number" },
            savings_percentage: { type: "number" },
          },
          required: ["final_amount", "total_savings", "savings_percentage"],
        },
        realistic_outcome: {
          type: "object",
          properties: {
            final_amount: { type: "number" },
            total_savings: { type: "number" },
            savings_percentage: { type: "number" },
          },
          required: ["final_amount", "total_savings", "savings_percentage"],
        },
      },
      required: ["strategy_steps", "best_case_outcome", "realistic_outcome"],
    },
  },
  {
    name: "draft_letters",
    description: "Generate ready-to-send letters: error dispute letter, financial assistance application cover letter (if eligible), and debt validation letter (if in collections). Self-critique each letter for accuracy.",
    input_schema: {
      type: "object" as const,
      properties: {
        letters: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              recipient: { type: "string" },
              purpose: { type: "string" },
              content: { type: "string" },
              key_citations: { type: "array", items: { type: "string" } },
              review_notes: { type: "string" },
            },
            required: ["id", "title", "recipient", "purpose", "content", "key_citations", "review_notes"],
          },
        },
        next_steps: { type: "array", items: { type: "string" } },
      },
      required: ["letters", "next_steps"],
    },
  },
];
