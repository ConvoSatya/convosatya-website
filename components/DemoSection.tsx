export default function DemoSection() {
  return (
    <section
      id="demo"
      className="relative py-24 px-6 text-center bg-[#000000] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#2EC4B6] m-0">
          Product Demo
        </p>

        {/* Heading */}
        <h2 className="text-[36px] font-bold text-white mt-4 mb-12 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
          See ConvoSatya in action
        </h2>

        {/* Video Container */}
        <div className="max-w-[900px] mx-auto px-4">
          <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-none"
              src="https://www.youtube.com/embed/WwlyJ_8OMLE"
              title="ConvoSatya Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[15px] text-white/60 mt-8 max-w-2xl mx-auto leading-relaxed">
          Watch how our real-time AI analyzes conversation patterns to detect and flag sophisticated scams before any damage is done.
        </p>
      </div>
    </section>
  );
}
