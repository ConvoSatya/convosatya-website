export default function Hero() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "80px 24px",
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      {/* Brand Title */}
      <h1 style={{ fontSize: "48px", fontWeight: 700, margin: 0 }}>
        <span style={{ color: "#0B1F3A" }}>Convo</span>
        <span style={{ color: "#15803D" }}>Satya</span>
      </h1>

      {/* Headline */}
      <h2
        style={{
          fontSize: "28px",
          fontWeight: 600,
          color: "#0B1F3A",
          marginTop: "24px",
          maxWidth: "600px",
          lineHeight: 1.3,
        }}
      >
        Detect scams in conversations with AI
      </h2>

      {/* Subtext */}
      <p
        style={{
          fontSize: "18px",
          color: "#4B5563",
          marginTop: "16px",
          maxWidth: "520px",
          lineHeight: 1.6,
        }}
      >
        Real-time detection and verification for messages, email, and chat.
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "40px",
        }}
      >
        <a
          href="#demo"
          style={{
            padding: "14px 32px",
            backgroundColor: "#15803D",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          View Demo
        </a>
        <a
          href="#learn-more"
          style={{
            padding: "14px 32px",
            backgroundColor: "transparent",
            color: "#0B1F3A",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
