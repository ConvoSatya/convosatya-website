import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemStats from "../components/ProblemStats";
import PlatformCapabilities from "../components/PlatformCapabilities";
import OnDeviceComingSoon from "../components/OnDeviceComingSoon";
import ScamReportingSection from "../components/ScamReportingSection";
import Footer from "../components/Footer";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ConvoSatya",
  url: "https://www.convosatya.com",
  logo: "https://www.convosatya.com/ConvoSatya.png",
  description:
    "ConvoSatya is a cybersecurity startup building AI-powered tools for scam detection, scam prevention, and post-scam reporting.",
  email: "support@convosatya.com",
  sameAs: [
    "https://www.linkedin.com/company/convosatya/",
    "https://github.com/ConvoSatya",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FAUST",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  url: "https://www.convosatya.com/faust-demo",
  creator: {
    "@type": "Organization",
    name: "ConvoSatya",
    url: "https://www.convosatya.com",
  },
  description:
    "FAUST is ConvoSatya's AI-powered conversational scam detection product. It analyzes multi-turn conversations and verifies suspicious artifacts such as URLs, phone numbers, emails, and claimed brands.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/LimitedAvailability",
    price: "0",
    priceCurrency: "USD",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ConvoSatya",
  url: "https://www.convosatya.com",
  description:
    "ConvoSatya is a cybersecurity startup building FAUST, an AI-powered conversational scam detection product.",
  publisher: {
    "@type": "Organization",
    name: "ConvoSatya",
    url: "https://www.convosatya.com",
  },
};

export const metadata: Metadata = {
  title: "ConvoSatya — AI Scam Detection",
  description:
    "ConvoSatya builds FAUST, an AI-powered conversational scam detection product that helps identify phishing, impersonation, and social engineering attacks across multi-turn conversations.",
  keywords: [
    "ConvoSatya",
    "FAUST",
    "scam detection",
    "AI fraud detection",
    "phishing protection",
    "conversational scam detection",
    "conversational AI security",
    "social engineering detection",
  ],
  openGraph: {
    title: "ConvoSatya — AI Scam Detection",
    description:
      "FAUST by ConvoSatya helps detect conversational scams, phishing, impersonation, and fraud using AI-powered multi-turn analysis.",
    url: "https://www.convosatya.com",
    siteName: "ConvoSatya",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={websiteSchema} />

      <Navbar />
      <Hero />
      <ProblemStats />
      <PlatformCapabilities />
      <OnDeviceComingSoon />
      <ScamReportingSection />
      <Footer />
    </>
  );
}