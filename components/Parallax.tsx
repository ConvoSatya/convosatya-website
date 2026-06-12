"use client";

import React, { useEffect, useRef } from "react";

/**
 * Subtle scroll parallax. Translates children vertically relative to how far
 * the element is from the viewport center. Transform-only (compositor work),
 * rAF-throttled, and disabled entirely under prefers-reduced-motion.
 */
export default function Parallax({
  children,
  speed = 0.06,
  className = "",
}: {
  children: React.ReactNode;
  /** Fraction of scroll distance applied as offset; keep below ~0.1 */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let currentY = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // Subtract the current translation so the measurement stays stable
      const center = rect.top - currentY + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      currentY = -offset;
      el.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`;
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
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
