import HeroSection from "./sections/HeroSection";
import MarketPulseSection from "./sections/MarketPulseSection";
import AIPredictionSection from "./sections/AIPredictionSection";
import TopTradesSection from "./sections/TopTradesSection";
import BitcoinForecastSection from "./sections/BitcoinForecastSection";
import EthereumForecastSection from "./sections/EthereumForecastSection";
import TechnicalAnalysisSection from "./sections/TechnicalAnalysisSection";

export default function App() {
  return (
    <div>
      <HeroSection />
      <MarketPulseSection />
      <AIPredictionSection />
      <TopTradesSection />
      <BitcoinForecastSection />
      <EthereumForecastSection />
      <TechnicalAnalysisSection />
    </div>
  );
}
