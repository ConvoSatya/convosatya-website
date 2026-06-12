import Link from "next/link";
import { Landmark, RadioTower, Shield, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import AuthAwareRequestAccess from "./AuthAwareRequestAccess";

/* Audience + business-model section. The layout mirrors the headline:
   two columns — people (warm, carries the consumer CTA) and institutions
   (cold, four segments + the work-with-us funnel). Calm motion only. */

const institutions = [
  { name: "Financial Services & Crypto", icon: <Landmark size={18} /> },
  { name: "Telcos & Networks", icon: <RadioTower size={18} /> },
  { name: "Government Agencies", icon: <Shield size={18} /> },
  { name: "Education", icon: <GraduationCap size={18} /> },
];

export default function WhoItsFor() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pt-10 pb-20 md:pt-12 md:pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-14">
          <Reveal>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
              Who it&apos;s for
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-[24px] font-bold tracking-tight text-white sm:text-[30px] md:text-[38px]">
              Protection for people. Intelligence for institutions.
            </h2>
          </Reveal>
        </div>

        {/* Two columns mirroring the headline */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* For people — warm tier, consumer CTA */}
          <Reveal from="soft" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:border-teal-400/30 sm:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
                For people
              </p>
              <p className="mt-5 max-w-md text-[20px] font-semibold leading-snug tracking-tight text-white sm:text-[24px]">
                Real-time protection for you, your family, and senior citizens.
              </p>
              <p className="mt-3 text-[14px] leading-6 text-white/55">
                Inside the conversations where scams actually begin.
              </p>
              <div className="mt-8 lg:mt-auto lg:pt-8">
                <AuthAwareRequestAccess />
              </div>
            </div>
          </Reveal>

          {/* For institutions — cold tier, four segments + funnel */}
          <Reveal from="soft" delay={130} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:border-teal-400/30 sm:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
                For institutions
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {institutions.map((inst) => (
                  <div
                    key={inst.name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-teal-400/30"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-teal-400/20 bg-teal-400/10 text-teal-300">
                      {inst.icon}
                    </span>
                    <span className="text-[14px] font-semibold tracking-tight text-white">
                      {inst.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-white/[0.08] pt-6 lg:mt-auto">
                <p className="text-[14px] text-white/60">
                  Interested in bringing ConvoSatya to your organization?
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-block text-[14px] font-semibold text-teal-400 no-underline transition-colors hover:text-teal-300"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
