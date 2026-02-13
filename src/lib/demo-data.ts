import { DEMO_BILLS } from "./demo-bills";
import { DemoType } from "./types";

export const demoBills: Record<DemoType, string> = {
  er: DEMO_BILLS.er.bill_text,
  baby: DEMO_BILLS.baby.bill_text,
  collections: DEMO_BILLS.collections.bill_text,
};

export const demoLabels: Record<DemoType, string> = {
  er: "$47K ER Visit",
  baby: "$32K Childbirth",
  collections: "$8.5K in Collections",
};
