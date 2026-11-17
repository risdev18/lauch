import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function CeremonialClothUnveil({ isUnveiling, onComplete }) {
  useEffect(() => {
    if (isUnveiling) {
      // Allow 2.6 seconds for the slow, graceful cloth removal animation
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [isUnveiling, onComplete]);

  return (
    <div className="absolute inset-0 z-35 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* The Ceremonial Draped Silk Cloth */}
      <motion.div
        initial={{ y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }}
        animate={
          isUnveiling
            ? {
                y: ['0%', '12%', '45%', '140%'],
                x: ['0%', '2%', '10%', '28%'],
                rotate: [0, 1.5, 5, 14],
                scale: [1, 1.02, 1.01, 0.92],
                opacity: [1, 1, 0.95, 0],
              }
            : { y: 0, x: 0, rotate: 0, opacity: 1 }
        }
        transition={{
          duration: 2.6,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="relative w-full max-w-4xl h-[380px] sm:h-[460px] mx-4 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden border-2 border-[#D4AF37]/60 origin-top-left"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, #8B1E2E 0%, #5E1420 40%, #3B0A12 75%, #1F0409 100%)',
        }}
      >
        {/* Silk Creases & Volumetric Fold Highlights */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay bg-[repeating-linear-gradient(45deg,transparent,transparent_30px,rgba(255,255,255,0.15)_35px,transparent_45px)]" />
        
        {/* Deep Velvet Shadow Folds */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,_rgba(242,227,176,0.18)_0%,_transparent_55%)]" />

        {/* Diagonal Drape Shadows */}
        <div className="absolute -inset-x-20 top-0 h-full bg-gradient-to-r from-black/40 via-transparent to-black/50 pointer-events-none" />

        {/* Center Golden Embroidered Crest */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center select-none">
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#151416]/80 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <span className="text-2xl text-[#D4AF37]">⚜</span>
          </div>

          <div className="px-4 py-1.5 rounded-full bg-[#0B0B0D]/80 border border-[#D4AF37]/50 text-[#F2E3B0] text-xs font-mono tracking-[0.3em] uppercase mb-4 shadow-lg backdrop-blur-md">
            CEREMONIAL COVER // UNVEILING IN PROGRESS
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EB] font-display tracking-wider drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            <span className="text-gold-gradient">THE GRAND UNVEILING</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#F2E3B0]/80 mt-2 font-mono tracking-widest uppercase">
            CEREMONIAL SILK BEING WITHDRAWN
          </p>
        </div>

        {/* Bottom Golden Fringe Trim with Bullion Tassels */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#D4AF37] via-[#AA820A] to-[#641C27] border-t-2 border-[#FFE58F] flex items-center justify-around px-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1 h-5 bg-[#D4AF37] rounded-b shadow-sm" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFE58F] -mt-0.5 shadow-sm" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
