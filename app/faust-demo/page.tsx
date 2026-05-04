import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaustDemoChat from "@/components/FaustDemoChat";
import DemoLogoutButton from "@/components/DemoLogoutButton";

export default async function FaustDemoPage() {
  const cookieStore = await cookies();
  const demoUserId =
    cookieStore.get("demo_username")?.value || "stakeholder_demo";

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(46,196,182,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
              FAUST Demo
            </div>

            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Conversational scam detection in real time
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Test FAUST with a simulated conversation. Messages appear instantly
              while the system analyzes safety signals in the background.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <p>
                Signed in as{" "}
                <span className="font-medium text-[#2EC4B6]">{demoUserId}</span>
              </p>

              <DemoLogoutButton />
            </div>
          </div>

          <FaustDemoChat demoUserId={demoUserId} />
        </div>
      </section>

      <Footer />
    </main>
  );
}