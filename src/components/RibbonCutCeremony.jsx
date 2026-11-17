import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';
import { audio } from '../utils/audio';
import ConcertExperience from './ConcertExperience';
import CeremonialClothUnveil from './CeremonialClothUnveil';
import { Sparkles, ArrowDown, Scissors, Lock } from 'lucide-react';

export default function RibbonCutCeremony({
  isCut,
  onCut,
  onReset,
  isNightMode,
  onNavigate
}) {
  const [ribbonCount, setRibbonCount] = useState(1);
  const [isHoveringScissors, setIsHoveringScissors] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isRibbonSevered, setIsRibbonSevered] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isUnveilingCloth, setIsUnveilingCloth] = useState(false);
  const scissorsRef = useRef(null);

  // Synchronize reset
  useEffect(() => {
    if (!isCut) {
      setIsRibbonSevered(false);
      setCountdown(null);
      setIsUnveilingCloth(false);
      audio.stopGanpatiIntro(0.1);
      audio.stopPartyShuru();
    }
  }, [isCut]);

  // Load cut count
  useEffect(() => {
    const saved = localStorage.getItem('omni_ribbon_cuts');
    if (saved) {
      setRibbonCount(parseInt(saved, 10));
    }
  }, []);

  // One-time discrete celebration burst
  const triggerDiscreteCelebration = () => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 75,
      origin: { x: 0.1, y: 0.65 },
      colors: ['#D4AF37', '#F2E3B0', '#641C27', '#F5F2EB'],
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 75,
      origin: { x: 0.9, y: 0.65 },
      colors: ['#D4AF37', '#F2E3B0', '#641C27', '#F5F2EB'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 95,
        origin: { x: 0.5, y: 0.45 },
        shapes: ['star', 'circle'],
        colors: ['#D4AF37', '#F2E3B0', '#F5F2EB'],
      });
    }, 200);
  };

  const handleClothUnveilComplete = () => {
    setIsUnveilingCloth(false);
    onCut();

    const newCount = ribbonCount + 1;
    setRibbonCount(newCount);
    localStorage.setItem('omni_ribbon_cuts', newCount.toString());

    // Fade out Ganpati intro and start the Party Shuru anthem!
    audio.stopGanpatiIntro(0.6);
    audio.playPartyShuru();

    // Grand celebration sound sequence
    audio.playConfettiPop();
    setTimeout(() => audio.playFirework(), 150);
    setTimeout(() => audio.playFanfare(), 300);
    setTimeout(() => audio.playApplause(), 600);

    // Stadium confetti blast
    triggerDiscreteCelebration();

    if (typeof document !== 'undefined') {
      document.title = `${CONFIG.companyName} — The Grand Inauguration`;
    }
  };

  const handleCutTrigger = () => {
    if (isCut || isSnapping || isRibbonSevered || countdown !== null || isUnveilingCloth) return;
    setIsSnapping(true);

    // Audio & cut trigger: Play metallic snip and start the auspicious Ganpati song!
    audio.unmute();
    audio.playScissorSnip();
    audio.playGanpatiIntro();

    setTimeout(() => {
      setIsSnapping(false);
      setIsRibbonSevered(true);

      // Start the 3, 2, 1 Countdown
      setTimeout(() => {
        setCountdown(3);
        audio.playCountdownTick(3);

        setTimeout(() => {
          setCountdown(2);
          audio.playCountdownTick(2);

          setTimeout(() => {
            setCountdown(1);
            audio.playCountdownTick(1);

            setTimeout(() => {
              // End countdown and start slow cloth unveiling!
              setCountdown(null);
              setIsUnveilingCloth(true);
              audio.playClothWhoosh();
            }, 1000);
          }, 1000);
        }, 1000);
      }, 500);
    }, 300);
  };

  return (
    <div className={`relative w-full ${
      isCut ? 'min-h-screen overflow-x-hidden overflow-y-visible' : 'min-h-[92vh] overflow-hidden'
    } flex flex-col items-center justify-start transition-colors duration-700 select-none ${
      isNightMode ? 'bg-[#0B0B0D]' : 'bg-[#151416]'
    }`}>
      
      {/* Spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: isCut ? [-30, 30, -30] : [-15, 15, -15],
            opacity: isCut ? [0.4, 0.65, 0.4] : 0.25,
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 w-[500px] h-[900px] bg-gradient-to-b from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent rotate-[25deg] blur-3xl transform-gpu"
        />
        <motion.div
          animate={{
            x: isCut ? [30, -30, 30] : [15, -15, 15],
            opacity: isCut ? [0.35, 0.6, 0.35] : 0.2,
          }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
          className="absolute -top-32 right-1/4 w-[500px] h-[900px] bg-gradient-to-b from-[#641C27]/20 via-[#641C27]/5 to-transparent -rotate-[25deg] blur-3xl transform-gpu"
        />
      </div>

      {/* ==============================================================
          ROYAL VELVET CURTAINS
      ============================================================== */}
      <motion.div
        animate={{
          x: isCut ? "-105%" : isUnveilingCloth ? "-85%" : "0%",
          scaleX: isCut ? 0.4 : isUnveilingCloth ? 0.65 : 1,
          opacity: isCut ? 0 : 1,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 bottom-0 left-0 w-1/2 velvet-curtain-left z-30 origin-left border-r-2 border-[#D4AF37]/40 shadow-[20px_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between py-12 px-6 pointer-events-none"
      >
        <div className="flex justify-between items-center text-[#D4AF37]/50">
          <div className="w-6 h-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-xs">⚜</div>
          <div className="w-6 h-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-xs">⚜</div>
        </div>
        <div className="text-right pr-4 opacity-40 font-serif-ceremony text-xs tracking-widest text-[#D4AF37]">
          EST. {CONFIG.foundedYear}
        </div>
      </motion.div>

      <motion.div
        animate={{
          x: isCut ? "105%" : isUnveilingCloth ? "85%" : "0%",
          scaleX: isCut ? 0.4 : isUnveilingCloth ? 0.65 : 1,
          opacity: isCut ? 0 : 1,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 bottom-0 right-0 w-1/2 velvet-curtain-right z-30 origin-right border-l-2 border-[#D4AF37]/40 shadow-[-20px_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between py-12 px-6 pointer-events-none"
      >
        <div className="flex justify-between items-center text-[#D4AF37]/50">
          <div className="w-6 h-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-xs">⚜</div>
          <div className="w-6 h-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-xs">⚜</div>
        </div>
        <div className="text-left pl-4 opacity-40 font-serif-ceremony text-xs tracking-widest text-[#D4AF37]">
          OMBRIX PROTOCOL
        </div>
      </motion.div>

      {/* ==============================================================
          STAGE CONTENT:
          1. Before Cut: Closed Curtain Mystery Stage
          2. During Unveil: Slow Silk Cloth Removal Animation
          3. After Cut: Luxury Concert Experience
      ============================================================== */}
      {!isCut && !isUnveilingCloth ? (
        /* BEFORE CUT: SEALED IDENTITY */
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center py-20 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416] border border-[#D4AF37]/35 text-[#F2E3B0] text-xs font-mono tracking-[0.2em] uppercase mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            {CONFIG.mystery.badge}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-display mb-4 leading-none">
            <span className="text-gold-gradient">
              {CONFIG.mystery.eventTitle}
            </span>
          </h1>

          <p className="text-base sm:text-xl font-light text-[#F5F2EB] max-w-2xl mx-auto mb-4 leading-relaxed font-display">
            {CONFIG.mystery.eventSubtitle}
          </p>

          <p className="text-xs text-[#A5A1A0] max-w-md mx-auto mb-10 font-mono tracking-wider">
            {CONFIG.mystery.statusLine}
          </p>

          {/* Red Carpet Leading into the Ribbon */}
          <div className="w-48 sm:w-64 h-32 bg-gradient-to-t from-[#641C27] via-[#3b0e16] to-transparent rounded-t-3xl border-t border-x border-[#D4AF37]/35 shadow-[0_0_40px_rgba(100,28,39,0.4)] flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono tracking-widest text-[#F2E3B0] font-bold uppercase">
              EXECUTIVE RED CARPET
            </span>
          </div>
        </div>
      ) : isUnveilingCloth ? (
        /* DURING UNVEIL: CLOTH BEING REMOVED SLOWLY SLOWLY */
        <div className="relative z-25 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center py-20 pointer-events-none">
          {/* Emerging OMBRIX Monument underneath */}
          <div className="w-full rounded-3xl bg-[#151416]/95 border-2 border-[#D4AF37]/60 p-8 sm:p-14 shadow-[0_0_80px_rgba(212,175,55,0.4)] relative overflow-hidden backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0B0D] border border-[#D4AF37]/40 text-[#F2E3B0] text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              OFFICIAL CEREMONIAL UNVEILING
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-display mb-3 leading-none">
              <span className="text-gold-gradient drop-shadow-[0_4px_35px_rgba(212,175,55,0.55)]">
                {CONFIG.companyName}
              </span>
            </h1>

            <p className="text-base sm:text-2xl font-light text-[#F5F2EB] max-w-2xl mx-auto font-display">
              {CONFIG.tagline}
            </p>
          </div>

          {/* Royal Silk Cloth Sliding Away Slowly */}
          <CeremonialClothUnveil
            isUnveiling={isUnveilingCloth}
            onComplete={handleClothUnveilComplete}
          />
        </div>
      ) : (
        /* AFTER CUT: DEDICATED CONCERT EXPERIENCE */
        <ConcertExperience
          onReset={onReset}
          onNavigate={onNavigate}
        />
      )}

      {/* ==============================================================
          THE CEREMONIAL SATIN RIBBON & GIANT GOLDEN SHEARS
      ============================================================== */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
        {/* Left Ribbon Half */}
        <motion.div
          animate={
            isRibbonSevered || isCut
              ? {
                  x: "-120%",
                  y: "140%",
                  rotate: -35,
                  opacity: 0,
                }
              : {
                  x: "0%",
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                }
          }
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute top-0 left-0 w-1/2 h-14 ribbon-gradient border-y border-[#D4AF37]/60 flex items-center justify-end pr-8 shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
        >
          <div className="w-full h-[1px] bg-[#D4AF37]/40" />
        </motion.div>

        {/* Right Ribbon Half */}
        <motion.div
          animate={
            isRibbonSevered || isCut
              ? {
                  x: "120%",
                  y: "140%",
                  rotate: 35,
                  opacity: 0,
                }
              : {
                  x: "0%",
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                }
          }
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute top-0 right-0 w-1/2 h-14 ribbon-gradient border-y border-[#D4AF37]/60 flex items-center justify-start pl-8 shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
        >
          <div className="w-full h-[1px] bg-[#D4AF37]/40" />
        </motion.div>

        {/* Ceremonial Rosette Bow */}
        <motion.div
          id="ceremonial-bow-btn"
          animate={
            isRibbonSevered || isCut
              ? {
                  scale: 0.1,
                  y: "250%",
                  rotate: 180,
                  opacity: 0,
                }
              : {
                  scale: 1,
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                }
          }
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto cursor-pointer"
          onClick={handleCutTrigger}
          onTap={handleCutTrigger}
        >
          <svg className="w-28 h-28 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" viewBox="0 0 100 100">
            <path d="M 50 50 C 20 20, 10 40, 45 52 C 10 60, 20 80, 50 50" fill="url(#bowGradLux)" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M 50 50 C 80 20, 90 40, 55 52 C 90 60, 80 80, 50 50" fill="url(#bowGradLux)" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M 46 54 Q 35 75 30 95 Q 40 85 49 56" fill="#46121a" stroke="#D4AF37" strokeWidth="1" />
            <path d="M 54 54 Q 65 75 70 95 Q 60 85 51 56" fill="#46121a" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="50" cy="50" r="13" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
            <circle cx="50" cy="50" r="9" fill="#641C27" />
            <defs>
              <linearGradient id="bowGradLux" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8f2233" />
                <stop offset="60%" stopColor="#641C27" />
                <stop offset="100%" stopColor="#320c13" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* ==============================================================
          GIANT GOLDEN SHEARS
      ============================================================== */}
      {!isRibbonSevered && !isCut && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 pointer-events-auto"
          >
            <div className="flex flex-col items-center animate-bounce">
              <div className="px-5 py-2.5 rounded-full bg-[#151416]/95 border border-[#D4AF37]/50 shadow-[0_0_25px_rgba(212,175,55,0.35)] text-[#F2E3B0] text-xs font-medium tracking-wide flex items-center gap-2 backdrop-blur-md">
                <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                {CONFIG.mystery.hint}
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <ArrowDown className="w-4 h-4 text-[#D4AF37] mt-1 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            id="ceremonial-shears-btn"
            ref={scissorsRef}
            drag="x"
            dragConstraints={{ left: -160, right: 160 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 30 || Math.abs(info.velocity.x) > 50) {
                handleCutTrigger();
              }
            }}
            onClick={handleCutTrigger}
            onTap={handleCutTrigger}
            onMouseEnter={() => setIsHoveringScissors(true)}
            onMouseLeave={() => setIsHoveringScissors(false)}
            animate={
              isSnapping
                ? { scale: [1, 1.2, 1], rotate: [0, -10, 5, 0] }
                : {
                    y: [0, -6, 0],
                    rotate: isHoveringScissors ? 6 : 0,
                  }
            }
            transition={
              isSnapping
                ? { duration: 0.28 }
                : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }
            className="pointer-events-auto cursor-grab active:cursor-grabbing p-4 flex flex-col items-center group relative select-none"
            title="Click or drag to cut the ceremonial ribbon!"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-2xl group-hover:bg-[#D4AF37]/35 transition-colors pointer-events-none" />

            <svg
              className="w-36 h-36 md:w-44 md:h-44 drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-transform"
              viewBox="0 0 160 160"
            >
              <defs>
                <linearGradient id="bladeGradLux" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#F2E3B0" />
                  <stop offset="70%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#997018" />
                </linearGradient>
                <linearGradient id="handleGradLux" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="60%" stopColor="#641C27" />
                  <stop offset="100%" stopColor="#2a0a10" />
                </linearGradient>
              </defs>

              {/* Top Blade */}
              <motion.g
                animate={{
                  rotate: isSnapping ? -22 : isHoveringScissors ? -10 : -3,
                }}
                transition={{ duration: 0.15 }}
                style={{ originX: "80px", originY: "80px" }}
              >
                <path d="M 80 80 L 145 28 C 147 26 150 28 148 32 L 84 84 Z" fill="url(#bladeGradLux)" stroke="#FFF" strokeWidth="0.6" />
                <circle cx="35" cy="118" r="22" fill="none" stroke="url(#handleGradLux)" strokeWidth="7" />
                <path d="M 52 105 L 80 80" stroke="url(#bladeGradLux)" strokeWidth="7" strokeLinecap="round" />
              </motion.g>

              {/* Bottom Blade */}
              <motion.g
                animate={{
                  rotate: isSnapping ? 22 : isHoveringScissors ? 10 : 3,
                }}
                transition={{ duration: 0.15 }}
                style={{ originX: "80px", originY: "80px" }}
              >
                <path d="M 80 80 L 145 132 C 147 134 150 132 148 128 L 84 76 Z" fill="url(#bladeGradLux)" stroke="#FFF" strokeWidth="0.6" />
                <circle cx="35" cy="42" r="22" fill="none" stroke="url(#handleGradLux)" strokeWidth="7" />
                <path d="M 52 55 L 80 80" stroke="url(#bladeGradLux)" strokeWidth="7" strokeLinecap="round" />
              </motion.g>

              <circle cx="80" cy="80" r="6" fill="#F2E3B0" stroke="#997018" strokeWidth="1.5" />
              <circle cx="80" cy="80" r="2.5" fill="#D4AF37" />
            </svg>

            <span className="text-[10px] font-mono tracking-widest text-[#F2E3B0] mt-1 bg-[#0B0B0D]/80 px-3 py-1 rounded-full border border-[#D4AF37]/35 shadow font-semibold">
              DRAG OR TAP TO INAUGURATE
            </span>
          </motion.div>
        </div>
      )}

      {/* ==============================================================
          CINEMATIC COUNTDOWN (3, 2, 1) BEFORE REVEAL
      ============================================================== */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            key={countdown}
            initial={{ scale: 0.3, opacity: 0, y: 30 }}
            animate={{ scale: [1.3, 1], opacity: 1, y: 0 }}
            exit={{ scale: 1.6, opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Concentric Golden Shockwave Halo */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-[#D4AF37]/50 animate-ping opacity-35" />
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.4)_0%,_transparent_70%)] blur-2xl" />

            {/* Glowing Golden Numeral */}
            <div className="relative text-9xl sm:text-[13rem] md:text-[15rem] font-black text-white font-display tracking-tight drop-shadow-[0_0_50px_rgba(212,175,55,0.85)] leading-none select-none">
              <span className="text-gold-gradient">{countdown}</span>
            </div>

            {/* Suspense Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 px-6 py-2 rounded-full bg-[#151416]/95 border border-[#D4AF37]/60 text-[#F2E3B0] text-xs sm:text-sm font-mono tracking-[0.3em] uppercase shadow-2xl backdrop-blur-md"
            >
              REVEALING THE COMPANY IN {countdown}...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute bottom-6 left-6 z-30">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#151416]/80 border border-[#D4AF37]/25 text-xs text-[#A5A1A0] backdrop-blur-md shadow">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span>
            Inaugurations: <strong className="text-[#F2E3B0]">{ribbonCount}</strong> {isCut && <span className="text-[#D4AF37]">(Active)</span>}
          </span>
        </div>
      </div>
    </div>
  );
}
