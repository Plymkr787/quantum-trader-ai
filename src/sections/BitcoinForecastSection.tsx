import { useEffect, useRef, useState } from 'react';
import { Bitcoin, TrendingUp, Target, Shield, Clock, Activity } from 'lucide-react';
const btcData = {
  current: 77200.67,
  predicted: 79850.00,
  change: 3.4,
  recommendation: 'BUY',
  confidence: 87,
  entry: 76800,
  target: 82000,
  stop: 74500,
  bestTimes: '14:00–18:00 UTC',
  signals: [
    { name: 'RSI', value: 'Oversold', status: 'bullish' },
    { name: 'MACD', value: 'Bullish Crossover', status: 'bullish' },
    { name: 'Bollinger', value: 'Lower Band Touch', status: 'neutral' },
  ]
};

export default function BitcoinForecastSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSignalColor = (status: string) => {
    switch (status) {
      case 'bullish': return 'text-[#00ff88]';
      case 'bearish': return 'text-[#ff3366]';
      default: return 'text-[#ffb800]';
    }
  };

  const getSignalBg = (status: string) => {
    switch (status) {
      case 'bullish': return 'bg-[#00ff88]/10 border-[#00ff88]/30';
      case 'bearish': return 'bg-[#ff3366]/10 border-[#ff3366]/30';
      default: return 'bg-[#ffb800]/10 border-[#ffb800]/30';
    }
  };

  const chartPoints = [65, 58, 62, 55, 60, 52, 58, 48, 55, 45, 52, 42, 50, 38, 48, 35, 45, 40, 48, 55, 62, 68, 75, 82];
  const pathData = chartPoints.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * (300 / (chartPoints.length - 1))} ${100 - y}`).join(' ');

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col justify-center z-50 px-3 sm:px-4 lg:px-8 pt-20 pb-20">
      <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold text-[#f5f7ff] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Bitcoin className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9500]" />
        BITCOIN AI FORECAST
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 flex-1">
        {/* Forecast Card */}
        <div className={`glass-panel p-4 sm:p-6 flex flex-col transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div>
              <div className="text-xs sm:text-sm text-[#a7b0c8] mb-1">Current Price</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#f5f7ff] font-mono">${btcData.current.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm text-[#a7b0c8] mb-1">Predicted (24h)</div>
              <div className="text-xl sm:text-2xl font-bold text-[#00ff88] font-mono">${btcData.predicted.toLocaleString()}</div>
              <div className="flex items-center justify-end gap-1 mt-1">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff88]" />
                <span className="text-xs sm:text-sm text-[#00ff88] font-mono">+{btcData.change}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-[#00ff88]/10 border-2 border-[#00ff88]/40 flex items-center gap-2 sm:gap-3">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff88]" />
              <span className="text-lg sm:text-xl font-bold text-[#00ff88]">{btcData.recommendation}</span>
              <span className="text-xs sm:text-sm text-[#a7b0c8]">{btcData.confidence}% conf</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="glass-panel-sm p-2 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#00f3ff]" />
                <span className="text-[10px] sm:text-xs text-[#a7b0c8]">Entry</span>
              </div>
              <div className="text-sm sm:text-lg font-bold text-[#f5f7ff] font-mono">${btcData.entry.toLocaleString()}</div>
            </div>
            <div className="glass-panel-sm p-2 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff88]" />
                <span className="text-[10px] sm:text-xs text-[#a7b0c8]">Target</span>
              </div>
              <div className="text-sm sm:text-lg font-bold text-[#00ff88] font-mono">${btcData.target.toLocaleString()}</div>
            </div>
            <div className="glass-panel-sm p-2 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff3366]" />
                <span className="text-[10px] sm:text-xs text-[#a7b0c8]">Stop</span>
              </div>
              <div className="text-sm sm:text-lg font-bold text-[#ff3366] font-mono">${btcData.stop.toLocaleString()}</div>
            </div>
          </div>

          <div className="glass-panel-sm p-3 sm:p-4 flex items-center gap-2 sm:gap-3 mt-auto">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#00f3ff]" />
            <div>
              <span className="text-[10px] sm:text-xs text-[#a7b0c8]">Best Trading Times (UTC)</span>
              <span className="text-xs sm:text-sm text-[#f5f7ff] font-mono ml-2 sm:ml-3">{btcData.bestTimes}</span>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className={`glass-panel p-4 sm:p-6 flex flex-col transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-xs sm:text-sm text-[#a7b0c8] mb-3 sm:mb-4">24h Price Prediction</div>
          
          <div className="flex-1 relative min-h-[150px] sm:min-h-[200px]">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              ))}
              <defs>
                <linearGradient id="btcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff9500" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ff9500" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${pathData} L 300 100 L 0 100 Z`} fill="url(#btcGradient)" />
              <path d={pathData} fill="none" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="0" cy={100 - chartPoints[0]} r="3" fill="#ff9500" />
              <circle cx="300" cy={100 - chartPoints[chartPoints.length - 1]} r="3" fill="#00ff88" />
            </svg>
            <div className="absolute left-0 top-0 text-[10px] sm:text-xs text-[#ff9500] font-mono">${btcData.current.toLocaleString()}</div>
            <div className="absolute right-0 bottom-0 text-[10px] sm:text-xs text-[#00ff88] font-mono">${btcData.predicted.toLocaleString()}</div>
          </div>

          <div className="mt-3 sm:mt-4">
            <div className="text-[10px] sm:text-xs text-[#a7b0c8] mb-2 sm:mb-3">Technical Signals</div>
            <div className="flex flex-wrap gap-2">
              {btcData.signals.map((signal, index) => (
                <div key={index} className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border ${getSignalBg(signal.status)}`}>
                  <div className="text-[10px] sm:text-xs text-[#a7b0c8]">{signal.name}</div>
                  <div className={`text-xs sm:text-sm font-semibold ${getSignalColor(signal.status)}`}>{signal.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
