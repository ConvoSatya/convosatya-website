"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthAwareRequestAccess() {
  // Render the default CTA immediately and swap only if the session check
  // says the user is logged in — returning null while loading made the
  // button pop in and the centered hero layout jump on every page load.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/session", {
          cache: "no-store",
        });

        const data = await response.json();
        setIsLoggedIn(Boolean(data.loggedIn));
      } catch {
        setIsLoggedIn(false);
      }
    }

    checkSession();
  }, []);

  if (isLoggedIn) {
    return (
        <Link
        href="/faust-demo"
        className="inline-flex items-center justify-center rounded-full bg-[#29B0A4] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-[#2EC4B6] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_20px_rgba(46,196,182,0.2)] active:translate-y-0 active:scale-95 no-underline"
        >
        Go to Demo
        </Link>
    );
    }

  return (
    <Link
      href="/platform"
      className="inline-flex items-center justify-center rounded-full bg-[#29B0A4] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-[#2EC4B6] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_20px_rgba(46,196,182,0.2)] active:translate-y-0 active:scale-95 no-underline"
    >
      Request Early Access
    </Link>
  );
}