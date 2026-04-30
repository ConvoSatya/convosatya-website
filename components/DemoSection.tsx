export default function DemoSection() {
  return (
    <section
      id="demo"
      style={{
        padding: "96px 24px",
        backgroundColor: "#ffffff",
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
          color: "#15803D",
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
          color: "#0B1F3A",
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
          className="rounded-xl shadow-lg"
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            overflow: "hidden",
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
          color: "#9CA3AF",
          marginTop: "24px",
        }}
      >
        Real conversational scam detection in action
      </p>
    </section>
  );
}
