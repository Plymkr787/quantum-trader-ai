import { useState } from "react";
import { Cpu, Activity, AlertCircle, Heart } from "lucide-react";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import ChartView from "./components/ChartView";
import HistoryTable from "./components/HistoryTable";
import { useGetHealth, usePredict } from "./hooks/useQueries";
import type { PredictionResult } from "./backend.d";

function StatusBar() {
  const { data: health, isLoading } = useGetHealth();

  return (
    <div className="status-bar flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 mb-6">
      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: health ? "var(--signal-green)" : "var(--text-muted)",
            boxShadow: health ? "0 0 6px rgba(0,255,136,0.8)" : "none",
            animation: health ? "blink 2s ease-in-out infinite" : "none",
          }}
        />
        <span
          className="font-mono text-xs font-semibold uppercase tracking-widest"
          style={{ color: health ? "var(--signal-green)" : "var(--text-muted)" }}
        >
          {isLoading ? "CONNECTING..." : health ? health.status.toUpperCase() : "OFFLINE"}
        </span>
      </div>

      {health && (
        <>
          <div className="flex items-center gap-1.5">
            <Cpu size={11} style={{ color: "var(--text-muted)" }} />
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              v{health.version}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity size={11} style={{ color: "var(--neon-cyan)" }} />
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              <span style={{ color: "var(--neon-cyan)" }}>
                {String(health.totalPredictions)}
              </span>
              {" "}predictions total
            </span>
          </div>
        </>
      )}

      {/* Right side — timestamp */}
      <div className="ml-auto font-mono text-xs" style={{ color: "var(--text-muted)" }}>
        <span className="cursor-blink" style={{ color: "var(--neon-cyan)" }}>█</span>
        {" "}NEURAL NET ONLINE
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-lg mb-4 slide-in"
      style={{
        background: "rgba(255,51,102,0.07)",
        border: "1px solid rgba(255,51,102,0.25)",
      }}
    >
      <AlertCircle size={15} style={{ color: "var(--signal-red)", flexShrink: 0, marginTop: "1px" }} />
      <div>
        <div
          className="text-xs font-bold uppercase tracking-wider mb-0.5"
          style={{ color: "var(--signal-red)" }}
        >
          Prediction Error
        </div>
        <div className="text-sm" style={{ color: "rgba(255,80,100,0.8)" }}>
          {message}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const predictMutation = usePredict();

  async function handlePredict(symbol: string, timeframe: string) {
    try {
      const data = await predictMutation.mutateAsync({ symbol, timeframe });
      setResult(data);
    } catch {
      // error is available via predictMutation.error
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Main content above overlays */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* ─── Header ─── */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
                border: "1px solid rgba(0,212,255,0.3)",
              }}
            >
              <Cpu size={16} style={{ color: "var(--neon-cyan)" }} />
            </div>
            <h1
              className="glow-title text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "Orbitron, Space Grotesk, monospace" }}
            >
              QUANTUM TRADER AI
            </h1>
          </div>
          <p
            className="font-mono text-xs sm:text-sm tracking-widest"
            style={{ color: "var(--text-muted)", letterSpacing: "0.2em" }}
          >
            NEURAL MARKET INTELLIGENCE ENGINE v2.0
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div
              className="h-px flex-1 max-w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,212,255,0.35))",
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--neon-cyan)", boxShadow: "0 0 8px rgba(0,212,255,0.8)" }}
            />
            <div
              className="h-px flex-1 max-w-24"
              style={{
                background:
                  "linear-gradient(270deg, transparent, rgba(0,212,255,0.35))",
              }}
            />
          </div>
        </header>

        {/* ─── Main layout ─── */}
        <main className="px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          {/* Status bar */}
          <StatusBar />

          {/* Error banner */}
          {predictMutation.isError && predictMutation.error && (
            <ErrorBanner message={predictMutation.error.message} />
          )}

          {/* Two-column desktop layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* ─── Left Column ─── */}
            <div className="flex flex-col gap-5">
              <PredictionForm
                onPredict={handlePredict}
                isLoading={predictMutation.isPending}
              />
              <HistoryTable />
            </div>

            {/* ─── Right Column ─── */}
            <div className="flex flex-col gap-5">
              {result ? (
                <>
                  <ResultCard result={result} />
                  <ChartView result={result} />
                </>
              ) : (
                <EmptyRightPanel isPending={predictMutation.isPending} />
              )}
            </div>
          </div>
        </main>

        {/* ─── Footer ─── */}
        <footer
          className="text-center py-6 px-4"
          style={{ borderTop: "1px solid rgba(0,212,255,0.07)" }}
        >
          <p
            className="font-mono text-xs flex items-center justify-center gap-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            © 2026. Built with
            <Heart size={11} style={{ color: "var(--neon-cyan)", fill: "var(--neon-cyan)" }} />
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--neon-cyan)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function EmptyRightPanel({ isPending }: { isPending: boolean }) {
  return (
    <div
      className="glass-card flex flex-col items-center justify-center py-16 px-8 text-center fade-in"
      style={{ minHeight: "360px" }}
    >
      {isPending ? (
        <>
          <div
            className="w-12 h-12 rounded-full border-2 spin mb-5"
            style={{
              borderColor: "rgba(0,212,255,0.2)",
              borderTopColor: "var(--neon-cyan)",
              boxShadow: "0 0 20px rgba(0,212,255,0.2)",
            }}
          />
          <p
            className="font-mono text-sm font-semibold tracking-widest"
            style={{ color: "var(--neon-cyan)" }}
          >
            ANALYZING MARKET DATA...
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Neural network processing signals
          </p>
        </>
      ) : (
        <>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.12)",
            }}
          >
            <Activity size={28} style={{ color: "rgba(0,212,255,0.4)" }} />
          </div>
          <p
            className="font-mono text-sm font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            AWAITING PREDICTION
          </p>
          <p className="text-xs mt-2 max-w-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
            Select an asset and timeframe, then run a prediction to see AI analysis here
          </p>
          <div className="flex items-center gap-1 mt-6">
            {(["dot-a", "dot-b", "dot-c"] as const).map((id, i) => (
              <div
                key={id}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "rgba(0,212,255,0.25)",
                  animation: `blink ${1 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
