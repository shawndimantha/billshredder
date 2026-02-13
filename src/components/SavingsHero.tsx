"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import type { Outcome } from "@/lib/types";

interface SavingsHeroProps {
  originalBill: number;
  fairValue: number;
  bestCase?: Outcome | null;
  realistic?: Outcome | null;
}

export default function SavingsHero({ originalBill, fairValue, bestCase, realistic }: SavingsHeroProps) {
  const savings = originalBill - fairValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl p-6 md:p-8"
      style={{ background: "#16161A", border: "1px solid #2A2A32" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* YOUR BILL */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#8B8B9A" }}>Your Bill</p>
          <AnimatedNumber
            value={originalBill}
            prefix="$"
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444" }}
          />
        </div>

        {/* FAIR VALUE */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#8B8B9A" }}>Fair Value</p>
          <AnimatedNumber
            value={fairValue}
            prefix="$"
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}
          />
        </div>

        {/* YOU SAVE */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#8B8B9A" }}>You Save</p>
          <AnimatedNumber
            value={savings}
            prefix="$"
            className="text-3xl md:text-4xl font-bold gold-shimmer"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          />
        </div>
      </div>

      {/* Outcome line */}
      {realistic && bestCase && (
        <div className="mt-4 pt-4 flex items-center justify-center gap-6 text-xs" style={{ borderTop: "1px solid #2A2A32" }}>
          <span style={{ color: "#8B8B9A" }}>
            Realistic: <span style={{ color: "#22C55E", fontFamily: "'JetBrains Mono', monospace" }}>${realistic.total_savings.toLocaleString()}</span>
            {" "}({realistic.savings_percentage}%)
          </span>
          <span style={{ color: "#2A2A32" }}>|</span>
          <span style={{ color: "#8B8B9A" }}>
            Best case: <span className="gold-shimmer" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${bestCase.total_savings.toLocaleString()}</span>
            {" "}({bestCase.savings_percentage}%)
          </span>
        </div>
      )}
    </motion.div>
  );
}
