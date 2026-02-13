"use client";

import type { PriceBenchmark } from "@/lib/types";

interface BenchmarkSectionProps {
  benchmarks: PriceBenchmark[];
}

const statusColor: Record<string, { bg: string; text: string }> = {
  extreme: { bg: "#EF444420", text: "#EF4444" },
  high: { bg: "#F59E0B20", text: "#F59E0B" },
  moderate: { bg: "#3B82F620", text: "#3B82F6" },
  reasonable: { bg: "#22C55E20", text: "#22C55E" },
};

export default function BenchmarkSection({ benchmarks }: BenchmarkSectionProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr style={{ borderBottom: "1px solid #2A2A32" }}>
            <th className="text-left py-2 pr-2 font-medium" style={{ color: "#8B8B9A" }}>Description</th>
            <th className="text-right py-2 px-2 font-medium" style={{ color: "#8B8B9A" }}>Billed</th>
            <th className="text-right py-2 px-2 font-medium" style={{ color: "#8B8B9A" }}>Medicare</th>
            <th className="text-right py-2 px-2 font-medium" style={{ color: "#8B8B9A" }}>Fair Rate</th>
            <th className="text-right py-2 pl-2 font-medium" style={{ color: "#8B8B9A" }}>Markup</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((b, i) => {
            const colors = statusColor[b.status] || statusColor.moderate;
            return (
              <tr key={i} style={{ borderBottom: "1px solid #1E1E24" }}>
                <td className="py-2 pr-2 max-w-[200px] truncate" style={{ color: "#EDEDF0" }}>{b.description}</td>
                <td className="py-2 px-2 text-right" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444" }}>
                  ${b.billed_amount.toLocaleString()}
                </td>
                <td className="py-2 px-2 text-right" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8B8B9A" }}>
                  ${b.medicare_rate.toLocaleString()}
                </td>
                <td className="py-2 px-2 text-right" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>
                  ${b.fair_rate.toLocaleString()}
                </td>
                <td className="py-2 pl-2 text-right">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: colors.bg, color: colors.text }}>
                    {b.markup_ratio}x
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
