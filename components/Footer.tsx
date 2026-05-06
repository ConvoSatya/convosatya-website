"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    // If we're already on the home page, just scroll up
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: "#02050A",
        color: "#E5E7EB",
        padding: "64px 24px 32px",
      }}
    >
      {/* Top: 3 columns */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
        }}
      >
        {/* Left: Logo + tagline */}
        <div>
          <Link 
            href="/" 
            onClick={scrollToTop}
            className="flex items-center gap-[10px] no-underline group cursor-pointer opacity-80 hover:opacity-100 transition-all"
          >
            <Image
              src="/ConvoSatya.png"
              alt="ConvoSatya logo"
              width={28}
              height={28}
              className="group-hover:scale-105 transition-transform"
            />
            <span className="text-[18px] tracking-tight">
              <span className="font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">Convo</span>
              <span className="font-bold bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,197,94,0.25)]">Satya</span>
            </span>
          </Link>
          <p className="text-[14px] text-white/75 mt-3 leading-relaxed">
            AI-powered scam detection for conversations
          </p>
        </div>

        {/* Middle: Navigation */}
        <div>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.4)",
              marginTop: 0,
              marginBottom: "16px",
            }}
          >
            Navigation
          </h4>
          <div className="flex flex-col gap-2.5">
            <Link href="/faust-demo" className="text-[14px] text-white/75 hover:text-white no-underline transition-colors">
              Demo
            </Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
              className="text-[14px] text-left text-white/75 hover:text-white transition-colors cursor-pointer"
            >
              Request Early Platform Access
            </button>
          </div>
        </div>

        {/* Right: Contact */}
        <div>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.4)",
              marginTop: 0,
              marginBottom: "16px",
            }}
          >
            Get in Touch
          </h4>
          <p className="text-[14px] text-white/75 m-0 hover:text-white transition-colors cursor-pointer">
            support@convosatya.com
          </p>
          <p className="text-[13px] text-white/75 mt-3">
            Backed by Academic Research
          </p>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: "48px",
          paddingTop: "24px",
          textAlign: "center",
        }}
      >
        <p className="text-[13px] text-white/50 m-0">
          © 2026 ConvoSatya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
