import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audio } from '../utils/audio';
import { CONFIG } from '../config';
import FireworksCanvas from './FireworksCanvas';
import BalloonsCelebration from './BalloonsCelebration';
import GrandCampaignBanner from './GrandCampaignBanner';
import CelebrationMembersShowcase from './CelebrationMembersShowcase';
import DancingSilhouettes from './DancingSilhouettes';
import { Sparkles, RotateCcw, ArrowRight, ShieldCheck, Flame, Wine, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConcertExperience({ onReset, onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [extraFireworksKey, setExtraFireworksKey] = useState(0);

  const toggleMusic = () => {
    const active = audio.toggleConcertMusic();
    setIsPlaying(active);
  };

  const handleExtraFireworks = () => {
    setExtraFireworksKey((prev) => prev + 1);
    audio.playFirework();
    confetti({
      particleCount: 100,
      spread: 110,
      origin: { y: 0.45 },
      colors: ['#D4AF37', '#F2E3B0', '#FFFFFF', '#641C27', '#00F0FF'],
    });
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-start select-none pt-4 pb-16 px-3 sm:px-6 bg-[#0B0B0D] z-10">
      
      {/* ==============================================================
          1. BALLOONS FLOATING UPWARDS (ACTIVE IMMEDIATELY)
      ============================================================== */}
      <BalloonsCelebration active={true} count={32} />

      {/* ==============================================================
          2. FIREWORKS CANVAS (BURSTING IN SKY IMMEDIATELY)
      ============================================================== */}
      <FireworksCanvas key={extraFireworksKey} active={true} count={10} />

      {/* ==============================================================
          STAGE RIG & MOVING SPOTLIGHTS
      ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Overhead Stage Truss */}
        <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#151416] to-transparent border-b border-[#D4AF37]/20 flex items-center justify-between px-6">
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shadow-[0_0_12px_#E11D48] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_12px_#00F0FF] animate-pulse" />
          </div>
          <div className="w-40 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
        </div>

        {/* Sweeping Stage Spotlights */}
        <motion.div
          animate={{
            x: [-80, 80, -80],
            rotate: [-25, 15, -25],
            opacity: [0.4, 0.75, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute -top-16 left-1/4 w-[500px] h-[900px] bg-gradient-to-b from-[#D4AF37]/30 via-[#D4AF37]/5 to-transparent blur-3xl transform-gpu origin-top"
        />
        <motion.div
          animate={{
            x: [80, -80, 80],
            rotate: [25, -15, 25],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
          className="absolute -top-16 right-1/4 w-[500px] h-[900px] bg-gradient-to-b from-[#E11D48]/35 via-[#E11D48]/5 to-transparent blur-3xl transform-gpu origin-top"
        />

        {/* Twin Cutting Lasers */}
        <motion.div
          animate={{
            rotate: [-20, 25, -20],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-4 left-1/3 w-[2px] h-[900px] bg-gradient-to-b from-[#00F0FF] via-[#00F0FF]/40 to-transparent shadow-[0_0_16px_#00F0FF] origin-top"
        />
        <motion.div
          animate={{
            rotate: [20, -25, 20],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-4 right-1/3 w-[2px] h-[900px] bg-gradient-to-b from-[#F2E3B0] via-[#F2E3B0]/40 to-transparent shadow-[0_0_16px_#F2E3B0] origin-top"
        />
      </div>

      {/* ==============================================================
          CENTRAL CONCERT HERO STAGE (Visible immediately on screen!)
      ============================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center mt-2 mb-2"
      >
        {/* Presidential Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416]/95 border border-[#D4AF37]/40 text-[#F2E3B0] text-[11px] font-mono tracking-[0.25em] uppercase mb-3 shadow-lg backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          Official Inauguration • Live Concert Experience
        </div>

        {/* Central Architectural LED Wall */}
        <div className="relative w-full rounded-3xl bg-[#151416]/95 border border-[#D4AF37]/35 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden mb-4 backdrop-blur-xl">
          {/* Stage Lighting Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.18)_0%,_transparent_70%)] pointer-events-none" />

          {/* Equalizer Waveform Lines (Active on music) */}
          <div className="flex items-end justify-center gap-1.5 h-8 mb-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying ? [5, Math.sin(i * 0.6) * 24 + 8, 5] : 5,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.4 + (i % 4) * 0.1,
                  ease: "easeInOut",
                }}
                className="w-1 sm:w-1.5 rounded-t bg-gradient-to-t from-[#641C27] via-[#D4AF37] to-[#F2E3B0]"
              />
            ))}
          </div>

          {/* THE REVEALED LOGOTYPE */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-display mb-2 leading-none">
            <span className="text-gold-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.45)]">
              {CONFIG.companyName}
            </span>
          </h1>

          <p className="text-base sm:text-xl font-light text-[#F5F2EB] max-w-2xl mx-auto mb-2 leading-relaxed font-display">
            {CONFIG.tagline}
          </p>

          <p className="text-xs sm:text-sm text-[#A5A1A0] max-w-xl mx-auto mb-5 font-body">
            {CONFIG.subTagline}
          </p>

          {/* Live Action Celebration Toolbar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0B0B0D]/90 border border-[#D4AF37]/35 text-xs font-mono text-[#F2E3B0]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-ping" />
            <span className="font-bold">🎵 ABHI TOH PARTY SHURU HUI HAI</span>
            
            <button
              onClick={toggleMusic}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/25 hover:bg-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "PAUSE SONG" : "RESUME SONG"}</span>
            </button>

            <button
              onClick={handleExtraFireworks}
              className="px-3 py-1.5 rounded-lg bg-[#E11D48]/35 hover:bg-[#E11D48]/60 text-[#F5F2EB] text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1 border border-[#E11D48]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2E3B0]" />
              <span>LAUNCH FIREWORKS 🎆</span>
            </button>
          </div>
        </div>

        {/* ==============================================================
            3. DANCING SILHOUETTES STAGE (Placed right on the hero screen!)
        ============================================================== */}
        <DancingSilhouettes isPlaying={isPlaying} />

      </motion.div>

      {/* ==============================================================
          4. GRAND CAMPAIGN & CHAMPAGNE FANFARE ("PARTY TO ABHI SHURU HUI HAI!")
      ============================================================== */}
      <GrandCampaignBanner onTriggerMoreFireworks={handleExtraFireworks} />

      {/* ==============================================================
          5. 15 MEMBERS SPOTLIGHT SHOWCASE (AUTO ROTATING ROSTER)
      ============================================================== */}
      <CelebrationMembersShowcase onNavigate={onNavigate} />

      {/* Action Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 z-20 mt-6">
        <button
          onClick={() => onNavigate('team')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#641C27] to-[#45121c] text-[#F5F2EB] font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(100,28,39,0.4)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-[#D4AF37]/35"
        >
          <span>View All 15 Group Members</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F2E3B0]" />
        </button>

        <button
          onClick={() => onNavigate('party')}
          className="px-6 py-3 rounded-xl bg-[#151416] text-[#F5F2EB] font-semibold text-xs border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Add Remaining Member</span>
        </button>

        <button
          onClick={() => {
            audio.stopConcertMusic();
            setIsPlaying(false);
            audio.playScissorSnip();
            onReset();
          }}
          className="px-5 py-3 rounded-xl bg-[#151416] text-[#A5A1A0] hover:text-[#F5F2EB] font-semibold text-xs border border-white/10 hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Re-tie Ribbon</span>
        </button>
      </div>

    </div>
  );
}
