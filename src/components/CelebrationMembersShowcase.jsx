import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import { Sparkles, ChevronLeft, ChevronRight, BookOpen, CheckCircle, UserCheck } from 'lucide-react';

export default function CelebrationMembersShowcase({ onNavigate }) {
  const members = CONFIG.registeredMembers || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle through members smoothly every 3 seconds
  useEffect(() => {
    if (members.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [members.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const visibleMembers = [
    members[(currentIndex) % members.length],
    members[(currentIndex + 1) % members.length],
    members[(currentIndex + 2) % members.length],
  ].filter(Boolean);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 px-4 z-20">
      {/* Section Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151416] border border-[#D4AF37]/35 text-[#F2E3B0] text-[11px] font-mono tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          GROUP MEMBERS SPOTLIGHT • 15 REGISTERED
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white font-display">
          Celebrating Our Group Members
        </h3>
        <p className="text-xs text-[#A5A1A0] max-w-md mx-auto font-body">
          Form submitted members. Remaining classmate forms are pending due to active exams.
        </p>
      </div>

      {/* Dynamic 3-Card Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleMembers.map((member, idx) => {
          const globalIdx = members.findIndex(m => m.id === member.id);
          const hasExam = Boolean(member.examNote);

          return (
            <motion.div
              key={`${member.id}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                idx === 0
                  ? 'bg-gradient-to-b from-[#1C1A20] to-[#151416] border-[#D4AF37]/60 shadow-[0_6px_25px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/30'
                  : 'bg-[#151416]/90 border-white/10 hover:border-[#D4AF37]/30'
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#F2E3B0] border border-[#D4AF37]/30">
                  MEMBER #{globalIdx + 1}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#4ADE80]">
                  <CheckCircle className="w-3 h-3" />
                  <span>Form Received</span>
                </div>
              </div>

              {/* Member Details */}
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#641C27] to-[#D4AF37] p-[1.5px] shadow-sm flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-[#151416] flex items-center justify-center font-bold text-sm text-[#F2E3B0]">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-display leading-tight">
                      {member.name}
                    </h4>
                    <p className="text-xs text-[#A5A1A0] font-mono">
                      Group Member
                    </p>
                  </div>
                </div>

                {/* Exam Note Badge if applicable */}
                {hasExam && (
                  <div className="mt-2 p-2 rounded-lg bg-[#641C27]/25 border border-[#641C27]/40 flex items-start gap-1.5 text-[11px] text-[#F5F2EB] leading-tight">
                    <BookOpen className="w-3.5 h-3.5 text-[#F2E3B0] flex-shrink-0 mt-0.5" />
                    <span>{member.examNote}</span>
                  </div>
                )}
              </div>

              {/* Bottom Status */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#A5A1A0]">
                <span>Status: Active</span>
                <span className="text-[#F2E3B0]">Cohort 2026</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Carousel Controls & Full Roster Link */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-[#151416] border border-white/10 hover:border-[#D4AF37] text-[#F2E3B0] transition-colors cursor-pointer"
            title="Previous Member"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-[#151416] border border-white/10 hover:border-[#D4AF37] text-[#F2E3B0] transition-colors cursor-pointer"
            title="Next Member"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-[#A5A1A0] ml-2">
            Showing {currentIndex + 1} to {Math.min(currentIndex + 3, members.length)} of {members.length}
          </span>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('team')}
          className="text-xs font-mono text-[#D4AF37] hover:text-[#F2E3B0] transition-colors flex items-center gap-1 cursor-pointer font-bold"
        >
          <span>View All 15 Members List →</span>
        </button>
      </div>
    </div>
  );
}
