export default function DemoSection() {
  return (
    <section
      id="demo"
      style={{
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#2EC4B6",
          margin: 0,
        }}
      >
        Product Demo
      </p>

      {/* Heading */}
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#ffffff",
          marginTop: "12px",
          marginBottom: "48px",
        }}
      >
        See ConvoSatya in action
      </h2>

      {/* Video */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src="https://www.youtube.com/embed/WwlyJ_8OMLE"
            title="ConvoSatya Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.5)",
          marginTop: "24px",
        }}
      >
        Real conversational scam detection in action
      </p>
    </section>
  );
}
