import { useEffect, useRef, useState } from 'react';
import { Target, CheckCircle, Layers, Zap, Brain } from 'lucide-react';
const stats = [
  { icon: Target, label: 'Predictions Made', value: '2,847,291', color: '#00f3ff' },
  { icon: CheckCircle, label: 'Success Rate', value: '89.4%', color: '#00ff88' },
  { icon: Layers, label: 'Active Patterns', value: '14', color: '#ff9500' },
  { icon: Zap, label: 'Avg Response', value: '0.03s', color: '#a855f7' },
];

export default function AIPredictionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate confidence number
          let start = 0;
          const end = 87;
          const duration = 1500;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setConfidence(Math.round(start + (end - start) * easeOut));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center z-30 px-3 sm:px-4 lg:px-8 pt-20 pb-20"
    >
      {/* Title */}
      <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold text-[#f5f7ff] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f3ff]" />
        AI PREDICTION ENGINE
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-16">
        {/* Confidence Ring */}
        <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="glass-panel p-4 sm:p-6 lg:p-8 rounded-full">
            <svg 
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
              viewBox="0 0 280 280"
            >
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="rgba(0,243,255,0.1)"
                strokeWidth="12"
              />
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="#00f3ff"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - confidence / 100)}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0,243,255,0.5))',
                  transition: 'stroke-dashoffset 1.5s ease-out'
                }}
              />
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="#00f3ff"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
                style={{ filter: 'blur(8px)' }}
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] sm:text-xs text-[#a7b0c8] uppercase tracking-wider mb-0.5 sm:mb-1">AI Confidence</span>
              <div className="flex items-baseline">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f7ff] font-mono">{confidence}</span>
                <span className="text-lg sm:text-xl text-[#00f3ff] font-mono">%</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#a7b0c8] mt-1 sm:mt-2">Based on 12M+ data points</span>
            </div>
          </div>
          
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#00f3ff] rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#00ff88] rounded-full shadow-[0_0_10px_rgba(0,255,136,0.8)]" />
          </div>
        </div>

        {/* Stats Column */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md lg:max-w-none">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`glass-panel-sm p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-[#a7b0c8] mb-0.5">{stat.label}</div>
                <div className="text-base sm:text-lg font-bold text-[#f5f7ff] font-mono truncate">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
