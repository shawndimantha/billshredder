"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, BarChart3, Scale, Shield } from "lucide-react";
import type { StageName } from "@/lib/types";
import type { AuditState } from "@/hooks/useAuditStream";
import CollapsibleSection from "./CollapsibleSection";
import ErrorsSection from "./ErrorsSection";
import BenchmarkSection from "./BenchmarkSection";
import RightsSection from "./RightsSection";
import StrategySection from "./StrategySection";

interface FindingsDashboardProps {
  state: AuditState;
  expandedSections: StageName[];
  onToggleSection: (section: StageName) => void;
}

export default function FindingsDashboard({ state, expandedSections, onToggleSection }: FindingsDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wasNearBottomRef = useRef(true);

  // Auto-scroll if user is near bottom
  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;

    const onScroll = () => {
      const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      wasNearBottomRef.current = distFromBottom < 200;
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (wasNearBottomRef.current && containerRef.current) {
      containerRef.current.scrollIntoView?.({ behavior: "smooth", block: "end" });
    }
  }, [state.errors.length, state.benchmarks.length, state.protections.length, state.strategySteps.length]);

  const totalOvercharges = state.errors.reduce((s, e) => s + e.estimated_overcharge, 0);

  return (
    <div ref={containerRef} className="space-y-3">
      {/* Errors */}
      {state.errors.length > 0 && (
        <CollapsibleSection
          title="Billing Errors"
          icon={<AlertTriangle className="w-4 h-4" />}
          count={state.errors.length}
          metric={`-$${totalOvercharges.toLocaleString()}`}
          expanded={expandedSections.includes("audit")}
          onToggle={() => onToggleSection("audit")}
        >
          <ErrorsSection errors={state.errors} />
        </CollapsibleSection>
      )}

      {/* Benchmarks */}
      {state.benchmarks.length > 0 && (
        <CollapsibleSection
          title="Price Benchmarks"
          icon={<BarChart3 className="w-4 h-4" />}
          count={state.benchmarks.length}
          metric={state.benchmarkSummary ? `${state.benchmarkSummary.average_markup}x avg` : undefined}
          expanded={expandedSections.includes("benchmark")}
          onToggle={() => onToggleSection("benchmark")}
        >
          <BenchmarkSection benchmarks={state.benchmarks} />
        </CollapsibleSection>
      )}

      {/* Rights */}
      {state.protections.filter(p => p.applies).length > 0 && (
        <CollapsibleSection
          title="Legal Protections"
          icon={<Scale className="w-4 h-4" />}
          count={state.protections.filter(p => p.applies).length}
          expanded={expandedSections.includes("rights")}
          onToggle={() => onToggleSection("rights")}
        >
          <RightsSection protections={state.protections} charityCare={state.charityCare} />
        </CollapsibleSection>
      )}

      {/* Strategy */}
      {state.strategySteps.length > 0 && (
        <CollapsibleSection
          title="Negotiation Strategy"
          icon={<Shield className="w-4 h-4" />}
          count={state.strategySteps.length}
          expanded={expandedSections.includes("strategy")}
          onToggle={() => onToggleSection("strategy")}
        >
          <StrategySection steps={state.strategySteps} />
        </CollapsibleSection>
      )}

      {/* Loading skeleton */}
      {state.status === "streaming" && state.errors.length === 0 && state.benchmarks.length === 0 && (
        <div className="space-y-3">
          <div className="skeleton h-20 rounded-xl" />
          <div className="skeleton h-16 rounded-xl" />
        </div>
      )}
    </div>
  );
}
