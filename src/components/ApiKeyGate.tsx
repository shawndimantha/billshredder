"use client";

import { useState } from "react";
import { Key, Zap, Eye, EyeOff } from "lucide-react";

interface ApiKeyGateProps {
  onKeySubmit: (key: string) => void;
  onDemo: () => void;
}

export default function ApiKeyGate({ onKeySubmit, onDemo }: ApiKeyGateProps) {
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = key.trim();
    if (!trimmed.startsWith("sk-ant-")) {
      setError("Key should start with sk-ant-...");
      return;
    }
    if (trimmed.length < 20) {
      setError("Key looks too short");
      return;
    }
    setError(null);
    sessionStorage.setItem("anthropic_api_key", trimmed);
    onKeySubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(12,12,15,0.9)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ background: "rgba(212,165,116,0.15)" }}>
            <Key className="w-5 h-5" style={{ color: "#D4A574" }} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
              Bring Your Own Key
            </h2>
            <p className="text-xs" style={{ color: "#8B8B9A" }}>
              Live AI features use your Anthropic API key
            </p>
          </div>
        </div>

        <p className="text-sm mb-4" style={{ color: "#8B8B9A" }}>
          Your key is stored only in this browser tab and never sent to our servers &mdash; it goes directly to Anthropic&apos;s API.
        </p>

        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            value={key}
            onChange={(e) => { setKey(e.target.value); setError(null); }}
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
            placeholder="sk-ant-..."
            className="w-full px-3 py-2.5 pr-10 rounded-lg text-sm focus:outline-none focus:ring-1"
            style={{
              background: "#0C0C0F",
              border: `1px solid ${error ? "#EF4444" : "#2A2A32"}`,
              color: "#EDEDF0",
              fontFamily: "'JetBrains Mono', monospace",
            }}
            autoFocus
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2"
            style={{ color: "#8B8B9A" }}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && <p className="text-xs mb-3" style={{ color: "#EF4444" }}>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!key.trim()}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors mb-2 disabled:opacity-40"
          style={{ background: "#D4A574", color: "#0C0C0F" }}
        >
          Use My Key
        </button>

        <button
          onClick={onDemo}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-colors"
          style={{ background: "transparent", border: "1px solid #2A2A32", color: "#8B8B9A" }}
        >
          <Zap className="w-3.5 h-3.5" />
          Use Demo Instead
        </button>

        <p className="text-[10px] mt-3 text-center" style={{ color: "#555" }}>
          Get a key at{" "}
          <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: "#D4A574" }}>
            console.anthropic.com
          </a>
        </p>
      </div>
    </div>
  );
}
