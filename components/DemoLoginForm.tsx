"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DemoLoginForm() {
  const searchParams = useSearchParams();

  const nextPath = searchParams.get("next") || "/faust-demo";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("login_failed");
      }

      window.location.href = nextPath;
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="mb-6">
        <div className="mb-4 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
          Demo Access
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Sign in to FAUST Demo
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Use the username and password provided by the ConvoSatya team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Username
          </label>
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Password"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
            <p className="font-semibold">Access check failed.</p>
            <p className="mt-1 leading-6">
              This demo is protected, just like your conversations should be.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Checking access..." : "Sign in"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs leading-5 text-slate-500">
        Access is currently limited.
      </p>
    </div>
  );
}