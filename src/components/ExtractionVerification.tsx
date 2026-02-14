"use client";

import { motion } from "framer-motion";
import { Check, Edit3, AlertTriangle } from "lucide-react";

interface ExtractionVerificationProps {
  extraction: {
    hospital_name: string;
    date_of_service: string;
    total_charges: number;
    line_items: Array<{ description: string; total_charge: number; cpt_code: string | null }>;
    confidence: "high" | "medium" | "low";
  };
  onConfirm: () => void;
  onEdit: () => void;
}

const confidenceColors = {
  high: "#22C55E",
  medium: "#F59E0B",
  low: "#EF4444",
};

export default function ExtractionVerification({ extraction, onConfirm, onEdit }: ExtractionVerificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl"
    >
      <div className="rounded-xl p-6" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
            Extracted Bill Data
          </h3>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${confidenceColors[extraction.confidence]}20`, color: confidenceColors[extraction.confidence] }}
          >
            {extraction.confidence} confidence
          </span>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg p-3" style={{ background: "#1E1E24" }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#8B8B9A" }}>Hospital</p>
            <p className="text-sm font-medium" style={{ color: "#EDEDF0" }}>{extraction.hospital_name}</p>
          </div>
          <div className="rounded-lg p-3" style={{ background: "#1E1E24" }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#8B8B9A" }}>Total</p>
            <p className="text-sm font-medium" style={{ color: "#EF4444" }}>
              ${extraction.total_charges.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Line items preview */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "#8B8B9A" }}>
            {extraction.line_items.length} line items found
          </p>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {extraction.line_items.slice(0, 8).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1 px-2 rounded" style={{ background: "#1E1E24" }}>
                <span className="truncate flex-1" style={{ color: "#EDEDF0" }}>
                  {item.description}
                  {item.cpt_code && <span style={{ color: "#8B8B9A" }}> ({item.cpt_code})</span>}
                </span>
                <span className="ml-2 font-mono" style={{ color: "#8B8B9A" }}>
                  ${item.total_charge.toLocaleString()}
                </span>
              </div>
            ))}
            {extraction.line_items.length > 8 && (
              <p className="text-[10px] text-center py-1" style={{ color: "#8B8B9A" }}>
                +{extraction.line_items.length - 8} more items
              </p>
            )}
          </div>
        </div>

        {extraction.confidence !== "high" && (
          <div className="flex items-start gap-2 mb-4 p-3 rounded-lg" style={{ background: "#F59E0B10" }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
            <p className="text-xs" style={{ color: "#F59E0B" }}>
              Some items may need verification. Review the extracted data before proceeding.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: "#D4A574", color: "#0C0C0F" }}
          >
            <Check className="w-4 h-4" />
            Looks Good — Analyze
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors"
            style={{ background: "#1E1E24", color: "#8B8B9A", border: "1px solid #2A2A32" }}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </motion.div>
  );
}
