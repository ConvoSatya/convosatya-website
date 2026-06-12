"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import AuthAwareRequestAccess from "@/components/AuthAwareRequestAccess";

export default function Hero() {
  const [step, setStep] = useState(0);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    };
    scrollToBottom();
    if (step === 14) {
      const intervalId = setInterval(scrollToBottom, 50);
      const timeoutId = setTimeout(() => clearInterval(intervalId), 1000);
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [step]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (step === 0) timeout = setTimeout(() => setStep(1), 800);
    else if (step === 1) timeout = setTimeout(() => setStep(2), 1200);
    else if (step === 2) timeout = setTimeout(() => setStep(3), 1000);
    else if (step === 3) timeout = setTimeout(() => setStep(4), 1000);
    else if (step === 4) timeout = setTimeout(() => setStep(5), 1500);
    else if (step === 5) timeout = setTimeout(() => setStep(6), 1200);
    else if (step === 6) timeout = setTimeout(() => setStep(7), 1500);
    else if (step === 7) timeout = setTimeout(() => setStep(8), 1200);
    else if (step === 8) timeout = setTimeout(() => setStep(9), 1000);
    else if (step === 9) timeout = setTimeout(() => setStep(10), 1800);
    else if (step === 10) timeout = setTimeout(() => setStep(11), 1800);
    else if (step === 11) timeout = setTimeout(() => setStep(12), 1000);
    else if (step === 12) timeout = setTimeout(() => setStep(13), 1500);
    else if (step === 13) timeout = setTimeout(() => setStep(14), 1000);
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <section
      className="pt-16 sm:pt-12 lg:pt-8"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "80px 16px 24px",
        overflow: "hidden",
      }}
    >
      {/* Container */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 items-center relative z-10">

        {/* Left Column */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start z-10 lg:-translate-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
            Conversational AI Security
          </div>

          {/* Headline */}
          <h1 className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] text-white font-bold leading-[1.1] tracking-[-0.02em] max-w-[600px] relative">
            <span className="text-white">Detect scams<br />before they<br /></span>
            <span className="text-teal-400">cost you</span>
          </h1>

          {/* Subtext */}
          <p className="text-[16px] sm:text-[18px] md:text-[20px] text-white/75 mt-6 max-w-[480px] leading-[1.6] relative">
            Real-time scam detection across your full conversation — text, images, and video.
          </p>

          {/* Button */}
          <div
            style={{ display: "flex", gap: "16px", marginTop: "48px", position: "relative" }}
            className="flex-col sm:flex-row w-full sm:w-auto"
          >
            <AuthAwareRequestAccess />
          </div>

          {/* Trust line */}
          <p className="text-[14px] text-white/50 mt-10 tracking-[0.2px] relative">
            Powered by FAUST · Research-backed ·{" "}
            <span className="text-teal-400">Privacy-first</span>
          </p>
        </div>

        {/* Right Column: Phone */}
        <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto z-10 mt-12 lg:mt-0 group cursor-default lg:scale-[0.92] lg:origin-center lg:-translate-y-12 lg:-mb-12">
          {/* Soft backlight separating the device from the black page.
              closest-side sizing means the gradient is fully transparent
              before the box edges — no visible square boundary. */}
          <div
            className="absolute -inset-[12%] pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse closest-side at center, rgba(255,255,255,0.07), rgba(255,255,255,0.025) 55%, transparent 75%)",
            }}
          />

          {/* Device mockup: photo frame (public/phone-screen.png) with the live
              demo positioned inside the screen cutout. Inset percentages are
              measured from the image — if the asset changes, re-measure. */}
          <div className="relative w-full aspect-[374/666]">
            <Image
              src="/phone-screen.png"
              alt=""
              fill
              priority
              aria-hidden="true"
              sizes="420px"
              className="pointer-events-none select-none object-contain z-10"
            />

            {/* Screen */}
            <div
              className="absolute z-20 flex flex-col overflow-hidden rounded-[36px] bg-[#050810]"
              style={{ left: "16.3%", right: "16.3%", top: "8.3%", bottom: "8.6%" }}
            >

            {/* Status Bar */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-between px-7 pt-3">
              <span className="font-mono text-[11px] font-semibold tracking-wide text-white/80">9:41</span>
              <div className="flex items-center gap-1.5 text-white/75">
                <svg width="15" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="7" width="3" height="4" rx="0.5" />
                  <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.5" />
                  <rect x="9" y="2" width="3" height="9" rx="0.5" />
                  <rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity="0.35" />
                </svg>
                <svg width="22" height="11" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" />
                  <rect x="2" y="2" width="14" height="8" rx="1.5" fill="currentColor" />
                  <path d="M23.5 4v4c1-.4 1.5-1.2 1.5-2s-.5-1.6-1.5-2z" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#111622] rounded-full z-50 flex items-center justify-start px-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.02)]">
              <div className="w-3 h-3 rounded-full bg-[#050810] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)] ml-1"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40 ml-2"></div>
            </div>

            {/* App Header */}
            <div className="relative z-40 flex items-center justify-between border-b border-white/5 bg-[#050810]/95 backdrop-blur-xl px-4 pb-4 pt-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-white leading-tight">Unknown Contact</span>
                  <span className="text-[12px] text-white/40 mt-0.5">SMS</span>
                </div>
              </div>
              {step === 14 && (
                <button onClick={() => setStep(0)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" title="Replay scenario">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                </button>
              )}

              {/* Fade for messages scrolling under the header */}
              <div className="absolute inset-x-0 top-full h-6 bg-gradient-to-b from-[#050810] to-transparent pointer-events-none" aria-hidden="true" />
            </div>

            {/* Chat Area */}
            <div ref={chatContainerRef} className={`relative z-20 flex-1 overflow-y-auto px-4 pt-6 scroll-smooth pointer-events-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${step === 14 ? "pb-[240px]" : "pb-[110px]"}`}>
              <div className="flex flex-col gap-1.5">

                {step >= 1 && (
                  <div className="flex flex-col mb-2">
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-white/30 ml-2 mb-1">Scammer</span>
                    <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                      <p className="m-0 text-[14px] leading-snug text-white/90">Hey, is this Alex?</p>
                    </div>
                  </div>
                )}

                {step >= 2 && (
                  <div className="flex flex-col mb-2">
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-teal-500/50 mr-2 mb-1 self-end">You</span>
                    <div className="self-end max-w-[82%] rounded-[22px] rounded-tr-[6px] bg-[#0F5C6A] border border-[#2EC4B6]/20 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                      <p className="m-0 text-[14px] leading-snug text-white">Oh sorry wrong number 😅</p>
                    </div>
                  </div>
                )}

                {step >= 3 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[14px] leading-snug text-white/90">No worries haha</p>
                  </div>
                )}

                {step === 4 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-3 shadow-sm animate-[fadeUp_0.3s_ease_out_forwards]">
                    <div className="flex gap-1 items-center h-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {step >= 5 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[14px] leading-snug text-white/90">Where are you based?</p>
                  </div>
                )}

                {step >= 6 && (
                  <div className="self-end max-w-[82%] rounded-[22px] rounded-tr-[6px] bg-[#0F5C6A] border border-[#2EC4B6]/20 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mb-2 mt-1">
                    <p className="m-0 text-[14px] leading-snug text-white">I just moved here recently</p>
                  </div>
                )}

                {step >= 7 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[14px] leading-snug text-white/90">Nice! I've been meeting good people here</p>
                  </div>
                )}

                {step >= 8 && (
                  <div className="self-end max-w-[82%] rounded-[22px] rounded-tr-[6px] bg-[#0F5C6A] border border-[#2EC4B6]/20 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mb-2 mt-1">
                    <p className="m-0 text-[14px] leading-snug text-white">Oh nice! Yeah it's a great area.</p>
                  </div>
                )}

                {step === 9 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-3 shadow-sm animate-[fadeUp_0.3s_ease_out_forwards]">
                    <div className="flex gap-1 items-center h-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {step >= 10 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[14px] leading-snug text-white/90">I've actually been making really good money with crypto lately</p>
                  </div>
                )}

                {step >= 11 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-2.5 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[14px] leading-snug text-white/90">You should try this platform, it's been working really well for me</p>
                  </div>
                )}

                {step === 12 && (
                  <div className="self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] bg-[#1A1F2D] border border-white/5 px-4 py-3 shadow-sm animate-[fadeUp_0.3s_ease_out_forwards]">
                    <div className="flex gap-1 items-center h-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {step >= 13 && (
                  <div className={`self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] px-4 py-2.5 shadow-sm transition-all duration-300 animate-[fadeUp_0.4s_ease_out_forwards] z-30 ${step === 14 ? 'bg-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-[#1A1F2D] border border-white/5'}`}>
                    <p className="m-0 text-[14px] leading-snug text-white/90">
                      Here, use this link: <span className="text-blue-400 underline decoration-blue-400/50 underline-offset-2">bit.ly/auth-sec</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Detection Alert */}
            {step === 14 && (
              <div className="absolute bottom-[88px] left-3 right-3 z-30 animate-[alertIn_0.3s_ease-out_forwards]">
                <div className="rounded-2xl bg-[#0A0F1A] border border-red-500/30 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(239,68,68,0.15)] ring-1 ring-white/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-red-500/30">
                      <AlertTriangle size={18} className="text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white mb-1.5 whitespace-nowrap">High-Risk Scam Detected</h4>
                      <p className="text-[12px] text-white/70 leading-relaxed m-0">Signs of a crypto investment scam. Do not click the link or share financial info.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="absolute bottom-0 w-full bg-[#050810]/95 backdrop-blur-xl border-t border-white/5 p-4 z-40 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 hover:bg-white/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                </div>
                <div className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-[14px] text-white/30">Message...</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30"><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" /><path d="M12 12v.01" /><path d="M15.5 12v.01" /><path d="M8.5 12v.01" /></svg>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute top-[calc(100vh-44px)] left-1/2 -translate-x-1/2 text-white/30 animate-bounce pointer-events-none"
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}