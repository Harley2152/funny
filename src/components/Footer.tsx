import React from 'react';
import { soundManager } from '../utils/audio.ts';

interface FooterProps {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenShieldModal: () => void;
  showSafeModeBanner?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  soundEnabled,
  setSoundEnabled,
  onOpenShieldModal,
  showSafeModeBanner = true,
}) => {
  const toggleSound = () => {
    const nextState = !soundEnabled;
    soundManager.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) {
      soundManager.playSfx('click');
    }
  };

  return (
    <footer className="w-full bg-[#090e19] text-[#bac9cc] py-10 border-t border-[#252a36] relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto flex flex-col gap-6">
        {/* Kid-Safe Shield Callout Footer Bar (from Design 2) */}
        {showSafeModeBanner && (
          <div className="rounded-2xl bg-[#171b27] border border-[#252a36] p-4 flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00e5ff] text-2xl">verified_user</span>
              <span className="font-['Rubik'] text-xs sm:text-sm text-[#bac9cc]">
                <strong className="text-white">HeroVerse Safe Mode Active:</strong> Screen-time timers and age-appropriate content filters enabled for Level 8 Champion.
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onOpenShieldModal();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#252a36] hover:bg-[#303541] text-[#00e5ff] font-['Rubik'] text-xs font-bold transition-colors cursor-pointer border border-[#00e5ff]/20"
            >
              Adjust Safety Pin
            </button>
          </div>
        )}

        {/* Main Footer Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#252a36]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00e5ff] text-3xl">verified_user</span>
            <div>
              <p className="font-['Rubik'] text-sm font-bold text-[#dee2f2] uppercase tracking-wide">
                Kid-Safe Shield Certified
              </p>
              <p className="font-['Rubik'] text-xs text-[#bac9cc]">
                COPPA Compliant & Ad-Free Play Zone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-['Rubik'] font-bold transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#1b1f2b] border-[#00e5ff]/40 text-[#dee2f2]'
                  : 'bg-[#1b1f2b] border-[#ff525f]/40 text-[#ff525f]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg ${
                  soundEnabled ? 'text-[#00e5ff]' : 'text-[#ff525f]'
                }`}
              >
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span>{soundEnabled ? 'Sound FX: ON' : 'Sound FX: OFF'}</span>
            </button>
          </div>
        </div>

        {/* Legal & Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-['Rubik'] text-[#849396]">
          <p>© 2024 HeroVerse Kids Network. Crafted for Young Heroes.</p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onOpenShieldModal();
              }}
              className="hover:text-[#00e5ff] transition-colors cursor-pointer"
            >
              Parent Guide
            </button>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onOpenShieldModal();
              }}
              className="hover:text-[#00e5ff] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onOpenShieldModal();
              }}
              className="hover:text-[#00e5ff] transition-colors cursor-pointer"
            >
              Safety Controls
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
