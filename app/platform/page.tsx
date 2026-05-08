"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PlatformAccessPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent("ConvoSatya Platform Access Request");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:support@convosatya.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden px-6 pb-20 pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(46,196,182,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-6">
            <div className="mb-4 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
              Early Platform Access
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Request access to ConvoSatya
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Tell us who you are and how you would like to evaluate the platform.
              Our team will review your request and provide credentials if approved.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                placeholder="Company, university, or team"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                What would you like to evaluate?
              </label>
              <textarea
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Briefly describe your interest in ConvoSatya or FAUST."
                className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
              />
            </div>

            {submitted && (
              <div className="rounded-2xl border border-[#2EC4B6]/40 bg-[#2EC4B6]/10 p-3 text-sm text-[#8BE3DA]">
                Your email client should open with the request details. Send the email to complete the request.
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd]"
            >
              Request access
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Already approved? Use the Demo link and sign in with your provided username and password.
          </p>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Need more demo usage? Submit another access request mentioning your existing username.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}