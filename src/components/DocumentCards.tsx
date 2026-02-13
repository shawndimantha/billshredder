"use client";

import { motion } from "framer-motion";
import LetterCard from "./LetterCard";
import type { DraftLetter } from "@/lib/types";

interface DocumentCardsProps {
  letters: DraftLetter[];
}

export default function DocumentCards({ letters }: DocumentCardsProps) {
  if (letters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
        Your Documents
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 md:flex-wrap">
        {letters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))}
      </div>
    </motion.div>
  );
}
