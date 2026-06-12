import { MessagesSquare, ShieldCheck, FlaskConical } from "lucide-react";
import Reveal from "./Reveal";

/* Trust section — the quietest block on the page. Three editorial
   columns, no cards: typography, hierarchy, and brevity. The icon chips
   reuse the capability-block language so the section belongs to the page. */

const pillars = [
  {
    index: "01",
    icon: <MessagesSquare size={20} />,
    title: "Understands the whole conversation",
    body: "Most tools read messages one at a time. FAUST follows the conversation as it unfolds — the trust building, the pressure, the ask.",
  },
  {
    index: "02",
    icon: <ShieldCheck size={20} />,
    title: "Privacy comes first",
    body: "A tool that reads conversations must earn that right. FAUST runs securely in the cloud today, designed to expose as little of your data as possible — and protection moves on-device when our mobile app arrives.",
  },
  {
    index: "03",
    icon: <FlaskConical size={20} />,
    title: "Built from research, shaped by real scams",
    body: "FAUST grew from years of research into how real scams build trust and manipulate over time — patterns traditional filters miss.",
  },
];

export default function WhyConvoSatya() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pt-10 pb-16 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center md:mb-16">
          <Reveal>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
              Why ConvoSatya
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-[26px] font-bold tracking-tight text-white sm:text-[32px] md:text-[40px]">
              Built for the way scams actually work.
            </h2>
          </Reveal>
        </div>

        {/* Three editorial columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.index} from="soft" delay={idx * 130} className="h-full">
              <div className="h-full border-l border-white/[0.08] pl-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-teal-400/20 bg-teal-400/10 text-teal-300">
                    {pillar.icon}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
                    {pillar.index}
                  </span>
                </div>
                <h3 className="mt-5 text-[18px] font-bold tracking-tight text-white sm:text-[20px]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
