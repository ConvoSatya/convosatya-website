"use client";

import Link from "next/link";

export default function CareersPage() {
    return (
        <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", color: "#111111" }} className="px-6 py-20">
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>

                {/* Company Intro */}
                <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#999999", marginBottom: "12px", fontFamily: "IBM Plex Mono, monospace" }}>
                    We&apos;re Hiring
                </p>

                <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "#111111", marginBottom: "20px", fontFamily: "Space Grotesk, sans-serif" }}>
                    ConvoSatya
                </h1>

                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444444", maxWidth: "580px", marginBottom: "20px", fontFamily: "Space Grotesk, sans-serif" }}>
                    ConvoSatya is building FAUST. A real-time AI pipeline that detects scams across full conversation threads, not just single messages. We analyze text, images, and video. We&apos;re pre-seed, backed by peer-reviewed research, and a small team that moves fast and works directly with founders.
                </p>

                <div className="flex gap-6 mb-14">
                    <a href="https://convosatya.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors" style={{ fontSize: "13px", color: "#888888", textDecoration: "none", fontFamily: "Space Grotesk, sans-serif" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                        Website
                    </a>
                    <a href="https://linkedin.com/company/convosatya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors" style={{ fontSize: "13px", color: "#888888", textDecoration: "none", fontFamily: "Space Grotesk, sans-serif" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" /></svg>
                        LinkedIn
                    </a>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #eeeeee", marginBottom: "32px" }} />

                {/* Role Listings */}
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#aaaaaa", marginBottom: "8px", fontFamily: "Space Grotesk, sans-serif" }}>
                    Business &amp; Operations
                </p>

                <Link href="/careers/business-analyst-intern" className="group" style={{ textDecoration: "none" }}>
                    <div className="flex justify-between items-center py-5 group-hover:bg-gray-50 transition-colors rounded-lg px-2" style={{ borderBottom: "1px solid #eeeeee" }}>
                        <div>
                            <p className="m-0 group-hover:text-[#18BFA9] transition-colors" style={{ fontSize: "16px", fontWeight: 600, color: "#111111", fontFamily: "Space Grotesk, sans-serif" }}>
                                Business Analyst Intern
                            </p>
                            <p className="m-0 mt-1" style={{ fontSize: "13px", color: "#888888", fontFamily: "IBM Plex Mono, monospace" }}>
                                Remote · Internship
                            </p>
                        </div>
                        <span className="group-hover:text-[#18BFA9] transition-colors" style={{ fontSize: "20px", color: "#cccccc" }}>
                            →
                        </span>
                    </div>
                </Link>

            </div>
        </main>
    );
}