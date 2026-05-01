export default function GlobalBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Subtle blue glow top right */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse"
        style={{ animationDuration: "15s" }}
      />
      {/* Subtle teal glow bottom left */}
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] animate-pulse"
        style={{ animationDuration: "18s", animationDelay: "2s" }}
      />
      {/* Noise texture overlay (optional subtle texture) */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundSize: "100px",
        }} 
      />
    </div>
  );
}
