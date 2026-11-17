import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function BalloonsCelebration({ active = true, count = 24 }) {
  const balloons = useMemo(() => {
    const palette = [
      { fill: 'url(#goldBalloon)', stroke: '#D4AF37', shine: '#FFF7D6' },
      { fill: 'url(#burgundyBalloon)', stroke: '#8B1E2E', shine: '#F5A3B0' },
      { fill: 'url(#champagneBalloon)', stroke: '#E8D5A0', shine: '#FFFFFF' },
      { fill: 'url(#darkBalloon)', stroke: '#D4AF37', shine: '#888888' },
    ];

    return Array.from({ length: count }).map((_, i) => {
      const size = Math.floor(Math.random() * 25) + 38; // 38px - 63px
      const left = Math.floor(Math.random() * 92) + 4; // 4% to 96%
      const duration = Math.random() * 6 + 9; // 9s to 15s rise
      const delay = Math.random() * 4; // stagger 0s to 4s
      const sway = Math.random() * 35 + 15; // 15px to 50px sway
      const theme = palette[i % palette.length];

      return {
        id: i,
        size,
        left: `${left}%`,
        duration,
        delay,
        sway,
        theme,
      };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <svg className="w-0 h-0 absolute">
        <defs>
          <radialGradient id="goldBalloon" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6B1C" />
          </radialGradient>
          <radialGradient id="burgundyBalloon" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A8283D" />
            <stop offset="50%" stopColor="#641C27" />
            <stop offset="100%" stopColor="#2E0A10" />
          </radialGradient>
          <radialGradient id="champagneBalloon" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F2E3B0" />
            <stop offset="100%" stopColor="#B39E66" />
          </radialGradient>
          <radialGradient id="darkBalloon" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#3A383F" />
            <stop offset="50%" stopColor="#1E1D22" />
            <stop offset="100%" stopColor="#0B0B0D" />
          </radialGradient>
        </defs>
      </svg>

      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '115vh', opacity: 0 }}
          animate={{
            y: '-30vh',
            opacity: [0, 0.95, 0.95, 0],
            x: [0, b.sway, -b.sway, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              times: [0, 0.1, 0.85, 1],
            },
            x: {
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            position: 'absolute',
            left: b.left,
            bottom: 0,
            width: b.size,
            height: b.size * 1.25,
          }}
        >
          <svg viewBox="0 0 60 75" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {/* Balloon Body */}
            <ellipse
              cx="30"
              cy="30"
              rx="24"
              ry="28"
              fill={b.theme.fill}
              stroke={b.theme.stroke}
              strokeWidth="0.8"
            />
            {/* Specular Highlight */}
            <ellipse cx="22" cy="18" rx="6" ry="10" fill={b.theme.shine} opacity="0.45" transform="rotate(-25 22 18)" />
            {/* Knot */}
            <polygon points="30,58 26,63 34,63" fill={b.theme.stroke} />
            {/* String */}
            <path
              d="M 30 63 Q 33 68 28 72 T 31 75"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.65"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
