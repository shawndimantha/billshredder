"use client";

import { Check, Clock } from "lucide-react";

const done = [
  "AI-powered bill audit",
  "Legal protection analysis",
  "Negotiation strategy",
  "Dispute letter generation",
];

const coming = [
  "Auto-submit disputes via fax/email",
  "Insurance appeal automation",
  "Payment plan optimizer",
  "Medical debt credit repair",
];

export default function ProductTeaser() {
  return (
    <div className="rounded-xl p-6" style={{ background: "#16161A", border: "1px solid #2A2A32", opacity: 0.7 }}>
      <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
        Building the future of patient advocacy
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {done.map((item) => (
            <div key={item} className="flex items-center gap-2 mb-2">
              <Check className="w-3.5 h-3.5" style={{ color: "#22C55E" }} />
              <span className="text-xs" style={{ color: "#EDEDF0" }}>{item}</span>
            </div>
          ))}
        </div>
        <div>
          {coming.map((item) => (
            <div key={item} className="flex items-center gap-2 mb-2">
              <Clock className="w-3.5 h-3.5" style={{ color: "#8B8B9A" }} />
              <span className="text-xs" style={{ color: "#8B8B9A" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
