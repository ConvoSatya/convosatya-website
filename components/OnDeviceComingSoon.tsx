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

              <div className="relative rounded-[42px] border border-white/10 bg-black p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="h-[560px] w-[280px] overflow-hidden rounded-[32px] border border-white/10 bg-[#07111f]">
                  <div className="border-b border-white/10 bg-black/40 px-5 py-4">
                    <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
                    <p className="text-xs font-semibold uppercase tracking-[1.4px] text-[#2EC4B6]">
                      FAUST On Device
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      Local safety scan
                    </h3>
                  </div>

                  <div className="space-y-4 p-5">
                    <PhoneCard
                      label="Conversation"
                      value="Suspicious urgency detected"
                    />
                    <PhoneCard
                      label="Privacy mode"
                      value="Processing closer to device"
                    />
                    <PhoneCard
                      label="Risk signal"
                      value="Unknown contact asking for payment"
                    />

                    <div className="rounded-2xl border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 p-4">
                      <p className="text-sm font-semibold text-[#8BE3DA]">
                        Safety suggestion
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/75">
                        Pause before responding. Verify the request through an
                        official channel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional real image replacement:
                  If you create a phone mockup image, replace the phone JSX above with:
                  <Image src="/on-device-preview.png" alt="FAUST on-device preview" width={360} height={720} />
              */}
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

function PhoneCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[1.3px] text-white/40">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/80">{value}</p>
    </div>
  );
}