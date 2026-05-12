"use client";

import React, { useState, useEffect } from "react";
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
    
    // Scroll immediately on new step
    scrollToBottom();
    
    // When the detection panel triggers (step 14), its max-height transitions over 700ms.
    // We use a high-frequency interval to lock the scroll to the bottom as it expands.
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
    else if (step === 3) timeout = setTimeout(() => setStep(4), 1000); // typing
    else if (step === 4) timeout = setTimeout(() => setStep(5), 1500); 
    else if (step === 5) timeout = setTimeout(() => setStep(6), 1200);
    else if (step === 6) timeout = setTimeout(() => setStep(7), 1500);
    else if (step === 7) timeout = setTimeout(() => setStep(8), 1200); // user replies
    else if (step === 8) timeout = setTimeout(() => setStep(9), 1000); // typing
    else if (step === 9) timeout = setTimeout(() => setStep(10), 1800);
    else if (step === 10) timeout = setTimeout(() => setStep(11), 1800);
    else if (step === 11) timeout = setTimeout(() => setStep(12), 1000); // typing
    else if (step === 12) timeout = setTimeout(() => setStep(13), 1500);
    else if (step === 13) timeout = setTimeout(() => setStep(14), 1000); // detection triggers

    return () => clearTimeout(timeout);
  }, [step]);

  // Removed riskScore logic

  return (
    <section
      className="pt-20 sm:pt-24 md:pt-28 lg:pt-32"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "80px 16px",
        background: `
          radial-gradient(600px at 70% 30%, rgba(0, 120, 255, 0.25), transparent),
          radial-gradient(400px at 30% 70%, rgba(0, 200, 150, 0.15), transparent),
          linear-gradient(to bottom, transparent, rgba(0,0,0,0.8), #000000)`,
        overflow: "hidden",
      }}
    >
      {/* Subtle floating glow for "alive" feel */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] animate-float-glow pointer-events-none z-0" />

      {/* Container */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 items-center relative z-10">

        {/* Left Column: Text & CTA */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start z-10">
          {/* Headline */}
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] text-white font-bold leading-[1.1] tracking-[-0.02em] max-w-[600px] relative drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
            <span className="text-white">
              Detect scams in conversations
            </span>
            <br />
            <span className="text-white/90">before they cost you</span>
          </h1>

          {/* Subtext */}
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-white/75 mt-6 max-w-[480px] leading-[1.6] relative">
            Real-time AI detection and verification for SMS, email, and chat
            conversations.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "48px",
              position: "relative",
            }}
            className="flex-col sm:flex-row w-full sm:w-auto"
          >
            <AuthAwareRequestAccess />
          </div>

          {/* Credibility line */}
          <p className="text-[13px] text-white/75 mt-10 tracking-[0.2px] relative">
            Backed by Academic Research
          </p>
        </div>

        {/* Right Column: UI Mock (Phone) */}
        <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto z-10 mt-12 lg:mt-0 group cursor-default lg:scale-[0.92] lg:origin-center lg:-translate-y-6">
          {/* Subtle glow behind phone */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "140%",
              height: "140%",
              background: "radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 60%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Premium Phone Frame */}
          <div className="relative z-10 h-[680px] w-full rounded-[52px] border-[10px] border-[#111622] bg-[#050810] shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col">
            
            {/* Dynamic Island / Cutout Mock */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#111622] rounded-full z-50 flex items-center justify-start px-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.02)]">
               {/* Camera lens mock */}
               <div className="w-3 h-3 rounded-full bg-[#050810] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)] ml-1"></div>
               {/* Sensor mock */}
               <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40 ml-2"></div>
            </div>

            {/* App Header */}
            <div className="relative z-40 flex items-center justify-between border-b border-white/5 bg-[#050810]/95 backdrop-blur-xl px-4 pb-4 pt-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-white leading-tight">Unknown Contact</span>
                  <span className="text-[12px] text-white/40 mt-0.5">SMS</span>
                </div>
              </div>
              {step === 14 && (
                <button 
                  onClick={() => setStep(0)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Replay scenario"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
              )}
            </div>

            {/* Scrollable Chat Area */}
            <div 
              ref={chatContainerRef}
              className="relative z-20 flex-1 overflow-y-auto px-4 pb-[110px] pt-6 scroll-smooth [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/25 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
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
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}/>
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
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}/>
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
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>
              )}

              {step >= 13 && (
                <div className={`self-start max-w-[82%] rounded-[22px] rounded-tl-[6px] px-4 py-2.5 shadow-sm transition-all duration-500 animate-[fadeUp_0.4s_ease_out_forwards] z-30 ${step === 14 ? 'bg-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-[#1A1F2D] border border-white/5'}`}>
                  <p className="m-0 text-[14px] leading-snug text-white/90">
                    Here, use this link: <span className="text-blue-400 underline decoration-blue-400/50 underline-offset-2">bit.ly/auth-sec</span>
                  </p>
                </div>
              )}
              </div>
            </div>

            {/* Smart Safety Overlay */}
            {step === 14 && (
              <div className="absolute bottom-[88px] left-3 right-3 z-50 animate-[fadeUp_0.4s_ease-out_forwards]">
                <div className="rounded-2xl bg-[#0A0F1A]/95 backdrop-blur-xl border border-red-500/30 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(239,68,68,0.15)] ring-1 ring-white/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-red-500/30">
                      <AlertTriangle size={18} className="text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-white mb-1.5 tracking-wide">High-Risk Scam Detected</h4>
                      <p className="text-[12px] text-white/70 leading-relaxed m-0">
                        Signs of a crypto investment scam. Do not click the link or share financial info.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Message Input Mock */}
            <div className="absolute bottom-0 w-full bg-[#050810]/95 backdrop-blur-xl border-t border-white/5 p-4 z-40 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 hover:bg-white/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <div className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-[14px] text-white/30">Message...</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30"><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/><path d="M12 12v.01"/><path d="M15.5 12v.01"/><path d="M8.5 12v.01"/></svg>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
