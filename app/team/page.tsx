import type { Metadata } from "next";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
    title: "Team - ConvoSatya",
    description:
        "Meet the founders building ConvoSatya, an AI-powered scam detection platform for real conversations.",
};

const founders = [
    {
        name: "Ahmed Omar",
        title: "Founder",
        image: "/team/omar.png",
        bio: "Omar leads the AI cybersecurity research and technical direction behind ConvoSatya. He started the FAUST scam detection system and focuses on turning research into practical protection for real-world conversational scams.",
        linkedin: "https://www.linkedin.com/in/ahmed-omars/",
        portfolio: "https://ahmedomar.netlify.app/",
    },
    {
        name: "Yogananda Manjunath",
        title: "Co-founder",
        image: "/team/yogananda.png",
        bio: "Yogananda leads product direction, user experience, testing, and execution for ConvoSatya. He focuses on turning the research into a clear product that people can understand, trust, and actually use in real situations.",
        linkedin: "https://www.linkedin.com/in/yogananda-manjunath-827113227/",
        portfolio: "https://yogananda16.github.io/yogananda-portfolio-latest/",
    },
];

export default function TeamPage() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-black text-white">
                <section className="relative overflow-hidden px-6 pb-14 pt-32 sm:px-10 lg:px-24">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_30%)]" />

                    <div className="mx-auto max-w-5xl text-center">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
                            Team
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Built by founders turning AI research into real-world protection
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
                            ConvoSatya started from AI cybersecurity research and is now being
                            built into a product that helps people recognize risky
                            conversations before harm happens.
                        </p>
                    </div>
                </section>

                <section className="px-6 pb-28 sm:px-10 lg:px-24">
                    <div className="mx-auto grid max-w-6xl items-stretch gap-8 md:grid-cols-2">
                        {founders.map((founder) => (
                            <div
                                key={founder.name}
                                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition hover:border-teal-400/35 hover:bg-white/[0.04] sm:p-8"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                                        <Image
                                            src={founder.image}
                                            alt={`${founder.name} photo`}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <h2 className="mt-7 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                        {founder.name}
                                    </h2>

                                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">
                                        {founder.title}
                                    </p>
                                </div>

                                <p className="mt-7 flex-1 text-center text-base leading-8 text-white/62">
                                    {founder.bio}
                                </p>

                                <div className="mt-8 flex flex-wrap justify-center gap-3">
                                    <a
                                        href={founder.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-teal-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-teal-300"
                                    >
                                        LinkedIn
                                    </a>

                                    <a
                                        href={founder.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/10"
                                    >
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}