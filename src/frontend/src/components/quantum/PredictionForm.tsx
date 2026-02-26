import { useState } from "react";
import { Loader2, Zap, ChevronDown } from "lucide-react";

interface PredictionFormProps {
  symbol: string;
  timeframe: string;
  loading: boolean;
  onSymbolChange: (symbol: string) => void;
  onTimeframeChange: (timeframe: string) => void;
  onAnalyze: () => void;
}

const TIMEFRAMES = [
  { value: "1m",  label: "1 Min" },
  { value: "5m",  label: "5 Min" },
  { value: "15m", label: "15 Min" },
  { value: "1h",  label: "1 Hour" },
  { value: "4h",  label: "4 Hour" },
  { value: "1d",  label: "1 Day" },
];

const COMMON_SYMBOLS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "AAPL", "TSLA", "NVDA"];

export function PredictionForm({
  symbol,
  timeframe,
  loading,
  onSymbolChange,
  onTimeframeChange,
  onAnalyze,
}: PredictionFormProps) {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = COMMON_SYMBOLS.filter(
    (s) => s.toLowerCase().includes(symbol.toLowerCase()) && s !== symbol
  );

  const handleSelectSuggestion = (s: string) => {
    onSymbolChange(s);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full">
      {/* Section label */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          Neural Analysis Parameters
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        {/* Symbol input */}
        <div className="flex-1 relative">
          <label
            htmlFor="symbol-input"
            className="block font-mono text-xs text-muted-foreground mb-1.5 tracking-widest uppercase"
          >
            Asset Symbol
          </label>
          <div
            className="relative"
            style={{
              filter: focused
                ? "drop-shadow(0 0 6px oklch(0.88 0.18 193 / 0.4))"
                : undefined,
            }}
          >
            <input
              id="symbol-input"
              type="text"
              value={symbol}
              onChange={(e) => {
                onSymbolChange(e.target.value.toUpperCase());
                setShowSuggestions(true);
              }}
              onFocus={() => {
                setFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setFocused(false);
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              placeholder="BTC/USDT, ETH/USDT, AAPL..."
              className="w-full font-mono text-sm bg-surface-2 border rounded-sm px-3 py-2.5 transition-all duration-200 placeholder:text-muted-foreground/40"
              style={{
                borderColor: focused
                  ? "oklch(0.88 0.18 193)"
                  : "oklch(0.22 0.015 264)",
                color: "oklch(0.88 0.18 193)",
                background: "oklch(0.13 0.012 264)",
              }}
            />
          </div>
          {/* Autocomplete suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              className="absolute z-20 w-full mt-1 border rounded-sm overflow-hidden"
              style={{
                background: "oklch(0.15 0.012 264)",
                borderColor: "oklch(0.88 0.18 193 / 0.4)",
                boxShadow: "0 8px 24px oklch(0 0 0 / 0.5)",
              }}
            >
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseDown={() => handleSelectSuggestion(s)}
                  className="w-full text-left font-mono text-xs px-3 py-2 transition-colors duration-100 hover:bg-neon-cyan/10"
                  style={{ color: "oklch(0.88 0.18 193)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Timeframe select */}
        <div className="sm:w-36 relative">
          <label
            htmlFor="timeframe-select"
            className="block font-mono text-xs text-muted-foreground mb-1.5 tracking-widest uppercase"
          >
            Timeframe
          </label>
          <div className="relative">
            <select
              id="timeframe-select"
              value={timeframe}
              onChange={(e) => onTimeframeChange(e.target.value)}
              className="w-full font-mono text-sm rounded-sm px-3 py-2.5 pr-8 appearance-none transition-all duration-200 cursor-pointer"
              style={{
                background: "oklch(0.13 0.012 264)",
                borderColor: "oklch(0.22 0.015 264)",
                color: "oklch(0.88 0.18 193)",
                border: "1px solid oklch(0.22 0.015 264)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.88 0.18 193)";
                e.currentTarget.style.boxShadow = "0 0 6px oklch(0.88 0.18 193 / 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.22 0.015 264)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {TIMEFRAMES.map((tf) => (
                <option
                  key={tf.value}
                  value={tf.value}
                  style={{ background: "oklch(0.13 0.012 264)", color: "oklch(0.88 0.18 193)" }}
                >
                  {tf.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "oklch(0.88 0.18 193)", width: 14, height: 14 }}
            />
          </div>
        </div>

        {/* Analyze button */}
        <div className="sm:w-auto">
          <button
            type="button"
            onClick={onAnalyze}
            disabled={loading || !symbol.trim()}
            className="relative w-full sm:w-auto font-display text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            style={{
              background: loading
                ? "oklch(0.88 0.18 193 / 0.15)"
                : "oklch(0.88 0.18 193 / 0.12)",
              border: "1px solid oklch(0.88 0.18 193)",
              color: "oklch(0.88 0.18 193)",
              boxShadow: loading ? undefined : "0 0 8px oklch(0.88 0.18 193 / 0.3), inset 0 0 12px oklch(0.88 0.18 193 / 0.05)",
            }}
          >
            {/* Hover fill */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "oklch(0.88 0.18 193 / 0.08)" }}
            />
            {/* Content */}
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="neural-pulse">Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5" />
                  Analyze Market
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Loading text */}
      {loading && (
        <div className="mt-3 flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ background: "oklch(0.88 0.18 193)", animationDelay: "0ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ background: "oklch(0.88 0.18 193)", animationDelay: "300ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ background: "oklch(0.88 0.18 193)", animationDelay: "600ms" }}
          />
          <span className="font-mono text-xs neural-pulse" style={{ color: "oklch(0.88 0.18 193 / 0.7)" }}>
            Analyzing neural patterns... processing market data
          </span>
        </div>
      )}
    </div>
  );
}
