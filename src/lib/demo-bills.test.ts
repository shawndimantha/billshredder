import { DEMO_BILLS } from "./demo-bills";

describe("DEMO_BILLS", () => {
  const billTypes = ["er", "baby", "collections"] as const;

  test.each(billTypes)("DEMO_BILLS.%s has all required fields", (type) => {
    const bill = DEMO_BILLS[type];
    expect(bill.id).toBe(type);
    expect(bill.title).toBeTruthy();
    expect(bill.subtitle).toBeTruthy();
    expect(bill.bill_text.length).toBeGreaterThan(500);
    expect(bill.bill_type).toBeTruthy();
    expect(bill.state).toBeTruthy();
    expect(bill.hospital_name).toBeTruthy();
    expect(bill.insurance_status).toBeTruthy();
    expect(bill.household_income).toBeGreaterThan(0);
    expect(bill.household_size).toBeGreaterThan(0);
  });

  describe("ER Bill", () => {
    const bill = DEMO_BILLS.er;

    test("has correct metadata", () => {
      expect(bill.state).toBe("California");
      expect(bill.hospital_name).toBe("City General Hospital");
      expect(bill.insurance_status).toBe("uninsured");
      expect(bill.bill_type).toBe("er");
    });

    test("contains 501(c)(3) nonprofit designation", () => {
      expect(bill.bill_text).toContain("501(c)(3)");
      expect(bill.bill_text).toContain("NONPROFIT");
    });

    test("contains intentional duplicate CT scan (74177 appears twice)", () => {
      const matches = bill.bill_text.match(/74177/g);
      expect(matches).not.toBeNull();
      expect(matches!.length).toBe(2);
    });

    test("contains upcoded Level 5 ER visit (99285)", () => {
      expect(bill.bill_text).toContain("99285");
      expect(bill.bill_text).toContain("Level 5");
    });

    test("contains phantom OR charge (Rev 0360)", () => {
      expect(bill.bill_text).toContain("0360");
      expect(bill.bill_text).toContain("Operating Room");
    });

    test("contains unbundled electrolytes alongside BMP", () => {
      expect(bill.bill_text).toContain("80048"); // BMP
      expect(bill.bill_text).toContain("84295"); // Sodium
      expect(bill.bill_text).toContain("84132"); // Potassium
      expect(bill.bill_text).toContain("82435"); // Chloride
    });

    test("contains high facility fee", () => {
      expect(bill.bill_text).toContain("$8,200.00");
      expect(bill.bill_text).toContain("Facility Fee");
    });

    test("total is $47,283", () => {
      expect(bill.bill_text).toContain("$47,283.00");
    });

    test("contains diagnosis code for arm fracture", () => {
      expect(bill.bill_text).toContain("S52.501A");
    });
  });

  describe("Baby Bill", () => {
    const bill = DEMO_BILLS.baby;

    test("has correct metadata", () => {
      expect(bill.state).toBe("New York");
      expect(bill.hospital_name).toBe("St. Mary's Medical Center");
      expect(bill.insurance_status).toBe("insured");
    });

    test("contains out-of-network anesthesia charge", () => {
      expect(bill.bill_text).toContain("Out-of-Network");
      expect(bill.bill_text).toContain("01967");
      expect(bill.bill_text).toContain("$4,200.00");
    });

    test("contains unbundled lab panel components alongside obstetric panel", () => {
      expect(bill.bill_text).toContain("80055"); // Obstetric panel
      expect(bill.bill_text).toContain("85025"); // CBC
      expect(bill.bill_text).toContain("86900"); // Blood typing
      expect(bill.bill_text).toContain("86762"); // Rubella
    });

    test("contains Ondansetron charges (phantom — was cancelled)", () => {
      expect(bill.bill_text).toContain("J2405");
      expect(bill.bill_text).toContain("Ondansetron");
    });

    test("billed for 3 nights room but only 2-night stay", () => {
      // Admit 03/08, Discharge 03/10 = 2 nights, but billed for 3
      expect(bill.bill_text).toMatch(/Semi-Private Room.*3/);
      expect(bill.bill_text).toContain("03/10/2025");
    });

    test("total patient responsibility is $32,100", () => {
      expect(bill.bill_text).toContain("$32,100.00");
    });
  });

  describe("Collections Bill", () => {
    const bill = DEMO_BILLS.collections;

    test("has correct metadata", () => {
      expect(bill.state).toBe("California");
      expect(bill.hospital_name).toBe("Pacific Urgent Care");
      expect(bill.insurance_status).toBe("uninsured");
      expect(bill.bill_type).toBe("urgent_care");
    });

    test("contains FDCPA required language", () => {
      expect(bill.bill_text).toContain("THIS IS AN ATTEMPT TO COLLECT A DEBT");
      expect(bill.bill_text).toContain("15 U.S.C. § 1692g");
      expect(bill.bill_text).toContain("thirty (30) days");
    });

    test("contains facility fee abuse (Rev 0510 at urgent care)", () => {
      expect(bill.bill_text).toContain("0510");
      expect(bill.bill_text).toContain("Outpatient Hospital Facility Fee");
      expect(bill.bill_text).toContain("$1,800.00");
    });

    test("contains upcoded Level 5 visit (99215)", () => {
      expect(bill.bill_text).toContain("99215");
      expect(bill.bill_text).toContain("Level 5");
    });

    test("contains inflated chest X-ray at $950", () => {
      expect(bill.bill_text).toContain("71046");
      expect(bill.bill_text).toContain("$950.00");
    });

    test("contains collection fees and interest", () => {
      expect(bill.bill_text).toContain("Collection Agency Fee");
      expect(bill.bill_text).toContain("Interest Accrued");
    });

    test("total in collections is $8,500", () => {
      expect(bill.bill_text).toContain("$8,500.00");
    });

    test("original charges subtotal is $7,150", () => {
      expect(bill.bill_text).toContain("$7,150.00");
    });
  });
});
