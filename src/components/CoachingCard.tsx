"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, MessageSquare, Lightbulb, AlertTriangle, CheckCircle, Copy, Check } from "lucide-react";
import type { CoachingCard as CoachingCardType } from "@/lib/types";

const cardConfig: Record<string, { border: string; icon: React.ReactNode; bg: string }> = {
  prep: { border: "#3B82F6", icon: <ClipboardList className="w-4 h-4" />, bg: "#3B82F608" },
  suggest: { border: "#22C55E", icon: <MessageSquare className="w-4 h-4" />, bg: "#22C55E08" },
  explain: { border: "#F59E0B", icon: <Lightbulb className="w-4 h-4" />, bg: "#F59E0B08" },
  alert: { border: "#EF4444", icon: <AlertTriangle className="w-4 h-4" />, bg: "#EF444408" },
  success: { border: "#22C55E", icon: <CheckCircle className="w-4 h-4" />, bg: "#22C55E12" },
};

interface CoachingCardProps {
  card: CoachingCardType;
}

export default function CoachingCard({ card }: CoachingCardProps) {
  const [copied, setCopied] = useState(false);
  const config = cardConfig[card.type] || cardConfig.explain;

  const handleCopy = () => {
    if (card.copy_text) {
      navigator.clipboard.writeText(card.copy_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg p-3"
      style={{ borderLeft: `3px solid ${config.border}`, background: config.bg }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span style={{ color: config.border }}>{config.icon}</span>
        <span className="text-xs font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
          {card.title}
        </span>
      </div>
      <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#8B8B9A" }}>
        {card.content}
      </p>
      {card.copy_text && (
        <button
          onClick={handleCopy}
          className="mt-2 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors"
          style={{
            background: copied ? "#22C55E20" : `${config.border}15`,
            color: copied ? "#22C55E" : config.border,
          }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy script"}
        </button>
      )}
    </motion.div>
  );
}
