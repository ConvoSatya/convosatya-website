import type { Metadata } from 'next'
import PlatformLoginContent from '@/components/PlatformLoginContent'

export const metadata: Metadata = {
  title: 'Platform — ConvoSatya',
  description: 'Explore the ConvoSatya platform — AI-powered scam and fraud detection built from academic research at University of New Haven.',
  openGraph: {
    title: 'Platform — ConvoSatya',
    description: 'AI-powered scam detection platform by ConvoSatya.',
    url: 'https://convosatya.com/platform',
    siteName: 'ConvoSatya',
    type: 'website',
  },
}

export default function PlatformLogin() {
  return <PlatformLoginContent />;
}
