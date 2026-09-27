import React from 'react';
import { Hero } from '../types/index.ts';
import { soundManager } from '../utils/audio.ts';

interface SuitSchematicModalProps {
  hero: Hero;
  isOpen: boolean;
  onClose: () => void;
}

export const SuitSchematicModal: React.FC<SuitSchematicModalProps> = ({ hero, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#171b27] border border-[#00e5ff]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.3)] overflow-hidden">
        {/* Living Hologram Circuit Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,229,255,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#252a36] pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">biotech</span>
            </span>
            <div>
              <span className="font-['Rubik'] text-xs font-bold text-[#00e5ff] uppercase tracking-wider">
                STARK-HUD // DIAGNOSTIC TERMINAL
              </span>
              <h3 className="font-['Anybody'] text-2xl font-black text-white">
                {hero.name} - Suit Schematic
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playSfx('click');
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-[#252a36] hover:bg-[#ff525f] text-[#dee2f2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 relative z-10">
          {/* Left Art View */}
          <div className="md:col-span-5 bg-[#090e19] border border-[#252a36] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="80" stroke="#00e5ff" strokeDasharray="4 4" strokeWidth="1" />
              <circle cx="100" cy="100" r="50" stroke="#00e5ff" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="#00e5ff" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#00e5ff" strokeOpacity="0.4" strokeWidth="1" />
            </svg>
            <img
              alt={hero.name}
              src={hero.image}
              className="max-h-60 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            />
            <span className="mt-3 px-3 py-1 rounded bg-[#00e5ff]/20 text-[#00e5ff] font-['Rubik'] text-xs font-bold uppercase tracking-wider">
              Nanotech Mark 85
            </span>
          </div>

          {/* Right Diagnostic Modules */}
          <div className="md:col-span-7 space-y-3.5">
            <div className="bg-[#1b1f2b] border border-[#252a36] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold text-[#bac9cc] mb-1">
                <span>Web-Fluid Pressure / Core Output</span>
                <span className="text-[#00e5ff]">99.8 PSI</span>
              </div>
              <div className="w-full h-2 bg-[#303541] rounded-full overflow-hidden">
                <div className="h-full bg-[#00e5ff] w-[99%]" />
              </div>
            </div>

            <div className="bg-[#1b1f2b] border border-[#252a36] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold text-[#bac9cc] mb-1">
                <span>Kinetic Absorption Mesh</span>
                <span className="text-[#f5cd00]">100% OPERATIONAL</span>
              </div>
              <div className="w-full h-2 bg-[#303541] rounded-full overflow-hidden">
                <div className="h-full bg-[#f5cd00] w-[100%]" />
              </div>
            </div>

            <div className="bg-[#1b1f2b] border border-[#252a36] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold text-[#bac9cc] mb-1">
                <span>Micro-Thruster Vectoring</span>
                <span className="text-[#ff525f]">ONLINE (4 NODES)</span>
              </div>
              <div className="w-full h-2 bg-[#303541] rounded-full overflow-hidden">
                <div className="h-full bg-[#ff525f] w-[92%]" />
              </div>
            </div>

            {/* Sub-systems summary */}
            <div className="p-3 bg-[#090e19] border border-[#252a36] rounded-xl text-xs font-['Rubik'] text-[#dee2f2] leading-relaxed">
              <span className="text-[#00e5ff] font-bold">Diagnostics: </span>
              All biometric telemetry, micro-thrusters, and HUD targeting reticles are synced with the Avenger Multiverse Satellite Network. Ready for zero-gravity combat deployment.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#252a36] flex justify-end gap-3 relative z-10">
          <button
            onClick={() => {
              soundManager.playSfx('thwip');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,229,255,0.4)] hover:brightness-110 cursor-pointer"
          >
            CONFIRM READY FOR COMBAT
          </button>
        </div>
      </div>
    </div>
  );
};
