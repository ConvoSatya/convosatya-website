import Image from "next/image";
import Link from "next/link";

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
        <Link href="/" className="flex items-center gap-3 mb-10 no-underline group">
          <Image
            src="/logo.png"
            alt="ConvoSatya logo"
            width={36}
            height={36}
            priority
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl tracking-tight">
            <span className="font-semibold text-white">Convo</span>
            <span className="font-bold text-[#2EC4B6]">Satya</span>
          </span>
        </Link>

        {/* Login Card */}
        <div 
          className="w-full rounded-2xl p-8 sm:p-10 transition-all duration-300"
          style={{
            background: "rgba(20, 25, 40, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 0 40px rgba(30,58,138,0.15)",
          }}
        >
          <h1 className="text-[22px] font-bold text-white text-center mb-8 tracking-tight">
            Access ConvoSatya
          </h1>

          <form className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-white/50">
                Email address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-[#0A0D14] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-medium text-white/50">
                  Password
                </label>
                <a href="#" className="text-[12px] font-medium text-[#3B82F6] hover:text-blue-400 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#0A0D14] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full mt-3 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              style={{
                background: "linear-gradient(to right, #1D4ED8, #3B82F6)",
              }}
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-bold text-white/30 tracking-[0.15em] uppercase">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-transparent border border-white/10 hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all duration-300 text-[13px] font-medium text-white/80">
              {/* Minimal Google Icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-transparent border border-white/10 hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all duration-300 text-[13px] font-medium text-white/80">
              {/* Minimal GitHub Icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
