"use client";

import type { BillingError } from "@/lib/types";

interface ErrorsSectionProps {
  errors: BillingError[];
}

const severityColor: Record<string, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  medium: "#3B82F6",
};

export default function ErrorsSection({ errors }: ErrorsSectionProps) {
  return (
    <div className="space-y-2">
      {errors.map((err, i) => (
        <div
          key={i}
          className="rounded-lg p-3"
          style={{
            background: `${severityColor[err.severity] || "#3B82F6"}08`,
            borderLeft: `3px solid ${severityColor[err.severity] || "#3B82F6"}`,
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium" style={{ color: "#EDEDF0" }}>{err.title}</span>
            <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444" }}>
              -${err.estimated_overcharge.toLocaleString()}
            </span>
          </div>
          <p className="text-xs" style={{ color: "#8B8B9A" }}>{err.description}</p>
        </div>
      ))}
    </div>
  );
}
