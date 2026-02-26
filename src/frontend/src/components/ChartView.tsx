import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import type { PredictionResult } from "../backend.d";
import { formatPrice } from "../utils/format";
import { BarChart2 } from "lucide-react";

interface ChartViewProps {
  result: PredictionResult;
}

interface TooltipPayload {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="glass-card px-3 py-2"
      style={{
        border: "1px solid rgba(0,212,255,0.3)",
        minWidth: "120px",
      }}
    >
      <div className="section-label mb-1">{label}</div>
      <div className="font-mono text-sm font-bold" style={{ color: "var(--neon-cyan)" }}>
        ${formatPrice(payload[0].value)}
      </div>
    </div>
  );
}

export default function ChartView({ result }: ChartViewProps) {
  const { recentPrices, symbol } = result;

  const chartData = useMemo(() => {
    const count = recentPrices.length;
    return recentPrices.map((price, i) => ({
      label: i === count - 1 ? "Now" : `T-${count - 1 - i}`,
      price,
    }));
  }, [recentPrices]);

  const lastIndex = chartData.length - 1;
  const lastPoint = chartData[lastIndex];

  const minPrice = Math.min(...recentPrices);
  const maxPrice = Math.max(...recentPrices);
  const padding = (maxPrice - minPrice) * 0.12;
  const yMin = minPrice - padding;
  const yMax = maxPrice + padding;

  return (
    <div className="glass-card p-5 slide-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 size={14} style={{ color: "var(--neon-cyan)" }} />
          <span className="section-label">Price History</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "var(--neon-cyan)",
            }}
          >
            {symbol}
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.04)" }}
          >
            {recentPrices.length} pts
          </span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0,212,255,0.09)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#4a6080", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0,212,255,0.1)" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fill: "#4a6080", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `$${formatPrice(v)}`}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00d4ff"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#00d4ff",
                stroke: "rgba(0,212,255,0.35)",
                strokeWidth: 6,
              }}
            />
            {/* Highlight last point */}
            {lastPoint && (
              <ReferenceDot
                x={lastPoint.label}
                y={lastPoint.price}
                r={5}
                fill="#00d4ff"
                stroke="rgba(0,212,255,0.5)"
                strokeWidth={4}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Price stats */}
      <div className="flex justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div>
          <div className="section-label mb-0.5">LOW</div>
          <div className="font-mono text-xs font-semibold" style={{ color: "var(--signal-red)" }}>
            ${formatPrice(minPrice)}
          </div>
        </div>
        <div className="text-center">
          <div className="section-label mb-0.5">CURRENT</div>
          <div className="font-mono text-xs font-bold" style={{ color: "var(--neon-cyan)" }}>
            ${formatPrice(result.currentPrice)}
          </div>
        </div>
        <div className="text-right">
          <div className="section-label mb-0.5">HIGH</div>
          <div className="font-mono text-xs font-semibold" style={{ color: "var(--signal-green)" }}>
            ${formatPrice(maxPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
