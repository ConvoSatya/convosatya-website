import Image from "next/image";

export default function OnDeviceComingSoon() {
  return (
    <section
      style={{
        background:
          "linear-gradient(to bottom, #020617 0%, #02050A 50%, #000000 100%)",
        padding: "88px 16px",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <div className="mb-5 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
              Coming Soon
            </div>

            <h2 className="max-w-2xl text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[42px] md:text-[50px]">
              On-device scam protection, built for privacy.
            </h2>

            <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/70">
              An on-device version of Faust is under development which help analyze suspicious conversations closer to where they happen:
              on the user&apos;s phone.
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/60">
              The goal is simple: reduce unnecessary data exposure, support
              faster warnings, and make scam detection more accessible for
              everyday messaging environments.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FeaturePill title="Privacy-first" text="Designed to reduce unnecessary data sharing." />
              <FeaturePill title="Mobile-ready" text="Built with real messaging workflows in mind." />
              <FeaturePill title="Future-focused" text="A step toward safer conversations anywhere." />
            </div>
          </div>

          {/* Phone visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2EC4B6]/15 blur-[90px]" />

              <div className="relative rounded-[42px] border border-white/10 bg-[#0A0E17] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="relative flex h-[580px] w-[290px] flex-col overflow-hidden rounded-[32px] border border-white/5 bg-[#050810] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                  {/* Phone Notch/Header area */}
                  <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#0A0E17] border-b border-white/5" />
                  
                  <div className="flex items-center justify-center border-b border-white/5 bg-white/[0.02] pb-3 pt-10">
                    <h3 className="text-sm font-semibold tracking-wide text-white">
                      ConvoSatya
                    </h3>
                  </div>

                  {/* App Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Main Alert */}
                    <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-white">High-risk conversation detected</h4>
                    </div>

                    {/* Details */}
                    <div className="mb-6 flex-1 space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-xs text-white/50">Risk level</span>
                        <span className="text-xs font-semibold text-red-400">High</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-xs text-white/50">Scam type</span>
                        <span className="text-xs font-semibold text-white">Impersonation / payment request</span>
                      </div>
                      
                      <div>
                        <span className="mb-2 block text-xs text-white/50">Signals</span>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-xs text-white/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4B6]" />
                            Unknown contact
                          </li>
                          <li className="flex items-center gap-2 text-xs text-white/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4B6]" />
                            Urgent money request
                          </li>
                          <li className="flex items-center gap-2 text-xs text-white/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4B6]" />
                            Suspicious link or payment instruction
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Suggested Action */}
                    <div className="mb-6 rounded-xl bg-white/5 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Suggested action</p>
                      <p className="mt-1 text-sm leading-5 text-white/90">Pause before responding. Verify through an official channel.</p>
                    </div>

                    {/* Action Button */}
                    <button className="mt-auto w-full rounded-xl bg-[#2EC4B6] py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#5bd8cd]">
                      Do not respond yet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-xs leading-5 text-white/55">{text}</p>
    </div>
  );
}