import React from "react";
import { 
  MessageSquare, 
  Smartphone, 
  ShieldAlert, 
  Mail, 
  Mic, 
  FileWarning 
} from "lucide-react";

export default function PlatformCapabilities() {
  const features = [
    {
      title: "Conversational Scam Detection",
      description: "Detect scams across multiple messages, not just single texts. Understands intent, context, and evolving patterns in real time.",
      icon: <MessageSquare size={24} className="text-blue-400" />,
    },
    {
      title: "SMS & Message Protection",
      description: "Instantly analyze suspicious messages and links from SMS and chat apps before you take action.",
      icon: <Smartphone size={24} className="text-blue-400" />,
    },
    {
      title: "Real-Time Risk Analysis",
      description: "Get clear risk scores, scam categories, and signals like urgency, impersonation, and malicious links.",
      icon: <ShieldAlert size={24} className="text-blue-400" />,
    },
    {
      title: "Email Scam Detection",
      description: "Extend protection to email phishing, malicious attachments, and impersonation attacks.",
      icon: <Mail size={24} className="text-blue-400" />,
      badge: "Coming soon",
    },
    {
      title: "Voice & Call Scam Detection",
      description: "Detect social engineering and voice-based scams in real-time conversations and calls.",
      icon: <Mic size={24} className="text-blue-400" />,
      badge: "In progress",
    },
    {
      title: "Scam Reporting & Recovery",
      description: "Report scams, preserve evidence, and get guidance on next steps after an incident.",
      icon: <FileWarning size={24} className="text-blue-400" />,
      badge: "Coming soon",
    },
  ];

  return (
    <section id="product" className="relative py-12 px-6 overflow-hidden bg-black">
      {/* Background glow layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-400/10 blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-[40px] font-bold text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-6">
            Built for real-world scams
          </h2>
          <p className="text-[18px] text-white/60 leading-relaxed">
            ConvoSatya understands scams across messages, conversations, and channels — in real time.
          </p>
        </div>

        {/* Unified Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="relative group p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-transparent hover:bg-gradient-to-b hover:from-white/[0.05] hover:to-white/[0.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease_forwards]"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Subtle Cursor Light Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-teal-400/10 shadow-[0_0_20px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Optional badge */}
                {feature.badge && (
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm">
                    {feature.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-white text-lg font-semibold tracking-tight mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
