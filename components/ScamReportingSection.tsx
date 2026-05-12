import Link from "next/link";

export default function ScamReportingSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(to bottom, #000000 0%, #02050A 48%, #020617 100%)",
        padding: "88px 16px 104px",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Phone visual */}
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[90px]" />

              <div className="relative rounded-[42px] border border-white/10 bg-[#0A0E17] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="relative flex h-[580px] w-[290px] flex-col overflow-hidden rounded-[32px] border border-white/5 bg-[#050810] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                  {/* Phone Notch/Header area */}
                  <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#0A0E17] border-b border-white/5" />
                  
                  <div className="flex items-center justify-center border-b border-white/5 bg-white/[0.02] pb-3 pt-10">
                    <h3 className="text-sm font-semibold tracking-wide text-white">
                      Evidence package
                    </h3>
                  </div>

                  {/* App Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Status Badge */}
                    <div className="mb-6 flex justify-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-1.5 text-xs font-semibold text-[#2EC4B6]">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EC4B6] opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2EC4B6]"></span>
                        </span>
                        Ready to report
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mb-6 flex-1 space-y-4">
                      <div className="flex flex-col gap-1 rounded-xl bg-white/[0.03] p-3 border border-white/5">
                        <span className="flex items-center gap-2 text-sm font-medium text-white">
                          <svg className="h-4 w-4 text-[#2EC4B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Timeline organized
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 rounded-xl bg-white/[0.03] p-3 border border-white/5">
                        <span className="flex items-center gap-2 text-sm font-medium text-white">
                          <svg className="h-4 w-4 text-[#2EC4B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Risk signals extracted
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 rounded-xl bg-white/[0.03] p-3 border border-white/5">
                        <span className="flex items-center gap-2 text-sm font-medium text-white">
                          <svg className="h-4 w-4 text-[#2EC4B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Report summary prepared
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 rounded-xl bg-white/[0.03] p-3 border border-white/5">
                        <span className="flex items-center gap-2 text-sm font-medium text-white">
                          <svg className="h-4 w-4 text-[#2EC4B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                          Next steps generated
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="mt-auto w-full rounded-xl bg-[#2EC4B6] py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#5bd8cd]">
                      Prepare report
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional real image replacement:
                  If you create a phone mockup image, replace the phone JSX above with:
                  <Image src="/reporting-preview.png" alt="FAUST scam reporting preview" width={360} height={720} />
              */}
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="mb-5 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
              Reporting Workflow
            </div>

            <h2 className="max-w-2xl text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[42px] md:text-[50px]">
              Reporting scams has never been easier.
            </h2>

            <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/70">
              When a scam happens, victims often do not know what to save, where
              to report, or how to explain what happened. ConvoSatya aims to
              turn messy conversations into structured evidence.
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/60">
              FAUST can help summarize suspicious messages, identify risky
              artifacts, and prepare a clearer report that can support faster
              action with banks, platforms, or official reporting channels.
            </p>

            <div className="mt-8 space-y-4">
              <ValueRow
                title="Organize the timeline"
                text="Convert scattered messages into a clear sequence of events."
              />
              <ValueRow
                title="Highlight the evidence"
                text="Surface suspicious links, phone numbers, emails, and impersonation claims."
              />
              <ValueRow
                title="Support next steps"
                text="Give users a clearer path for reporting and recovery."
              />
            </div>

            <div className="mt-9">
              <Link
                href="/platform"
                className="inline-flex items-center justify-center rounded-full bg-[#2EC4B6] px-6 py-3 text-sm font-semibold text-slate-950 no-underline transition hover:bg-[#5bd8cd]"
              >
                Request early access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2EC4B6]" />
      <div>
        <p className="text-[15px] font-semibold text-white">{title}</p>
        <p className="mt-1 text-[14px] leading-6 text-white/60">{text}</p>
      </div>
    </div>
  );
}