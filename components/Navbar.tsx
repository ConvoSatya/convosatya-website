"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const scrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[1000] transition-all duration-300 border-b ${
        scrolled 
          ? "bg-black/70 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Left: Logo + Brand */}
        <Link 
          href="/" 
          onClick={scrollToTop}
          className="flex items-center gap-2 no-underline cursor-pointer group"
        >
          <Image
            src="/ConvoSatya.png"
            alt="ConvoSatya logo"
            width={32}
            height={32}
            priority
            className="group-hover:scale-105 transition-transform"
          />
          <span className="text-xl tracking-tight">
            <span className="font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">Convo</span>
            <span className="font-bold bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,197,94,0.25)]">Satya</span>
          </span>
        </Link>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            href="#demo"
            className="text-[rgba(255,255,255,0.85)] text-sm font-medium tracking-wide transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] no-underline"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Demo
          </Link>
          <Link
            href="#contact"
            className="text-[rgba(255,255,255,0.85)] text-sm font-medium tracking-wide transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] no-underline"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
