"use client";

import { Check } from "lucide-react";
import type { StageName } from "@/lib/types";

const STAGES: { key: StageName; label: string }[] = [
  { key: "parse", label: "Parse Bill" },
  { key: "audit", label: "Find Errors" },
  { key: "benchmark", label: "Benchmark" },
  { key: "rights", label: "Legal Rights" },
  { key: "strategy", label: "Strategy" },
  { key: "letters", label: "Documents" },
];

const stageIndex = (s: StageName | null) => {
  if (!s) return -1;
  return STAGES.findIndex(st => st.key === s);
};

interface ProgressStepperProps {
  currentStage: StageName | null;
  isComplete: boolean;
}

export default function ProgressStepper({ currentStage, isComplete }: ProgressStepperProps) {
  const activeIdx = isComplete ? STAGES.length : stageIndex(currentStage);

  return (
    <div className="sticky top-14 z-40 px-4 md:px-6 py-3" style={{ background: "#0C0C0F", borderBottom: "1px solid #2A2A32" }}>
      <div className="flex items-center max-w-3xl mx-auto">
        {STAGES.map((stage, i) => {
          const complete = i < activeIdx;
          const active = i === activeIdx && !isComplete;

          return (
            <div key={stage.key} className="flex items-center" style={{ flex: i < STAGES.length - 1 ? 1 : undefined }}>
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${active ? "pulse-dot" : ""}`}
                  style={{
                    background: complete ? "#22C55E" : active ? "#D4A574" : "transparent",
                    border: complete || active ? "none" : "2px solid #2A2A32",
                    color: complete || active ? "#0C0C0F" : "#8B8B9A",
                  }}
                >
                  {complete ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="stepper-labels text-[10px] mt-1 whitespace-nowrap" style={{ color: complete ? "#22C55E" : active ? "#D4A574" : "#8B8B9A" }}>
                  {stage.label}
                </span>
              </div>

              {/* Connector line */}
              {i < STAGES.length - 1 && (
                <div
                  className={`stepper-line mx-1 ${
                    complete ? "stepper-line-complete" : active ? "stepper-line-active" : "stepper-line-upcoming"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
