import { useRef, useEffect, useState } from 'react';
import { ArrowRight, FileText, ChevronDown } from 'lucide-react';
export default function HeroSection() {
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

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center z-10 pt-20 pb-16"
    >
      <div className={`text-center px-4 max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold mb-4 sm:mb-6 leading-tight">
          <span className="inline-block gradient-text">AI</span>{' '}
          <span className="inline-block gradient-text">That</span>{' '}
          <span className="inline-block gradient-text">Trades</span>{' '}
          <span className="inline-block gradient-text">Before</span>{' '}
          <span className="inline-block gradient-text">the</span>{' '}
          <span className="inline-block gradient-text">Market</span>{' '}
          <span className="inline-block text-[#00f3ff]">Moves.</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-[#a7b0c8] mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
          Real-time signals. Pattern recognition. Risk-adjusted targets.
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="btn-primary flex items-center gap-2 group pulse-glow w-full sm:w-auto justify-center min-h-[44px]">
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="flex items-center gap-2 text-[#a7b0c8] hover:text-[#00f3ff] transition-colors text-sm min-h-[44px] px-4">
            <FileText className="w-4 h-4" />
            <span>View Documentation</span>
          </button>
        </div>
      </div>
      
      {/* Scroll Cue */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-xs text-[#a7b0c8] uppercase tracking-widest">Scroll to initialize</span>
        <ChevronDown className="w-5 h-5 text-[#00f3ff] animate-bounce" />
      </div>
    </section>
  );
}
