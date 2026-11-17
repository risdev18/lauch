import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import { audio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Lock, Unlock, Bell, Check, Scissors, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProductUniverse({ onNavigate }) {
  const [revealedIds, setRevealedIds] = useState([]);
  const [notifiedIds, setNotifiedIds] = useState([]);

  const handleBoxClick = (product, e) => {
    if (revealedIds.includes(product.id)) return;

    audio.playScissorSnip();
    setTimeout(() => audio.playConfettiPop(), 160);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#D4AF37', '#F2E3B0', '#641C27', '#F5F2EB'],
    });

    setRevealedIds((prev) => [...prev, product.id]);
  };

  const handleNotifyMe = (id) => {
    audio.playConfettiPop();
    setNotifiedIds((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 max-w-6xl mx-auto select-none bg-[#0B0B0D]">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416] border border-[#D4AF37]/30 text-[#F2E3B0] text-xs font-mono tracking-[0.2em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          Portfolio Overview // 6 Research Initiatives
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-display mb-3">
          The Venture <span className="text-gold-gradient">Universe</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A5A1A0] max-w-2xl mx-auto font-body">
          Each subsidiary initiative is sealed under inaugural protocol. Select any vault below to inspect its research objectives, architecture, and deployment status.
        </p>
      </div>

      {/* Grid of Mystery Venture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONFIG.products.map((product) => {
          const isRevealed = revealedIds.includes(product.id) || product.status === 'revealed';
          const isNotified = notifiedIds.includes(product.id);

          return (
            <div
              key={product.id}
              onClick={(e) => handleBoxClick(product, e)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl ${
                isRevealed
                  ? 'bg-[#151416] border-[#D4AF37]/50'
                  : 'bg-[#151416] border-white/10 hover:border-[#D4AF37]/40'
              }`}
            >
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#A5A1A0] uppercase px-2 py-0.5 rounded bg-[#0B0B0D]">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/25">
                    ETA: {product.eta}
                  </span>
                </div>

                {/* Sealed State */}
                {!isRevealed ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#0B0B0D] border border-[#D4AF37]/35 flex items-center justify-center mb-5 relative group-hover:rotate-2 transition-transform shadow-inner">
                      <Lock className="w-7 h-7 text-[#D4AF37]/70" />
                      {/* Satin Ribbon cross */}
                      <div className="absolute inset-x-0 h-2.5 bg-[#641C27] shadow" />
                      <div className="absolute inset-y-0 w-2.5 bg-[#641C27] shadow" />
                    </div>

                    <h3 className="text-lg font-bold text-[#F5F2EB] font-display mb-1">
                      {product.code}
                    </h3>
                    <span className="text-xs font-mono text-[#D4AF37] mb-2">
                      [{product.codename}]
                    </span>

                    <p className="text-xs text-[#A5A1A0] italic max-w-xs mb-4 leading-relaxed">
                      "{product.teaser}"
                    </p>

                    <span className="text-[10px] font-mono text-[#F2E3B0] bg-[#0B0B0D] px-3 py-1 rounded-full border border-white/10">
                      Click to Unseal
                    </span>
                  </div>
                ) : (
                  /* Unsealed State */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-mono uppercase mb-3">
                      <Unlock className="w-3 h-3" /> Unsealed
                    </div>
                    <h3 className="text-xl font-bold text-white font-display mb-2 text-gold-gradient">
                      {product.revealedTitle}
                    </h3>
                    <p className="text-xs text-[#A5A1A0] mb-5 leading-relaxed">
                      {product.revealedDescription}
                    </p>

                    <div className="space-y-2 mb-6">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#F5F2EB]/80">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {isRevealed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotifyMe(product.id);
                  }}
                  disabled={isNotified}
                  className={`w-full py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                    isNotified
                      ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                      : 'bg-[#641C27] hover:bg-[#8f2233] text-white border border-[#D4AF37]/30'
                  }`}
                >
                  {isNotified ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Priority Access Logged
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-[#F2E3B0]" />
                      Get Priority Access
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation CTA */}
      <div className="text-center mt-16">
        <button
          onClick={() => onNavigate('team')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#151416] text-[#F5F2EB] hover:text-[#D4AF37] text-xs font-semibold tracking-wider uppercase border border-white/10 hover:border-[#D4AF37]/40 transition-all cursor-pointer"
        >
          <span>View Leadership & Consortium Cohort</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
