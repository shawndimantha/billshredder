"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, Copy, Check, Download, ChevronDown } from "lucide-react";
import type { DraftLetter } from "@/lib/types";

interface LetterCardProps {
  letter: DraftLetter;
}

export default function LetterCard({ letter }: LetterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const html = `<!DOCTYPE html><html><head><title>${letter.title}</title><style>body{font-family:serif;max-width:700px;margin:40px auto;padding:20px;line-height:1.6;white-space:pre-wrap;}</style></head><body>${letter.content}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const preview = letter.content.split("\n").slice(0, 3).join("\n");

  return (
    <div className="rounded-xl flex-shrink-0 w-full md:w-80" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <ScrollText className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#3B82F6" }} />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold truncate" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
              {letter.title}
            </h4>
            <p className="text-xs mt-0.5" style={{ color: "#8B8B9A" }}>{letter.purpose}</p>
          </div>
        </div>

        {!expanded && (
          <p className="text-xs leading-relaxed mt-2 line-clamp-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8B8B9A" }}>
            {preview}
          </p>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden" }}
            >
              <div className="mt-2 rounded-lg p-3 max-h-72 overflow-y-auto" style={{ background: "#1E1E24" }}>
                <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EDEDF0" }}>
                  {letter.content}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
            style={{ color: "#8B8B9A" }}
          >
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-3 h-3" />
            </motion.span>
            {expanded ? "Collapse" : "Expand"}
          </button>
          <span className="flex-1" />
          <button onClick={handleCopy} className="flex items-center gap-1 text-xs transition-colors hover:opacity-80" style={{ color: "#8B8B9A" }}>
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={handleDownload} className="flex items-center gap-1 text-xs transition-colors hover:opacity-80" style={{ color: "#8B8B9A" }}>
            <Download className="w-3 h-3" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
