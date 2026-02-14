import { useRef, useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Newspaper, Activity } from 'lucide-react';
const indices = [
  { name: 'S&P 500', value: 6040.53, change: 1.24 },
  { name: 'Dow Jones', value: 48892.47, change: -0.51 },
  { name: 'Nasdaq', value: 23461.82, change: 0.89 },
];

const crypto = [
  { name: 'Bitcoin', symbol: 'BTC', value: 77200.67, change: 2.1, color: '#ff9500' },
  { name: 'Ethereum', symbol: 'ETH', value: 2320.06, change: -1.2, color: '#a855f7' },
];

const newsItems = [
  { text: 'Fed signals cautious stance; yields dip.', sentiment: 'positive' },
  { text: 'Tech earnings beat estimates; Nasdaq extends rally.', sentiment: 'positive' },
  { text: 'Crypto volatility compresses ahead of macro week.', sentiment: 'neutral' },
  { text: 'AI sector momentum continues with strong institutional inflows.', sentiment: 'positive' },
];

export default function MarketPulseSection() {
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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-[#00ff88]';
      case 'negative': return 'bg-[#ff3366]';
      default: return 'bg-[#ffb800]';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center z-20 px-3 sm:px-4 lg:px-8 pt-20 pb-20"
    >
      {/* Title */}
      <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold text-[#f5f7ff] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f3ff]" />
        MARKET PULSE
      </h2>

      {/* Index Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
        {indices.map((index, i) => (
          <div 
            key={index.name}
            className={`glass-panel p-4 sm:p-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm text-[#a7b0c8] font-medium">{index.name}</span>
              {index.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-[#00ff88]" />
              ) : (
                <TrendingDown className="w-4 h-4 text-[#ff3366]" />
              )}
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f5f7ff] font-mono">
                {index.value.toLocaleString()}
              </span>
              <span className={`text-xs sm:text-sm font-mono ${index.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%
              </span>
            </div>
            <div className="mt-3 sm:mt-4 h-6 sm:h-8 flex items-end gap-0.5">
              {Array.from({ length: 12 }).map((_, j) => {
                const height = 30 + Math.random() * 50;
                const isPositive = index.change >= 0;
                return (
                  <div 
                    key={j}
                    className="flex-1 rounded-sm"
                    style={{ 
                      height: `${height}%`,
                      backgroundColor: isPositive ? '#00ff88' : '#ff3366',
                      opacity: 0.3 + (j / 24)
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Crypto Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        {crypto.map((coin, i) => (
          <div 
            key={coin.symbol}
            className={`glass-panel p-4 sm:p-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${(i + 3) * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: `${coin.color}20`, color: coin.color }}
                  >
                    {coin.symbol}
                  </div>
                  <span className="text-xs sm:text-sm text-[#a7b0c8]">{coin.name}</span>
                </div>
                <div className="flex items-baseline gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <span className="text-xl sm:text-2xl font-bold text-[#f5f7ff] font-mono">
                    ${coin.value.toLocaleString()}
                  </span>
                  <span className={`text-xs sm:text-sm font-mono ${coin.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
                    {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-xs text-[#a7b0c8]">Volatility</div>
                <div className="text-xs sm:text-sm font-mono text-[#f5f7ff]">{(Math.random() * 5 + 2).toFixed(1)}%</div>
                <div className="text-xs text-[#a7b0c8] mt-1 sm:mt-2">Momentum</div>
                <div className={`text-xs sm:text-sm font-mono ${coin.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
                  {coin.change >= 0 ? 'Bullish' : 'Bearish'}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-8 sm:h-10 flex items-end gap-0.5">
              {Array.from({ length: 20 }).map((_, j) => {
                const height = 25 + Math.random() * 60;
                return (
                  <div 
                    key={j}
                    className="flex-1 rounded-sm"
                    style={{ 
                      height: `${height}%`,
                      backgroundColor: coin.color,
                      opacity: 0.2 + (j / 40)
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* News Strip */}
      <div 
        className={`glass-panel-sm p-3 sm:p-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Newspaper className="w-4 h-4 text-[#00f3ff]" />
          <span className="text-xs text-[#a7b0c8] uppercase tracking-wider">Latest News</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {newsItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]"
            >
              <div className={`w-2 h-2 rounded-full ${getSentimentColor(item.sentiment)} flex-shrink-0`} />
              <span className="text-xs text-[#a7b0c8] leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
