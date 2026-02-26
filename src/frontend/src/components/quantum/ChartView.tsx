import type { PriceRecord } from "../../backend.d";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface ChartViewProps {
  priceHistory: PriceRecord[];
  symbol: string;
  loading?: boolean;
}

interface ChartDataPoint {
  time: string;
  price: number;
  index: number;
}

const NEON_CYAN = "oklch(0.88 0.18 193)";

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts);
  const d = new Date(ms < 1e12 ? ms * 1000 : ms);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function SkeletonChart() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4">
      <div className="flex gap-4 mb-2">
        {[40, 60, 30, 50, 45].map((w) => (
          <div key={`sk-${w}`} className="skeleton h-3 rounded-xs" style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className="flex-1 flex items-end gap-1">
        {Array.from({ length: 20 }, (_, i) => ({
          id: i,
          h: 30 + Math.sin(i * 0.8) * 20 + 10,
        })).map(({ id, h }) => (
          <div
            key={`bar-${id}`}
            className="skeleton flex-1 rounded-xs"
            style={{ height: `${h}%`, animationDelay: `${id * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-sm px-3 py-2 border"
      style={{
        background: "oklch(0.12 0.01 264)",
        borderColor: "oklch(0.88 0.18 193 / 0.4)",
        boxShadow: "0 0 12px oklch(0.88 0.18 193 / 0.2)",
      }}
    >
      <div className="font-mono text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-mono text-sm font-bold" style={{ color: NEON_CYAN }}>
        ${payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
}

export function ChartView({ priceHistory, symbol, loading = false }: ChartViewProps) {
  const chartData: ChartDataPoint[] = priceHistory.map((record, i) => ({
    time: formatTimestamp(record.timestamp),
    price: record.price,
    index: i,
  }));

  const prices = chartData.map((d) => d.price);
  const minPrice = prices.length ? Math.min(...prices) * 0.9995 : 0;
  const maxPrice = prices.length ? Math.max(...prices) * 1.0005 : 100;

  const priceChange =
    prices.length >= 2
      ? ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100
      : 0;
  const isUp = priceChange >= 0;

  const lineColor = isUp ? NEON_CYAN : "oklch(0.62 0.22 25)";
  const lineGradientId = "priceGradient";

  return (
    <div
      className="w-full rounded-sm relative overflow-hidden"
      style={{
        background: "oklch(0.1 0.008 264)",
        border: "1px solid oklch(0.22 0.015 264)",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
        }}
      />

      <div className="p-4">
        {/* Chart header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold" style={{ color: NEON_CYAN }}>
                {symbol}
              </span>
              <span className="font-mono text-xs text-muted-foreground">Price History</span>
            </div>
            {chartData.length > 0 && (
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-xl font-bold" style={{ color: "oklch(0.96 0.01 240)" }}>
                  $
                  {prices[prices.length - 1]?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "—"}
                </span>
                <span
                  className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded-xs"
                  style={{
                    color: isUp ? "oklch(0.75 0.19 145)" : "oklch(0.62 0.22 25)",
                    background: isUp ? "oklch(0.75 0.19 145 / 0.12)" : "oklch(0.62 0.22 25 / 0.12)",
                  }}
                >
                  {isUp ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-right">
            {chartData.length > 0 && (
              <>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">High</div>
                  <div className="font-mono text-sm font-semibold" style={{ color: "oklch(0.75 0.19 145)" }}>
                    ${Math.max(...prices).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">Low</div>
                  <div className="font-mono text-sm font-semibold" style={{ color: "oklch(0.62 0.22 25)" }}>
                    ${Math.min(...prices).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">Points</div>
                  <div className="font-mono text-sm font-semibold" style={{ color: "oklch(0.88 0.18 193)" }}>
                    {chartData.length}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chart area */}
        <div className="w-full" style={{ height: 220 }}>
          {loading ? (
            <SkeletonChart />
          ) : chartData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground">No price data available</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={lineGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={lineColor} stopOpacity={0.25} />
                    <stop offset="60%" stopColor={lineColor} stopOpacity={0.05} />
                    <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="oklch(0.22 0.015 264)"
                  strokeOpacity={0.5}
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "oklch(0.45 0.015 240)" }}
                  axisLine={{ stroke: "oklch(0.22 0.015 264)" }}
                  tickLine={false}
                  interval="preserveStartEnd"
                />

                <YAxis
                  domain={[minPrice, maxPrice]}
                  tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "oklch(0.45 0.015 240)" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                  tickFormatter={(v: number) =>
                    v >= 1000
                      ? `$${(v / 1000).toFixed(1)}k`
                      : `$${v.toFixed(2)}`
                  }
                />

                <Tooltip content={<CustomTooltip />} />

                {prices.length > 1 && (
                  <ReferenceLine
                    y={prices[0]}
                    stroke="oklch(0.55 0.015 240)"
                    strokeDasharray="3 3"
                    strokeOpacity={0.4}
                  />
                )}

                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={lineColor}
                  strokeWidth={2}
                  fill={`url(#${lineGradientId})`}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: lineColor,
                    stroke: "oklch(0.07 0.006 264)",
                    strokeWidth: 2,
                    style: { filter: `drop-shadow(0 0 4px ${lineColor})` },
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
