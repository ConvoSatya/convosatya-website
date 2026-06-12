import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";

/* Living icons: tiny animated pictograms inside each capability chip.
   Animations live in globals.css (cap1–cap6); element attributes default
   to the final frame so reduced-motion shows a clean static icon. */

function ConversationVisual() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5.5" width="12" height="3.5" rx="1.75" fill="rgba(255,255,255,0.35)" />
      <rect x="9" y="13" width="12" height="3.5" rx="1.75" fill="currentColor" opacity="0.85" />
      <line x1="3" y1="4" x2="21" y2="4" stroke="currentColor" strokeWidth="1" opacity="0" className="cap1-scan" />
      <circle cx="16.5" cy="5" r="1.8" fill="currentColor" opacity="1" className="cap1-flag" />
    </svg>
  );
}

function SmsVisual() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="15" height="4.5" rx="2.25" fill="rgba(255,255,255,0.35)" opacity="1" className="cap2-bubble" />
      <line x1="4" y1="14.5" x2="11.5" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      <circle cx="16.5" cy="15" r="3.4" stroke="currentColor" strokeWidth="1.2" fill="none" pathLength="21" strokeDasharray="21" strokeDashoffset="21" opacity="0" className="cap2-ring" />
      <path d="M14.8 15.2 l1.3 1.3 l2.6-2.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="10" strokeDasharray="10" strokeDashoffset="0" className="cap2-check" />
    </svg>
  );
}

function RiskMeterVisual() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="14" width="3.2" height="5.5" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="10.4" y="10.5" width="3.2" height="9" rx="1" fill="currentColor" opacity="0.75" className="cap3-seg2" />
      <rect x="16.3" y="6.5" width="3.2" height="13" rx="1" fill="currentColor" opacity="1" className="cap3-seg3" />
      <rect x="16.3" y="6.5" width="3.2" height="13" rx="1" fill="#f87171" opacity="0" className="cap3-red" />
    </svg>
  );
}

function ChecklistVisual() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="10" y1="5.5" x2="20.5" y2="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="12" x2="20.5" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="18.5" x2="20.5" y2="18.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.5 5.5 l1.6 1.6 l2.8-3.2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="8" strokeDasharray="8" strokeDashoffset="0" className="cap4-check" />
      <path d="M3.5 12 l1.6 1.6 l2.8-3.2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="8" strokeDasharray="8" strokeDashoffset="0" className="cap4-check" style={{ animationDelay: "0.6s" }} />
      <path d="M3.5 18.5 l1.6 1.6 l2.8-3.2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="8" strokeDasharray="8" strokeDashoffset="0" className="cap4-check" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}

function EmailVisual() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="cap5c">
          <rect x="4" y="6.5" width="16" height="11" rx="2" />
        </clipPath>
      </defs>
      <rect x="4" y="6.5" width="16" height="11" rx="2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
      <path d="M4.5 7.5 L12 13 L19.5 7.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <g clipPath="url(#cap5c)">
        <rect x="3" y="6.5" width="4" height="11" fill="currentColor" opacity="0" className="cap5-sweep" />
      </g>
    </svg>
  );
}

function VoiceVisual() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="9" width="2" height="6" rx="1" fill="currentColor" opacity="0.7" className="cap6-bar" />
      <rect x="8" y="7" width="2" height="10" rx="1" fill="currentColor" opacity="0.7" className="cap6-bar" style={{ animationDelay: "0.3s" }} />
      <rect x="11.5" y="5.5" width="2" height="13" rx="1" fill="currentColor" className="cap6-bar-main" style={{ animationDelay: "0.6s" }} />
      <rect x="15" y="7" width="2" height="10" rx="1" fill="currentColor" opacity="0.7" className="cap6-bar" style={{ animationDelay: "0.9s" }} />
      <rect x="18.5" y="9" width="2" height="6" rx="1" fill="currentColor" opacity="0.7" className="cap6-bar" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}

interface Feature {
  title: string;
  visual: React.ReactNode;
  status?: string;
}

const features: Feature[] = [
  { title: "Conversational Scam Detection", visual: <ConversationVisual /> },
  { title: "SMS & Message Protection", visual: <SmsVisual /> },
  { title: "Real-Time Risk Analysis", visual: <RiskMeterVisual /> },
  { title: "Scam Reporting & Recovery", visual: <ChecklistVisual /> },
  { title: "Email Scam Detection", visual: <EmailVisual />, status: "In development" },
  { title: "Voice & Call Detection", visual: <VoiceVisual />, status: "In development" },
];

const rowStart = ["row-start-1", "row-start-2", "row-start-3"];

/* Curved energy paths from the hub (170,210) to each block edge, in a
   340×420 viewBox stretched to the center column (rows at 70/210/350 =
   16.7/50/83.3% — matches the gap-less 3-row grid). Order alternates
   left/right top-to-bottom; the dash stagger follows this order. */
const connectorPaths = [
  "M170 210 C 90 210, 55 70, 0 70",
  "M170 210 C 250 210, 285 70, 340 70",
  "M170 210 L 0 210",
  "M170 210 L 340 210",
  "M170 210 C 90 210, 55 350, 0 350",
  "M170 210 C 250 210, 285 350, 340 350",
];

function CapabilityBlock({ feature }: { feature: Feature }) {
  return (
    <div className="flex h-full w-full items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:border-teal-400/30">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
        {feature.visual}
      </span>
      <div className="min-w-0">
        <h3 className="truncate text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
          {feature.title}
        </h3>
        {feature.status && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/35">
            {feature.status}
          </p>
        )}
      </div>
    </div>
  );
}

function Hub({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div
          className={`hub-pulse absolute rounded-full border border-teal-400/15 ${compact ? "h-40 w-40" : "h-52 w-52"}`}
          aria-hidden="true"
        />
        <div className={`relative flex items-center justify-center rounded-full border border-teal-400/30 bg-[#050810] shadow-[0_0_50px_rgba(45,212,191,0.12)] ${compact ? "h-24 w-24" : "h-32 w-32"}`}>
          <Image src="/ConvoSatya.png" alt="ConvoSatya FAUST engine" width={compact ? 44 : 56} height={compact ? 44 : 56} />
        </div>
      </div>
      <span className="mt-7 text-[11px] uppercase tracking-[0.2em] text-teal-300">
        FAUST Engine
      </span>
    </div>
  );
}

export default function PlatformCapabilities() {
  const left = features.slice(0, 3);
  const right = features.slice(3);

  return (
    <section id="product" className="relative overflow-hidden bg-black px-6 pt-10 pb-12 md:pt-12 md:pb-14">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <Reveal>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
              The platform
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mb-4 text-[26px] font-bold tracking-tight text-white sm:text-[32px] md:text-[40px]">
              Built for real-world scams
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto max-w-2xl text-[14px] text-white/60 sm:text-[16px]">
              FAUST protects every channel scammers use — messages, email, and calls — in real time.
            </p>
          </Reveal>
        </div>

        {/* Desktop: engine in the center, energy flowing out to each block.
            Lines are brightest at the hub and fade outward; pulses travel
            center → block. Left lines are rotated 180° so one animation
            serves both directions. */}
        <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] grid-rows-3">
          <div className="relative col-start-2 row-start-1 row-span-3 flex items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 340 420"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {connectorPaths.map((d, i) => (
                <g key={d}>
                  <path d={d} stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <path
                    d={d}
                    className="connector-dash"
                    stroke="rgba(94,234,212,0.75)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength={100}
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                </g>
              ))}
            </svg>

            <Reveal className="relative">
              <Hub />
            </Reveal>
          </div>

          {left.map((feature, idx) => (
            <Reveal
              key={feature.title}
              delay={150 + idx * 120}
              className={`col-start-1 ${rowStart[idx]} flex h-full items-center py-2.5`}
            >
              <CapabilityBlock feature={feature} />
            </Reveal>
          ))}

          {right.map((feature, idx) => (
            <Reveal
              key={feature.title}
              delay={210 + idx * 120}
              className={`col-start-3 ${rowStart[idx]} flex h-full items-center py-2.5`}
            >
              <CapabilityBlock feature={feature} />
            </Reveal>
          ))}
        </div>

        {/* Mobile / tablet: hub above stacked blocks */}
        <div className="lg:hidden">
          <Reveal className="mb-12 flex justify-center">
            <Hub compact />
          </Reveal>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature, idx) => (
              <Reveal key={feature.title} delay={idx * 80} className="h-full">
                <CapabilityBlock feature={feature} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
