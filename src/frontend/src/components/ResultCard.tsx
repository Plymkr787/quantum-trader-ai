import type { PredictionResult } from "../backend.d";
import { formatPrice, formatPercent, formatConfidence } from "../utils/format";
import { TrendingUp, TrendingDown, Minus, Brain } from "lucide-react";

interface ResultCardProps {
  result: PredictionResult;
}

function getSignalClass(signal: string): string {
  const s = signal.toUpperCase();
  if (s === "BULLISH") return "signal-bullish";
  if (s === "BEARISH") return "signal-bearish";
  return "signal-neutral";
}

function getSignalIcon(signal: string) {
  const s = signal.toUpperCase();
  if (s === "BULLISH") return <TrendingUp size={20} />;
  if (s === "BEARISH") return <TrendingDown size={20} />;
  return <Minus size={20} />;
}

function getConfidenceFillColor(signal: string): string {
  const s = signal.toUpperCase();
  if (s === "BULLISH") return "linear-gradient(90deg, rgba(0,255,136,0.5), #00ff88)";
  if (s === "BEARISH") return "linear-gradient(90deg, rgba(255,51,102,0.5), #ff3366)";
  return "linear-gradient(90deg, rgba(255,215,0,0.5), #ffd700)";
}

function DotIndicator({ positive }: { positive: boolean | null }) {
  if (positive === null) {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full shrink-0"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />
    );
  }
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{
        background: positive ? "var(--signal-green)" : "var(--signal-red)",
        boxShadow: positive
          ? "0 0 4px rgba(0,255,136,0.6)"
          : "0 0 4px rgba(255,51,102,0.6)",
      }}
    />
  );
}

interface IndicatorCardProps {
  name: string;
  value: string;
  positive: boolean | null;
}

function IndicatorCard({ name, value, positive }: IndicatorCardProps) {
  return (
    <div className="indicator-card">
      <div className="flex items-center justify-between mb-1">
        <span className="section-label" style={{ fontSize: "0.58rem" }}>
          {name}
        </span>
        <DotIndicator positive={positive} />
      </div>
      <span
        className="font-mono text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ResultCard({ result }: ResultCardProps) {
  const signalClass = getSignalClass(result.signal);
  const signalUpper = result.signal.toUpperCase();
  const confidencePct = Math.round(result.confidence * 100);
  const changePositive = result.predictedChangePercent >= 0;

  // Sentiment bar (clamped to -1..1, displayed as 0-100% for positioning)
  const sentimentNormalized = Math.max(-1, Math.min(1, result.sentimentScore));
  const sentimentLeft = ((sentimentNormalized + 1) / 2) * 100;
  const sentimentLabel = result.sentimentLabel.toLowerCase();

  const rsiPositive =
    result.rsi < 30 ? true : result.rsi > 70 ? false : null;
  const macdPositive = result.macd >= 0 ? true : false;
  const momentumPositive = result.momentum >= 0 ? true : false;
  const sentimentPositive =
    sentimentLabel === "bullish"
      ? true
      : sentimentLabel === "bearish"
        ? false
        : null;

  return (
    <div className="glass-card p-5 slide-in space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Brain size={14} style={{ color: "var(--neon-cyan)" }} />
        <span className="section-label">AI Prediction Result</span>
      </div>

      {/* Signal + Price row */}
      <div className="flex items-start justify-between gap-4">
        {/* Signal badge */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-bold text-lg tracking-widest ${signalClass}`}
          style={{ fontFamily: "Orbitron, monospace", letterSpacing: "0.15em" }}
        >
          {getSignalIcon(result.signal)}
          <span>{signalUpper}</span>
        </div>

        {/* Price block */}
        <div className="text-right">
          <div className="section-label mb-1">CURRENT PRICE</div>
          <div
            className="font-mono text-xl font-bold"
            style={{ color: "var(--neon-cyan)" }}
          >
            ${formatPrice(result.currentPrice)}
          </div>
          <div
            className="font-mono text-sm font-semibold mt-0.5"
            style={{ color: changePositive ? "var(--signal-green)" : "var(--signal-red)" }}
          >
            {formatPercent(result.predictedChangePercent)} predicted
          </div>
        </div>
      </div>

      {/* Symbol + Timeframe */}
      <div className="flex gap-3">
        <div
          className="text-xs font-mono px-2.5 py-1 rounded"
          style={{
            background: "rgba(0,212,255,0.07)",
            border: "1px solid rgba(0,212,255,0.18)",
            color: "var(--neon-cyan)",
          }}
        >
          {result.symbol}
        </div>
        <div
          className="text-xs font-mono px-2.5 py-1 rounded"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.25)",
            color: "#a78bfa",
          }}
        >
          {result.timeframe}
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="section-label">CONFIDENCE</span>
          <span
            className="font-mono text-sm font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {formatConfidence(result.confidence)}
          </span>
        </div>
        <div className="confidence-bar-track">
          <div
            className="confidence-bar-fill"
            style={{
              width: `${confidencePct}%`,
              background: getConfidenceFillColor(result.signal),
            }}
          />
        </div>
      </div>

      {/* Indicators grid */}
      <div>
        <span className="section-label block mb-2">TECHNICAL INDICATORS</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <IndicatorCard
            name="RSI"
            value={result.rsi.toFixed(2)}
            positive={rsiPositive}
          />
          <IndicatorCard
            name="SMA"
            value={`$${formatPrice(result.sma)}`}
            positive={result.currentPrice >= result.sma ? true : false}
          />
          <IndicatorCard
            name="MACD"
            value={result.macd.toFixed(4)}
            positive={macdPositive}
          />
          <IndicatorCard
            name="VOLATILITY"
            value={`${(result.volatility * 100).toFixed(2)}%`}
            positive={null}
          />
          <IndicatorCard
            name="MOMENTUM"
            value={result.momentum.toFixed(4)}
            positive={momentumPositive}
          />
          <IndicatorCard
            name="SENTIMENT"
            value={result.sentimentLabel.toUpperCase()}
            positive={sentimentPositive}
          />
        </div>
      </div>

      {/* Sentiment score bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="section-label">SENTIMENT SCORE</span>
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            {result.sentimentScore.toFixed(3)}
          </span>
        </div>
        <div className="relative h-3 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          {/* Center line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: "50%", background: "rgba(255,255,255,0.12)" }}
          />
          {/* Score indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
            style={{
              left: `${sentimentLeft}%`,
              transform: `translate(-50%, -50%)`,
              background:
                sentimentPositive === true
                  ? "var(--signal-green)"
                  : sentimentPositive === false
                    ? "var(--signal-red)"
                    : "var(--signal-yellow)",
              borderColor: "rgba(255,255,255,0.2)",
              boxShadow:
                sentimentPositive === true
                  ? "0 0 6px rgba(0,255,136,0.7)"
                  : sentimentPositive === false
                    ? "0 0 6px rgba(255,51,102,0.7)"
                    : "0 0 6px rgba(255,215,0,0.7)",
              transition: "left 0.8s ease",
            }}
          />
          {/* Fill */}
          {sentimentNormalized >= 0 ? (
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: "50%",
                width: `${(sentimentNormalized / 2) * 100}%`,
                background: "linear-gradient(90deg, rgba(0,255,136,0.15), rgba(0,255,136,0.35))",
                transition: "width 0.8s ease",
              }}
            />
          ) : (
            <div
              className="absolute top-0 bottom-0"
              style={{
                right: "50%",
                width: `${(Math.abs(sentimentNormalized) / 2) * 100}%`,
                background: "linear-gradient(270deg, rgba(255,51,102,0.15), rgba(255,51,102,0.35))",
                transition: "width 0.8s ease",
              }}
            />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-xs" style={{ color: "var(--signal-red)", opacity: 0.6 }}>−1</span>
          <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>0</span>
          <span className="font-mono text-xs" style={{ color: "var(--signal-green)", opacity: 0.6 }}>+1</span>
        </div>
      </div>
    </div>
  );
}
