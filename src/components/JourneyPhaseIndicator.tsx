"use client";

import { Phone, Search, Swords, Check } from "lucide-react";
import type { JourneyPhase } from "@/lib/types";

const PHASES: { key: JourneyPhase; label: string; icon: React.ReactNode }[] = [
  { key: "call1", label: "Get Itemized Bill", icon: <Phone className="w-3.5 h-3.5" /> },
  { key: "audit", label: "Analyze & Build Case", icon: <Search className="w-3.5 h-3.5" /> },
  { key: "call2", label: "Negotiate Your Bill", icon: <Swords className="w-3.5 h-3.5" /> },
];

const phaseIdx = (p: JourneyPhase): number => {
  if (p === "upload") return -1;
  if (p === "results") return PHASES.length;
  return PHASES.findIndex(ph => ph.key === p);
};

interface JourneyPhaseIndicatorProps {
  currentPhase: JourneyPhase;
}

export default function JourneyPhaseIndicator({ currentPhase }: JourneyPhaseIndicatorProps) {
  const activeIdx = phaseIdx(currentPhase);

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 px-4 py-2.5" style={{ background: "#16161A", borderBottom: "1px solid #2A2A32" }}>
      {PHASES.map((phase, i) => {
        const complete = i < activeIdx;
        const active = i === activeIdx;

        return (
          <div key={phase.key} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1.5">
              <span style={{ color: complete ? "#22C55E" : active ? "#D4A574" : "#8B8B9A" }}>
                {complete ? <Check className="w-3.5 h-3.5" /> : phase.icon}
              </span>
              <span
                className="text-xs font-medium hidden sm:inline"
                style={{
                  color: complete ? "#22C55E" : active ? "#EDEDF0" : "#8B8B9A",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {phase.label}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div className="w-6 md:w-10 h-px" style={{ background: complete ? "#22C55E" : "#2A2A32" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
