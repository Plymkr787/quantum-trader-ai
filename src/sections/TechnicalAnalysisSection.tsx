import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Shield, Search, Gauge, BarChart3, AlertTriangle, ExternalLink, FileText, Lock, ChevronRight } from 'lucide-react';

const tools = [
  { icon: TrendingUp, title: 'Trend Analysis', description: 'Directional momentum across multiple timeframes with AI-powered trend confirmation.', color: '#00f3ff' },
  { icon: Shield, title: 'Support/Resistance', description: 'Key price levels with volume profile analysis and breakout detection.', color: '#00ff88' },
  { icon: Search, title: 'Pattern Recognition', description: 'Automated detection of head-and-shoulders, wedges, flags, and breakouts.', color: '#ff9500' },
  { icon: Gauge, title: 'Momentum Indicators', description: 'RSI, MACD, Stochastic, OBV with custom AI-enhanced calculations.', color: '#a855f7' },
];

const patterns = [
  { name: 'Bullish Engulfing', accuracy: 87, trend: 'bullish' },
  { name: 'Golden Cross', accuracy: 82, trend: 'bullish' },
  { name: 'Double Bottom', accuracy: 79, trend: 'bullish' },
  { name: 'Head and Shoulders', accuracy: 76, trend: 'bearish' },
  { name: 'Death Cross', accuracy: 71, trend: 'bearish' },
  { name: 'Triangle Breakout', accuracy: 68, trend: 'neutral' },
];

export default function TechnicalAnalysisSection() {
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-[#00ff88]';
      case 'bearish': return 'text-[#ff3366]';
      default: return 'text-[#ffb800]';
    }
  };

  const getProgressColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-[#00ff88]';
    if (accuracy >= 70) return 'bg-[#ffb800]';
    return 'bg-[#ff3366]';
  };

  return (
    <section ref={sectionRef} className="relative w-full z-[70] px-3 sm:px-4 lg:px-8 pt-20 pb-32">
      <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold text-[#f5f7ff] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f3ff]" />
        TECHNICAL ANALYSIS DASHBOARD
      </h2>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {tools.map((tool, index) => (
          <div 
            key={index}
            className={`tool-card glass-panel p-4 sm:p-5 hover:bg-[rgba(0,243,255,0.05)] transition-all duration-700 cursor-pointer group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tool.color}15` }}>
                <tool.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: tool.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-semibold text-[#f5f7ff]">{tool.title}</h3>
                  <ChevronRight className="w-4 h-4 text-[#a7b0c8] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-[#a7b0c8] leading-relaxed">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pattern Recognition Panel */}
      <div className={`glass-panel p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#00f3ff]" />
          <h3 className="text-base sm:text-lg font-semibold text-[#f5f7ff]">AI Pattern Recognition</h3>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {patterns.map((pattern, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4">
              <div className="w-28 sm:w-40 flex-shrink-0">
                <span className="text-xs sm:text-sm text-[#f5f7ff]">{pattern.name}</span>
              </div>
              <div className="flex-1 h-1.5 sm:h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getProgressColor(pattern.accuracy)} transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ width: isVisible ? `${pattern.accuracy}%` : '0%', transitionDelay: `${(index + 6) * 100}ms` }} />
              </div>
              <div className="w-12 sm:w-20 flex items-center justify-end gap-2">
                <span className={`text-xs sm:text-sm font-mono font-semibold ${getTrendColor(pattern.trend)}`}>{pattern.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className={`glass-panel-sm p-3 sm:p-4 mb-6 sm:mb-8 border border-[#ffb800]/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffb800] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#ffb800] mb-1">Disclaimer</h4>
            <p className="text-[10px] sm:text-xs text-[#a7b0c8] leading-relaxed">
              All predictions are for informational purposes only. Past performance does not guarantee future results. 
              Trading involves substantial risk of loss. Please consult with a qualified financial advisor before making 
              any investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`glass-panel p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[rgba(0,243,255,0.2)] to-[rgba(0,243,255,0.05)] border border-[rgba(0,243,255,0.3)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#00f3ff]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-[#f5f7ff]">QUANTUM <span className="text-[#00f3ff]">TRADE</span> AI</h3>
              <p className="text-[10px] sm:text-xs text-[#a7b0c8]">Neural Market Intelligence</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#a7b0c8] hover:text-[#00f3ff] transition-colors">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />Dashboard
            </a>
            <a href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#a7b0c8] hover:text-[#00f3ff] transition-colors">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />API Docs
            </a>
            <a href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#a7b0c8] hover:text-[#00f3ff] transition-colors">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />Privacy
            </a>
            <a href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#a7b0c8] hover:text-[#00f3ff] transition-colors">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />Terms
            </a>
          </div>

          <div className="text-[10px] sm:text-xs text-[#a7b0c8]">© 2026 Quantum Trade AI. All rights reserved.</div>
        </div>
      </footer>
    </section>
  );
}
