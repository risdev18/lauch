import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import { CONFIG } from './config';
import { audio } from './utils/audio';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import RibbonCutCeremony from './components/RibbonCutCeremony';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';

import OurStory from './pages/OurStory';
import ProductUniverse from './pages/ProductUniverse';
import TeamGuests from './pages/TeamGuests';
import RoadmapCountdown from './pages/RoadmapCountdown';
import JoinParty from './pages/JoinParty';
import NotFound from './pages/NotFound';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [currentPage, setCurrentPage] = useState('ceremony');
  const [isNightMode, setIsNightMode] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Update document title dynamically
  useEffect(() => {
    if (isCut) {
      document.title = `${CONFIG.companyName} — The Grand Inauguration`;
    } else {
      document.title = `${CONFIG.mystery.eventTitle} — ${CONFIG.mystery.eventSubtitle}`;
    }
  }, [isCut]);

  const handleCutRibbon = () => {
    setIsCut(true);
  };

  const handleResetRibbon = () => {
    setIsCut(false);
  };

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-700 bg-grain ${
      isNightMode ? 'bg-[#0B0B0D] text-[#F5F2EB]' : 'bg-[#151416] text-[#F5F2EB]'
    }`}>
      {/* Precision Golden Scissors Cursor */}
      <CustomCursor />

      {/* Preloader Screen */}
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Executive Header / Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isNightMode={isNightMode}
        onToggleNightMode={() => setIsNightMode(!isNightMode)}
        isCut={isCut}
      />

      {/* Main Corporate View */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {currentPage === 'ceremony' && (
            <PageTransition key="ceremony">
              <RibbonCutCeremony
                isCut={isCut}
                onCut={handleCutRibbon}
                onReset={handleResetRibbon}
                isNightMode={isNightMode}
                onNavigate={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </PageTransition>
          )}

          {currentPage === 'team' && (
            <PageTransition key="team">
              <TeamGuests
                onNavigate={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </PageTransition>
          )}

          {currentPage === 'party' && (
            <PageTransition key="party">
              <JoinParty
                onNavigate={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </PageTransition>
          )}

          {currentPage === '404' && (
            <PageTransition key="404">
              <NotFound
                onNavigate={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
