import React from 'react';
import { Scissors, AlertCircle, Home } from 'lucide-react';

export default function NotFound({ onNavigate }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-6 rounded-full bg-[#9B111E]/20 border-2 border-[#DC2626] mb-6 text-[#DC2626]">
        <Scissors className="w-16 h-16 rotate-90" />
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00F0FF] mb-2">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-6xl font-black text-white font-display mb-4">
        You Cut The <span className="text-gold-gradient">Wrong Ribbon</span>
      </h1>

      <p className="text-base text-[#FAF6EE]/75 max-w-md mx-auto mb-8 font-body">
        This corridor does not exist in our architectural blueprints. Even our overengineering department cannot locate it.
      </p>

      <button
        onClick={() => onNavigate('ceremony')}
        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#9B111E] text-white font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
      >
        <Home className="w-4 h-4 text-[#F5D061]" />
        Return to the Grand Stage
      </button>
    </div>
  );
}
