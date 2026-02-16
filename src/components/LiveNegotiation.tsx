"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SkipForward, Zap } from "lucide-react";
import type { CallMessage, CoachingCard as CoachingCardType } from "@/lib/types";
import { turnToMessage, extractAmount } from "@/lib/agent/negotiation-helpers";
import CallTranscript from "./CallTranscript";
import CoachingSidebar from "./CoachingSidebar";
import CoachingCard from "./CoachingCard";
import { ChevronUp } from "lucide-react";

interface LiveNegotiationProps {
  title: string;
  subtitle: string;
  originalBill: number;
  fairValue: number;
  hospitalName: string;
  errors: Array<{ title: string; estimated_overcharge: number; evidence: string }>;
  benchmarks: Array<{ description: string; billed_amount: number; medicare_rate: number; fair_rate: number; markup_ratio: number }>;
  protections: Array<{ name: string; description: string; action: string }>;
  strategy: Array<{ action: string; talking_points: string[]; expected_savings: number | null }>;
  charityCareEligible: boolean;
  onComplete: (finalAmount: number) => void;
  speed: number;
  demoMode: boolean;
  skipLabel?: string;
  apiKey?: string | null;
}

export default function LiveNegotiation({
  title,
  subtitle,
  originalBill,
  fairValue,
  hospitalName,
  errors,
  benchmarks,
  protections,
  strategy,
  charityCareEligible,
  onComplete,
  speed,
  demoMode,
  skipLabel = "Skip to Results",
  apiKey,
}: LiveNegotiationProps) {
  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [coachingCards, setCoachingCards] = useState<CoachingCardType[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mobileCoachOpen, setMobileCoachOpen] = useState(false);
  const [runningTotal, setRunningTotal] = useState(originalBill);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const abortRef = useRef<AbortController | null>(null);
  const msgIndex = useRef(0);

  const startNegotiation = useCallback(async () => {
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({
          originalBill,
          fairValue,
          hospitalName,
          errors,
          benchmarks,
          protections,
          strategy,
          charityCareEligible,
          demo_mode: demoMode,
          speed,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));

          if (data.type === "system") {
            const msg: CallMessage = {
              id: `live-sys-${msgIndex.current++}`,
              type: "system",
              content: data.content,
              delay_ms: 0,
            };
            setMessages(prev => [...prev, msg]);
          } else if (data.type === "rep_message") {
            const msg: CallMessage = {
              id: `live-rep-${msgIndex.current++}`,
              type: "rep",
              content: data.content,
              delay_ms: 0,
              bill_impact: data.amount ? { label: `Current offer: $${data.amount.toLocaleString()}` } : undefined,
            };
            setMessages(prev => [...prev, msg]);
            if (data.amount) setRunningTotal(data.amount);
          } else if (data.type === "negotiator_message") {
            const turn = { role: "negotiator" as const, content: data.content, amount_mentioned: data.amount };
            const msg = turnToMessage(turn, msgIndex.current++);
            setMessages(prev => [...prev, msg]);
            if (msg.coaching) {
              setCoachingCards(prev => [...prev, msg.coaching!]);
            }
            if (data.amount) setRunningTotal(data.amount);
          } else if (data.type === "negotiation_complete") {
            setIsComplete(true);
            setRunningTotal(data.final_amount);
            setTimeout(() => onComplete(data.final_amount), 2000 / speed);
          } else if (data.type === "error") {
            console.error("Negotiation error:", data.message);
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Negotiation stream error:", err);
    }
  }, [originalBill, fairValue, hospitalName, errors, benchmarks, protections, strategy, charityCareEligible, demoMode, speed, onComplete, apiKey]);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000 / speed);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [speed]);

  // Start
  useEffect(() => {
    startNegotiation();
    return () => { abortRef.current?.abort(); };
  }, [startNegotiation]);

  const handleSkip = () => {
    abortRef.current?.abort();
    if (timerRef.current) clearInterval(timerRef.current);
    onComplete(fairValue);
  };

  const latestCoachCard = coachingCards.length > 0 ? coachingCards[coachingCards.length - 1] : null;
  const progress = isComplete ? 1 : Math.min(messages.length / 16, 0.95);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Title bar with LIVE indicator */}
      <div className="px-4 md:px-6 py-3 text-center" style={{ borderBottom: "1px solid #2A2A32" }}>
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#EF444420", color: "#EF4444" }}>
            <Zap className="w-3 h-3" />
            LIVE — AI vs AI
          </span>
        </div>
        <h2 className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
          {title}
        </h2>
        <p className="text-[10px] mt-0.5" style={{ color: "#8B8B9A" }}>{subtitle}</p>
      </div>

      {/* Split screen */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="flex-1 md:w-[55%] flex flex-col min-h-0" style={{ borderRight: "1px solid #2A2A32" }}>
          <CallTranscript
            hospital={hospitalName}
            department="Billing Department"
            messages={messages}
            elapsedSeconds={elapsedSeconds}
            runningTotal={runningTotal}
            originalBill={originalBill}
          />
        </div>
        <div className="hidden md:flex md:w-[45%] flex-col min-h-0">
          <CoachingSidebar cards={coachingCards} />
        </div>
      </div>

      {/* Mobile coaching */}
      {latestCoachCard && (
        <div className="md:hidden" style={{ borderTop: "1px solid #2A2A32" }}>
          <button
            onClick={() => setMobileCoachOpen(!mobileCoachOpen)}
            className="w-full flex items-center gap-2 px-4 py-2"
            style={{ background: "#16161A" }}
          >
            <span className="text-[10px] font-semibold" style={{ color: "#D4A574" }}>Coach</span>
            <span className="text-xs flex-1 text-left truncate" style={{ color: "#8B8B9A" }}>
              {latestCoachCard.title}
            </span>
            <motion.span animate={{ rotate: mobileCoachOpen ? 180 : 0 }}>
              <ChevronUp className="w-3.5 h-3.5" style={{ color: "#8B8B9A" }} />
            </motion.span>
          </button>
          {mobileCoachOpen && (
            <div className="px-4 pb-3 max-h-48 overflow-y-auto" style={{ background: "#16161A" }}>
              <CoachingCard card={latestCoachCard} />
            </div>
          )}
        </div>
      )}

      {/* Bottom controls */}
      <div className="flex items-center gap-3 px-4 py-2" style={{ borderTop: "1px solid #2A2A32", background: "#0C0C0F" }}>
        <div className="flex-1 h-1 rounded-full" style={{ background: "#1E1E24" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%`, background: isComplete ? "#22C55E" : "#EF4444" }}
          />
        </div>
        {!isComplete && (
          <button
            onClick={handleSkip}
            className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
            style={{ color: "#8B8B9A" }}
          >
            {skipLabel}
            <SkipForward className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
