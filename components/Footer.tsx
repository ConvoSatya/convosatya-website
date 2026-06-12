"use client";

import Image from "next/image";
import Link from "next/link";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.19 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.24 2H21.5l-7.12 8.14L22.75 22h-6.56l-5.14-6.71L5.17 22H1.91l7.61-8.7L1.25 2h6.72l4.64 6.14L18.24 2Zm-1.14 17.91h1.81L6.99 3.99H5.05l12.05 15.92Z" />
    </svg>
  );
}

const navLinkClasses =
  "text-[14px] text-white/75 hover:text-white no-underline transition-colors";

const socialLinkClasses =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-teal-400/50 hover:bg-teal-400/10 hover:text-teal-300";

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
      className="border-t border-white/[0.06] bg-[#02050A] px-6 pb-8 pt-14"
    >
      {/* Top: 3 columns */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        {/* Brand */}
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
              <span className="font-semibold text-white">Convo</span>
              <span className="font-bold bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
                Satya
              </span>
            </span>
          </Link>

          <p className="mt-3 max-w-[240px] text-[14px] leading-relaxed text-white/60">
            AI-powered scam detection for conversations
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/convosatya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ConvoSatya LinkedIn"
              className={socialLinkClasses}
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/ConvoSatya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ConvoSatya GitHub"
              className={socialLinkClasses}
            >
              <GitHubIcon />
            </a>
            <a
              href="https://x.com/convosatya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ConvoSatya on X"
              className={socialLinkClasses}
            >
              <XIcon />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mt-0 mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Navigation
          </h4>

          <div className="grid max-w-[260px] grid-cols-2 gap-x-6 gap-y-2.5">
            <Link href="/product" className={navLinkClasses}>
              Product
            </Link>
            <Link href="/team" className={navLinkClasses}>
              Team
            </Link>
            <Link href="/faust-demo" className={navLinkClasses}>
              Demo
            </Link>
            <Link href="/careers" className={navLinkClasses}>
              Careers
            </Link>
            <Link href="/faq" className={navLinkClasses}>
              FAQ
            </Link>
            <Link href="/contact" className={navLinkClasses}>
              Contact
            </Link>
          </div>
        </div>

        {/* Get in touch */}
        <div>
          <h4 className="mt-0 mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Get in Touch
          </h4>

          <a
            href="mailto:support@convosatya.com"
            className="text-[14px] text-white/75 no-underline transition-colors hover:text-white"
          >
            support@convosatya.com
          </a>

          <div className="mt-3">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-access-modal"))
              }
              className="cursor-pointer text-left text-[14px] text-teal-400 transition-colors hover:text-teal-300"
            >
              Request Early Access →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-12 border-t border-white/[0.08] pt-6 text-center">
        <p className="m-0 text-[13px] text-white/50">
          © 2026 ConvoSatya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
