"use client";

import { useState } from "react";
import Link from "next/link";

export default function DataEngineerInternPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "application">("overview");
    const [submitted, setSubmitted] = useState(false);
    const [resumeFileName, setResumeFileName] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        await fetch("https://formspree.io/f/meewgrvv", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
        });
        setSubmitted(true);
    };

    return (
        <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", color: "#111111" }} className="px-6 py-12">
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>

                <Link href="/careers" style={{ fontSize: "13px", color: "#888888", textDecoration: "none" }} className="hover:text-black transition-colors">
                    ← Back to Careers
                </Link>

                <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#111111", margin: "24px 0 32px", fontFamily: "Space Grotesk, sans-serif" }}>
                    Data Engineer Intern
                </h1>

                <div style={{ display: "flex", gap: "60px", alignItems: "flex-start" }}>

                    {/* Left column */}
                    <div style={{ width: "200px", flexShrink: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
                        <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #eeeeee" }}>
                            <p style={{ fontSize: "12px", color: "#aaaaaa", margin: "0 0 6px 0", fontFamily: "Space Grotesk, sans-serif" }}>Location</p>
                            <p style={{ fontSize: "14px", fontWeight: 500, color: "#111111", margin: 0, fontFamily: "Space Grotesk, sans-serif" }}>Remote</p>
                        </div>
                        <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #eeeeee" }}>
                            <p style={{ fontSize: "12px", color: "#aaaaaa", margin: "0 0 6px 0", fontFamily: "Space Grotesk, sans-serif" }}>Employment Type</p>
                            <p style={{ fontSize: "14px", fontWeight: 500, color: "#111111", margin: 0, fontFamily: "Space Grotesk, sans-serif" }}>Internship</p>
                        </div>
                        <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #eeeeee" }}>
                            <p style={{ fontSize: "12px", color: "#aaaaaa", margin: "0 0 6px 0", fontFamily: "Space Grotesk, sans-serif" }}>Department</p>
                            <p style={{ fontSize: "14px", fontWeight: 500, color: "#111111", margin: 0, fontFamily: "Space Grotesk, sans-serif" }}>Data & Engineering</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "12px", color: "#aaaaaa", margin: "0 0 6px 0", fontFamily: "Space Grotesk, sans-serif" }}>Duration</p>
                            <p style={{ fontSize: "14px", fontWeight: 500, color: "#111111", margin: 0, fontFamily: "Space Grotesk, sans-serif" }}>Summer 2026</p>
                        </div>
                    </div>

                    {/* Right column */}
                    <div style={{ flex: 1 }}>

                        {/* Tabs */}
                        <div style={{ borderBottom: "1px solid #eeeeee", marginBottom: "40px", display: "flex", gap: "32px" }}>
                            <button onClick={() => setActiveTab("overview")} style={{ fontSize: "14px", fontWeight: activeTab === "overview" ? 600 : 400, color: activeTab === "overview" ? "#111111" : "#aaaaaa", background: "none", border: "none", borderBottom: activeTab === "overview" ? "2px solid #111111" : "2px solid transparent", paddingBottom: "12px", cursor: "pointer", fontFamily: "Space Grotesk, sans-serif" }}>
                                Overview
                            </button>
                            <button onClick={() => setActiveTab("application")} style={{ fontSize: "14px", fontWeight: activeTab === "application" ? 600 : 400, color: activeTab === "application" ? "#111111" : "#aaaaaa", background: "none", border: "none", borderBottom: activeTab === "application" ? "2px solid #111111" : "2px solid transparent", paddingBottom: "12px", cursor: "pointer", fontFamily: "Space Grotesk, sans-serif" }}>
                                Application
                            </button>
                        </div>

                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div style={{ fontFamily: "Space Grotesk, sans-serif" }}>

                                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", marginBottom: "12px" }}>About ConvoSatya</h2>
                                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444444", marginBottom: "32px" }}>
                                    ConvoSatya is building FAUST. A real-time AI pipeline that detects scams across full conversation threads, not just single messages. We analyze text, images, and video. We&apos;re pre-seed, backed by peer-reviewed research publishing June 2026, and a small team that moves fast and works directly with founders.
                                </p>

                                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", marginBottom: "12px" }}>About the Role</h2>
                                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444444", marginBottom: "32px" }}>
                                    We&apos;re looking for a Data Engineer Intern to join us this summer. You&apos;ll work directly with the founders on real scam datasets that power FAUST — our multi-agent AI detection pipeline.
                                </p>

                                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", marginBottom: "12px" }}>What You&apos;ll Work On</h2>
                                <ul style={{ fontSize: "15px", lineHeight: "1.8", color: "#444444", marginBottom: "32px", paddingLeft: "20px", listStyleType: "disc" }}>
                                    <li style={{ marginBottom: "8px" }}>Work on real scam conversation datasets — cleaning, structuring, and labeling data for AI model training</li>
                                    <li style={{ marginBottom: "8px" }}>Build and maintain data pipelines that feed into FAUST, our multi-agent scam detection system</li>
                                    <li style={{ marginBottom: "8px" }}>Support evaluation of AI model outputs — tracking accuracy, false positives, and detection quality</li>
                                    <li style={{ marginBottom: "8px" }}>Help design data schemas and storage strategies for conversation-level scam analysis</li>
                                    <li style={{ marginBottom: "8px" }}>Collaborate directly with the founders on research and product data needs</li>
                                </ul>

                                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", marginBottom: "12px" }}>What We&apos;re Looking For</h2>
                                <ul style={{ fontSize: "15px", lineHeight: "1.8", color: "#444444", marginBottom: "32px", paddingLeft: "20px", listStyleType: "disc" }}>
                                    <li style={{ marginBottom: "8px" }}>Pursuing or graduated with a Bachelor&apos;s or Master&apos;s in Data Science, AI/ML, Computer Science, or a related field</li>
                                    <li style={{ marginBottom: "8px" }}>Proficiency in Python and SQL</li>
                                    <li style={{ marginBottom: "8px" }}>Familiarity with data pipelines, ETL processes, or data engineering concepts</li>
                                    <li style={{ marginBottom: "8px" }}>Some exposure to ML workflows or AI model evaluation is a plus</li>                                </ul>

                                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", marginBottom: "12px" }}>Details</h2>
                                <ul style={{ fontSize: "15px", lineHeight: "1.8", color: "#444444", marginBottom: "32px", paddingLeft: "20px", listStyleType: "disc" }}>
                                    <li style={{ marginBottom: "8px" }}>Remote</li>
                                    <li style={{ marginBottom: "8px" }}>Summer 2026</li>
                                    <li style={{ marginBottom: "8px" }}>Strong performers will be considered for a full-time role</li>
                                </ul>

                                <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#aaaaaa", marginBottom: "32px" }}>
                                    ConvoSatya is an equal opportunity employer. We welcome applicants of all backgrounds, identities, and experiences. We do not discriminate on the basis of race, gender, age, disability, religion, national origin, or any other protected characteristic.
                                </p>

                                <button onClick={() => setActiveTab("application")} style={{ width: "100%", padding: "16px", backgroundColor: "#111111", color: "#ffffff", fontSize: "15px", fontWeight: 600, border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "Space Grotesk, sans-serif", marginTop: "8px" }}>
                                    Apply for this Job
                                </button>

                            </div>
                        )}

                        {/* Application Tab */}
                        {activeTab === "application" && (
                            submitted ? (
                                <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "Space Grotesk, sans-serif" }}>
                                    <div style={{ fontSize: "32px", marginBottom: "16px" }}>✓</div>
                                    <p style={{ fontSize: "22px", fontWeight: 600, color: "#111111", marginBottom: "12px" }}>Application received.</p>
                                    <p style={{ fontSize: "15px", color: "#888888", maxWidth: "360px", margin: "0 auto", lineHeight: "1.7" }}>
                                        We review every application carefully. If you&apos;re a strong fit, we&apos;ll reach out directly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div style={{ fontFamily: "Space Grotesk, sans-serif" }}>

                                        <div style={{ marginBottom: "40px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                                <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #dddddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#111111", flexShrink: 0 }}>1</span>
                                                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", margin: 0 }}>Resume / CV</h3>
                                            </div>
                                            <p style={{ fontSize: "13px", color: "#aaaaaa", margin: "0 0 16px 40px" }}>Attach your resume to your application.</p>
                                            <div style={{ marginLeft: "40px", border: "1.5px dashed #dddddd", borderRadius: "8px", padding: "32px", textAlign: "center" }}>
                                                <input type="file" accept=".pdf,.doc,.docx" id="resume" name="resume" style={{ display: "none" }} onChange={(e) => { const file = e.target.files?.[0]; if (file) setResumeFileName(file.name); }} />
                                                <label htmlFor="resume" style={{ cursor: "pointer" }}>
                                                    <div style={{ fontSize: "24px", marginBottom: "8px" }}>↑</div>
                                                    <p style={{ fontSize: "14px", color: "#111111", margin: "0 0 4px 0", fontWeight: 500 }}>Drop your resume here</p>
                                                    {resumeFileName ? (
                                                        <p style={{ fontSize: "14px", color: "#111111", margin: 0, fontWeight: 500 }}>✓ {resumeFileName}</p>
                                                    ) : (
                                                        <p style={{ fontSize: "13px", color: "#aaaaaa", margin: 0 }}>or <span style={{ textDecoration: "underline", cursor: "pointer" }}>click to browse</span> · PDF, DOC, DOCX · 5 MB max</p>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: "40px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                                                <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #dddddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#111111", flexShrink: 0 }}>2</span>
                                                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", margin: 0 }}>Personal Information</h3>
                                            </div>
                                            <div style={{ marginLeft: "40px" }}>
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                                                    <div>
                                                        <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>First name *</label>
                                                        <input type="text" name="firstName" placeholder="Jane" required style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", boxSizing: "border-box" }} />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>Last name *</label>
                                                        <input type="text" name="lastName" placeholder="Smith" required style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", boxSizing: "border-box" }} />
                                                    </div>
                                                </div>
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                                                    <div>
                                                        <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>Email address *</label>
                                                        <input type="email" name="email" placeholder="jane@example.com" required style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", boxSizing: "border-box" }} />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>Phone number</label>
                                                        <input type="tel" name="phone" placeholder="+1 (555) 000-0000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", boxSizing: "border-box" }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>How did you hear about this position?</label>
                                                    <select name="source" style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", color: "#111111", backgroundColor: "#ffffff", boxSizing: "border-box" }}>
                                                        <option value="">Select one...</option>
                                                        <option value="LinkedIn">LinkedIn</option>
                                                        <option value="Twitter/X">Twitter/X</option>
                                                        <option value="Referral">Referral</option>
                                                        <option value="Job Board">Job Board</option>
                                                        <option value="ConvoSatya Website">ConvoSatya Website</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: "40px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                                <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #dddddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#111111", flexShrink: 0 }}>3</span>
                                                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", margin: 0 }}>Online Profiles</h3>
                                            </div>
                                            <p style={{ fontSize: "13px", color: "#aaaaaa", margin: "0 0 16px 40px" }}>Optional — helps us learn more about you.</p>
                                            <div style={{ marginLeft: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                <div>
                                                    <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>LinkedIn</label>
                                                    <input type="text" name="linkedin" placeholder="linkedin.com/in/yourprofile" style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", boxSizing: "border-box" }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: "13px", color: "#555555", display: "block", marginBottom: "6px" }}>Portfolio / Website</label>
                                                    <input type="text" name="portfolio" placeholder="yourportfolio.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", boxSizing: "border-box" }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: "40px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                                <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #dddddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#111111", flexShrink: 0 }}>4</span>
                                                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111111", margin: 0 }}>Cover Letter</h3>
                                            </div>                                            <div style={{ marginLeft: "40px" }}>
                                                <textarea name="coverLetter" placeholder="Tell us why you're a great fit..." rows={6} style={{ width: "100%", padding: "10px 14px", border: "1px solid #dddddd", borderRadius: "8px", fontSize: "14px", fontFamily: "Space Grotesk, sans-serif", resize: "vertical", boxSizing: "border-box" }} />
                                            </div>
                                        </div>

                                        <div style={{ marginLeft: "40px" }}>
                                            <button type="submit" style={{ width: "100%", padding: "16px", backgroundColor: "#111111", color: "#ffffff", fontSize: "15px", fontWeight: 600, border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "Space Grotesk, sans-serif" }}>
                                                Submit Application
                                            </button>
                                            <p style={{ fontSize: "12px", color: "#aaaaaa", marginTop: "12px", textAlign: "center" }}>
                                                Fields marked with * are required. Your application will be sent to our team at ConvoSatya.
                                            </p>
                                        </div>

                                    </div>
                                </form>
                            )
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}