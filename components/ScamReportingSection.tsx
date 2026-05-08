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

              <div className="relative rounded-[42px] border border-white/10 bg-black p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="h-[560px] w-[280px] overflow-hidden rounded-[32px] border border-white/10 bg-[#07111f]">
                  <div className="border-b border-white/10 bg-black/40 px-5 py-4">
                    <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
                    <p className="text-xs font-semibold uppercase tracking-[1.4px] text-[#2EC4B6]">
                      Scam Report
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      Evidence package
                    </h3>
                  </div>

                  <div className="space-y-4 p-5">
                    <ReportStep number="1" title="Chat evidence" text="Suspicious messages organized into a timeline." />
                    <ReportStep number="2" title="Risk signals" text="Links, contacts, urgency, and impersonation cues summarized." />
                    <ReportStep number="3" title="Next actions" text="Clear reporting guidance for banks, platforms, or authorities." />

                    <div className="rounded-2xl bg-[#2EC4B6] p-4 text-slate-950">
                      <p className="text-sm font-bold">Ready to report</p>
                      <p className="mt-2 text-sm leading-6 opacity-80">
                        A clearer path from suspicious conversation to
                        actionable evidence.
                      </p>
                    </div>
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

function ReportStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#2EC4B6]">
          {number}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs leading-5 text-white/55">{text}</p>
        </div>
      </div>
    </div>
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