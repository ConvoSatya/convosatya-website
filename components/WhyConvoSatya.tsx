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
    <section className="py-20 px-6 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#2EC4B6] m-0">
        What sets us apart
      </p>
      <h2 className="text-[32px] font-bold text-white mt-3 mb-16 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
        Why ConvoSatya
      </h2>

      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(46,196,182,0.15)] group cursor-default"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h3 className="text-[18px] font-bold text-white m-0">
              {item.title}
            </h3>
            <p className="text-[15px] text-white/75 mt-3 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
