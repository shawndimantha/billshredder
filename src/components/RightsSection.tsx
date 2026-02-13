"use client";

import type { LegalProtection, CharityCareResult } from "@/lib/types";

interface RightsSectionProps {
  protections: LegalProtection[];
  charityCare?: CharityCareResult | null;
}

export default function RightsSection({ protections, charityCare }: RightsSectionProps) {
  const applicable = protections.filter(p => p.applies);

  return (
    <div className="space-y-3">
      {applicable.map((p, i) => (
        <div key={i} className="pl-3" style={{ borderLeft: "2px solid #3B82F6" }}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: "#3B82F6" }}>{p.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
              background: p.impact === "high" ? "#22C55E20" : "#3B82F620",
              color: p.impact === "high" ? "#22C55E" : "#3B82F6",
            }}>
              {p.impact.toUpperCase()}
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: "#8B8B9A" }}>{p.description}</p>
          <p className="text-[10px] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#3B82F6" }}>{p.citation}</p>
        </div>
      ))}

      {charityCare?.likely_eligible && (
        <div className="rounded-lg p-3 mt-2" style={{ background: "#22C55E10", border: "1px solid #22C55E30" }}>
          <p className="text-sm font-medium" style={{ color: "#22C55E" }}>Charity Care Eligible</p>
          <p className="text-xs mt-1" style={{ color: "#8B8B9A" }}>
            Estimated discount: {charityCare.estimated_discount || "Up to 100%"}
          </p>
          <p className="text-xs mt-1" style={{ color: "#8B8B9A" }}>{charityCare.how_to_apply}</p>
        </div>
      )}
    </div>
  );
}
