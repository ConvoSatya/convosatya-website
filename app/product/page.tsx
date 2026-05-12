import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import OnDeviceComingSoon from "../../components/OnDeviceComingSoon";
import ScamReportingSection from "../../components/ScamReportingSection";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
    title: "Product - ConvoSatya",
    description:
        "Explore ConvoSatya's product direction, including on-device scam protection and post-scam reporting workflows powered by FAUST.",
};

export default function ProductPage() {
    return (
        <>
            <Navbar />

            <main className="bg-black">
                {/* Hero Section */}
                <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-24">
                    <div className="mx-auto max-w-5xl text-center">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
                            Product
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Protection before and after a scam
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60">
                            FAUST helps people detect risky conversations before they act, and organize evidence if something already happened.
                        </p>
                    </div>
                </section>

                {/* Overview Cards Section */}
                <section className="px-6 pb-24 sm:px-10 lg:px-24">
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Card 1 */}
                        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition hover:border-teal-400/35 hover:bg-white/[0.04]">
                            <div className="mb-5 inline-flex self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-teal-400">
                                Before harm happens
                            </div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Detect risky conversations
                            </h2>
                            <p className="mt-4 flex-1 text-base leading-7 text-white/60">
                                Analyze conversation context, suspicious links, urgency, impersonation, and payment requests before the user responds.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition hover:border-teal-400/35 hover:bg-white/[0.04]">
                            <div className="mb-5 inline-flex self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-teal-400">
                                After something goes wrong
                            </div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Prepare a clearer report
                            </h2>
                            <p className="mt-4 flex-1 text-base leading-7 text-white/60">
                                Organize messages, extract risk signals, and turn scattered evidence into a timeline users can act on.
                            </p>
                        </div>
                    </div>
                </section>

                <div id="on-device">
                    <OnDeviceComingSoon />
                </div>
                <div id="reporting">
                    <ScamReportingSection />
                </div>
            </main>

            <Footer />
        </>
    );
}