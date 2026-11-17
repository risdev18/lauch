import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { Clock, ArrowRight } from 'lucide-react';

export default function RoadmapCountdown({ onNavigate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(CONFIG.launchDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 max-w-5xl mx-auto select-none bg-[#0B0B0D]">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151416] border border-[#D4AF37]/30 text-[#F2E3B0] text-xs font-mono tracking-[0.2em] uppercase mb-4">
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          Deployment Schedule
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-display mb-3">
          Corporate <span className="text-gold-gradient">Roadmap</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A5A1A0] max-w-2xl mx-auto font-body">
          Tracking the phased rollout of research models, telemetry pipelines, and civil defense integrations.
        </p>
      </div>

      {/* Countdown Clock Unit */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINUTES", value: timeLeft.minutes },
          { label: "SECONDS", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="p-6 rounded-2xl bg-[#151416] border border-white/10 shadow-lg flex flex-col items-center justify-center text-center"
          >
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight text-gold-gradient">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#A5A1A0] mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Corporate Milestone Track */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white font-display text-center mb-12">
          Strategic Phasing
        </h2>

        <div className="relative border-l border-[#D4AF37]/30 ml-4 sm:ml-20 pl-6 sm:pl-10 space-y-10">
          {CONFIG.roadmapSteps.map((step) => {
            const isCurrent = step.status === 'current';
            return (
              <div
                key={step.phase}
                className={`relative p-6 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#151416] border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                    : 'bg-[#151416] border-white/10'
                }`}
              >
                {/* Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-7 w-4 h-4 rounded-full border ${
                    isCurrent
                      ? 'bg-[#D4AF37] border-white shadow-[0_0_10px_#D4AF37]'
                      : 'bg-[#0B0B0D] border-white/40'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-[#D4AF37] uppercase">
                    {step.phase}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono ${
                      isCurrent
                        ? 'bg-[#D4AF37]/15 text-[#F2E3B0] border border-[#D4AF37]/30'
                        : 'bg-[#0B0B0D] text-[#A5A1A0]'
                    }`}
                  >
                    {step.date}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A1A0] leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="text-center mt-16">
        <button
          onClick={() => onNavigate('party')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#151416] text-[#F5D061] hover:text-white text-xs font-semibold tracking-wider uppercase border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all cursor-pointer"
        >
          <span>Register for Cohort Credentials</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
