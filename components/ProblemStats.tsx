"use client";

import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

interface Stat {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  context: string;
}

const stats: Stat[] = [
  {
    target: 20.9,
    prefix: "$",
    suffix: "B",
    decimals: 1,
    label: "Lost to cybercrime in a single year",
    context: "Reported losses, an all-time high",
  },
  {
    target: 1008597,
    label: "Complaints filed to the FBI in 2025",
    context: "Nearly 3,000 victims every day",
  },
  {
    target: 78,
    suffix: "%",
    label: "Of crypto scam victims didn't know they were being scammed",
    context: "Until the FBI told them",
  },
];

/** Counts up when the row scrolls into view (same easing as before). */
function CountUp({ target, prefix = "", suffix = "", decimals = 0 }: Omit<Stat, "label" | "context">) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
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
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      <span className="text-teal-400">{suffix}</span>
    </span>
  );
}

function StatRow({ stat, side }: { stat: Stat; side: "left" | "right" }) {
  return (
    <div className="relative pl-12 lg:pl-0">
      {/* Node on the spine */}
      <span
        className="absolute left-4 lg:left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-teal-400 ring-4 ring-teal-400/15"
        aria-hidden="true"
      />

      <div className={`lg:w-1/2 ${side === "right" ? "lg:ml-auto lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
        <Reveal from={side}>
          <div className="text-[44px] sm:text-[56px] md:text-[64px] font-bold leading-none tracking-tight text-white">
            <CountUp
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          </div>
          <p className="mt-3 text-[16px] font-medium text-white/90">{stat.label}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/40">{stat.context}</p>
        </Reveal>
      </div>
    </div>
  );
}

export default function ProblemStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  // The spine draws itself as the section moves through the viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (spineRef.current) spineRef.current.style.transform = "translateX(-50%) scaleY(1)";
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const fill = spineRef.current;
      if (!section || !fill) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight * 0.85 - rect.top) / rect.height, 0),
        1
      );
      fill.style.transform = `translateX(-50%) scaleY(${progress.toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 pt-10 pb-12 md:pt-12 md:pb-16">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header — staggered cascade instead of one block */}
        <div className="mb-14 text-center">
          <Reveal>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
              The problem
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mb-4 text-[26px] font-bold tracking-tight text-white sm:text-[32px] md:text-[40px]">
              Scams don&apos;t look like scams anymore
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto max-w-2xl text-[14px] text-white/60 sm:text-[16px]">
              They build trust. They have conversations. They sound real — and the numbers show how well it works.
            </p>
          </Reveal>
        </div>

        {/* Spine + stats */}
        <div className="relative">
          <div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.06]"
            aria-hidden="true"
          />
          <div
            ref={spineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-teal-400/70 via-teal-400/40 to-teal-400/10"
            style={{ transform: "translateX(-50%) scaleY(0)" }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10 py-2 md:gap-14">
            {stats.map((stat, idx) => (
              <StatRow key={stat.label} stat={stat} side={idx % 2 ? "right" : "left"} />
            ))}
          </div>
        </div>

        {/* Source */}
        <Reveal delay={150} className="mt-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.08em] text-white/35">
            Source: FBI IC3 Internet Crime Report, 2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
