import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PriceRecord {
    volume: number;
    timestamp: bigint;
    price: number;
}
export interface Indicators {
    ema: number;
    rsi: number;
    sma: number;
    volatility: number;
    macd: number;
    sentiment: number;
    momentum: number;
}
export interface Prediction {
    ema: number;
    rsi: number;
    sma: number;
    prediction: number;
    macd: number;
    signal: string;
    confidence: number;
}
export interface backendInterface {
    getIndicators(symbol: string): Promise<Indicators>;
    getPriceHistory(symbol: string, limit: bigint): Promise<Array<PriceRecord>>;
    predict(symbol: string, timeframe: string): Promise<Prediction>;
}
