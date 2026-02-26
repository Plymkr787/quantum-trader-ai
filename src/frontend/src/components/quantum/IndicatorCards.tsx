import type { Indicators } from "../../backend.d";

interface IndicatorCardsProps {
  indicators: Indicators;
}

type StatusLevel = "bullish" | "neutral" | "bearish" | "overbought" | "oversold";

function getRSIStatus(rsi: number): StatusLevel {
  if (rsi > 70) return "overbought";
  if (rsi > 60) return "neutral";
  if (rsi >= 40) return "bullish";
  if (rsi >= 30) return "neutral";
  return "oversold";
}

function getMACDStatus(macd: number): StatusLevel {
  if (macd > 0.5) return "bullish";
  if (macd > 0) return "neutral";
  if (macd > -0.5) return "neutral";
  return "bearish";
}

function getVolatilityStatus(vol: number): StatusLevel {
  if (vol > 0.05) return "bearish";
  if (vol > 0.02) return "neutral";
  return "bullish";
}

function getMomentumStatus(mom: number): StatusLevel {
  if (mom > 0.5) return "bullish";
  if (mom > 0) return "neutral";
  if (mom > -0.5) return "neutral";
  return "bearish";
}

function getSentimentStatus(sent: number): StatusLevel {
  if (sent > 0.6) return "bullish";
  if (sent > 0.4) return "neutral";
  return "bearish";
}

function getEMAStatus(ema: number, sma: number): StatusLevel {
  if (ema > sma * 1.01) return "bullish";
  if (ema < sma * 0.99) return "bearish";
  return "neutral";
}

const STATUS_COLORS: Record<StatusLevel, { dot: string; label: string; glow: string }> = {
  bullish:    { dot: "oklch(0.75 0.19 145)",  label: "Bullish",    glow: "oklch(0.75 0.19 145 / 0.5)" },
  neutral:    { dot: "oklch(0.85 0.18 85)",   label: "Neutral",    glow: "oklch(0.85 0.18 85 / 0.5)" },
  bearish:    { dot: "oklch(0.62 0.22 25)",   label: "Bearish",    glow: "oklch(0.62 0.22 25 / 0.5)" },
  overbought: { dot: "oklch(0.62 0.22 25)",   label: "Overbought", glow: "oklch(0.62 0.22 25 / 0.5)" },
  oversold:   { dot: "oklch(0.75 0.19 145)",  label: "Oversold",   glow: "oklch(0.75 0.19 145 / 0.5)" },
};

interface IndicatorCardProps {
  label: string;
  value: string;
  unit?: string;
  status: StatusLevel;
  description?: string;
  delay?: number;
}

function IndicatorCard({ label, value, unit, status, description, delay = 0 }: IndicatorCardProps) {
  const { dot, label: statusLabel, glow } = STATUS_COLORS[status];

  return (
    <div
      className="animate-fade-slide-up rounded-sm relative overflow-hidden"
      style={{
        background: "oklch(0.1 0.008 264)",
        border: "1px solid oklch(0.22 0.015 264)",
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 bottom-0 w-0.5"
        style={{
          background: `linear-gradient(180deg, transparent, ${dot}, transparent)`,
        }}
      />

      <div className="p-4 pl-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            {label}
          </span>
          {/* Status dot + label */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: dot,
                boxShadow: `0 0 4px ${glow}, 0 0 8px ${glow}`,
              }}
            />
            <span className="font-mono text-xs" style={{ color: dot }}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span
            className="font-mono text-2xl font-bold"
            style={{ color: "oklch(0.96 0.01 240)" }}
          >
            {value}
          </span>
          {unit && (
            <span className="font-mono text-xs text-muted-foreground">{unit}</span>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className="mt-1.5 font-mono text-xs text-muted-foreground leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export function IndicatorCards({ indicators }: IndicatorCardsProps) {
  const { rsi, macd, sma, ema, volatility, momentum, sentiment } = indicators;

  const cards: IndicatorCardProps[] = [
    {
      label: "RSI",
      value: rsi.toFixed(1),
      status: getRSIStatus(rsi),
      description: rsi > 70 ? "Overbought zone" : rsi < 30 ? "Oversold zone" : "Neutral territory",
      delay: 50,
    },
    {
      label: "MACD",
      value: macd >= 0 ? `+${macd.toFixed(4)}` : macd.toFixed(4),
      status: getMACDStatus(macd),
      description: macd > 0 ? "Bullish crossover" : "Bearish crossover",
      delay: 100,
    },
    {
      label: "SMA",
      value: sma.toFixed(2),
      status: getEMAStatus(ema, sma),
      description: ema > sma ? "EMA above SMA" : "EMA below SMA",
      delay: 150,
    },
    {
      label: "EMA",
      value: ema.toFixed(2),
      status: ema > sma ? "bullish" : ema < sma ? "bearish" : "neutral",
      description: "Exponential moving avg",
      delay: 200,
    },
    {
      label: "Volatility",
      value: (volatility * 100).toFixed(2),
      unit: "%",
      status: getVolatilityStatus(volatility),
      description: volatility > 0.05 ? "High volatility" : "Low volatility",
      delay: 250,
    },
    {
      label: "Momentum",
      value: momentum >= 0 ? `+${momentum.toFixed(3)}` : momentum.toFixed(3),
      status: getMomentumStatus(momentum),
      description: momentum > 0 ? "Positive momentum" : "Negative momentum",
      delay: 300,
    },
    {
      label: "Sentiment",
      value: (sentiment * 100).toFixed(0),
      unit: "%",
      status: getSentimentStatus(sentiment),
      description: sentiment > 0.6 ? "Positive market mood" : sentiment < 0.4 ? "Negative market mood" : "Mixed signals",
      delay: 350,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          Technical Indicators
        </span>
        <div className="h-px flex-1" style={{ background: "oklch(0.22 0.015 264)" }} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {cards.map((card) => (
          <IndicatorCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}
