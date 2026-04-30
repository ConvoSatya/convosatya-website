export default function WhyConvoSatya() {
  const items = [
    {
      title: "Understands conversations",
      description:
        "Detects scams that emerge over multiple turns, not just single messages",
    },
    {
      title: "Privacy-first design",
      description:
        "Runs without exposing sensitive user data to external systems",
    },
    {
      title: "Built from research",
      description:
        "Developed from academic work in conversational scam detection",
    },
  ];

  return (
    <section
      style={{
        padding: "96px 24px",
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
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
        What sets us apart
      </p>
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#0B1F3A",
          marginTop: "12px",
          marginBottom: "64px",
        }}
      >
        Why ConvoSatya
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "40px",
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            style={{
              padding: "32px",
              borderRadius: "12px",
              backgroundColor: "#F9FAFB",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#0B1F3A",
                margin: 0,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#4B5563",
                marginTop: "10px",
                lineHeight: 1.6,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
