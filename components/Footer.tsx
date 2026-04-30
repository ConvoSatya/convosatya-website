import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0B1F3A",
        color: "#E5E7EB",
        padding: "64px 24px 32px",
      }}
    >
      {/* Top: 3 columns */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
        }}
      >
        {/* Left: Logo + tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src="/logo.png"
              alt="ConvoSatya logo"
              width={28}
              height={28}
            />
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              <span style={{ color: "#E5E7EB" }}>Convo</span>
              <span style={{ color: "#15803D" }}>Satya</span>
            </span>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#9CA3AF",
              marginTop: "12px",
              lineHeight: 1.6,
            }}
          >
            AI-powered scam detection for conversations
          </p>
        </div>

        {/* Middle: Navigation */}
        <div>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#9CA3AF",
              marginTop: 0,
              marginBottom: "16px",
            }}
          >
            Navigation
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="#product" style={{ fontSize: "14px", color: "#D1D5DB", textDecoration: "none" }}>
              Product
            </Link>
            <Link href="#demo" style={{ fontSize: "14px", color: "#D1D5DB", textDecoration: "none" }}>
              Demo
            </Link>
            <Link href="#contact" style={{ fontSize: "14px", color: "#D1D5DB", textDecoration: "none" }}>
              Contact
            </Link>
          </div>
        </div>

        {/* Right: Contact */}
        <div>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#9CA3AF",
              marginTop: 0,
              marginBottom: "16px",
            }}
          >
            Get in Touch
          </h4>
          <p style={{ fontSize: "14px", color: "#D1D5DB", margin: 0 }}>
            support@convosatya.com
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#6B7280",
              marginTop: "12px",
            }}
          >
            Built from academic research
          </p>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div
        style={{
          borderTop: "1px solid #1E3A5F",
          marginTop: "48px",
          paddingTop: "24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
          © 2026 ConvoSatya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
