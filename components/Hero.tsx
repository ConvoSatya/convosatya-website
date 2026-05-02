"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

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
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "120px 24px",
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
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">

        {/* Left Column: Text & CTA */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start z-10">
          {/* Headline */}
          <h1 className="max-lg:text-[40px] text-[56px] text-white font-bold leading-[1.1] tracking-[-0.02em] max-w-[600px] relative drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
            <span className="text-white">
              Detect scams in conversations
            </span>
            <br />
            <span className="text-white/90">before they cost you</span>
          </h1>

          {/* Subtext */}
          <p className="text-[18px] text-white/75 mt-6 max-w-[480px] leading-[1.6] relative">
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
            <a
              href="/platform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex justify-center items-center rounded-lg text-white font-semibold text-[16px] px-9 py-3.5 bg-gradient-to-r from-green-500 to-green-400 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:scale-105 transition-all duration-300 no-underline"
            >
              Request Access
            </a>
          </div>

          {/* Credibility line */}
          <p className="text-[13px] text-white/75 mt-10 tracking-[0.2px] relative">
            Backed by Academic Research
          </p>
        </div>

        {/* Right Column: UI Mock */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto z-10 mt-8 lg:mt-0 group cursor-default">
          {/* Subtle blue radial glow behind card */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "120%",
              background: "radial-gradient(circle at center, rgba(59,130,246,0.2), transparent 65%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Product Intelligence Panel */}
          <div
            className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_40px_rgba(0,120,255,0.2)] text-left transition-all duration-500 overflow-hidden"
          >
            {/* Background darkening overlay during detection */}
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-700 z-10 pointer-events-none ${step === 14 ? 'opacity-100' : 'opacity-0'}`} />

            {/* Header */}
            <div className="relative z-20 flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${step < 14 ? 'bg-[#2EC4B6] animate-pulse' : 'bg-red-500'}`} />
                <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white/60">
                  Live Analysis
                </span>
              </div>
              {step === 14 && (
                <button 
                  onClick={() => setStep(0)}
                  className="text-[11px] font-medium text-white/60 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Replay scenario
                </button>
              )}
            </div>

            {/* Scrollable Chat Area */}
            <div 
              ref={chatContainerRef}
              className="relative z-20 flex flex-col h-[420px] overflow-y-auto pr-2 pb-[80px] scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
            >
              {/* Spacer to push short chats to bottom */}
              <div className="flex-1 min-h-[20px]" />

              <div className="flex flex-col gap-2">
              
              {step >= 1 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/40 ml-1">Scammer</span>
                  <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[13px] leading-snug text-white/90">Hey, is this Alex?</p>
                  </div>
                </div>
              )}

              {step >= 2 && (
                <div className="flex flex-col gap-1 items-end mt-1">
                  <span className="text-[10px] text-white/40 mr-1">You</span>
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0E7490]/80 border border-[#0E7490] px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[13px] leading-snug text-white">Oh sorry wrong number 😅</p>
                  </div>
                </div>
              )}

              {step >= 3 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mt-1">
                  <p className="m-0 text-[13px] leading-snug text-white/90">No worries haha</p>
                </div>
              )}

              {step === 4 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.3s_ease_out_forwards] mt-1">
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>
              )}

              {step >= 5 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mt-1">
                  <p className="m-0 text-[13px] leading-snug text-white/90">Where are you based?</p>
                </div>
              )}

              {step >= 6 && (
                <div className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0E7490]/80 border border-[#0E7490] px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mt-1">
                  <p className="m-0 text-[13px] leading-snug text-white">I just moved here recently</p>
                </div>
              )}

              {step >= 7 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mt-1">
                  <p className="m-0 text-[13px] leading-snug text-white/90">Nice! I've been meeting good people here</p>
                </div>
              )}

              {step >= 8 && (
                <div className="flex flex-col gap-1 items-end mt-1">
                  <span className="text-[10px] text-white/40 mr-1">You</span>
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0E7490]/80 border border-[#0E7490] px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards]">
                    <p className="m-0 text-[13px] leading-snug text-white">Oh nice! Yeah it's a great area.</p>
                  </div>
                </div>
              )}

              {step === 9 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.3s_ease_out_forwards] mt-1">
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>
              )}

              {step >= 10 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mt-1">
                  <p className="m-0 text-[13px] leading-snug text-white/90">I've actually been making really good money with crypto lately</p>
                </div>
              )}

              {step >= 11 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.4s_ease_out_forwards] mt-1">
                  <p className="m-0 text-[13px] leading-snug text-white/90">You should try this platform, it's been working really well for me</p>
                </div>
              )}

              {step === 12 && (
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2 shadow-sm animate-[fadeUp_0.3s_ease_out_forwards] mt-1">
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>
              )}

              {step >= 13 && (
                <div className={`self-start max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm transition-all duration-500 animate-[fadeUp_0.4s_ease_out_forwards] mt-1 z-30 ${step === 14 ? 'bg-red-500/10 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.25)]' : 'bg-white/5 border border-white/5'}`}>
                  <p className="m-0 text-[13px] leading-snug text-white/90">
                    Here, use this link: <span className="text-blue-400 underline">bit.ly/auth-sec</span>
                  </p>
                </div>
              )}

              </div>
            {step === 14 && (
              <div className="relative z-30 flex flex-col mt-4 border-t border-red-500/20 pt-5" style={{ animation: 'fadeUp 0.4s ease-out forwards' }}>
                
                <div className="mb-4">
                  <h4 className="text-[15px] font-bold text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] m-0">
                    ⚠️ High Risk Scam Detected
                  </h4>
                </div>

                <div className="mt-2 bg-[#EF4444]/5 rounded-lg p-4 border border-[#EF4444]/20" style={{ animation: 'fadeUp 0.4s ease-out 0.2s forwards', opacity: 0 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-red-400" />
                    <span className="text-white font-semibold text-sm">Recommended Action</span>
                  </div>
                  <p className="text-[13px] text-white/70 leading-relaxed m-0">
                    Do not click the link or share any personal or financial information.<br/>
                    This message shows signs of a Pig Butchering (Crypto Investment Scam) designed to build trust and create urgency.<br/>
                    Always verify through official sources before taking any action.
                  </p>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
