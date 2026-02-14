"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SkipForward, ChevronUp } from "lucide-react";
import type { CallScript, CallMessage, CoachingCard as CoachingCardType } from "@/lib/types";
import CallTranscript from "./CallTranscript";
import CoachingSidebar from "./CoachingSidebar";
import CoachingCard from "./CoachingCard";

interface CallCoachProps {
  title: string;
  subtitle: string;
  script: CallScript;
  onComplete: () => void;
  speed: number;
  autoPlay?: boolean;
  skipLabel?: string;
  originalBill?: number;
}

export default function CallCoach({
  title,
  subtitle,
  script,
  onComplete,
  speed,
  autoPlay = true,
  skipLabel = "Skip",
  originalBill,
}: CallCoachProps) {
  const [visibleMessages, setVisibleMessages] = useState<CallMessage[]>([]);
  const [coachingCards, setCoachingCards] = useState<CoachingCardType[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mobileCoachOpen, setMobileCoachOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const playingRef = useRef(false);

  // Calculate running total from bill impacts
  const runningTotal = originalBill !== undefined
    ? visibleMessages.reduce((total, msg) => {
        if (msg.bill_impact?.amount) return total + msg.bill_impact.amount;
        return total;
      }, originalBill)
    : undefined;

  const playScript = useCallback(async () => {
    if (playingRef.current) return;
    playingRef.current = true;

    for (let i = 0; i < script.messages.length; i++) {
      if (!playingRef.current) break;
      const msg = script.messages[i];

      await new Promise<void>((resolve) => setTimeout(resolve, msg.delay_ms / speed));
      if (!playingRef.current) break;

      setVisibleMessages((prev) => [...prev, msg]);
      setProgress((i + 1) / script.messages.length);

      if (msg.coaching) {
        setCoachingCards((prev) => [...prev, msg.coaching!]);
      }
    }

    if (playingRef.current) {
      setIsComplete(true);
      // Auto-advance after a brief pause
      setTimeout(() => {
        if (playingRef.current) onComplete();
      }, 1500 / speed);
    }
  }, [script, speed, onComplete]);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000 / speed);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [speed]);

  // Auto-play
  useEffect(() => {
    if (autoPlay) {
      playScript();
    }
    return () => {
      playingRef.current = false;
    };
  }, [autoPlay, playScript]);

  const handleSkip = () => {
    playingRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    onComplete();
  };

  const latestCoachCard = coachingCards.length > 0 ? coachingCards[coachingCards.length - 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Title bar */}
      <div className="px-4 md:px-6 py-3 text-center" style={{ borderBottom: "1px solid #2A2A32" }}>
        <h2 className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
          {title}
        </h2>
        <p className="text-[10px] mt-0.5" style={{ color: "#8B8B9A" }}>{subtitle}</p>
      </div>

      {/* Split screen */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Transcript */}
        <div className="flex-1 md:w-[55%] flex flex-col min-h-0" style={{ borderRight: "1px solid #2A2A32" }}>
          <CallTranscript
            hospital={script.hospital}
            department={script.department}
            messages={visibleMessages}
            elapsedSeconds={elapsedSeconds}
            runningTotal={runningTotal}
            originalBill={originalBill}
          />
        </div>

        {/* Right: Coaching (hidden on mobile, shown via bottom sheet) */}
        <div className="hidden md:flex md:w-[45%] flex-col min-h-0">
          <CoachingSidebar cards={coachingCards} />
        </div>
      </div>

      {/* Mobile coaching bottom card */}
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
        {/* Progress bar */}
        <div className="flex-1 h-1 rounded-full" style={{ background: "#1E1E24" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%`, background: isComplete ? "#22C55E" : "#D4A574" }}
          />
        </div>

        {/* Speed */}
        <div className="flex items-center gap-1">
          {[1, 1.5, 2].map((s) => (
            <span
              key={s}
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{
                background: speed === s ? "#D4A57420" : "transparent",
                color: speed === s ? "#D4A574" : "#8B8B9A",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {s}x
            </span>
          ))}
        </div>

        {/* Skip */}
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
