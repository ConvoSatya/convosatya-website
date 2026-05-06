import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ | FAUST by ConvoSatya",
  description:
    "Frequently asked questions about FAUST by ConvoSatya, an AI-powered conversational scam detection product for phishing, impersonation, scam prevention, and artifact verification.",
};

const faqs = [
  {
    question: "What is ConvoSatya?",
    answer:
      "ConvoSatya is a cybersecurity startup building AI-powered tools for scam detection, scam prevention, and post-scam reporting.",
  },
  {
    question: "What is FAUST?",
    answer:
      "FAUST is ConvoSatya’s AI-powered conversational scam detection product. It analyzes suspicious conversations and helps detect scam patterns before users are harmed.",
  },
  {
    question: "How is FAUST different from a normal phishing detector?",
    answer:
      "Normal phishing detectors often focus on one message, link, or email. FAUST analyzes the full conversation context, because many scams develop gradually over multiple turns.",
  },
  {
    question: "What types of scams can FAUST help detect?",
    answer:
      "FAUST can help analyze phishing, brand impersonation, fake bank alerts, delivery scams, tech support scams, romance scams, investment scams, job scams, and other social engineering attempts.",
  },
  {
    question: "Does FAUST only check links?",
    answer:
      "No. FAUST looks at conversation behavior, urgency, impersonation, requests for sensitive information, suspicious links, phone numbers, emails, and claimed brands.",
  },
  {
    question: "How does the FAUST demo work?",
    answer:
      "Approved users can simulate a conversation in the demo. FAUST analyzes the conversation in the background and updates the warning, progress, and usage status.",
  },
  {
    question: "Does the FAUST demo store full conversations?",
    answer:
      "By default, the demo stores account-level usage counters such as messages used, verifier credits, URL checks, and contact checks. Full conversation transcripts are not stored in the database.",
  },
  {
    question: "Is FAUST a replacement for banks or law enforcement?",
    answer:
      "No. FAUST is a detection and decision-support product. Users should still verify suspicious claims through official channels and contact banks, platforms, or authorities when needed.",
  },
  {
    question: "Can FAUST be used for SMS, WhatsApp, email, or social platforms?",
    answer:
      "FAUST is designed around conversation-based scam detection, so it can be adapted for messaging channels such as SMS, email, WhatsApp-style conversations, and social platforms.",
  },
  {
    question: "How can I request access to FAUST?",
    answer:
      "You can request early platform access through the ConvoSatya website. Approved stakeholders may receive demo credentials to evaluate FAUST.",
  },
];

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <section
          className="pt-20 sm:pt-24 md:pt-28 lg:pt-32"
          style={{
            padding: "112px 16px 80px",
            background: `
              radial-gradient(600px at 70% 22%, rgba(0, 120, 255, 0.18), transparent),
              radial-gradient(420px at 22% 58%, rgba(0, 200, 150, 0.12), transparent),
              linear-gradient(to bottom, transparent, rgba(0,0,0,0.82), #000000)`,
          }}
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
                Frequently Asked Questions
              </div>

              <h1 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px] md:text-[52px]">
                FAQ about{" "}
                <span className="bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
                  FAUST
                </span>{" "}
                by ConvoSatya
              </h1>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 16px 88px" }}>
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h2 className="text-[18px] font-semibold leading-7 text-white">
                    {faq.question}
                  </h2>

                  <p className="mt-3 text-[15px] leading-7 text-white/70">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-[24px] font-bold text-white">
                Still have questions?
              </h2>

              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/70">
                Contact the ConvoSatya team or request access if you are
                evaluating FAUST for startup review, research, partnership, or
                early platform testing.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:support@convosatya.com"
                  className="inline-flex items-center justify-center rounded-full bg-[#2EC4B6] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] no-underline"
                >
                  Contact us
                </a>

                <Link
                  href="/platform"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 no-underline"
                >
                  Request demo access
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