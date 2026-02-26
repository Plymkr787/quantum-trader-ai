import type { Prediction } from "../../backend.d";

interface ResultCardProps {
  prediction: Prediction;
  symbol: string;
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);

  let barColor: string;
  let glowColor: string;
  let label: string;
  if (pct < 40) {
    barColor = "oklch(0.62 0.22 25)";
    glowColor = "oklch(0.62 0.22 25 / 0.4)";
    label = "Low";
  } else if (pct < 65) {
    barColor = "oklch(0.85 0.18 85)";
    glowColor = "oklch(0.85 0.18 85 / 0.4)";
    label = "Moderate";
  } else {
    barColor = "oklch(0.75 0.19 145)";
    glowColor = "oklch(0.75 0.19 145 / 0.4)";
    label = "High";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          Confidence
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold" style={{ color: barColor }}>
            {label}
          </span>
          <span className="font-mono text-sm font-bold" style={{ color: barColor }}>
            {pct}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div
        className="relative h-2 w-full rounded-xs overflow-hidden"
        style={{ background: "oklch(0.17 0.014 264)" }}
      >
        {/* Fill */}
        <div
          className="h-full rounded-xs transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: barColor,
            boxShadow: `0 0 8px ${glowColor}, 0 0 16px ${glowColor}`,
          }}
        />
        {/* Tick marks */}
        {[25, 50, 75].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${tick}%`,
              background: "oklch(0.07 0.006 264 / 0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ResultCard({ prediction, symbol }: ResultCardProps) {
  const { prediction: score, signal, confidence, ema, sma, rsi } = prediction;

  const isPositive = score >= 0;
  const scoreColor = isPositive ? "oklch(0.75 0.19 145)" : "oklch(0.62 0.22 25)";
  const scoreGlow = isPositive
    ? "oklch(0.75 0.19 145 / 0.4)"
    : "oklch(0.62 0.22 25 / 0.4)";

  const isBullish = signal.toLowerCase().includes("bull") || signal.toLowerCase() === "buy";
  const signalColor = isBullish ? "oklch(0.75 0.19 145)" : "oklch(0.62 0.22 25)";
  const signalBg = isBullish ? "oklch(0.75 0.19 145 / 0.12)" : "oklch(0.62 0.22 25 / 0.12)";
  const signalBorder = isBullish ? "oklch(0.75 0.19 145 / 0.5)" : "oklch(0.62 0.22 25 / 0.5)";

  const formattedScore = (score >= 0 ? "+" : "") + score.toFixed(4);

  return (
    <div
      className="animate-fade-slide-up rounded-sm relative overflow-hidden"
      style={{
        background: "oklch(0.1 0.008 264)",
        border: "1px solid oklch(0.22 0.015 264)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${scoreColor}, transparent)`,
        }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1">
              Neural Prediction
            </div>
            <div className="font-mono text-xs" style={{ color: "oklch(0.88 0.18 193 / 0.6)" }}>
              {symbol}
            </div>
          </div>
          {/* Signal badge */}
          <div
            className="font-display text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm border"
            style={{
              color: signalColor,
              background: signalBg,
              borderColor: signalBorder,
              boxShadow: `0 0 8px ${isBullish ? "oklch(0.75 0.19 145 / 0.2)" : "oklch(0.62 0.22 25 / 0.2)"}`,
            }}
          >
            {isBullish ? "▲ BULLISH" : "▼ BEARISH"}
          </div>
        </div>

        {/* Score */}
        <div className="mb-5">
          <div
            className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none"
            style={{
              color: scoreColor,
              textShadow: `0 0 16px ${scoreGlow}, 0 0 40px ${scoreGlow}`,
            }}
          >
            {formattedScore}
          </div>
          <div className="font-mono text-xs text-muted-foreground mt-1">
            prediction score
          </div>
        </div>

        {/* Confidence bar */}
        <ConfidenceBar confidence={confidence} />

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t" style={{ borderColor: "oklch(0.22 0.015 264)" }}>
          {[
            { label: "EMA", value: ema.toFixed(2) },
            { label: "SMA", value: sma.toFixed(2) },
            { label: "RSI", value: rsi.toFixed(1) },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-0.5">
                {label}
              </div>
              <div className="font-mono text-sm font-semibold" style={{ color: "oklch(0.88 0.18 193)" }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
