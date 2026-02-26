import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Activity, Cpu, Globe, Heart } from "lucide-react";
import { useActor } from "./hooks/useActor";
import { PredictionForm } from "./components/quantum/PredictionForm";
import { ResultCard } from "./components/quantum/ResultCard";
import { IndicatorCards } from "./components/quantum/IndicatorCards";
import { ChartView } from "./components/quantum/ChartView";
import type { Prediction, PriceRecord, Indicators } from "./backend.d";

const DEFAULT_SYMBOL = "BTC/USDT";
const DEFAULT_TIMEFRAME = "1h";

// ── Decorative dots in header ─────────────────────────────────────────────────
function PulseDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 300, 600].map((delay) => (
        <div
          key={delay}
          className="w-2 h-2 rounded-full pulse-dot"
          style={{
            background: "oklch(0.88 0.18 193)",
            boxShadow: "0 0 4px oklch(0.88 0.18 193 / 0.8)",
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ── Section divider ────────────────────────────────────────────────────────────
function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.88 0.18 193 / 0.4) 40%, oklch(0.6 0.19 295 / 0.3) 60%, transparent)",
        }}
      />
      {label && (
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase px-3">
          {label}
        </span>
      )}
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.6 0.19 295 / 0.3) 40%, oklch(0.88 0.18 193 / 0.4) 60%, transparent)",
        }}
      />
    </div>
  );
}

// ── Error card ─────────────────────────────────────────────────────────────────
function ErrorCard({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      className="rounded-sm p-4 flex items-start gap-3 animate-fade-slide-up"
      style={{
        background: "oklch(0.62 0.22 25 / 0.08)",
        border: "1px solid oklch(0.62 0.22 25 / 0.5)",
        boxShadow: "0 0 16px oklch(0.62 0.22 25 / 0.1)",
      }}
    >
      <AlertTriangle
        className="shrink-0 mt-0.5"
        style={{ color: "oklch(0.62 0.22 25)", width: 16, height: 16 }}
      />
      <div className="flex-1">
        <div className="font-mono text-xs font-semibold mb-1" style={{ color: "oklch(0.62 0.22 25)" }}>
          Neural Analysis Error
        </div>
        <div className="font-mono text-xs text-muted-foreground">{message}</div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

// ── Status bar ─────────────────────────────────────────────────────────────────
function StatusBar({ symbol, loading }: { symbol: string; loading: boolean }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="flex items-center justify-between px-4 py-1.5 border-b"
      style={{
        background: "oklch(0.08 0.007 264)",
        borderColor: "oklch(0.18 0.012 264)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: loading ? "oklch(0.85 0.18 85)" : "oklch(0.75 0.19 145)",
              boxShadow: loading
                ? "0 0 4px oklch(0.85 0.18 85 / 0.8)"
                : "0 0 4px oklch(0.75 0.19 145 / 0.8)",
              animation: loading ? "pulse-dot 0.8s ease-in-out infinite" : undefined,
            }}
          />
          <span className="font-mono text-xs" style={{ color: "oklch(0.55 0.015 240)" }}>
            {loading ? "PROCESSING" : "LIVE"}
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: "oklch(0.88 0.18 193 / 0.7)" }}>
          {symbol}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Globe style={{ width: 10, height: 10, color: "oklch(0.55 0.015 240)" }} />
          <span className="font-mono text-xs" style={{ color: "oklch(0.45 0.015 240)" }}>
            ICP Mainnet
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: "oklch(0.45 0.015 240)" }}>
          {timeStr}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const { actor, isFetching: actorFetching } = useActor();

  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME);
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceRecord[]>([]);
  const [indicators, setIndicators] = useState<Indicators | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial price history
  const fetchPriceHistory = useCallback(
    async (sym: string) => {
      if (!actor) return;
      setChartLoading(true);
      try {
        const history = await actor.getPriceHistory(sym, BigInt(30));
        setPriceHistory(history);
      } catch (err) {
        console.error("Failed to fetch price history:", err);
      } finally {
        setChartLoading(false);
      }
    },
    [actor]
  );

  // On actor ready, fetch initial data
  useEffect(() => {
    if (actor && !actorFetching) {
      fetchPriceHistory(DEFAULT_SYMBOL);
    }
  }, [actor, actorFetching, fetchPriceHistory]);

  // Analyze market — run predict + getIndicators in parallel
  const handleAnalyze = useCallback(async () => {
    if (!actor || !symbol.trim()) return;
    setLoading(true);
    setError(null);
    setPrediction(null);
    setIndicators(null);

    try {
      const [predResult, indicResult, histResult] = await Promise.all([
        actor.predict(symbol.trim(), timeframe),
        actor.getIndicators(symbol.trim()),
        actor.getPriceHistory(symbol.trim(), BigInt(30)),
      ]);

      setPrediction(predResult);
      setIndicators(indicResult);
      setPriceHistory(histResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [actor, symbol, timeframe]);

  const showResults = !!(prediction && indicators);

  return (
    <div
      className="min-h-screen flex flex-col scanline"
      style={{ background: "oklch(0.07 0.006 264)" }}
    >
      {/* Animated grid background */}
      <div
        className="fixed inset-0 pointer-events-none bg-grid opacity-60"
        style={{ zIndex: 0 }}
      />

      {/* Radial glow center */}
      <div
        className="fixed pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.88 0.18 193 / 0.04) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Status bar */}
        <StatusBar symbol={symbol} loading={loading || actorFetching} />

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="px-4 sm:px-6 pt-8 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-2">
                  <PulseDots />
                  <span
                    className="font-mono text-xs tracking-widest uppercase"
                    style={{ color: "oklch(0.88 0.18 193 / 0.6)" }}
                  >
                    v2.4.1 · Neural Engine Active
                  </span>
                </div>

                {/* Main title */}
                <h1
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase title-flicker"
                  style={{
                    color: "oklch(0.88 0.18 193)",
                    textShadow:
                      "0 0 12px oklch(0.88 0.18 193 / 0.8), 0 0 32px oklch(0.88 0.18 193 / 0.4), 0 0 60px oklch(0.88 0.18 193 / 0.15)",
                  }}
                >
                  Quantum Trader AI
                </h1>

                {/* Subtitle */}
                <p
                  className="font-mono text-xs sm:text-sm mt-1.5 tracking-widest"
                  style={{ color: "oklch(0.6 0.19 295)" }}
                >
                  Neural Market Intelligence Engine
                </p>
              </div>

              {/* Right: system stats */}
              <div
                className="flex items-center gap-4 px-4 py-3 rounded-sm border self-start"
                style={{
                  background: "oklch(0.1 0.008 264)",
                  borderColor: "oklch(0.22 0.015 264)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Cpu style={{ width: 12, height: 12, color: "oklch(0.88 0.18 193)" }} />
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">Neural Cores</div>
                    <div
                      className="font-mono text-sm font-bold"
                      style={{ color: "oklch(0.88 0.18 193)" }}
                    >
                      128
                    </div>
                  </div>
                </div>
                <div className="w-px h-8" style={{ background: "oklch(0.22 0.015 264)" }} />
                <div className="flex items-center gap-1.5">
                  <Activity style={{ width: 12, height: 12, color: "oklch(0.6 0.19 295)" }} />
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">Model</div>
                    <div
                      className="font-mono text-sm font-bold"
                      style={{ color: "oklch(0.6 0.19 295)" }}
                    >
                      QTv4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <main className="flex-1 px-4 sm:px-6 pb-8">
          <div className="max-w-5xl mx-auto space-y-0">

            {/* Prediction form */}
            <section>
              <PredictionForm
                symbol={symbol}
                timeframe={timeframe}
                loading={loading}
                onSymbolChange={setSymbol}
                onTimeframeChange={setTimeframe}
                onAnalyze={handleAnalyze}
              />
            </section>

            {/* Error */}
            {error && (
              <div className="mt-4">
                <ErrorCard message={error} onDismiss={() => setError(null)} />
              </div>
            )}

            <SectionDivider label="Price Chart" />

            {/* Chart */}
            <section>
              <ChartView
                priceHistory={priceHistory}
                symbol={symbol}
                loading={chartLoading && priceHistory.length === 0}
              />
            </section>

            {/* Show results or empty state */}
            {showResults ? (
              <>
                <SectionDivider label="Analysis Results" />

                {/* Results grid */}
                <section
                  className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4"
                >
                  <ResultCard prediction={prediction!} symbol={symbol} />
                  <IndicatorCards indicators={indicators!} />
                </section>
              </>
            ) : (
              !loading && (
                <>
                  <SectionDivider />
                  {/* Empty state / onboarding */}
                  <div
                    className="text-center py-12 px-6 rounded-sm border"
                    style={{
                      background: "oklch(0.09 0.007 264)",
                      borderColor: "oklch(0.18 0.012 264)",
                      borderStyle: "dashed",
                    }}
                  >
                    <div
                      className="font-display text-3xl mb-3"
                      style={{
                        color: "oklch(0.88 0.18 193 / 0.2)",
                        textShadow: "none",
                      }}
                    >
                      ◈
                    </div>
                    <div
                      className="font-display text-sm tracking-widest uppercase mb-2"
                      style={{ color: "oklch(0.88 0.18 193 / 0.4)" }}
                    >
                      Awaiting Neural Analysis
                    </div>
                    <p className="font-mono text-xs text-muted-foreground max-w-xs mx-auto">
                      Enter a symbol and click "Analyze Market" to run the neural prediction engine.
                    </p>
                  </div>
                </>
              )
            )}
          </div>
        </main>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer
          className="px-4 sm:px-6 py-4 border-t"
          style={{ borderColor: "oklch(0.18 0.012 264)" }}
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="font-mono text-xs" style={{ color: "oklch(0.35 0.012 240)" }}>
              Quantum Trader AI · Neural Market Intelligence Engine
            </div>
            <div
              className="font-mono text-xs flex items-center gap-1"
              style={{ color: "oklch(0.35 0.012 240)" }}
            >
              © 2026. Built with{" "}
              <Heart
                className="inline"
                style={{ width: 10, height: 10, color: "oklch(0.62 0.22 25)", fill: "oklch(0.62 0.22 25)" }}
              />{" "}
              using{" "}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neon-cyan"
                style={{ color: "oklch(0.88 0.18 193 / 0.5)" }}
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
