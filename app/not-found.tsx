import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section
          style={{
            padding: "160px 16px 120px",
            background: `
              radial-gradient(600px at 70% 22%, rgba(0, 120, 255, 0.18), transparent),
              radial-gradient(420px at 22% 58%, rgba(0, 200, 150, 0.12), transparent),
              linear-gradient(to bottom, transparent, rgba(0,0,0,0.82), #000000)`,
          }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-5 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
                404 · Suspicious Route Detected
              </div>

              <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px] md:text-[56px]">
                This link looks a little{" "}
                <span className="bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
                  phishy
                </span>
                .
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-[16px] leading-7 text-white/70">
                We checked the route, and it does not seem to belong to any page
                on ConvoSatya. No panic, no clicking random links, and no wiring
                money to a mysterious prince. Let&apos;s get you somewhere safe.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
                <p className="text-[14px] font-semibold text-white">
                  Safety tip:
                </p>

                <p className="mt-2 text-[14px] leading-7 text-white/65">
                  If a real message sends you to a strange page, stop and verify
                  it through the company&apos;s official website or app. FAUST is
                  built for exactly that kind of suspicious conversation.
                </p>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#2EC4B6] px-6 py-3 text-sm font-semibold text-slate-950 no-underline transition hover:bg-[#5bd8cd]"
                >
                  Head back to safety
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}