import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import { Users, Clock, ArrowRight, UserPlus, CheckCircle, BookOpen, User } from 'lucide-react';

export default function TeamGuests({ onNavigate }) {
  const [allMembers, setAllMembers] = useState(CONFIG.registeredMembers);

  // Load dynamically registered members from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omni_vip_tickets');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted = parsed.map((item, idx) => ({
            id: `local-${idx}`,
            name: item.name,
            status: 'Active',
            examNote: item.optionalMessage || 'Newly Registered Member',
            timestamp: item.issuedAt || 'Recently',
          }));
          setAllMembers([...CONFIG.registeredMembers, ...formatted]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const inExamCount = allMembers.filter((m) => m.status === 'In Exams' || m.examNote).length;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-6xl mx-auto select-none bg-[#0B0B0D]">
      
      {/* ==============================================================
          HEADER: THE 15 REGISTERED GROUP MEMBERS
      ============================================================== */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416] border border-[#D4AF37]/35 text-[#F2E3B0] text-xs font-mono tracking-widest uppercase mb-3">
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          OFFICIAL GROUP MEMBERS ROSTER
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display mb-3">
          Our <span className="text-gold-gradient">Group Members</span>
        </h1>
        
        <p className="text-sm sm:text-base text-[#F5F2EB]/90 max-w-2xl mx-auto font-body mb-2 leading-relaxed">
          These are the verified members who have filled out the form. 
          Other group members' forms are currently pending due to ongoing college exams.
        </p>

        <p className="text-xs text-[#A5A1A0] font-mono">
          TOTAL REGISTERED SO FAR: {allMembers.length} MEMBERS • EXAM STATUS TRACKED BELOW
        </p>
      </div>

      {/* Roster Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
        <div className="p-4 rounded-2xl bg-[#151416] border border-[#D4AF37]/30 text-center shadow-lg">
          <div className="text-3xl font-black text-gold-gradient font-display">{allMembers.length}</div>
          <div className="text-xs font-bold text-[#F5F2EB] mt-1">Form Submitted Members</div>
          <div className="text-[10px] text-[#A5A1A0] font-mono mt-0.5">Verified on roster</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#151416] border border-[#D4AF37]/30 text-center shadow-lg">
          <div className="text-3xl font-black text-[#F2E3B0] font-display">{inExamCount}</div>
          <div className="text-xs font-bold text-[#F5F2EB] mt-1">Exams Ongoing / Free Soon</div>
          <div className="text-[10px] text-[#A5A1A0] font-mono mt-0.5">Availability noted</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#151416] border border-[#D4AF37]/30 text-center shadow-lg flex flex-col justify-center items-center">
          <button
            onClick={() => onNavigate && onNavigate('party')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#641C27] to-[#8B1E2E] text-white text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all cursor-pointer border border-[#D4AF37]/40 flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#F2E3B0]" />
            <span>Add Remaining Member</span>
          </button>
          <div className="text-[10px] text-[#A5A1A0] font-mono mt-1.5">For members post-exam</div>
        </div>
      </div>

      {/* ==============================================================
          THE CLEAN, PROMINENT 15 MEMBERS GRID
      ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {allMembers.map((member, idx) => {
          const hasExam = Boolean(member.examNote);

          return (
            <motion.div
              key={member.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                hasExam
                  ? 'bg-gradient-to-b from-[#1C1A20] to-[#151416] border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(212,175,55,0.12)]'
                  : 'bg-[#151416] border-white/10 hover:border-[#D4AF37]/35 shadow-md'
              }`}
            >
              <div>
                {/* Header: Member Index & Verified Status */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                    MEMBER #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#4ADE80]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Form Received</span>
                  </div>
                </div>

                {/* Member Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#641C27] to-[#D4AF37] p-[1.5px] shadow-sm flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-[#151416] flex items-center justify-center font-bold text-base text-[#F2E3B0]">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#A5A1A0] font-mono mt-0.5">
                      Group Member • Cohort 2026
                    </p>
                  </div>
                </div>

                {/* Exam Availability Note if mentioned in form */}
                {hasExam && (
                  <div className="mt-2 p-2.5 rounded-xl bg-[#641C27]/30 border border-[#641C27]/60 flex items-start gap-2 text-xs text-[#F5F2EB] leading-snug">
                    <BookOpen className="w-4 h-4 text-[#F2E3B0] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F2E3B0] block text-[10px] uppercase font-mono tracking-wider">
                        EXAM SCHEDULE / AVAILABILITY
                      </span>
                      <span>{member.examNote}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#A5A1A0]">
                <span>Status: Active</span>
                <span className="text-[#F2E3B0]">Verified</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10">
        <button
          onClick={() => onNavigate && onNavigate('ceremony')}
          className="px-6 py-3 rounded-xl bg-[#151416] border border-[#D4AF37]/40 text-[#F2E3B0] font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] transition-all cursor-pointer"
        >
          ← Back To Celebration Stage
        </button>
        <button
          onClick={() => onNavigate && onNavigate('party')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-[#0B0B0D] font-black text-xs uppercase tracking-wider hover:scale-105 transition-all cursor-pointer shadow-lg"
        >
          Submit Form For Remaining Member →
        </button>
      </div>

    </div>
  );
}
