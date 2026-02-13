export const DEMO_BILLS = {
  er: {
    id: "er" as const,
    title: "Emergency Room — Broken Arm",
    subtitle: "$47,283 • City General Hospital • San Francisco, CA",
    bill_text: `CITY GENERAL HOSPITAL
1200 Market Street, San Francisco, CA 94102
Tax ID: 94-1234567 | NPI: 1234567890
NONPROFIT 501(c)(3) Organization

ITEMIZED STATEMENT

Patient: [REDACTED]
Account #: CGH-2024-88291
Date of Service: 01/15/2025
Admit: 01/15/2025 14:22  Discharge: 01/15/2025 19:47
Attending: Dr. Sarah Chen, MD
Diagnosis: S52.501A — Unspecified fracture of lower end of radius, right arm

================================================================================
Rev Code  CPT/HCPCS  Description                          Qty  Unit Price    Total
================================================================================
0450      99285      Emergency Room Visit - Level 5         1   $6,800.00   $6,800.00
0450                 ER Facility Fee                        1   $8,200.00   $8,200.00
0350      73060      X-Ray Forearm, 2 Views                1   $1,250.00   $1,250.00
0350      74177      CT Abdomen/Pelvis w/ Contrast         1   $4,800.00   $4,800.00
0350      74177      CT Abdomen/Pelvis w/ Contrast         1   $4,800.00   $4,800.00
0360                 Operating Room Services                1   $4,500.00   $4,500.00
0440      29125      Splint Application, Short Arm          1   $1,800.00   $1,800.00
0250                 Pharmacy - General                     1     $890.00     $890.00
0250      J1100      Dexamethasone 1mg injection            2     $185.00     $370.00
0250      J2310      Nalbuphine HCl 10mg injection          1     $245.00     $245.00
0300      85025      CBC w/ Differential                    1     $380.00     $380.00
0300      80048      Basic Metabolic Panel                  1     $620.00     $620.00
0300      84295      Sodium, Serum                          1     $185.00     $185.00
0300      84132      Potassium, Serum                       1     $195.00     $195.00
0300      82435      Chloride, Serum                        1     $175.00     $175.00
-----------------------------------------------------------------------------------
                                          TOTAL CHARGES:          $40,210.00
                                          Supplies & Other:        $7,073.00
                                          TOTAL AMOUNT DUE:       $47,283.00

Insurance: NONE (Self-Pay)
Payment Due: 02/15/2025

Notes: The charges above reflect the hospital chargemaster rates. Financial
assistance applications are available upon request. Accounts not paid within
90 days may be referred to an external collection agency.

For billing questions call: (415) 555-0192`,
    bill_type: "er" as const,
    state: "California",
    hospital_name: "City General Hospital",
    insurance_status: "uninsured" as const,
    household_income: 52000,
    household_size: 1,
  },

  baby: {
    id: "baby" as const,
    title: "Childbirth — Uncomplicated Vaginal Delivery",
    subtitle: "$32,100 • St. Mary's Medical Center • Brooklyn, NY",
    bill_text: `ST. MARY'S MEDICAL CENTER
450 Clarkson Avenue, Brooklyn, NY 11203
Tax ID: 13-5678901 | NPI: 2345678901
NONPROFIT 501(c)(3) Organization

ITEMIZED STATEMENT

Patient: [REDACTED]
Account #: SMC-2025-011287
Date of Service: 03/08/2025 - 03/10/2025
Admit: 03/08/2025 02:15  Discharge: 03/10/2025 14:30
Attending: Dr. Angela Rivera, MD, OB/GYN
Pediatrician: Dr. Samuel Park, MD
Diagnosis (Mother): O80 — Encounter for full-term uncomplicated delivery
Diagnosis (Newborn): Z38.00 — Single liveborn infant, born in hospital

================================================================================
Rev Code  CPT/HCPCS  Description                          Qty  Unit Price    Total
================================================================================

OBSTETRIC SERVICES:
0720      59400      Total OB Care — Vaginal Delivery       1  $12,450.00  $12,450.00

ROOM & BOARD:
0120                 Semi-Private Room (per diem)            3   $2,800.00   $8,400.00
0170                 Nursery Room (per diem)                 2   $1,400.00   $2,800.00

ANESTHESIA (Out-of-Network — see note below):
0370      01967      Neuraxial Labor Analgesia/Delivery      1   $4,200.00   $4,200.00

NEONATAL / NEWBORN CARE:
0170      99460      Initial Newborn Care, per day           1   $1,420.00   $1,420.00
0170      99462      Subsequent Newborn Care, per day        1     $850.00     $850.00

LABORATORY — MOTHER:
0300      80055      Obstetric Panel                         1     $967.00     $967.00
0300      85025      CBC w/ Automated Differential           1     $463.00     $463.00
0300      86900      Blood Typing, ABO                       1     $234.00     $234.00
0300      86762      Rubella Antibody                        1     $198.00     $198.00
0300      86580      TB Skin Test (PPD)                      1     $145.00     $145.00
0300      36415      Venipuncture                            2     $142.00     $284.00

LABORATORY — NEWBORN:
0300      82247      Bilirubin, Total — Newborn              2     $198.00     $396.00
0300      82947      Glucose, Quantitative                   2     $156.00     $312.00
0300      85025      CBC w/ Differential — Newborn           1     $463.00     $463.00

RADIOLOGY:
0320      76805      OB Ultrasound, Complete                 1   $2,156.00   $2,156.00

PHARMACY:
0250      J0690      Cefazolin Sodium 500mg                  2     $234.00     $468.00
0250      J2405      Ondansetron (Zofran) 4mg                3      $87.00     $261.00
0250      J7040      Normal Saline 1000ml                    3     $287.00     $861.00

IV THERAPY:
0260      96374      IV Push, Single Drug                    2     $734.00   $1,468.00
0260      96360      IV Infusion, Initial (up to 1hr)        1     $987.00     $987.00

IMMUNIZATIONS — NEWBORN:
0770      90471      Immunization Admin, 1st Component       1     $178.00     $178.00
0770      90744      Hepatitis B Vaccine, Peds               1     $342.00     $342.00

OTHER SERVICES:
0942      S9473      Lactation Consultant Visit              1     $423.00     $423.00

================================================================================
CHARGES SUMMARY:
================================================================================
  Total Charges:                                              $41,550.00
  Insurance Payments (Empire BCBS):                           ($6,250.00)
  Insurance Contractual Adjustments:                          ($3,200.00)
  -----------------------------------------------------------------------
  PATIENT RESPONSIBILITY:                                    $32,100.00

  Breakdown of Patient Responsibility:
    Deductible (remaining):                                   $2,500.00
    Coinsurance (20% of in-network covered):                  $4,200.00
    Out-of-Network: Anesthesia (see note):                    $4,200.00
    Non-Covered / Denied Services:                           $21,200.00

*** IMPORTANT NOTICE ***
Out-of-Network Provider: Regional Anesthesia Associates
(NPI: 9876543210) — Dr. James Whitfield, MD
Amount Billed: $4,200.00  |  Insurance Allowed: $0.00
Patient Responsibility for OON Anesthesia: $4,200.00

NOTE: Ondansetron (Zofran) 4mg x3 was administered per physician order.

For billing questions call: (718) 555-0347`,
    bill_type: "hospital" as const,
    state: "New York",
    hospital_name: "St. Mary's Medical Center",
    insurance_status: "insured" as const,
    household_income: 65000,
    household_size: 3,
  },

  collections: {
    id: "collections" as const,
    title: "Urgent Care Visit — Now in Collections",
    subtitle: "$8,500 • ABC Collections Agency • Los Angeles, CA",
    bill_text: `ABC COLLECTIONS AGENCY
PO Box 45678, Los Angeles, CA 90001
Phone: (800) 555-0199
Fax: (800) 555-0200

================================================================================
                        NOTICE OF DEBT
================================================================================

*** THIS IS AN ATTEMPT TO COLLECT A DEBT ***
*** ANY INFORMATION OBTAINED WILL BE USED FOR THAT PURPOSE ***

Debtor: JOHNSON, MARK T.
Last Known Address: 3847 Sunset Blvd, Apt 12, Los Angeles, CA 90028

Original Creditor: Pacific Urgent Care
Original Creditor Address: 8901 Wilshire Blvd, Los Angeles, CA 90211
Original Account #: PUC-2024-4412
Date of Service: 08/22/2024
Date Referred to Collections: 11/15/2024
Collection Account #: ABC-2024-881234

Amount Owed: $8,500.00

================================================================================
ORIGINAL ITEMIZED CHARGES FROM PACIFIC URGENT CARE:
================================================================================
Rev Code  CPT/HCPCS  Description                          Qty  Unit Price    Total
================================================================================
0510      99215      Office Visit, Estab, Level 5           1     $845.00     $845.00
0510                 Outpatient Hospital Facility Fee        1   $1,800.00   $1,800.00
0320      71046      Chest X-ray, 2 Views                   1     $950.00     $950.00
0300      80053      Comprehensive Metabolic Panel           1     $520.00     $520.00
0300      85025      CBC w/ Automated Differential           1     $380.00     $380.00
0300      87804      Rapid Influenza Antigen Test            1     $245.00     $245.00
0300      87880      Rapid Strep Test (Group A)              1     $195.00     $195.00
0300      36415      Venipuncture                            1     $142.00     $142.00
0410      94640      Pressurized Nebulizer Treatment         1     $675.00     $675.00
0460      94760      Pulse Oximetry, Single Reading          1     $234.00     $234.00
0260      96374      IV Push, Single Drug                    1     $534.00     $534.00
0250      J7040      Normal Saline 500ml                     1     $287.00     $287.00
0250      J3301      Triamcinolone Acetonide 10mg            1     $198.00     $198.00
0250      J7613      Albuterol, Inhalation Solution          1     $145.00     $145.00
-----------------------------------------------------------------------------------
                              ORIGINAL CHARGES SUBTOTAL:       $7,150.00

COLLECTION CHARGES ADDED:
  Collection Agency Fee (15%):                                 $1,072.50
  Interest Accrued (1.5% per month, 3 months):                   $277.50
  -----------------------------------------------------------------------
  TOTAL AMOUNT IN COLLECTIONS:                                 $8,500.00

================================================================================
PAYMENT INFORMATION:
================================================================================

This account has been referred to ABC Collections Agency for collection.
The original balance of $7,150.00 from Pacific Urgent Care is now past due
with additional fees and interest as outlined above.

PAYMENT OPTIONS:
  Pay in Full: $8,500.00
  Settlement Offer: $6,375.00 (75% — valid until 01/15/2025)

Make payments to: ABC Collections Agency
Mail check or money order to PO Box 45678, Los Angeles, CA 90001
Or call (800) 555-0199 to pay by phone.

NOTICE: This debt may be reported to consumer credit reporting agencies
if it remains unpaid. Failure to pay may result in further collection
activity including legal action.

Under federal law (15 U.S.C. § 1692g), you have thirty (30) days from
receipt of this notice to dispute the validity of this debt or any
portion thereof. If you do not dispute the validity of the debt within
thirty days, the debt will be assumed to be valid.

If you dispute this debt in writing within thirty days, we will obtain
verification of the debt and mail a copy to you.

Insurance: Patient was UNINSURED at time of service.

*** THIS IS AN ATTEMPT TO COLLECT A DEBT ***
*** ANY INFORMATION OBTAINED WILL BE USED FOR THAT PURPOSE ***
================================================================================`,
    bill_type: "urgent_care" as const,
    state: "California",
    hospital_name: "Pacific Urgent Care",
    insurance_status: "uninsured" as const,
    household_income: 38000,
    household_size: 1,
  },
} as const;
