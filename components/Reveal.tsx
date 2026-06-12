"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll wrapper. Fades/slides children in the first time they
 * enter the viewport. Styling lives in globals.css (.reveal variants);
 * prefers-reduced-motion renders content immediately.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  /** Direction the content slides in from ("soft" = gentle 10px rise, "none" = fade only) */
  from?: "up" | "left" | "right" | "soft" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
