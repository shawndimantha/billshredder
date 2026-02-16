"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Zap } from "lucide-react";
import { demoLabels } from "@/lib/demo-data";
import { DEMO_BILLS } from "@/lib/demo-bills";
import { DemoType } from "@/lib/types";
import { useAuditStream } from "@/hooks/useAuditStream";
import StickyHeader from "@/components/StickyHeader";
import JourneyController from "@/components/JourneyController";
import BillUploader from "@/components/BillUploader";
import ExtractionVerification from "@/components/ExtractionVerification";
import ApiKeyGate from "@/components/ApiKeyGate";

const demoDescriptions: Record<DemoType, string> = {
  er: "Broken arm with duplicate CT scans & upcoding",
  baby: "Childbirth with out-of-network balance billing",
  collections: "Urgent care debt with FDCPA violations",
};

type UploadStep = "upload" | "verify" | "working";

export default function Home() {
  const { state, startAudit, reset, toggleSection } = useAuditStream();
  const [pastedText, setPastedText] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [liveNegotiation, setLiveNegotiation] = useState(true);
  const [speed, setSpeed] = useState(1.5);
  const [uploadStep, setUploadStep] = useState<UploadStep>("upload");
  const [isRealBill, setIsRealBill] = useState(false);
  const [pendingDemo, setPendingDemo] = useState<DemoType | null>(null);
  const [extraction, setExtraction] = useState<Record<string, unknown> | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKeyGate, setShowKeyGate] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Restore key from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("anthropic_api_key");
    if (stored) setApiKey(stored);
  }, []);

  const requireKey = (action: () => void) => {
    if (apiKey) {
      action();
    } else {
      setPendingAction(() => action);
      setShowKeyGate(true);
    }
  };

  const handleKeySubmit = (key: string) => {
    setApiKey(key);
    setShowKeyGate(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleKeyGateDemo = () => {
    setShowKeyGate(false);
    setPendingAction(null);
    setDemoMode(true);
    // Re-trigger the action as demo
  };

  // Check URL params for ?demo=er on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demoId = params.get("demo") as DemoType | null;
    if (demoId && DEMO_BILLS[demoId]) {
      setDemoMode(true);
      setUploadStep("working");
      setIsRealBill(false);
      setPendingDemo(demoId);
      const paramSpeed = Number(params.get("speed")) || 1.5;
      setSpeed(paramSpeed);
      if (params.get("live") === "true") setLiveNegotiation(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (demoMode) {
      // Demo mode doesn't need a key
      setUploadStep("working");
      setIsRealBill(false);
      setPendingDemo(type);
    } else {
      // Live mode needs a key
      requireKey(() => {
        setUploadStep("working");
        setIsRealBill(false);
        setPendingDemo(type);
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
      });
    }
  };

  const handleReset = () => {
    reset();
    setPastedText("");
    setUploadStep("upload");
    setIsRealBill(false);
    setPendingDemo(null);
    setExtraction(null);
    setExtractedText("");
  };

  const handleExtracted = ({ raw_text, extraction: ext }: { raw_text: string; extraction: Record<string, unknown> }) => {
    setExtractedText(raw_text);
    setExtraction(ext);
    setUploadStep("verify");
  };

  const handleConfirmExtraction = () => {
    setUploadStep("working");
    setIsRealBill(true);
    const ext = extraction as Record<string, unknown>;
    startAudit({
      bill_text: extractedText,
      bill_type: (ext.bill_type as string) as "er" | "hospital" | "urgent_care" | "other" || "er",
      state: (ext.state as string) || "California",
      hospital_name: (ext.hospital_name as string) || "Unknown Hospital",
      insurance_status: (ext.insurance_status as string) as "insured" | "uninsured" | "underinsured" || "uninsured",
    });
  };

  const handleEditExtraction = () => {
    setPastedText(extractedText);
    setExtraction(null);
    setUploadStep("upload");
  };

  const handlePastedText = (text: string) => {
    requireKey(() => {
      setUploadStep("working");
      setIsRealBill(true);
      startAudit({
        bill_text: text, bill_type: "er", state: "California",
        hospital_name: "Unknown Hospital", insurance_status: "uninsured",
      });
    });
  };

  const journeyPhase = uploadStep !== "working" ? "upload" as const : "audit" as const;

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#0C0C0F" }}>
      {showKeyGate && (
        <ApiKeyGate
          onKeySubmit={handleKeySubmit}
          onDemo={handleKeyGateDemo}
        />
      )}
      <AnimatePresence mode="wait">
        {uploadStep === "upload" && (
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
              Take a photo of your bill. Our AI agent will audit every charge,
              find every error, know every law, and negotiate for you.
            </p>

            {/* Bill uploader with image support */}
            <BillUploader
              onExtracted={handleExtracted}
              onPastedText={handlePastedText}
              pastedText={pastedText}
              onPastedTextChange={setPastedText}
              apiKey={apiKey}
              onNeedKey={() => setShowKeyGate(true)}
            />

            {/* Mode toggles */}
            <div className="flex items-center gap-4 mt-4 mb-4">
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

              <button
                onClick={() => setLiveNegotiation(!liveNegotiation)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                style={{
                  background: liveNegotiation ? "rgba(239,68,68,0.15)" : "#16161A",
                  border: `1px solid ${liveNegotiation ? "#EF4444" : "#2A2A32"}`,
                  color: liveNegotiation ? "#EF4444" : "#8B8B9A",
                }}
              >
                <Zap className="w-3 h-3" />
                {liveNegotiation ? "AI vs AI Negotiation" : "Guided Negotiation"}
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

            {/* Demo pills */}
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

        {uploadStep === "verify" && extraction && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
              BillShredder
            </p>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
              We scanned your bill
            </h2>
            <ExtractionVerification
              extraction={extraction as { hospital_name: string; date_of_service: string; total_charges: number; line_items: Array<{ description: string; total_charge: number; cpt_code: string | null }>; confidence: "high" | "medium" | "low" }}
              onConfirm={handleConfirmExtraction}
              onEdit={handleEditExtraction}
            />
          </motion.div>
        )}

        {uploadStep === "working" && (
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
              liveNegotiation={liveNegotiation}
              apiKey={apiKey}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
