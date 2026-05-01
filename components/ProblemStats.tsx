export default function ProblemStats() {
  const stats = [
    { number: "193,000+", label: "Phishing complaints filed to FBI in 2024" },
    { number: "$12.5B+", label: "Lost to fraud in a single year" },
    { number: "#1", label: "Most reported cybercrime category" },
  ];

  return (
    <section
      style={{
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
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
        Why it matters
      </p>
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#ffffff",
          marginTop: "12px",
          marginBottom: "64px",
        }}
      >
        The scale of the problem
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "64px",
          flexWrap: "wrap",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {stats.map((stat) => (
          <div key={stat.number} style={{ flex: "1 1 200px", maxWidth: "260px" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.6)",
                marginTop: "12px",
                lineHeight: 1.5,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.35)",
          marginTop: "48px",
        }}
      >
        Source: FBI IC3 Annual Report, 2024
      </p>
    </section>
  );
}
