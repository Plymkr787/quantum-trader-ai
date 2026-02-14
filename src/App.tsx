import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import MarketPulseSection from './sections/MarketPulseSection';
import AIPredictionSection from './sections/AIPredictionSection';
import TopTradesSection from './sections/TopTradesSection';
import BitcoinForecastSection from './sections/BitcoinForecastSection';
import EthereumForecastSection from './sections/EthereumForecastSection';
import TechnicalAnalysisSection from './sections/TechnicalAnalysisSection';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Header />
      
      <main className="relative">
        <div className="relative z-10">
          <HeroSection />
        </div>
        <div className="relative z-20">
          <MarketPulseSection />
        </div>
        <div className="relative z-30">
          <AIPredictionSection />
        </div>
        <div className="relative z-40">
          <TopTradesSection />
        </div>
        <div className="relative z-50">
          <BitcoinForecastSection />
        </div>
        <div className="relative z-[60]">
          <EthereumForecastSection />
        </div>
        <div className="relative z-[70]">
          <TechnicalAnalysisSection />
        </div>
      </main>
    </div>
  );
}

export default App;
