"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  count?: number;
  metric?: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  icon,
  count,
  metric,
  expanded,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]"
      >
        {icon && <span style={{ color: "#8B8B9A" }}>{icon}</span>}
        <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
          {title}
        </span>
        {count !== undefined && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#1E1E24", color: "#8B8B9A" }}>
            {count}
          </span>
        )}
        {metric && (
          <span className="ml-auto mr-3 text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#D4A574" }}>
            {metric}
          </span>
        )}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={metric ? "" : "ml-auto"}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "#8B8B9A" }} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
