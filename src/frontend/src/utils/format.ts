/**
 * Format a price value with appropriate decimal places.
 * > 1000  → 2 decimals
 * < 1     → 6 decimals
 * else    → 4 decimals
 */
export function formatPrice(price: number): string {
  if (price > 1000) return price.toFixed(2);
  if (price < 1) return price.toFixed(6);
  return price.toFixed(4);
}

/**
 * Format a percentage with explicit sign, 2 decimals, and % symbol.
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format confidence (0-1) as an integer percentage string.
 */
export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}

/**
 * Format a Unix bigint timestamp to a human-readable relative string.
 */
export function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const date = new Date(ms);
  const now = Date.now();
  const diffMs = now - ms;

  if (diffMs < 60_000) return "just now";
  if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)}m ago`;
  if (diffMs < 86_400_000) return `${Math.floor(diffMs / 3_600_000)}h ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
