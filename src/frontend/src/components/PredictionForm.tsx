import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

interface PredictionFormProps {
  onPredict: (symbol: string, timeframe: string) => void;
  isLoading: boolean;
}

const QUICK_SYMBOLS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "AAPL", "TSLA", "NVDA"];
const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"];

export default function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [symbol, setSymbol] = useState("BTC/USDT");
  const [timeframe, setTimeframe] = useState("1h");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol.trim() || isLoading) return;
    onPredict(symbol.trim().toUpperCase(), timeframe);
  }

  return (
    <div className="glass-card p-5 slide-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Zap size={14} style={{ color: "var(--neon-cyan)" }} />
        <span className="section-label">Neural Prediction Engine</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Symbol Input */}
        <div>
          <label
            htmlFor="symbol-input"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
          >
            ASSET SYMBOL
          </label>
          <input
            id="symbol-input"
            type="text"
            className="terminal-input"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g. BTC/USDT, AAPL, ETH/USDT"
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {/* Quick-select chips */}
        <div className="flex flex-wrap gap-2">
          {QUICK_SYMBOLS.map((s) => (
            <button
              key={s}
              type="button"
              className={`symbol-chip${symbol.toUpperCase() === s ? " active" : ""}`}
              onClick={() => setSymbol(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Timeframe select */}
        <div>
          <label
            htmlFor="timeframe-select"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
          >
            TIMEFRAME
          </label>
          <select
            id="timeframe-select"
            className="terminal-select"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {TIMEFRAMES.map((tf) => (
              <option key={tf} value={tf}>
                {tf}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="predict-btn w-full flex items-center justify-center gap-2"
          disabled={isLoading || !symbol.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="spin" />
              <span>ANALYZING...</span>
            </>
          ) : (
            <>
              <Zap size={14} />
              <span>RUN PREDICTION</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
