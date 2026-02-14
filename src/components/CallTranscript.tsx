"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import type { CallMessage } from "@/lib/types";
import AnimatedNumber from "./AnimatedNumber";

interface CallTranscriptProps {
  hospital: string;
  department: string;
  messages: CallMessage[];
  elapsedSeconds: number;
  runningTotal?: number;
  originalBill?: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CallTranscript({
  hospital,
  department,
  messages,
  elapsedSeconds,
  runningTotal,
  originalBill,
}: CallTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #2A2A32" }}>
        <Phone className="w-4 h-4" style={{ color: "#22C55E" }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: "#EDEDF0" }}>
            {hospital}
          </p>
          <p className="text-[10px]" style={{ color: "#8B8B9A" }}>{department}</p>
        </div>
        <span className="call-timer text-xs px-2 py-0.5 rounded" style={{ background: "#1E1E24", color: "#8B8B9A", fontFamily: "'JetBrains Mono', monospace" }}>
          {formatTime(elapsedSeconds)}
        </span>
      </div>

      {/* Running bill total */}
      {runningTotal !== undefined && originalBill !== undefined && (
        <div className="flex items-center justify-between px-4 py-2" style={{ background: "#16161A", borderBottom: "1px solid #2A2A32" }}>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: "#8B8B9A" }}>Current Bill</span>
          <div className="flex items-center gap-3">
            {runningTotal < originalBill && (
              <span className="text-xs line-through" style={{ color: "#8B8B9A", fontFamily: "'JetBrains Mono', monospace" }}>
                ${originalBill.toLocaleString()}
              </span>
            )}
            <AnimatedNumber
              value={runningTotal}
              prefix="$"
              className="text-sm font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: runningTotal < originalBill ? "#22C55E" : "#EDEDF0" }}
            />
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {msg.type === "system" ? (
                <p className="text-xs italic text-center py-1" style={{ color: "#8B8B9A" }}>
                  {msg.content}
                </p>
              ) : (
                <div className={`flex ${msg.type === "you" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[85%] rounded-lg px-3 py-2"
                    style={{
                      background: msg.type === "you" ? "#D4A57415" : "#1E1E24",
                      border: `1px solid ${msg.type === "you" ? "#D4A57430" : "#2A2A32"}`,
                    }}
                  >
                    <p className="text-[10px] font-semibold mb-0.5" style={{ color: msg.type === "you" ? "#D4A574" : "#8B8B9A" }}>
                      {msg.type === "you" ? "You" : "Rep"}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: msg.type === "you" ? "#EDEDF0" : "#8B8B9A" }}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              )}

              {/* Bill impact banner */}
              {msg.bill_impact && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 rounded-lg px-3 py-2 text-center"
                  style={{
                    background: msg.bill_impact.amount && msg.bill_impact.amount < 0 ? "#22C55E10" : "#D4A57410",
                    border: `1px solid ${msg.bill_impact.amount && msg.bill_impact.amount < 0 ? "#22C55E30" : "#D4A57430"}`,
                  }}
                >
                  <p className="text-xs font-medium" style={{
                    color: msg.bill_impact.amount && msg.bill_impact.amount < 0 ? "#22C55E" : "#D4A574",
                  }}>
                    {msg.bill_impact.label}
                    {msg.bill_impact.amount ? ` (${msg.bill_impact.amount > 0 ? "+" : ""}$${Math.abs(msg.bill_impact.amount).toLocaleString()})` : ""}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
