import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import { audio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';

export default function JoinParty({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    examNote: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);

    setTimeout(() => {
      const newMember = {
        name: formData.name,
        optionalMessage: formData.examNote,
        issuedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };

      const existing = JSON.parse(localStorage.getItem('omni_vip_tickets') || '[]');
      existing.push(newMember);
      localStorage.setItem('omni_vip_tickets', JSON.stringify(existing));

      setLoading(false);
      setSubmitted(true);

      audio.playConfettiPop();
      setTimeout(() => audio.playFirework(), 150);

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F2E3B0', '#641C27', '#F5F2EB'],
      });
    }, 400);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 max-w-3xl mx-auto flex flex-col justify-between select-none bg-[#0B0B0D]">
      <div>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416] border border-[#D4AF37]/35 text-[#F2E3B0] text-xs font-mono tracking-widest uppercase mb-3">
            <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
            MEMBER SIGN-UP FORM
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display mb-3">
            Add Remaining <span className="text-gold-gradient">Group Member</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F2EB]/90 max-w-xl mx-auto font-body">
            For members whose forms are pending due to college exams. Submit your name and availability to appear on the official member list.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative rounded-3xl bg-[#151416] border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-10 overflow-hidden mb-12">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-[#D4AF37] uppercase mb-2 font-bold">
                    Full Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#D4AF37] uppercase mb-2 font-bold">
                    Exam Schedule / Availability Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.examNote}
                    onChange={(e) => setFormData({ ...formData, examNote: e.target.value })}
                    placeholder="e.g. Exams till 10th December / Available post-exams"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-[#0B0B0D] font-extrabold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-[#0B0B0D]" />
                  <span>{loading ? "Registering..." : "Add Me To Group Roster"}</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#4ADE80]/15 border border-[#4ADE80]/40 flex items-center justify-center mx-auto mb-4 text-[#4ADE80]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-2">
                  Successfully Registered!
                </h3>
                <p className="text-sm text-[#F5F2EB]/90 mb-6 font-body">
                  <strong className="text-[#D4AF37]">{formData.name}</strong> has been added to the official group roster.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onNavigate && onNavigate('team')}
                    className="px-6 py-2.5 rounded-xl bg-[#641C27] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8B1E2E] transition-colors cursor-pointer border border-[#D4AF37]/35 flex items-center gap-2"
                  >
                    <span>View In Group Members List</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', examNote: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0B0B0D] text-[#A5A1A0] hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                  >
                    Add Another Member
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <div className="text-center pb-6">
        <button
          onClick={() => onNavigate && onNavigate('ceremony')}
          className="text-xs font-mono text-[#D4AF37] hover:text-[#F2E3B0] transition-colors cursor-pointer"
        >
          ← Return to The Celebration Stage
        </button>
      </div>
    </div>
  );
}
