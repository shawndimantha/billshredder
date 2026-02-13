"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { StrategyStep } from "@/lib/types";

interface StrategySectionProps {
  steps: StrategyStep[];
}

const confidenceColor: Record<string, { bg: string; text: string }> = {
  high: { bg: "#22C55E20", text: "#22C55E" },
  medium: { bg: "#F59E0B20", text: "#F59E0B" },
  low: { bg: "#8B8B9A20", text: "#8B8B9A" },
};

export default function StrategySection({ steps }: StrategySectionProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {steps.map((step) => {
        const colors = confidenceColor[step.confidence] || confidenceColor.medium;
        const isExpanded = expandedStep === step.order;

        return (
          <div key={step.order} className="rounded-lg" style={{ background: "#1E1E24" }}>
            <button
              onClick={() => setExpandedStep(isExpanded ? null : step.order)}
              className="w-full flex items-center gap-3 p-3 text-left"
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "#D4A574", color: "#0C0C0F" }}>
                {step.order}
              </span>
              <span className="text-sm font-medium flex-1" style={{ color: "#EDEDF0" }}>{step.action}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: colors.bg, color: colors.text }}>
                {step.confidence.toUpperCase()}
              </span>
              {step.expected_savings ? (
                <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>
                  ${step.expected_savings.toLocaleString()}
                </span>
              ) : null}
              <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: "#8B8B9A" }} />
              </motion.span>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-3 pb-3 pt-0">
                    <p className="text-xs mb-2" style={{ color: "#8B8B9A" }}>{step.description}</p>
                    <p className="text-[10px] mb-2" style={{ color: "#8B8B9A" }}>Timeline: {step.timeline}</p>
                    {step.talking_points.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#8B8B9A" }}>Talking Points</p>
                        <ul className="space-y-1">
                          {step.talking_points.map((tp, i) => (
                            <li key={i} className="text-xs pl-3" style={{ color: "#EDEDF0", borderLeft: "2px solid #D4A574" }}>
                              {tp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
