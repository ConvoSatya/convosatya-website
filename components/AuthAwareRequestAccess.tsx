"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthAwareRequestAccess() {
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return (
        <Link
        href="/faust-demo"
        className="inline-flex items-center justify-center rounded-full bg-[#2EC4B6] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] no-underline"
        >
        Go to Demo
        </Link>
    );
    }

  return (
    <Link
      href="/platform"
      className="inline-flex items-center justify-center rounded-full bg-[#2EC4B6] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] no-underline"
    >
      Request Early Platform Access
    </Link>
  );
}