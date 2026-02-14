"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Play, Zap } from "lucide-react";
import { demoLabels } from "@/lib/demo-data";
import { DEMO_BILLS } from "@/lib/demo-bills";
import { DemoType } from "@/lib/types";
import { useAuditStream } from "@/hooks/useAuditStream";
import StickyHeader from "@/components/StickyHeader";
import JourneyController from "@/components/JourneyController";

const demoDescriptions: Record<DemoType, string> = {
  er: "Broken arm with duplicate CT scans & upcoding",
  baby: "Childbirth with out-of-network balance billing",
  collections: "Urgent care debt with FDCPA violations",
};

export default function Home() {
  const { state, startAudit, reset, toggleSection } = useAuditStream();
  const [pastedText, setPastedText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [speed, setSpeed] = useState(1.5);
  const [isWorking, setIsWorking] = useState(false);
  const [isRealBill, setIsRealBill] = useState(false);
  const [pendingDemo, setPendingDemo] = useState<DemoType | null>(null);

  const appState = !isWorking ? "upload" : "working";

  // Check URL params for ?demo=er on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demoId = params.get("demo") as DemoType | null;
    if (demoId && DEMO_BILLS[demoId]) {
      setDemoMode(true);
      setIsWorking(true);
      setIsRealBill(false);
      setPendingDemo(demoId);
      const paramSpeed = Number(params.get("speed")) || 1.5;
      setSpeed(paramSpeed);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called by JourneyController when call1 completes and audit should start
  const handleStartAudit = useCallback(() => {
    if (pendingDemo) {
      const demo = DEMO_BILLS[pendingDemo];
      startAudit({
        bill_text: demo.bill_text,
        bill_type: demo.bill_type,
        state: demo.state,
        hospital_name: demo.hospital_name,
        insurance_status: demo.insurance_status,
        household_income: demo.household_income,
        household_size: demo.household_size,
        demo_mode: true,
        demo_id: pendingDemo,
        speed,
      });
    }
  }, [pendingDemo, speed, startAudit]);

  const handleDemo = (type: DemoType) => {
    setIsWorking(true);
    setIsRealBill(false);
    setPendingDemo(type);

    if (!demoMode) {
      // Live mode: skip call1, go straight to audit
      const demo = DEMO_BILLS[type];
      startAudit({
        bill_text: demo.bill_text,
        bill_type: demo.bill_type,
        state: demo.state,
        hospital_name: demo.hospital_name,
        insurance_status: demo.insurance_status,
        household_income: demo.household_income,
        household_size: demo.household_size,
        demo_mode: false,
        speed: undefined,
      });
    }
  };

  const handleReset = () => {
    reset();
    setPastedText("");
    setIsWorking(false);
    setIsRealBill(false);
    setPendingDemo(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const text = e.dataTransfer.getData("text");
    if (text) {
      setIsWorking(true);
      setIsRealBill(true);
      startAudit({
        bill_text: text, bill_type: "er", state: "California",
        hospital_name: "Unknown Hospital", insurance_status: "uninsured",
      });
    }
  };

  const handlePaste = () => {
    if (pastedText.trim()) {
      setIsWorking(true);
      setIsRealBill(true);
      startAudit({
        bill_text: pastedText, bill_type: "er", state: "California",
        hospital_name: "Unknown Hospital", insurance_status: "uninsured",
      });
    }
  };

  // Determine journey phase for the header
  const journeyPhase = !isWorking ? "upload" as const : "audit" as const;

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#0C0C0F" }}>
      <AnimatePresence mode="wait">
        {appState === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
              BillShredder
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
              Your bill is wrong.
              <br />
              <span className="gold-shimmer">Let&apos;s shred it.</span>
            </h1>

            <p className="text-center max-w-lg text-lg mb-10 leading-relaxed" style={{ color: "#8B8B9A" }}>
              Upload your bill. Our AI agent will audit every charge,
              find every error, know every law, and coach you through the call.
            </p>

            {/* Upload zone */}
            <div
              className="w-full max-w-xl border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-colors duration-200"
              style={{
                borderColor: dragOver ? "#D4A574" : "#2A2A32",
                background: dragOver ? "rgba(212,165,116,0.05)" : "rgba(30,30,36,0.5)",
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: dragOver ? "#D4A574" : "#8B8B9A" }} />
              <p className="font-medium mb-3" style={{ color: "#EDEDF0" }}>
                Drop your bill here or paste below
              </p>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your itemized bill text here..."
                className="w-full h-24 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1"
                style={{
                  background: "#16161A",
                  border: "1px solid #2A2A32",
                  color: "#EDEDF0",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
              {pastedText.trim() && (
                <button
                  onClick={handlePaste}
                  className="mt-3 px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                  style={{ background: "#D4A574", color: "#0C0C0F" }}
                >
                  Analyze Bill
                </button>
              )}
            </div>

            {/* Demo mode toggle + speed */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setDemoMode(!demoMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                style={{
                  background: demoMode ? "rgba(212,165,116,0.15)" : "#16161A",
                  border: `1px solid ${demoMode ? "#D4A574" : "#2A2A32"}`,
                  color: demoMode ? "#D4A574" : "#8B8B9A",
                }}
              >
                {demoMode ? <Zap className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {demoMode ? "Demo Mode" : "Live Mode"}
              </button>
              {demoMode && (
                <div className="flex items-center gap-1">
                  {[1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className="px-2 py-1 rounded text-xs transition-colors"
                      style={{
                        background: speed === s ? "#D4A574" : "#16161A",
                        color: speed === s ? "#0C0C0F" : "#8B8B9A",
                        border: `1px solid ${speed === s ? "#D4A574" : "#2A2A32"}`,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Demo pills with descriptions */}
            <div className="flex flex-col items-center gap-3 mb-12">
              <span className="text-sm" style={{ color: "#8B8B9A" }}>or try a demo:</span>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                {(["er", "baby", "collections"] as DemoType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleDemo(type)}
                    className="flex flex-col items-start px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "#16161A",
                      border: "1px solid #2A2A32",
                    }}
                  >
                    <span style={{ color: "#EDEDF0" }}>{demoLabels[type]}</span>
                    <span className="text-[10px] mt-0.5" style={{ color: "#8B8B9A", fontFamily: "'Inter', sans-serif" }}>
                      {demoDescriptions[type]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs flex items-center gap-4 flex-wrap justify-center" style={{ color: "#8B8B9A" }}>
              <span>80% of hospital bills contain errors</span>
              <span style={{ color: "#2A2A32" }}>•</span>
              <span>$220B in medical debt</span>
              <span style={{ color: "#2A2A32" }}>•</span>
              <span>62% of patients who negotiate get reductions</span>
            </div>
          </motion.div>
        )}

        {appState === "working" && (
          <motion.div
            key="working"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col"
          >
            <StickyHeader
              journeyPhase={journeyPhase}
              stageTitle={state.stageTitle}
              demoMode={demoMode}
              onReset={handleReset}
              onToggleDemo={() => setDemoMode(!demoMode)}
            />

            <JourneyController
              auditState={state}
              expandedSections={state.expandedSections}
              onToggleSection={toggleSection}
              demoMode={demoMode}
              speed={speed}
              isRealBill={isRealBill}
              onStartAudit={handleStartAudit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
