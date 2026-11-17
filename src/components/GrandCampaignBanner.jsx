import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wine, Flame, Users, Music2, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GrandCampaignBanner({ onTriggerMoreFireworks }) {
  const [hasPopped, setHasPopped] = useState(false);

  const handlePopChampagne = () => {
    setHasPopped(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F2E3B0', '#FFFFFF', '#641C27'],
    });
    if (onTriggerMoreFireworks) {
      onTriggerMoreFireworks();
    }
    setTimeout(() => setHasPopped(false), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 px-4 z-20">
      {/* High-Impact Festival Campaign Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#641C27]/80 via-[#2A1017] to-[#151416] border border-[#D4AF37]/50 p-6 sm:p-8 shadow-[0_10px_40px_rgba(100,28,39,0.35)] overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_100%_0%,_rgba(212,175,55,0.2)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F2E3B0] text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              OFFICIAL INAUGURAL CAMPAIGN • LIVE
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight mb-2">
              <span className="text-gold-gradient">PARTY TO ABHI SHURU HUI HAI!</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#F5F2EB]/90 max-w-xl font-body leading-relaxed">
              The ribbon is severed, the curtain is drawn, and the OMBRIX mission is officially in motion. 
              Enjoy the continuous festival audio, live spotlights, and synchronized celebration.
            </p>
          </div>

          {/* Champagne Pop & Interactive Fireworks Trigger */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePopChampagne}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-[#0B0B0D] font-extrabold text-xs tracking-wider uppercase shadow-[0_4px_25px_rgba(212,175,55,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <Wine className="w-4 h-4 text-[#0B0B0D]" />
              <span>{hasPopped ? "🍾 POPPED!" : "POP CHAMPAGNE 🍾"}</span>
            </motion.button>
          </div>
        </div>

        {/* Real-time 5 Celebration Features Status Track */}
        <div className="mt-6 pt-5 border-t border-[#D4AF37]/20 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
          <div className="px-2 py-1.5 rounded-lg bg-[#0B0B0D]/60 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#F2E3B0]">
            <span>🎈</span>
            <span>Balloons: Active</span>
          </div>
          <div className="px-2 py-1.5 rounded-lg bg-[#0B0B0D]/60 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#F2E3B0]">
            <span>🎆</span>
            <span>Fireworks: Live</span>
          </div>
          <div className="px-2 py-1.5 rounded-lg bg-[#0B0B0D]/60 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#D4AF37] font-bold">
            <span>🍾</span>
            <span>Campaign: Active</span>
          </div>
          <div className="px-2 py-1.5 rounded-lg bg-[#0B0B0D]/60 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#F2E3B0]">
            <Users className="w-3 h-3 text-[#D4AF37]" />
            <span>15 Members: Showcased</span>
          </div>
          <div className="col-span-2 sm:col-span-1 px-2 py-1.5 rounded-lg bg-[#0B0B0D]/60 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#4ADE80]">
            <Music2 className="w-3 h-3 text-[#4ADE80]" />
            <span>Dance: 124 BPM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
