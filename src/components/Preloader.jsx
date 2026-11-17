import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import { Sparkles, Scissors, Lock } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        const step = Math.floor(Math.random() * 16) + 8;
        return Math.min(prev + step, 100);
      });
    }, 150);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % CONFIG.preloaderPhrases.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(phraseInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0D] text-[#F5F2EB] px-6 select-none bg-grain"
    >
      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
        {/* Golden Scissors Emblem */}
        <div className="relative mb-6 p-4 rounded-2xl bg-[#151416] border border-[#D4AF37]/40 shadow-xl">
          <Scissors className="w-8 h-8 text-[#D4AF37]" />
        </div>

        {/* Security / Mystery Protocol Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151416] border border-white/10 text-[#F2E3B0] text-[10px] font-mono tracking-widest uppercase mb-3">
          <Lock className="w-3 h-3 text-[#D4AF37]" />
          {CONFIG.mystery.badge}
        </div>

        {/* Ceremony Title */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 font-display">
          <span className="text-gold-gradient">
            {CONFIG.mystery.eventTitle}
          </span>
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-[#A5A1A0] font-mono mb-8">
          {CONFIG.mystery.eventSubtitle}
        </p>

        {/* Golden Progress Bar */}
        <div className="w-full bg-[#151416] h-2 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#641C27] via-[#D4AF37] to-[#F2E3B0]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Progress percent & status */}
        <div className="flex justify-between items-center w-full text-xs text-[#A5A1A0] mb-6 font-mono">
          <span className="text-[#D4AF37] font-semibold">{progress}% INITIALIZED</span>
          <span>CURTAINS CLOSED</span>
        </div>

        {/* Rotating status message */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-[#A5A1A0] max-w-sm font-body italic"
            >
              "{CONFIG.preloaderPhrases[phraseIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Skip preloader button */}
        <button
          onClick={onComplete}
          className="mt-6 text-xs text-[#A5A1A0]/60 hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          Skip to stage →
        </button>
      </div>
    </motion.div>
  );
}
