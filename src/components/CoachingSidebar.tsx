"use client";

import { useEffect, useRef } from "react";
import { Shield } from "lucide-react";
import type { CoachingCard as CoachingCardType } from "@/lib/types";
import CoachingCard from "./CoachingCard";

interface CoachingSidebarProps {
  cards: CoachingCardType[];
}

export default function CoachingSidebar({ cards }: CoachingSidebarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [cards.length]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid #2A2A32" }}>
        <Shield className="w-4 h-4" style={{ color: "#D4A574" }} />
        <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
          BillShredder Coach
        </span>
      </div>

      {/* Cards */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {cards.length === 0 && (
          <p className="text-xs text-center py-8" style={{ color: "#8B8B9A" }}>
            Coaching tips will appear here as the call progresses...
          </p>
        )}
        {cards.map((card, i) => (
          <CoachingCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
}
