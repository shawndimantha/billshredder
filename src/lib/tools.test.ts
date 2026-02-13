import { AUDIT_TOOLS } from "./tools";

describe("AUDIT_TOOLS", () => {
  const expectedTools = ["parse_bill", "audit_charges", "benchmark_prices", "check_eligibility", "build_strategy", "draft_letters"];

  test("defines exactly 6 tools", () => {
    expect(AUDIT_TOOLS).toHaveLength(6);
  });

  test.each(expectedTools)("includes tool: %s", (toolName) => {
    const tool = AUDIT_TOOLS.find((t) => t.name === toolName);
    expect(tool).toBeDefined();
    expect(tool!.description).toBeTruthy();
    expect(tool!.input_schema).toBeDefined();
    expect(tool!.input_schema.type).toBe("object");
  });

  test("all tools have required fields in their schema", () => {
    for (const tool of AUDIT_TOOLS) {
      expect(tool.input_schema.required).toBeDefined();
      expect(Array.isArray(tool.input_schema.required)).toBe(true);
      expect((tool.input_schema.required as string[]).length).toBeGreaterThan(0);
    }
  });

  test("parse_bill requires hospital, patient, line_items, summary", () => {
    const tool = AUDIT_TOOLS.find((t) => t.name === "parse_bill")!;
    const required = tool.input_schema.required as string[];
    expect(required).toContain("hospital");
    expect(required).toContain("patient");
    expect(required).toContain("line_items");
    expect(required).toContain("summary");
  });

  test("audit_charges requires errors and clean_items", () => {
    const tool = AUDIT_TOOLS.find((t) => t.name === "audit_charges")!;
    const required = tool.input_schema.required as string[];
    expect(required).toContain("errors");
    expect(required).toContain("clean_items");
    expect(required).toContain("total_errors");
  });

  test("draft_letters requires letters and next_steps", () => {
    const tool = AUDIT_TOOLS.find((t) => t.name === "draft_letters")!;
    const required = tool.input_schema.required as string[];
    expect(required).toContain("letters");
    expect(required).toContain("next_steps");
  });

  test("build_strategy requires strategy_steps and outcomes", () => {
    const tool = AUDIT_TOOLS.find((t) => t.name === "build_strategy")!;
    const required = tool.input_schema.required as string[];
    expect(required).toContain("strategy_steps");
    expect(required).toContain("best_case_outcome");
    expect(required).toContain("realistic_outcome");
  });
});
