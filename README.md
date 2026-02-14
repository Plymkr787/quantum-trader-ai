# QUANTUM TRADE AI

A professional AI-powered financial trading platform with real-time market data, AI predictions, and technical analysis dashboard.

![Quantum Trade AI](screenshot.png)

## Features

### Market Data Integration
- Real-time S&P 500, Dow Jones Industrial Average, and Nasdaq data
- Individual stock analysis for: NVDA, MSFT, AMZN, NFLX, COIN, TSLA, AAPL, GOOGL, META, AMD
- Cryptocurrency tracking: Bitcoin (BTC-USD) and Ethereum (ETH-USD)

### AI Analysis Engine
- Technical indicators: RSI, MACD, Bollinger Bands, Moving Averages
- AI scoring algorithm (0-100) based on valuation metrics, growth indicators, technical signals
- Pattern recognition: Bullish Engulfing, Golden Cross, Death Cross, Double Bottom
- Confidence scoring with visual progress rings

### Top 5 Stock Picks
- Ranked table with Symbol, Company Name, Current Price, AI Target Price
- Upside Potential %, AI Score (0-100), Conversion Rate %
- Best Buy Date, Optimal Sell Date, Risk Level

### Cryptocurrency Predictions
- Separate cards for BTC and ETH showing current vs predicted prices
- Recommendation (BUY/SELL/HOLD) with confidence %
- Optimal entry price, target exit, stop-loss levels
- Best trading times (UTC)

## Tech Stack

- **React + TypeScript + Vite**
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for animations
- **Three.js + React Three Fiber** for particle background
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quantum-trade-ai.git
cd quantum-trade-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deployment to GitHub Pages

1. Update `vite.config.ts` with your base URL:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build

# Deploy to GitHub Pages (using gh-pages)
npm install -g gh-pages
gh-pages -d dist
```

Or use GitHub Actions for automatic deployment (see `.github/workflows/deploy.yml`)

## Mobile Support

The application is fully optimized for mobile devices:
- Responsive design for all screen sizes
- Touch-friendly interactions (min 44px touch targets)
- Reduced particle count on mobile for performance
- Disabled scroll pinning on mobile for native scroll feel
- iOS Safari and Android Chrome compatible

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see LICENSE file for details

## Disclaimer

All predictions are for informational purposes only. Past performance does not guarantee future results. Trading involves substantial risk of loss. Please consult with a qualified financial advisor before making any investment decisions.
