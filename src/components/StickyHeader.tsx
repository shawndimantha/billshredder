"use client";

import { ArrowLeft, Zap } from "lucide-react";
import type { JourneyPhase } from "@/lib/types";

interface StickyHeaderProps {
  journeyPhase: JourneyPhase;
  stageTitle: string;
  demoMode: boolean;
  onReset: () => void;
  onToggleDemo: () => void;
}

const phaseText: Record<JourneyPhase, string> = {
  upload: "",
  call1: "Getting Itemized Bill",
  audit: "Analyzing Bill",
  call2: "Negotiating",
  results: "Complete",
};

export default function StickyHeader({ journeyPhase, stageTitle, demoMode, onReset, onToggleDemo }: StickyHeaderProps) {
  const statusText = journeyPhase === "audit"
    ? stageTitle || phaseText.audit
    : phaseText[journeyPhase] || "";

  const isActive = journeyPhase === "call1" || journeyPhase === "audit" || journeyPhase === "call2";
  const isComplete = journeyPhase === "results";

  return (
    <header className="sticky top-0 z-50 h-14 flex items-center px-4 md:px-6" style={{ background: "#0C0C0F", borderBottom: "1px solid #2A2A32" }}>
      <div className="flex items-center gap-3">
        <button onClick={onReset} className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Back to start">
          <ArrowLeft className="w-4 h-4" style={{ color: "#8B8B9A" }} />
        </button>
        <span className="text-sm font-bold tracking-[0.2em] uppercase hidden md:inline" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
          BillShredder
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center gap-2">
        {isActive && (
          <span className="pulse-dot inline-block w-2 h-2 rounded-full" style={{ background: "#D4A574" }} />
        )}
        {isComplete && (
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
        )}
        <span className="text-sm" style={{ color: "#EDEDF0" }}>{statusText}</span>
      </div>

      <button
        onClick={onToggleDemo}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all duration-200"
        style={{
          background: demoMode ? "rgba(212,165,116,0.15)" : "transparent",
          border: `1px solid ${demoMode ? "#D4A574" : "#2A2A32"}`,
          color: demoMode ? "#D4A574" : "#8B8B9A",
        }}
      >
        <Zap className="w-3 h-3" />
        <span className="hidden md:inline">{demoMode ? "Demo" : "Live"}</span>
      </button>

      {/* Mobile status bar */}
      {isActive && (
        <div className="absolute left-0 right-0 top-14 h-8 flex items-center justify-center gap-2 md:hidden" style={{ background: "#16161A", borderBottom: "1px solid #2A2A32" }}>
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#D4A574" }} />
          <span className="text-xs" style={{ color: "#8B8B9A" }}>{statusText}</span>
        </div>
      )}
    </header>
  );
}
