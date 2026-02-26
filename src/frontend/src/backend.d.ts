import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HistoryRecord {
    id: bigint;
    timeframe: string;
    timestamp: bigint;
    signal: string;
    predictedChangePercent: number;
    confidence: number;
    symbol: string;
}
export interface HealthStatus {
    status: string;
    totalPredictions: bigint;
    version: string;
}
export interface PredictionResult {
    rsi: number;
    sma: number;
    recentPrices: Array<number>;
    currentPrice: number;
    volatility: number;
    sentimentLabel: string;
    timeframe: string;
    sentimentScore: number;
    macd: number;
    momentum: number;
    signal: string;
    predictedChangePercent: number;
    confidence: number;
    symbol: string;
}
export interface backendInterface {
    clearHistory(): Promise<void>;
    getHealth(): Promise<HealthStatus>;
    getPredictionHistory(): Promise<Array<HistoryRecord>>;
    getSupportedSymbols(): Promise<Array<string>>;
    predict(symbol: string, timeframe: string): Promise<PredictionResult>;
}
