import { useState, useEffect } from 'react';
import { Activity, Brain, Clock, Menu, X } from 'lucide-react';
import { useMobileDetect } from '../hooks/useMobileDetect';

const tickerData = [
  { symbol: 'AAPL', price: 223.66, change: 0.72 },
  { symbol: 'TSLA', price: 419.64, change: 2.14 },
  { symbol: 'NVDA', price: 191.13, change: 1.88 },
  { symbol: 'MSFT', price: 430.29, change: 0.95 },
  { symbol: 'AMZN', price: 239.30, change: 1.21 },
  { symbol: 'GOOGL', price: 192.85, change: 0.58 },
  { symbol: 'META', price: 647.08, change: 0.33 },
  { symbol: 'AMD', price: 119.82, change: 0.92 },
  { symbol: 'COIN', price: 194.74, change: 3.45 },
  { symbol: 'NFLX', price: 83.50, change: 1.12 },
];

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiConfidence, setAiConfidence] = useState(87);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useMobileDetect();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAiConfidence(prev => {
        const change = (Math.random() - 0.5) * 0.4;
        return Math.max(85, Math.min(92, prev + change));
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  };

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 lg:px-8 py-2 sm:py-4">
        <div className="glass-panel px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[rgba(0,243,255,0.2)] to-[rgba(0,243,255,0.05)] border border-[rgba(0,243,255,0.3)] flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#00f3ff]" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold tracking-wide text-[#f5f7ff]">
                QUANTUM <span className="text-[#00f3ff]">TRADE</span> AI
              </h1>
              {!isMobile && (
                <p className="text-[10px] text-[#a7b0c8] tracking-widest uppercase hidden sm:block">Neural Market Intelligence</p>
              )}
            </div>
          </div>
          
          {/* Market Status - Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              <span className="text-xs text-[#a7b0c8] uppercase tracking-wider">Market</span>
              <span className="text-sm font-semibold text-[#00ff88] font-mono">OPEN</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#00f3ff]" />
              <span className="text-xs text-[#a7b0c8] uppercase tracking-wider">AI</span>
              <span className="text-sm font-semibold text-[#00f3ff] font-mono">{aiConfidence.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#a7b0c8]" />
              <span className="text-sm font-semibold text-[#f5f7ff] font-mono hidden lg:inline">{formatTime(currentTime)}</span>
              <span className="text-sm font-semibold text-[#f5f7ff] font-mono lg:hidden">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg border border-[rgba(0,243,255,0.2)] active:scale-95 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-[#00f3ff]" />
            ) : (
              <Menu className="w-5 h-5 text-[#00f3ff]" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 glass-panel p-4 animate-in slide-in-from-top-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a7b0c8] uppercase tracking-wider">Market Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-[#00ff88] font-mono">OPEN</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a7b0c8] uppercase tracking-wider">AI Confidence</span>
                <span className="text-sm font-semibold text-[#00f3ff] font-mono">{aiConfidence.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a7b0c8] uppercase tracking-wider">Last Update</span>
                <span className="text-sm font-semibold text-[#f5f7ff] font-mono">{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Ticker Tape */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-8 sm:h-10 bg-[rgba(5,6,11,0.95)] border-t border-[rgba(0,243,255,0.15)] overflow-hidden">
        <div className="flex ticker-scroll">
          {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 whitespace-nowrap">
              <span className="text-xs font-semibold text-[#f5f7ff] font-mono">{item.symbol}</span>
              <span className="text-xs text-[#a7b0c8] font-mono">${item.price.toFixed(2)}</span>
              <span className={`text-xs font-mono ${item.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </span>
              <span className="text-[rgba(0,243,255,0.3)]">|</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
