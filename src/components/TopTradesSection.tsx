import { Stock } from '../types';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, ArrowRight, Star, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const topStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc', price: 178.23, target: 195.00, trend: 'UP', score: 88, action: 'BUY' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 222.17, target: 210.00, trend: 'DOWN', score: 65, action: 'SELL' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 136.55, target: 140.00, trend: 'SIDEWAYS', score: 72, action: 'HOLD' },

  { 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp', 
    price: 191.13, 
    target: 253.62, 
    upside: 32.7, 
    score: 94, 
    conversion: 91,
    action: 'BUY',
    buyDate: '2026-02-03',
    sellDate: '2026-03-19',
    risk: 'Medium'
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corp', 
    price: 430.29, 
    target: 599.58, 
    upside: 39.3, 
    score: 92, 
    conversion: 89,
    action: 'BUY',g
    buyDate: '2026-02-03',
    sellDate: '2026-03-19',
    risk: 'Low'
  },
  { 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc', 
    price: 239.30, 
    target: 296.29, 
    upside: 23.8, 
    score: 90, 
    conversion: 87,
    action: 'BUY',
    buyDate: '2026-02-03',
    sellDate: '2026-03-19',
    risk: 'Medium'
  },
  { 
    symbol: 'NFLX', 
    name: 'Netflix Inc', 
    price: 83.50, 
    target: 111.84, 
    upside: 33.9, 
    score: 88, 
    conversion: 85,
    action: 'BUY',
    buyDate: '2026-02-03',
    sellDate: '2026-03-19',
    risk: 'High'
  },
  { g
    symbol: 'COIN', 
    name: 'Coinbase Global', 
    price: 194.74, 
    target: 337.46, 
    upside: 73.3, 
    score: 87, 
    conversion: 84,
    action: 'HOLD',
    buyDate: '2026-02-03',
    sellDate: '2026-03-19',
    risk: 'High'
  },

];

export default function TopTradesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const table = tableRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !table || !cta) return;

    const tableRows = table.querySelectorAll('.table-row');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Title
      scrollTl.fromTo(title,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Table card
      scrollTl.fromTo(table,
        { y: '90vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.05
      );

      // Table rows
      scrollTl.fromTo(tableRows,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, ease: 'power2.out' },
        0.1
      );

      // CTA
      scrollTl.fromTo(cta,
        { y: '10vh', opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.2
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(tableRows,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, stagger: 0.03, ease: 'power1.in' },
        0.7
      );

      scrollTl.fromTo(table,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power1.in' },
        0.72
      );

      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power1.in' },
        0.74
      );

      scrollTl.fromTo(title,
        { opacity: 1 },
        { opacity: 0, ease: 'power1.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'desc' };
      }
      return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const sortedStocks = [...topStocks].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

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
      className="relative w-full h-screen flex flex-col justify-center z-40 px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >
      {/* Title */}
      <h2 
        ref={titleRef}
        className="text-xl sm:text-2xl font-bold text-[#f5f7ff] mb-6 flex items-center gap-3"
      >
        <BarChart3 className="w-6 h-6 text-[#00f3ff]" />
        TOP 5 HIGHEST CONVERTING TRADES
      </h2>

      {/* Table */}
      <div ref={tableRef} className="glass-panel overflow-hidden flex-1 max-h-[60vh]">
        <div className="overflow-x-auto custom-scrollbar h-full">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gradient-to-r from-[rgba(0,243,255,0.08)] to-[rgba(0,243,255,0.03)] border-b border-[rgba(0,243,255,0.2)]">
              <tr>
                {[
                  { key: 'symbol', label: 'Symbol' },
                  { key: 'price', label: 'Current Price' },
                  { key: 'target', label: 'AI Target' },
                  { key: 'upside', label: 'Upside %' },
                  { key: 'score', label: 'AI Score' },
                  { key: 'conversion', label: 'Conv. Rate' },
                  { key: 'buyDate', label: 'Buy Date' },
                  { key: 'sellDate', label: 'Sell Date' },
                  { key: 'risk', label: 'Risk' },
                  { key: 'action', label: 'Action' },
                ].map((col) => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3 text-left text-xs font-semibold text-[#a7b0c8] uppercase tracking-wider cursor-pointer hover:text-[#00f3ff] transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortConfig?.key === col.key && (
                        <span className="text-[#00f3ff]">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedStocks.map((stock, index) => (
                <tr 
                  key={stock.symbol}
                  className="table-row border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,243,255,0.03)] transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Star className="w-4 h-4 text-[#ffb800] fill-[#ffb800]" />}
                      <div>
                        <div className="font-bold text-[#f5f7ff] font-mono">{stock.symbol}</div>
                        <div className="text-xs text-[#a7b0c8]">{stock.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-[#f5f7ff]">${stock.price.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-[#00f3ff]">${stock.target.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                      <span className="font-mono text-[#00ff88]">+{stock.upside.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${stock.score}%`,
                            backgroundColor: stock.score >= 90 ? '#00ff88' : stock.score >= 80 ? '#ffb800' : '#ff3366'
                          }}
                        />
                      </div>
                      <span className={`font-mono font-bold ${getScoreColor(stock.score)}`}>{stock.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-[#f5f7ff]">{stock.conversion}%</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-xs text-[#a7b0c8]">{stock.buyDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-xs text-[#a7b0c8]">{stock.sellDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      stock.risk === 'Low' ? 'bg-[#00ff88]/10 text-[#00ff88]' :
                      stock.risk === 'Medium' ? 'bg-[#ffb800]/10 text-[#ffb800]' :
                      'bg-[#ff3366]/10 text-[#ff3366]'
                    }`}>
                      {stock.risk}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={getActionClass(stock.action)}>{stock.action}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-center">
        <button 
          ref={ctaRef}
          className="btn-primary flex items-center gap-2 group"
        >
          <span>View All AI Picks</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

