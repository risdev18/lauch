import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transform -translate-x-3 -translate-y-3 transition-opacity duration-300"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <svg
        className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        viewBox="0 0 32 32"
        fill="none"
      >
        {/* Top Blade */}
        <motion.path
          d="M 16 16 L 28 6 C 29 5 29 7 28 8 L 17 17 Z"
          fill="#F5D061"
          stroke="#D4AF37"
          strokeWidth="0.5"
          animate={{ rotate: isClicking ? -20 : 0 }}
          style={{ originX: "16px", originY: "16px" }}
        />
        {/* Bottom Blade */}
        <motion.path
          d="M 16 16 L 28 26 C 29 27 29 25 28 24 L 17 15 Z"
          fill="#F5D061"
          stroke="#D4AF37"
          strokeWidth="0.5"
          animate={{ rotate: isClicking ? 20 : 0 }}
          style={{ originX: "16px", originY: "16px" }}
        />
        {/* Handles */}
        <circle cx="8" cy="22" r="5" stroke="#641C27" strokeWidth="2" fill="#151416" />
        <circle cx="8" cy="10" r="5" stroke="#641C27" strokeWidth="2" fill="#151416" />
        <line x1="12" y1="20" x2="16" y2="16" stroke="#D4AF37" strokeWidth="2" />
        <line x1="12" y1="12" x2="16" y2="16" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="16" cy="16" r="2" fill="#D4AF37" />
      </svg>
    </div>
  );
}
