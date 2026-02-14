import { useEffect, useRef, useState } from 'react';
import { TrendingUp, ArrowRight, Star, BarChart3, ChevronDown } from 'lucide-react';
import { useMobileDetect } from '../hooks/useMobileDetect';

const topStocks = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 191.13, target: 253.62, upside: 32.7, score: 94, conversion: 91, action: 'BUY', buyDate: '2026-02-03', sellDate: '2026-03-19', risk: 'Medium' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 430.29, target: 599.58, upside: 39.3, score: 92, conversion: 89, action: 'BUY', buyDate: '2026-02-03', sellDate: '2026-03-19', risk: 'Low' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 239.30, target: 296.29, upside: 23.8, score: 90, conversion: 87, action: 'BUY', buyDate: '2026-02-03', sellDate: '2026-03-19', risk: 'Medium' },
  { symbol: 'NFLX', name: 'Netflix Inc', price: 83.50, target: 111.84, upside: 33.9, score: 88, conversion: 85, action: 'BUY', buyDate: '2026-02-03', sellDate: '2026-03-19', risk: 'High' },
  { symbol: 'COIN', name: 'Coinbase Global', price: 194.74, target: 337.46, upside: 73.3, score: 87, conversion: 84, action: 'HOLD', buyDate: '2026-02-03', sellDate: '2026-03-19', risk: 'High' },
];

export default function TopTradesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { isMobile } = useMobileDetect();

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

  const getActionClass = (action: string) => {
    switch (action) {
      case 'BUY': return 'action-buy';
      case 'SELL': return 'action-sell';
      default: return 'action-hold';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#00ff88]';
    if (score >= 80) return 'text-[#ffb800]';
    return 'text-[#ff3366]';
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center z-40 px-3 sm:px-4 lg:px-8 pt-20 pb-20"
    >
      {/* Title */}
      <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold text-[#f5f7ff] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f3ff]" />
        TOP 5 HIGHEST CONVERTING TRADES
      </h2>

      {/* Desktop Table */}
      {!isMobile && (
        <div className={`glass-panel overflow-hidden flex-1 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gradient-to-r from-[rgba(0,243,255,0.08)] to-[rgba(0,243,255,0.03)] border-b border-[rgba(0,243,255,0.2)]">
                <tr>
                  {['Symbol', 'Current Price', 'AI Target', 'Upside %', 'AI Score', 'Conv. Rate', 'Buy Date', 'Sell Date', 'Risk', 'Action'].map((label) => (
                    <th key={label} className="px-3 py-3 text-left text-xs font-semibold text-[#a7b0c8] uppercase tracking-wider">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topStocks.map((stock, index) => (
                  <tr key={stock.symbol} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,243,255,0.03)] transition-colors">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Star className="w-4 h-4 text-[#ffb800] fill-[#ffb800]" />}
                        <div>
                          <div className="font-bold text-[#f5f7ff] font-mono">{stock.symbol}</div>
                          <div className="text-xs text-[#a7b0c8]">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3"><span className="font-mono text-[#f5f7ff]">${stock.price.toFixed(2)}</span></td>
                    <td className="px-3 py-3"><span className="font-mono text-[#00f3ff]">${stock.target.toFixed(2)}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                        <span className="font-mono text-[#00ff88]">+{stock.upside.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${stock.score}%`, backgroundColor: stock.score >= 90 ? '#00ff88' : stock.score >= 80 ? '#ffb800' : '#ff3366' }} />
                        </div>
                        <span className={`font-mono font-bold text-sm ${getScoreColor(stock.score)}`}>{stock.score}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3"><span className="font-mono text-[#f5f7ff]">{stock.conversion}%</span></td>
                    <td className="px-3 py-3"><span className="font-mono text-xs text-[#a7b0c8]">{stock.buyDate}</span></td>
                    <td className="px-3 py-3"><span className="font-mono text-xs text-[#a7b0c8]">{stock.sellDate}</span></td>
                    <td className="px-3 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${stock.risk === 'Low' ? 'bg-[#00ff88]/10 text-[#00ff88]' : stock.risk === 'Medium' ? 'bg-[#ffb800]/10 text-[#ffb800]' : 'bg-[#ff3366]/10 text-[#ff3366]'}`}>
                        {stock.risk}
                      </span>
                    </td>
                    <td className="px-3 py-3"><span className={getActionClass(stock.action)}>{stock.action}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      {isMobile && (
        <div className="space-y-3">
          {topStocks.map((stock, index) => (
            <div 
              key={stock.symbol} 
              className={`glass-panel p-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onClick={() => setExpandedRow(expandedRow === stock.symbol ? null : stock.symbol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {index === 0 && <Star className="w-4 h-4 text-[#ffb800] fill-[#ffb800]" />}
                  <div>
                    <div className="font-bold text-[#f5f7ff] font-mono">{stock.symbol}</div>
                    <div className="text-xs text-[#a7b0c8]">{stock.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-mono text-[#f5f7ff]">${stock.price.toFixed(2)}</div>
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3 text-[#00ff88]" />
                      <span className="text-xs font-mono text-[#00ff88]">+{stock.upside.toFixed(1)}%</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#a7b0c8] transition-transform ${expandedRow === stock.symbol ? 'rotate-180' : ''}`} />
                </div>
              </div>
              
              {expandedRow === stock.symbol && (
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)] space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><div className="text-xs text-[#a7b0c8]">AI Target</div><div className="font-mono text-[#00f3ff]">${stock.target.toFixed(2)}</div></div>
                    <div><div className="text-xs text-[#a7b0c8]">AI Score</div><div className={`font-mono font-bold ${getScoreColor(stock.score)}`}>{stock.score}</div></div>
                    <div><div className="text-xs text-[#a7b0c8]">Conversion</div><div className="font-mono text-[#f5f7ff]">{stock.conversion}%</div></div>
                    <div>
                      <div className="text-xs text-[#a7b0c8]">Risk</div>
                      <span className={`text-xs px-2 py-0.5 rounded ${stock.risk === 'Low' ? 'bg-[#00ff88]/10 text-[#00ff88]' : stock.risk === 'Medium' ? 'bg-[#ffb800]/10 text-[#ffb800]' : 'bg-[#ff3366]/10 text-[#ff3366]'}`}>{stock.risk}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><div className="text-xs text-[#a7b0c8]">Buy Date</div><div className="font-mono text-xs text-[#f5f7ff]">{stock.buyDate}</div></div>
                    <div><div className="text-xs text-[#a7b0c8]">Sell Date</div><div className="font-mono text-xs text-[#f5f7ff]">{stock.sellDate}</div></div>
                  </div>
                  <div className="pt-2"><span className={getActionClass(stock.action)}>{stock.action}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className={`mt-4 sm:mt-6 flex justify-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center min-h-[44px]">
          <span>View All AI Picks</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
