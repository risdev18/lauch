import React, { useState } from 'react';
import { CONFIG } from '../config';
import { audio } from '../utils/audio';
import { Volume2, VolumeX, Moon, Sun, Scissors, Lock, Menu, X } from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  isNightMode,
  onToggleNightMode,
  isCut,
  onLogoClick
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newMuted = audio.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      audio.playScissorSnip();
    }
  };

  const navItems = [
    { id: 'ceremony', label: isCut ? 'Celebration Stage' : 'The Ceremony' },
    { id: 'team', label: 'Group Members (15)' },
    { id: 'party', label: 'Member Sign-Up' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0B0B0D]/90 border-b border-white/10 select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Sealed Protocol Header */}
        <div
          onClick={isCut ? onLogoClick : undefined}
          className={`flex items-center gap-3 ${isCut ? 'cursor-pointer group' : 'cursor-default'}`}
        >
          <div className="w-8 h-8 rounded-lg bg-[#151416] border border-[#D4AF37]/40 flex items-center justify-center">
            {isCut ? (
              <Scissors className="w-4 h-4 text-[#D4AF37]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
          </div>
          
          <div className="flex flex-col">
            {isCut ? (
              <>
                <span className="font-bold text-base tracking-wide text-white font-display group-hover:text-[#F2E3B0] transition-colors">
                  {CONFIG.companyName}
                </span>
                <span className="text-[9px] tracking-widest text-[#D4AF37] uppercase font-mono">
                  INAUGURATED
                </span>
              </>
            ) : (
              <>
                <span className="font-bold text-sm tracking-wide text-[#F5F2EB] font-display">
                  {CONFIG.mystery.eventTitle}
                </span>
                <span className="text-[9px] tracking-widest text-[#A5A1A0] uppercase font-mono">
                  IDENTITY SEALED
                </span>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#151416] px-3 py-1 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-[#A5A1A0] hover:text-[#F5F2EB]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
              !isMuted
                ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#D4AF37]'
                : 'bg-[#151416] border-white/10 text-[#A5A1A0] hover:text-white'
            }`}
            title={!isMuted ? "Sound: ON" : "Sound: MUTED"}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={onToggleNightMode}
            className="p-2 rounded-lg bg-[#151416] border border-white/10 text-[#A5A1A0] hover:text-[#D4AF37] transition-all cursor-pointer"
            title="Toggle Stage Lighting"
          >
            {isNightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#151416] border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 bg-[#151416] border-b border-white/10 flex flex-col gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                currentPage === item.id
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-[#A5A1A0] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
