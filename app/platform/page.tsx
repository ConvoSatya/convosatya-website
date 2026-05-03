import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform — ConvoSatya',
  description: 'Explore the ConvoSatya platform — AI-powered scam and fraud detection built from academic research at University of New Haven.',
  openGraph: {
    title: 'Platform — ConvoSatya',
    description: 'AI-powered scam detection platform by ConvoSatya.',
    url: 'https://convosatya.com/platform',
    siteName: 'ConvoSatya',
    type: 'website',
  },
}

import Image from "next/image";
import Link from "next/link";

import { Mail, Lock, ChevronRight } from "lucide-react";

export default function PlatformLogin() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#000000] px-4 overflow-hidden">
      {/* Background Soft Glow centered behind the form */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(30,58,138,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-4 mb-8 no-underline group cursor-pointer">
          <Image
            src="/ConvoSatya.png"
            alt="ConvoSatya logo"
            width={48}
            height={48}
            priority
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-3xl tracking-tight">
            <span className="font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">Convo</span>
            <span className="font-bold bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,197,94,0.25)]">Satya</span>
          </span>
        </Link>

        {/* Login Card */}
        <div 
          className="w-full rounded-[24px] p-8 sm:p-9 transition-all duration-300"
          style={{
            background: "#080808",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <h1 className="text-2xl font-bold text-[#F1F5F9] text-center mb-2 tracking-tight">
            Login
          </h1>
          <p className="text-[13px] text-[#CBD5F5] text-center mb-8 leading-relaxed px-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.05)]">
            Access is currently granted on a selective basis. Request access to use our platform.
          </p>

          <form className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90 ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="john.smith@example.com"
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[15px] text-white placeholder:text-white/20 outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[15px] text-white placeholder:text-white/20 outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full mt-2 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "#0047FF",
              }}
            >
              Sign in
            </button>
          </form>

          {/* Direct Request Access */}
          <div className="text-center mt-6 border-t border-white/5 pt-6">
            <p className="text-white/80 text-[13px] leading-relaxed">
              Write to <span className="text-[#2EC4B6] font-medium">support@convosatya.com</span> to request access.
            </p>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@convosatya.com&su=ConvoSatya&body=Hi ConvoSatya team,%0A%0AI would like to request access to the platform.%0A%0AName:%0AUse Case:%0A%0AThanks." 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-8 py-2 rounded-full border border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6]/10 transition-all font-semibold text-[14px] no-underline"
            >
              Email for Access
            </a>

            <p className="text-white/50 text-[11px] mt-5 tracking-wide italic">
              Credentials are shared after access approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
