"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import Reveal from "./Reveal";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.19 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2H21.5l-7.12 8.14L22.75 22h-6.56l-5.14-6.71L5.17 22H1.91l7.61-8.7L1.25 2h6.72l4.64 6.14L18.24 2Zm-1.14 17.91h1.81L6.99 3.99H5.05l12.05 15.92Z" />
    </svg>
  );
}

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-teal-400/50";

const socialLinkClasses =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-teal-400/50 hover:bg-teal-400/10 hover:text-teal-300";

export default function ContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent("ConvoSatya — Contact");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\n\n${message}`
    );

    window.location.href = `mailto:support@convosatya.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <main className="relative bg-black px-6 pb-12 pt-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center md:mb-10">
          <Reveal>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
              Contact
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-[28px] font-bold tracking-tight text-white sm:text-[34px] md:text-[40px]">
              Let&apos;s talk.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-3 max-w-3xl text-[14px] leading-6 text-white/60 sm:text-[15px]">
              Questions, partnerships, research collaborations, or early access
              requests — we&apos;d love to hear from you.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: email + socials, one card */}
          <Reveal from="soft" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-teal-400/20 bg-teal-400/10 text-teal-300">
                <Mail size={20} />
              </span>
              <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
                Email
              </p>
              <a
                href="mailto:support@convosatya.com"
                className="mt-1.5 inline-block text-[16px] font-semibold text-white no-underline transition-colors hover:text-teal-300"
              >
                support@convosatya.com
              </a>

              <div className="mt-auto flex items-center gap-3 border-t border-white/[0.08] pt-6">
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
          </Reveal>

          {/* Right: form */}
          <Reveal from="soft" delay={150}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7"
            >
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-white/80">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-white/80">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-white/80">
                    Organization <span className="text-white/40">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(event) => setOrganization(event.target.value)}
                    placeholder="Company, university, or team"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-white/80">
                    Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="What's on your mind?"
                    className={`${inputClasses} h-20 resize-none`}
                  />
                </div>

                {submitted && (
                  <div className="rounded-xl border border-teal-400/30 bg-teal-400/10 p-2.5 text-[13px] text-teal-300">
                    Your email app should open with the message ready — hit send
                    to finish.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#29B0A4] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-[#2EC4B6] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  Send message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
