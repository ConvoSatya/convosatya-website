export default function Hero() {
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
          transparent`,
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
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              maxWidth: "600px",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              position: "relative",
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
            className="max-lg:text-[40px]"
          >
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Detect scams in conversations
            </span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>before they cost you</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.7)",
              marginTop: "24px",
              maxWidth: "480px",
              lineHeight: 1.6,
              position: "relative",
            }}
          >
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
              href="#demo"
              className="w-full sm:w-auto flex justify-center items-center rounded-lg text-white font-semibold text-[16px] px-9 py-3.5 bg-gradient-to-r from-green-500 to-green-400 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:scale-105 transition-all duration-300 no-underline"
            >
              View Demo
            </a>
            <a
              href="/platform"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full sm:w-auto flex justify-center items-center gap-2"
              style={{
                padding: "14px 36px",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ▶ See the Platform
            </a>
          </div>

          {/* Credibility line */}
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "40px",
              letterSpacing: "0.2px",
              position: "relative",
            }}
          >
            Built from academic research at the University of New Haven
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
            className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_40px_rgba(0,120,255,0.2)] text-left transition-all duration-300 group-hover:-translate-y-1.5"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white/60">
                Live Analysis
              </span>
            </div>

            {/* Chat Preview */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-3 shadow-sm">
                <p className="m-0 text-[14px] leading-snug text-white/90">
                  Your account will be suspended, click here: <span className="text-blue-400 underline">bit.ly/auth-sec</span>
                </p>
              </div>
              <div className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0E7490] px-4 py-3 shadow-sm">
                <p className="m-0 text-[14px] leading-snug text-white">
                  Is this legit?
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/10 mb-6" />

            {/* Detection Panel */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-white/70">Scam Risk</span>
                <span className="text-[15px] font-bold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  87%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[14px] text-white/70">Category</span>
                <span className="text-[14px] font-semibold text-white">Phishing</span>
              </div>

              <div className="mt-2">
                <span className="text-[11px] text-white/50 uppercase tracking-wider font-semibold mb-3 block">
                  Signals Detected
                </span>
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {[
                    "Suspicious link",
                    "Urgency language",
                    "Brand impersonation"
                  ].map((signal, index) => (
                    <li key={index} className="flex items-center gap-2.5 text-[14px] text-white/85">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
