# Quantum Trader AI – Neural Market Intelligence Engine

## Current State
- Blank Caffeine project scaffold with React + TypeScript frontend and empty Motoko backend.
- No application logic, pages, or components exist beyond the base scaffold.

## Requested Changes (Diff)

### Add
- Full trading prediction platform with AI-powered market analysis UI
- Backend canister with prediction logic, technical indicator computation, and simulated market data
- Frontend trading terminal: symbol input, timeframe selector, prediction results, confidence bar, indicator cards, price chart
- Futuristic dark theme with neon cyan/purple glowing accents
- Bullish/bearish signal display with color coding (green/red)
- Animated loading state during prediction
- Chart.js line chart rendering simulated recent price history
- RSI, MACD, SMA indicator display cards
- Error handling with user-friendly messages

### Modify
- index.css: replace default styles with futuristic dark trading terminal theme (neon cyan #00f5ff, purple #8b5cf6 accents on dark #0a0a0f background)
- App.tsx (or equivalent): become the orchestrator for prediction state, loading, and results

### Remove
- Nothing (empty scaffold, nothing to remove)

## Implementation Plan
1. Generate Motoko backend with:
   - predict(symbol: Text, timeframe: Text): returns prediction score, confidence, RSI, MACD, SMA
   - Synthetic data generation using deterministic math (no external HTTP calls)
   - Technical indicator calculations (RSI, MACD, SMA, EMA, volatility, momentum)
   - Sentiment simulation returning -1.0 to 1.0 float
   - Confidence scoring from indicator convergence
   - Bullish/bearish classification from prediction score
2. Build React frontend with:
   - PredictionForm component: symbol input + timeframe dropdown + predict button with spinner
   - ResultCard component: prediction score, bullish/bearish badge, confidence bar
   - IndicatorCards component: RSI, MACD, SMA displayed in grid
   - ChartView component: Chart.js line chart with simulated price history
   - Dark futuristic terminal aesthetic, neon cyan/purple on near-black background
   - Fully responsive layout
   - Actor integration via useActor hook calling backend predict function

## UX Notes
- Terminal aesthetic: monospace fonts for numeric values, glow effects on key elements
- Confidence bar: color transitions (red < 40%, yellow 40-65%, green > 65%)
- Signal badge: bright green "BULLISH" or red "BEARISH" pill
- Loading: animated spinner + pulsing "Analyzing market data..." text
- Chart: gradient fill, neon cyan line color, dark grid lines
- Indicator cards: subtle border glow matching signal direction
