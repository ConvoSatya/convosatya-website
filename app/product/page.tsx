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

            <main>
                <section className="relative px-6 pb-12 pt-32 sm:px-10 lg:px-24">
                    <div className="mx-auto max-w-5xl text-center">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
                            Product
                        </p>

                        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                            Explore ConvoSatya
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60">
                            A deeper look at how FAUST supports privacy-first scam detection
                            and helps users organize evidence after suspicious conversations.
                        </p>
                    </div>
                </section>

                <OnDeviceComingSoon />
                <ScamReportingSection />
            </main>

            <Footer />
        </>
    );
}