import { demoBills, demoLabels } from "./demo-data";
import { DemoType } from "./types";

describe("demo-data", () => {
  const demoTypes: DemoType[] = ["er", "baby", "collections"];

  test.each(demoTypes)("demoBills[%s] is a non-empty string", (type) => {
    expect(typeof demoBills[type]).toBe("string");
    expect(demoBills[type].length).toBeGreaterThan(100);
  });

  test.each(demoTypes)("demoLabels[%s] is a non-empty string", (type) => {
    expect(typeof demoLabels[type]).toBe("string");
    expect(demoLabels[type].length).toBeGreaterThan(0);
  });

  test("ER bill contains expected CPT codes", () => {
    expect(demoBills.er).toContain("99285");
    expect(demoBills.er).toContain("74177");
    expect(demoBills.er).toContain("$47,283.00");
  });

  test("baby bill contains delivery codes", () => {
    expect(demoBills.baby).toContain("59400");
    expect(demoBills.baby).toContain("$32,100.00");
  });

  test("collections bill contains FDCPA notice", () => {
    expect(demoBills.collections).toContain("ATTEMPT TO COLLECT A DEBT");
    expect(demoBills.collections).toContain("Collection Agency Fee");
  });

  test("all demo labels contain dollar amounts", () => {
    for (const type of demoTypes) {
      expect(demoLabels[type]).toMatch(/\$/);
    }
  });
});
