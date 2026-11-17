import React from 'react';
import { motion } from 'framer-motion';

export default function DancingSilhouettes({ isPlaying = true }) {
  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden flex flex-col items-center justify-end select-none pointer-events-none mt-2 mb-6">
      
      {/* Dynamic Stage Floor & Light Cones */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#D4AF37]/20 via-[#641C27]/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 inset-x-12 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 blur-sm" />

      {/* ==============================================================
          MAIN STAGE DANCERS (Illuminated, Bright, Highly Visible)
      ============================================================== */}
      <div className="relative z-10 w-full flex items-end justify-between sm:justify-around px-2 sm:px-8 mb-1">
        
        {/* LEFT DANCER: Solo Hip-Hop / Electro Groove */}
        <div className="relative flex flex-col items-center">
          {/* Moving Overhead Cone Spotlight */}
          <motion.div
            animate={{
              rotate: isPlaying ? [-18, 10, -18] : 0,
              opacity: isPlaying ? [0.6, 0.9, 0.6] : 0.4,
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-36 w-48 h-80 bg-gradient-to-b from-[#00F0FF]/40 via-[#00F0FF]/15 to-transparent blur-xl pointer-events-none origin-top"
          />

          <motion.div
            animate={
              isPlaying
                ? {
                    y: [0, -14, 2, -10, 0],
                    rotate: [-4, 5, -3, 6, -4],
                    scale: [1, 1.03, 0.98, 1],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="relative w-28 sm:w-40 h-52 sm:h-64 flex flex-col items-center"
          >
            <svg viewBox="0 0 120 200" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]">
              <defs>
                <linearGradient id="leftDancerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="25%" stopColor="#2A282D" />
                  <stop offset="80%" stopColor="#151416" />
                  <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>
              </defs>
              
              {/* Head with luminous DJ headphones */}
              <circle cx="60" cy="26" r="13" fill="#1C1A20" stroke="#00F0FF" strokeWidth="2.5" />
              {/* Headphone band */}
              <path d="M 46 24 C 46 12 74 12 74 24" fill="none" stroke="#00F0FF" strokeWidth="3" />
              <rect x="44" y="20" width="5" height="12" rx="2" fill="#00F0FF" />
              <rect x="71" y="20" width="5" height="12" rx="2" fill="#00F0FF" />

              {/* Dynamic Torso & Jacket with Neon Seams */}
              <path
                d="M 48 40 C 38 52 35 78 40 106 C 44 128 48 138 50 150 L 70 150 C 72 138 76 125 78 106 C 82 78 78 52 72 40 Z"
                fill="url(#leftDancerGrad)"
                stroke="#00F0FF"
                strokeWidth="1.2"
              />

              {/* Left Arm Waving High in Celebration */}
              <motion.path
                animate={isPlaying ? { d: ["M 48 48 Q 25 32 16 10 Q 22 6 28 14 L 50 52 Z", "M 48 48 Q 28 20 22 2 Q 28 0 34 8 L 50 52 Z", "M 48 48 Q 25 32 16 10 Q 22 6 28 14 L 50 52 Z"] } : {}}
                transition={{ repeat: Infinity, duration: 1.6 }}
                d="M 48 48 Q 25 32 16 10 Q 22 6 28 14 L 50 52 Z"
                fill="#201E24"
                stroke="#00F0FF"
                strokeWidth="1.5"
              />

              {/* Right Arm Pumping to 124 BPM Beat */}
              <motion.path
                animate={isPlaying ? { d: ["M 72 48 Q 94 30 104 10 Q 100 6 94 12 L 70 52 Z", "M 72 48 Q 98 22 108 2 Q 104 0 98 8 L 70 52 Z", "M 72 48 Q 94 30 104 10 Q 100 6 94 12 L 70 52 Z"] } : {}}
                transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }}
                d="M 72 48 Q 94 30 104 10 Q 100 6 94 12 L 70 52 Z"
                fill="#201E24"
                stroke="#00F0FF"
                strokeWidth="1.5"
              />

              {/* Dancing Legs with Glow Sneakers */}
              <path d="M 50 148 L 42 196 L 54 196 L 58 150 Z" fill="#1C1A20" stroke="#00F0FF" strokeWidth="1" />
              <path d="M 62 148 L 76 194 L 64 196 L 56 150 Z" fill="#1C1A20" stroke="#00F0FF" strokeWidth="1" />
              {/* Sneakers */}
              <rect x="36" y="192" width="20" height="6" rx="2" fill="#00F0FF" />
              <rect x="62" y="192" width="20" height="6" rx="2" fill="#00F0FF" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-[#00F0FF] tracking-wider mt-1 drop-shadow">
              GROOVE SOLO
            </span>
          </motion.div>
        </div>

        {/* CENTER: ELEGANT DANCING COUPLE UNDER GOLDEN GALA SPOTLIGHT */}
        <div className="relative flex flex-col items-center">
          {/* Central Gala Golden Spotlight Cone */}
          <motion.div
            animate={{
              opacity: isPlaying ? [0.7, 0.95, 0.7] : 0.5,
              scaleX: isPlaying ? [1, 1.1, 1] : 1,
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-40 w-72 h-96 bg-gradient-to-b from-[#D4AF37]/45 via-[#F2E3B0]/20 to-transparent blur-2xl pointer-events-none origin-top"
          />

          <motion.div
            animate={
              isPlaying
                ? {
                    y: [0, -8, 1, -7, 0],
                    rotate: [-3, 3, -2, 2, -3],
                    scaleX: [1, 0.98, 1.02, 1],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="relative w-48 sm:w-64 h-60 sm:h-76 flex flex-col items-center mx-2"
          >
            <svg viewBox="0 0 180 230" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(212,175,55,0.8)]">
              <defs>
                <linearGradient id="goldCoupleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F2E3B0" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#1E1C22" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>

              {/* Partner 1 (Left - Suited): Head with Gold Trim */}
              <circle cx="70" cy="30" r="12" fill="#221F26" stroke="#D4AF37" strokeWidth="2" />
              {/* Suit Torso with Gala Gold Lapels */}
              <path
                d="M 62 42 C 54 54 50 82 54 114 C 58 136 62 152 64 168 L 78 168 C 80 152 82 134 82 112 C 82 82 80 54 74 42 Z"
                fill="url(#goldCoupleGrad)"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              {/* Partner 1 Left Arm wrapping partner */}
              <path d="M 58 50 Q 38 72 48 98 Q 54 96 52 90 L 62 54 Z" fill="#221F26" stroke="#D4AF37" strokeWidth="1.2" />
              {/* Suited Trousers */}
              <path d="M 64 166 L 56 224 L 66 224 L 70 168 Z" fill="#1C1A20" stroke="#D4AF37" strokeWidth="1" />
              <path d="M 72 166 L 78 222 L 70 224 L 66 168 Z" fill="#1C1A20" stroke="#D4AF37" strokeWidth="1" />

              {/* Partner 2 (Right - Flowing Gala Gown): Head with Tiara Sparkle */}
              <circle cx="108" cy="36" r="11" fill="#221F26" stroke="#F2E3B0" strokeWidth="2" />
              {/* Tiara */}
              <polygon points="104,23 108,18 112,23" fill="#D4AF37" />

              {/* Elegant Gala Ballgown Silhouette with Gold Embroidery Trim */}
              <path
                d="M 104 47 C 98 58 96 80 94 100 Q 76 156 68 226 L 142 226 Q 124 156 114 100 C 114 80 112 58 108 47 Z"
                fill="url(#goldCoupleGrad)"
                stroke="#F2E3B0"
                strokeWidth="1.8"
              />
              {/* Partner 2 Arm resting on partner's shoulder */}
              <path d="M 104 52 Q 90 56 78 58 Q 80 64 88 62 L 106 58 Z" fill="#221F26" stroke="#D4AF37" strokeWidth="1.2" />
              
              {/* Interlocked Hands Glowing Gala Rosette */}
              <circle cx="78" cy="58" r="4.5" fill="#D4AF37" className="animate-pulse" />
              <circle cx="78" cy="58" r="8" fill="none" stroke="#F2E3B0" strokeWidth="1" opacity="0.8" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-[#F2E3B0] tracking-wider mt-1 drop-shadow">
              GALA COUPLE DANCE
            </span>
          </motion.div>
        </div>

        {/* RIGHT DANCER: Festival EDM / Celebration Silhouette */}
        <div className="relative flex flex-col items-center">
          {/* Moving Magenta/Burgundy Cone Spotlight */}
          <motion.div
            animate={{
              rotate: isPlaying ? [18, -10, 18] : 0,
              opacity: isPlaying ? [0.6, 0.9, 0.6] : 0.4,
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-36 w-48 h-80 bg-gradient-to-b from-[#E11D48]/40 via-[#E11D48]/15 to-transparent blur-xl pointer-events-none origin-top"
          />

          <motion.div
            animate={
              isPlaying
                ? {
                    y: [0, -16, 2, -12, 0],
                    rotate: [4, -5, 3, -6, 4],
                    scale: [1, 1.04, 0.98, 1],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="relative w-28 sm:w-40 h-52 sm:h-64 flex flex-col items-center"
          >
            <svg viewBox="0 0 120 200" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(225,29,72,0.7)]">
              <defs>
                <linearGradient id="rightDancerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="30%" stopColor="#2A282D" />
                  <stop offset="80%" stopColor="#151416" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
              </defs>

              <circle cx="60" cy="26" r="13" fill="#1C1A20" stroke="#E11D48" strokeWidth="2.5" />
              {/* Torso */}
              <path
                d="M 48 40 C 38 52 35 78 40 106 C 44 128 48 138 50 150 L 70 150 C 72 138 76 125 78 106 C 82 78 78 52 72 40 Z"
                fill="url(#rightDancerGrad)"
                stroke="#E11D48"
                strokeWidth="1.2"
              />

              {/* Both Arms Raised High with Festival Glowsticks */}
              <path d="M 48 46 Q 26 26 18 6 Q 24 4 30 10 L 50 50 Z" fill="#201E24" stroke="#E11D48" strokeWidth="1.5" />
              <path d="M 72 46 Q 94 26 102 6 Q 96 4 90 10 L 70 50 Z" fill="#201E24" stroke="#E11D48" strokeWidth="1.5" />
              {/* Glowsticks */}
              <line x1="16" y1="4" x2="26" y2="16" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
              <line x1="104" y1="4" x2="94" y2="16" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />

              {/* Legs */}
              <path d="M 50 148 L 42 196 L 54 196 L 58 150 Z" fill="#1C1A20" stroke="#E11D48" strokeWidth="1" />
              <path d="M 62 148 L 76 194 L 64 196 L 56 150 Z" fill="#1C1A20" stroke="#E11D48" strokeWidth="1" />
              <rect x="36" y="192" width="20" height="6" rx="2" fill="#E11D48" />
              <rect x="62" y="192" width="20" height="6" rx="2" fill="#E11D48" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-[#E11D48] tracking-wider mt-1 drop-shadow">
              FESTIVAL JUMP
            </span>
          </motion.div>
        </div>

      </div>

      {/* ==============================================================
          FRONT FESTIVAL CROWD SILHOUETTES WITH RAISED GLOW HANDS
      ============================================================== */}
      <div className="w-full h-28 sm:h-36 overflow-hidden relative border-t border-[#D4AF37]/20">
        <motion.div
          animate={
            isPlaying
              ? {
                  y: [0, -8, 2, -6, 0],
                }
              : { y: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="w-full h-full flex items-end justify-between"
        >
          <svg
            className="w-full h-full drop-shadow-[0_-10px_25px_rgba(0,0,0,0.95)]"
            preserveAspectRatio="none"
            viewBox="0 0 1200 200"
          >
            <defs>
              <linearGradient id="frontCrowdGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2D2A33" />
                <stop offset="40%" stopColor="#18171C" />
                <stop offset="100%" stopColor="#0B0B0D" />
              </linearGradient>
            </defs>

            {/* Dense crowd with hands in the air cheering */}
            <path
              d="
                M 0 200 L 0 140
                Q 20 115, 40 138 Q 65 95, 85 130 Q 110 80, 130 125 Q 155 105, 175 135
                Q 200 70, 220 125 Q 245 105, 265 138 Q 295 85, 315 128 Q 345 65, 365 120
                Q 395 100, 415 138 Q 445 85, 465 125 Q 495 75, 515 130 Q 545 110, 565 138
                Q 595 60, 615 120 Q 645 95, 665 135 Q 695 75, 715 125 Q 745 100, 765 138
                Q 795 65, 815 120 Q 845 90, 865 130 Q 895 80, 915 135 Q 945 65, 965 120
                Q 995 100, 1015 138 Q 1045 70, 1065 125 Q 1095 90, 1115 135 Q 1145 105, 1200 140
                L 1200 200 Z
              "
              fill="url(#frontCrowdGrad)"
              stroke="#D4AF37"
              strokeWidth="0.8"
            />
          </svg>
        </motion.div>
      </div>

    </div>
  );
}
