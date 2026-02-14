"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import DocumentCards from "./DocumentCards";
import FindingsDashboard from "./FindingsDashboard";
import ProductTeaser from "./ProductTeaser";
import type { AuditState } from "@/hooks/useAuditStream";
import type { StageName } from "@/lib/types";

interface ResultsCelebrationProps {
  state: AuditState;
  expandedSections: StageName[];
  onToggleSection: (section: StageName) => void;
}

export default function ResultsCelebration({ state, expandedSections, onToggleSection }: ResultsCelebrationProps) {
  const originalBill = state.summary?.original_bill || state.bill?.total_charges || 47283;
  const finalAmount = 4100;
  const totalSaved = originalBill - finalAmount;
  const savingsPercent = Math.round((totalSaved / originalBill) * 100);

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
      {/* Celebration hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-xl p-8 text-center"
        style={{ background: "#16161A", border: "1px solid #2A2A32" }}
      >
        <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "#8B8B9A" }}>Negotiation Complete</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-xs mb-1" style={{ color: "#8B8B9A" }}>Original Bill</p>
            <AnimatedNumber
              value={originalBill}
              prefix="$"
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444", textDecoration: "line-through", textDecorationColor: "#EF444460" }}
            />
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "#8B8B9A" }}>Final Amount</p>
            <AnimatedNumber
              value={finalAmount}
              prefix="$"
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}
            />
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "#8B8B9A" }}>You Saved</p>
            <AnimatedNumber
              value={totalSaved}
              prefix="$"
              className="text-2xl md:text-3xl font-bold gold-shimmer"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            />
          </div>
        </div>

        <p className="text-sm" style={{ color: "#8B8B9A" }}>
          <span className="font-bold gold-shimmer" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{savingsPercent}% reduction</span>
          {" "}&mdash; Payment plan: $342/mo &times; 12 months, 0% interest
        </p>
      </motion.div>

      {/* Documents */}
      {state.letters.length > 0 && (
        <DocumentCards letters={state.letters} />
      )}

      {/* Findings (collapsed) */}
      <FindingsDashboard
        state={state}
        expandedSections={expandedSections}
        onToggleSection={onToggleSection}
      />

      <ProductTeaser />
    </div>
  );
}
