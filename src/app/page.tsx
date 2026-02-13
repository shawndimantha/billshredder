"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, AlertTriangle, CheckCircle, Scale, Shield,
  Sparkles, ChevronRight, Copy, Check, ArrowLeft, Download,
  BarChart3, Gavel, ScrollText, Play, Zap,
} from "lucide-react";
import { demoLabels } from "@/lib/demo-data";
import { DEMO_BILLS } from "@/lib/demo-bills";
import { DemoType } from "@/lib/types";
import { useAuditStream } from "@/hooks/useAuditStream";

export default function Home() {
  const { state, startAudit, reset } = useAuditStream();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [speed, setSpeed] = useState(1);
  const feedRef = useRef<HTMLDivElement>(null);

  const appState = state.status === "idle" ? "upload" : state.status === "complete" || state.status === "error" ? "complete" : "working";

  // Check URL params for ?demo=er on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demoId = params.get("demo") as DemoType | null;
    if (demoId && DEMO_BILLS[demoId]) {
      setDemoMode(true);
      const demo = DEMO_BILLS[demoId];
      startAudit({
        bill_text: demo.bill_text,
        bill_type: demo.bill_type,
        state: demo.state,
        hospital_name: demo.hospital_name,
        insurance_status: demo.insurance_status,
        household_income: demo.household_income,
        household_size: demo.household_size,
        demo_mode: true,
        demo_id: demoId,
        speed: Number(params.get("speed")) || 1,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [state.events.length]);

  // Compute total overcharges from errors
  const totalOvercharges = useMemo(
    () => state.errors.reduce((s, e) => s + e.estimated_overcharge, 0),
    [state.errors]
  );

  // Stage number for progress bar
  const stageOrder: Record<string, number> = { parse: 1, audit: 2, benchmark: 3, rights: 4, strategy: 5, letters: 6 };
  const currentStageNum = state.currentStage ? stageOrder[state.currentStage] || 0 : 0;

  const handleDemo = (type: DemoType) => {
    const demo = DEMO_BILLS[type];
    startAudit({
      bill_text: demo.bill_text,
      bill_type: demo.bill_type,
      state: demo.state,
      hospital_name: demo.hospital_name,
      insurance_status: demo.insurance_status,
      household_income: demo.household_income,
      household_size: demo.household_size,
      demo_mode: demoMode,
      demo_id: demoMode ? type : undefined,
      speed: demoMode ? speed : undefined,
    });
  };

  const handleReset = () => {
    reset();
    setPastedText("");
    setCopiedId(null);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (title: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const text = e.dataTransfer.getData("text");
    if (text) {
      startAudit({
        bill_text: text, bill_type: "er", state: "California",
        hospital_name: "Unknown Hospital", insurance_status: "uninsured",
      });
    }
  };

  const handlePaste = () => {
    if (pastedText.trim()) {
      startAudit({
        bill_text: pastedText, bill_type: "er", state: "California",
        hospital_name: "Unknown Hospital", insurance_status: "uninsured",
      });
    }
  };

  const stepIcon = (type: string) => {
    switch (type) {
      case "stage": return <Sparkles className="w-4 h-4" />;
      case "parsing": return <FileText className="w-4 h-4" />;
      case "analysis": return <BarChart3 className="w-4 h-4" />;
      case "finding": return <AlertTriangle className="w-4 h-4" />;
      case "legal": return <Scale className="w-4 h-4" />;
      case "strategy": return <Shield className="w-4 h-4" />;
      case "letter": return <ScrollText className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const severityBorder = (severity: string) => {
    switch (severity) {
      case "error": case "critical": return "#EF4444";
      case "warning": case "high": return "#F59E0B";
      case "success": return "#22C55E";
      default: return "#3B82F6";
    }
  };

  // Build display steps from events
  type DisplayStep = { id: string; type: string; title: string; content: string; severity: string; savings?: number };
  const displaySteps = useMemo(() => {
    const steps: DisplayStep[] = [];
    let counter = 0;
    for (const e of state.events) {
      counter++;
      const id = `step-${counter}`;
      switch (e.type) {
        case "stage_start":
          steps.push({ id, type: "stage", title: e.title, content: e.description, severity: "info" });
          break;
        case "parse_complete":
          if (e.bill) {
            steps.push({ id, type: "parsing", title: `Bill Parsed — ${e.bill.line_items.length} Line Items`, content: `Total: $${e.bill.total_charges.toLocaleString()} | Patient Responsibility: $${e.bill.patient_responsibility.toLocaleString()}`, severity: "info" });
          }
          break;
        case "audit_finding":
          steps.push({ id, type: "finding", title: e.finding.title, content: `${e.finding.explanation}\n\nEvidence: ${e.finding.evidence}\n\nAction: ${e.finding.actionable}`, severity: e.finding.severity === "critical" ? "error" : "warning", savings: e.finding.estimated_overcharge });
          break;
        case "audit_complete":
          steps.push({ id, type: "analysis", title: `Audit Complete — ${e.total_errors} Errors Found`, content: `Total overcharges: $${e.total_overcharges.toLocaleString()}`, severity: "success" });
          break;
        case "benchmark_item":
          if (e.benchmark.status === "extreme") {
            steps.push({ id, type: "analysis", title: `Extreme Markup: ${e.benchmark.description}`, content: `Billed: $${e.benchmark.billed_amount.toLocaleString()} | Medicare: $${e.benchmark.medicare_rate.toLocaleString()} | Fair: $${e.benchmark.fair_rate.toLocaleString()} | ${e.benchmark.markup_ratio}x Medicare`, severity: "error" });
          }
          break;
        case "benchmark_complete":
          steps.push({ id, type: "analysis", title: "Price Benchmarking Complete", content: `Fair Value: $${e.summary.total_fair_value.toLocaleString()} | Avg Markup: ${e.summary.average_markup}x | Savings: $${e.summary.potential_savings.toLocaleString()}`, severity: "success" });
          break;
        case "right_found":
          if (e.protection.applies) {
            steps.push({ id, type: "legal", title: e.protection.name, content: `${e.protection.description}\n\nAction: ${e.protection.action}\nCitation: ${e.protection.citation}`, severity: e.protection.impact === "high" ? "success" : "info" });
          }
          break;
        case "strategy_step":
          steps.push({ id, type: "strategy", title: `Step ${e.step.order}: ${e.step.action}`, content: `${e.step.description}\nTimeline: ${e.step.timeline}`, severity: e.step.confidence === "high" ? "success" : "info", savings: e.step.expected_savings || undefined });
          break;
        case "letter_start":
          steps.push({ id, type: "letter", title: `Drafting: ${e.title}`, content: "Generating letter...", severity: "info" });
          break;
        case "letters_complete":
          steps.push({ id, type: "letter", title: "All Letters Ready", content: `${e.count} letters generated and ready to send.`, severity: "success" });
          break;
        case "error":
          steps.push({ id, type: "finding", title: "Error", content: e.message, severity: "error" });
          break;
      }
    }
    return steps;
  }, [state.events]);

  return (
    <main className="min-h-screen" style={{ background: "#0C0C0F" }}>
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
              Your hospital bill is wrong.
              <br />
              <span className="gold-shimmer">Let&apos;s prove it.</span>
            </h1>

            <p className="text-center max-w-lg text-lg mb-10 leading-relaxed" style={{ color: "#8B8B9A" }}>
              Upload your bill. Our AI agent will audit every charge,
              find every error, know every law, and build your case.
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

            {/* Demo pills */}
            <div className="flex items-center gap-3 mb-12 flex-wrap justify-center">
              <span className="text-sm" style={{ color: "#8B8B9A" }}>or try a demo:</span>
              {(["er", "baby", "collections"] as DemoType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleDemo(type)}
                  className="px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "#16161A",
                    border: "1px solid #2A2A32",
                    color: "#EDEDF0",
                  }}
                >
                  {demoLabels[type]}
                </button>
              ))}
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

        {(appState === "working" || appState === "complete") && (
          <motion.div
            key="working"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #2A2A32" }}>
              <div className="flex items-center gap-4">
                <button onClick={handleReset} className="p-1 rounded hover:bg-white/5 transition-colors" title="Back to start">
                  <ArrowLeft className="w-4 h-4" style={{ color: "#8B8B9A" }} />
                </button>
                <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
                  BillShredder
                </span>
                {demoMode && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(212,165,116,0.15)", color: "#D4A574" }}>
                    DEMO
                  </span>
                )}
                <ChevronRight className="w-4 h-4" style={{ color: "#2A2A32" }} />
                <span className="text-sm" style={{ color: "#EDEDF0" }}>
                  {appState === "working" ? state.stageTitle || "Auditing..." : "Audit Complete"}
                </span>
              </div>
              <div className="flex items-center gap-6">
                {appState === "working" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "#8B8B9A" }}>
                      Stage {currentStageNum} of 6
                    </span>
                    <div className="w-24 h-1.5 rounded-full" style={{ background: "#1E1E24" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(currentStageNum / 6) * 100}%`,
                          background: "linear-gradient(90deg, #D4A574, #E8C49A)",
                        }}
                      />
                    </div>
                  </div>
                )}
                {totalOvercharges > 0 && (
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider" style={{ color: "#8B8B9A" }}>Potential Savings</p>
                    <p className="text-2xl font-bold gold-shimmer" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      ${totalOvercharges.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </header>

            {/* Two-column layout */}
            <div className="flex-1 flex flex-col lg:flex-row">
              {/* Left: Agent feed */}
              <div className="w-full lg:w-[55%] overflow-hidden flex flex-col" style={{ borderRight: "1px solid #2A2A32" }}>
                <div className="px-6 py-3" style={{ borderBottom: "1px solid #2A2A32" }}>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
                    Agent Audit Trail
                  </h2>
                </div>
                <div ref={feedRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3" style={{ maxHeight: "calc(100vh - 120px)" }}>
                  <AnimatePresence>
                    {displaySteps.map((step) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-xl p-5"
                        style={{
                          border: "1px solid #2A2A32",
                          borderLeftWidth: "4px",
                          borderLeftColor: severityBorder(step.severity),
                          background: `${severityBorder(step.severity)}08`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ color: severityBorder(step.severity) }}>
                            {stepIcon(step.type)}
                          </span>
                          <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
                            {step.title}
                          </span>
                          {step.savings ? (
                            <span className="ml-auto text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>
                              -${step.savings.toLocaleString()}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#8B8B9A" }}>
                          {step.content}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {appState === "working" && (
                    <div className="skeleton h-24 rounded-xl" />
                  )}
                </div>
              </div>

              {/* Right: Summary + Letters */}
              <div className="w-full lg:w-[45%] overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
                <div className="px-6 py-3" style={{ borderBottom: "1px solid #2A2A32" }}>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B8B9A" }}>
                    Case Summary
                  </h2>
                </div>
                <div className="px-6 py-4 space-y-4">
                  {/* Outcomes card */}
                  {state.realistic && (
                    <div className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
                      <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
                        Expected Outcomes
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg p-3" style={{ background: "#1E1E24" }}>
                          <p className="text-xs mb-1" style={{ color: "#8B8B9A" }}>Realistic</p>
                          <p className="text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>
                            ${state.realistic.total_savings.toLocaleString()}
                          </p>
                          <p className="text-xs" style={{ color: "#8B8B9A" }}>
                            {state.realistic.savings_percentage}% reduction
                          </p>
                        </div>
                        <div className="rounded-lg p-3" style={{ background: "#1E1E24" }}>
                          <p className="text-xs mb-1" style={{ color: "#8B8B9A" }}>Best Case</p>
                          <p className="text-lg font-bold gold-shimmer" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            ${(state.bestCase?.total_savings || 0).toLocaleString()}
                          </p>
                          <p className="text-xs" style={{ color: "#8B8B9A" }}>
                            {state.bestCase?.savings_percentage || 0}% reduction
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overcharges summary */}
                  {state.errors.length > 0 && (
                    <div className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
                      <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
                        Overcharges Found
                      </h3>
                      {state.errors.map((err, i) => (
                        <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid #2A2A32" }}>
                          <span className="text-sm truncate mr-4" style={{ color: "#8B8B9A" }}>{err.title}</span>
                          <span className="text-sm font-bold whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444" }}>
                            ${err.estimated_overcharge.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 mt-2">
                        <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>Total</span>
                        <span className="text-lg font-bold gold-shimmer" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          ${totalOvercharges.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Benchmarks */}
                  {state.benchmarks.length > 0 && (
                    <div className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
                      <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
                        <BarChart3 className="w-4 h-4 inline mr-2" style={{ color: "#3B82F6" }} />
                        Price Benchmarks
                      </h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {state.benchmarks.map((b, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-1" style={{ borderBottom: "1px solid #1E1E24" }}>
                            <span className="truncate mr-2" style={{ color: "#8B8B9A", maxWidth: "50%" }}>{b.description}</span>
                            <div className="flex items-center gap-3">
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444" }}>
                                ${b.billed_amount.toLocaleString()}
                              </span>
                              <span style={{ color: "#2A2A32" }}>&rarr;</span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>
                                ${b.fair_rate.toLocaleString()}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{
                                background: b.status === "extreme" ? "#EF444420" : b.status === "high" ? "#F59E0B20" : "#22C55E20",
                                color: b.status === "extreme" ? "#EF4444" : b.status === "high" ? "#F59E0B" : "#22C55E",
                              }}>
                                {b.markup_ratio}x
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legal protections */}
                  {state.protections.filter(p => p.applies).length > 0 && (
                    <div className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
                      <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
                        <Gavel className="w-4 h-4 inline mr-2" style={{ color: "#3B82F6" }} />
                        Legal Protections
                      </h3>
                      {state.protections.filter(p => p.applies).map((p, i) => (
                        <div key={i} className="pl-3 mb-3 last:mb-0" style={{ borderLeft: "2px solid #3B82F6" }}>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium" style={{ color: "#3B82F6" }}>{p.name}</p>
                            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                              background: p.impact === "high" ? "#22C55E20" : "#3B82F620",
                              color: p.impact === "high" ? "#22C55E" : "#3B82F6",
                            }}>
                              {p.impact.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs mt-1" style={{ color: "#8B8B9A" }}>{p.description}</p>
                          <p className="text-[10px] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#3B82F6" }}>{p.citation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Letters */}
                  {state.letters.map((letter) => (
                    <div key={letter.id} className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2A2A32" }}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#EDEDF0" }}>
                          {letter.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownload(letter.title, letter.content)}
                            className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
                            style={{ color: "#8B8B9A" }}
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                          <button
                            onClick={() => handleCopy(letter.id, letter.content)}
                            className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
                            style={{ color: "#8B8B9A" }}
                          >
                            {copiedId === letter.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedId === letter.id ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                      <div className="rounded-lg p-4 max-h-72 overflow-y-auto" style={{ background: "#1E1E24" }}>
                        <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EDEDF0" }}>
                          {letter.content}
                        </pre>
                      </div>
                    </div>
                  ))}

                  {appState === "working" && state.letters.length === 0 && (
                    <div className="space-y-4">
                      <div className="skeleton h-40 rounded-xl" />
                      <div className="skeleton h-32 rounded-xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
