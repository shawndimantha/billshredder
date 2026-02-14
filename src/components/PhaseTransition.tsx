"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface PhaseTransitionProps {
  message: string;
  duration?: number;
  onComplete: () => void;
  speed?: number;
}

export default function PhaseTransition({ message, duration = 2000, onComplete, speed = 1 }: PhaseTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, duration / speed);
    return () => clearTimeout(timer);
  }, [duration, speed, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex items-center justify-center"
    >
      <div className="text-center px-6">
        <p className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
          {message}
        </p>
        <div className="mt-4 mx-auto w-32 h-1 rounded-full overflow-hidden" style={{ background: "#1E1E24" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#D4A574" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: (duration / speed) / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
