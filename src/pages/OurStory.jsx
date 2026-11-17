import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import { Sparkles, Compass, Lightbulb, Layers, Gavel, Award, ArrowRight } from 'lucide-react';

const ICONS = {
  'lightbulb-spark': Lightbulb,
  'chai-cup': Compass,
  'whiteboard': Layers,
  'gavel': Gavel,
  'crown': Award,
};

export default function OurStory({ onNavigate }) {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 max-w-5xl mx-auto select-none bg-[#0B0B0D]">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416] border border-[#D4AF37]/30 text-[#F2E3B0] text-xs font-mono tracking-[0.2em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          Genesis & Milestones
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-display mb-3">
          The Genesis of <span className="text-gold-gradient">{CONFIG.companyName}</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A5A1A0] max-w-2xl mx-auto font-body">
          How we architected a unified research and engineering collective to address global flood intelligence and disaster resilience.
        </p>
      </div>

      {/* Story Timeline */}
      <div className="relative border-l border-[#D4AF37]/30 ml-4 sm:ml-28 pl-6 sm:pl-10 space-y-12">
        {CONFIG.storyMilestones.map((milestone, idx) => {
          const IconComponent = ICONS[milestone.illustration] || Sparkles;
          return (
            <div
              key={milestone.id}
              className="relative group"
            >
              {/* Timeline Pin */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#151416] border border-[#D4AF37]/60 flex items-center justify-center shadow-lg">
                <IconComponent className="w-4 h-4 text-[#F2E3B0]" />
              </div>

              {/* Timestamp label */}
              <div className="hidden sm:block absolute -left-36 top-2.5 w-24 text-right text-xs font-mono text-[#D4AF37]">
                {milestone.time}
              </div>

              {/* Story Card */}
              <div className="p-6 rounded-2xl bg-[#151416] border border-white/10 hover:border-[#D4AF37]/40 transition-all shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#A5A1A0] uppercase">
                    {milestone.tag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-[#F2E3B0] bg-[#0B0B0D] border border-white/5">
                    {milestone.badge}
                  </span>
                </div>

                <div className="sm:hidden text-xs font-mono text-[#D4AF37] mb-1">
                  {milestone.time}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F2EB] font-display mb-2">
                  {milestone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A5A1A0] leading-relaxed font-body">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step CTA */}
      <div className="text-center mt-16">
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#151416] text-[#F5F2EB] hover:text-[#D4AF37] text-xs font-semibold tracking-wider uppercase border border-white/10 hover:border-[#D4AF37]/40 transition-all cursor-pointer"
        >
          <span>Explore Venture Portfolio</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
