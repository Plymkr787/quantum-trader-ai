import { History, Trash2, Clock } from "lucide-react";
import type { HistoryRecord } from "../backend.d";
import { formatPercent, formatConfidence, formatTimestamp } from "../utils/format";
import { useGetPredictionHistory, useClearHistory } from "../hooks/useQueries";

function SignalBadge({ signal }: { signal: string }) {
  const s = signal.toUpperCase();
  const cls =
    s === "BULLISH" ? "signal-bullish" : s === "BEARISH" ? "signal-bearish" : "signal-neutral";

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-bold border font-mono tracking-wider ${cls}`}
      style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
    >
      {s}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <Clock size={24} style={{ color: "var(--text-muted)", opacity: 0.4 }} />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        No predictions yet
      </p>
      <p className="text-xs" style={{ color: "var(--text-dim)", opacity: 0.6 }}>
        Run a prediction to see history here
      </p>
    </div>
  );
}

export default function HistoryTable() {
  const { data: history = [], isLoading } = useGetPredictionHistory();
  const clearMutation = useClearHistory();

  // Sort newest first, take max 10
  const sorted = [...history]
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .slice(0, 10);

  return (
    <div className="glass-card p-5 slide-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History size={14} style={{ color: "var(--neon-cyan)" }} />
          <span className="section-label">Prediction History</span>
          {sorted.length > 0 && (
            <span
              className="font-mono text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.18)",
                color: "var(--neon-cyan)",
              }}
            >
              {sorted.length}
            </span>
          )}
        </div>
        {sorted.length > 0 && (
          <button
            type="button"
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all"
            style={{
              background: "rgba(255,51,102,0.07)",
              border: "1px solid rgba(255,51,102,0.2)",
              color: "var(--signal-red)",
              opacity: clearMutation.isPending ? 0.5 : 1,
              cursor: clearMutation.isPending ? "not-allowed" : "pointer",
            }}
          >
            <Trash2 size={11} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div
            className="w-6 h-6 rounded-full border-2 spin"
            style={{ borderColor: "rgba(0,212,255,0.3)", borderTopColor: "var(--neon-cyan)" }}
          />
        </div>
      ) : sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["SYMBOL", "TF", "SIGNAL", "CHANGE", "CONF", "TIME"].map((col) => (
                  <th
                    key={col}
                    className="text-left pb-2 pr-3"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(0,212,255,0.1)",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((record: HistoryRecord) => (
                <tr key={String(record.id)} className="terminal-row">
                  <td
                    className="py-2 pr-3 font-mono text-xs font-semibold"
                    style={{ color: "var(--neon-cyan)" }}
                  >
                    {record.symbol}
                  </td>
                  <td
                    className="py-2 pr-3 font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {record.timeframe}
                  </td>
                  <td className="py-2 pr-3">
                    <SignalBadge signal={record.signal} />
                  </td>
                  <td
                    className="py-2 pr-3 font-mono text-xs font-semibold"
                    style={{
                      color:
                        record.predictedChangePercent >= 0
                          ? "var(--signal-green)"
                          : "var(--signal-red)",
                    }}
                  >
                    {formatPercent(record.predictedChangePercent)}
                  </td>
                  <td
                    className="py-2 pr-3 font-mono text-xs"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {formatConfidence(record.confidence)}
                  </td>
                  <td
                    className="py-2 font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatTimestamp(record.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
