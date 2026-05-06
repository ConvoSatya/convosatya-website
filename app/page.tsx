import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ConvoSatya — AI Scam Detection',
  description: 'ConvoSatya uses AI to detect conversational scams and phishing attacks in real-time. Protect yourself from fraud before it happens.',
  keywords: ['scam detection', 'AI fraud detection', 'phishing protection', 'conversational AI security', 'ConvoSatya'],
  openGraph: {
    title: 'ConvoSatya — AI Scam Detection',
    description: 'Real-time AI-powered protection against conversational scams and fraud.',
    url: 'https://convosatya.com',
    siteName: 'ConvoSatya',
    type: 'website',
  },
}

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemStats from "../components/ProblemStats";
import PlatformCapabilities from "../components/PlatformCapabilities";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemStats />
      <PlatformCapabilities />
      <Footer />
    </>
  );
}
