"use client";

import React, { useEffect, useState, useRef } from "react";

import { Users, Banknote, BarChart3 } from "lucide-react";

interface StatProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  context: string;
  icon: React.ReactNode;
}

const StatCard = ({ target, prefix = "", suffix = "", decimals = 0, label, context, icon }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(easeProgress * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div 
      ref={cardRef}
      className="relative flex-1 min-w-[300px] p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-teal-400/10 mb-6 group-hover:scale-110 transition-transform duration-300">
          <div className="text-blue-400">
            {icon}
          </div>
        </div>

        <div className="text-[44px] font-bold text-white tracking-tight mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            {prefix}{formattedCount}{suffix}
          </span>
        </div>
        
        <div className="text-[16px] font-semibold text-white/90 leading-tight mb-4">
          {label}
        </div>
        
        <div className="text-[12px] text-white/40 font-medium tracking-wide uppercase">
          {context}
        </div>
      </div>
    </div>
  );
};

export default function ProblemStats() {
  const stats = [
    { 
      target: 193000, 
      suffix: "+", 
      label: "Phishing complaints filed to FBI in 2024",
      context: "One victim every 3 mins",
      icon: <Users size={24} />
    },
    { 
      target: 12.5, 
      prefix: "$", 
      suffix: "B+", 
      decimals: 1, 
      label: "Lost to fraud in a single year",
      context: "AVERAGE LOSS OF $19,372 PER VICTIM",
      icon: <Banknote size={24} />
    },
    { 
      target: 1, 
      prefix: "#", 
      label: "Most reported cybercrime category",
      context: "Dominating all other threats",
      icon: <BarChart3 size={24} />
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Subtle background glow to match vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[13px] font-semibold tracking-[2px] text-blue-400 uppercase mb-4">
            WHY IT MATTERS
          </p>
          <h2 className="text-[40px] font-bold text-white tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            The scale of the problem
          </h2>
          <p className="text-[16px] text-white/60 max-w-2xl mx-auto">
            Scams are not slowing down. Neither are we.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <StatCard 
              key={idx}
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
              context={stat.context}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
