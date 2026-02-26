# Quantum Trader AI

## Current State
Fresh Caffeine project with empty backend and a bare React+Tailwind frontend. No App.tsx exists yet. No backend logic.

## Requested Changes (Diff)

### Add
- Full stock/crypto prediction platform UI with dark futuristic trading terminal aesthetic
- Backend: market data fetching (crypto via HTTP outcalls, stocks via HTTP outcalls), technical indicators computation (SMA, EMA, RSI, MACD, volatility, momentum), sentiment scoring, ML-style prediction engine using gradient boosting logic on synthetic + computed features
- Backend stores prediction history and supports symbol-based queries
- Frontend pages: main prediction dashboard, prediction form, result card with confidence bar, animated line chart of recent prices, indicator display cards
- Dark theme with neon blue/cyan accents, glassmorphism cards, glow effects, animated transitions

### Modify
- App.tsx: replace empty shell with Quantum Trader AI application

### Remove
- Nothing to remove

## Implementation Plan
1. Generate Motoko backend with: prediction endpoint, indicator computation, sentiment simulation, synthetic market data generation, prediction history storage
2. Build frontend: App.tsx with trading terminal layout, PredictionForm, ResultCard with animated confidence, ChartView with Chart.js line chart, dark CSS theme with neon accents
3. Wire frontend to backend actor via generated bindings

## UX Notes
- Deep dark background (#0a0a0f), neon blue/cyan accents, glassmorphism cards
- Animated glowing title
- Color-coded signals: green=BULLISH, red=BEARISH, yellow=NEUTRAL
- Animated confidence progress bar
- Mobile responsive
- Always shows a result (no empty states after prediction)
