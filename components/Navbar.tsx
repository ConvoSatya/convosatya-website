"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: scrolled
          ? "rgba(11, 31, 51, 0.7)"
          : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src="/logo.png"
            alt="ConvoSatya logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl tracking-tight">
            <span className="font-medium text-white">Convo</span>
            <span className="font-semibold text-[#2EC4B6]">Satya</span>
          </span>
        </Link>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="#product" className="text-sm font-medium text-white/70 hover:text-white no-underline transition-colors">
            Product
          </Link>
          <Link href="#demo" className="text-sm font-medium text-white/70 hover:text-white no-underline transition-colors">
            Demo
          </Link>
          <Link href="#contact" className="text-sm font-medium text-white/70 hover:text-white no-underline transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
