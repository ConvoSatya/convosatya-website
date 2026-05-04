import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoLoginForm from "@/components/DemoLoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden px-6 pb-20 pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(46,196,182,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

        <Suspense
          fallback={
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center text-slate-300 shadow-2xl shadow-black/30 backdrop-blur">
              Loading login...
            </div>
          }
        >
          <DemoLoginForm />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}