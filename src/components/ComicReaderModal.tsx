import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

interface ComicReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSfxTriggered?: (text: string) => void;
}

export const ComicReaderModal: React.FC<ComicReaderModalProps> = ({
  isOpen,
  onClose,
  onSfxTriggered,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const [toast, setToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSfx = (type: 'thwip' | 'boom' | 'zap' | 'smash' | 'clang', soundText: string) => {
    soundManager.playSfx(type);
    if (onSfxTriggered) {
      onSfxTriggered(soundText);
    }
    setToast(`♪ Sound FX: "${soundText}"`);
    setTimeout(() => setToast(null), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#171b27] border border-[#f5cd00]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#090e19] border-b border-[#252a36]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f5cd00]/20 text-[#f5cd00] flex items-center justify-center font-bold">
              📖
            </span>
            <div>
              <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00] uppercase tracking-wider">
                MARVEL COMIC VAULT // SOUND-ACTION EDITION
              </span>
              <h3 className="font-['Anybody'] text-lg font-bold text-white">
                Spider-Man & Iron Man: Neon Showdown #1
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-['Rubik'] text-xs font-bold text-[#bac9cc]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-[#252a36] text-[#bac9cc] hover:text-white flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Comic Strip Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 bg-[#0e131e]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Panel 1 */}
            <div className="relative bg-[#1b1f2b] border-2 border-[#f5cd00] rounded-2xl overflow-hidden shadow-xl min-h-[260px] flex items-center justify-center group">
              <img
                alt="Spider-Man Comic Close Up"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGdxYrhDddlqcWg49vHp-Nd9K-jVDDjAKgJEgAR-k4TaG-dR_xtXLAV1DQWKr22yV0qciwEm2PtbeD7W-pc7NDYkRnv3mhpmZkaP9JSXnA6tsV7OO8l9zj8NYDz2SB6wsh056a7-s_up1kR-cD5y0GSjUGzIhHqOVoK6g-tHPmJE4wmnoKT1ecx99KLupqvDQa7UCAu5uwiTAWINdNeXFeOPyN4wfmglMMqPGlwlc45eq1l2XumZqH"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => handleSfx('thwip', 'THWIP!')}
                className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#f5cd00] text-[#3a3000] font-['Anybody'] text-base font-black uppercase transform -rotate-12 hover:scale-125 transition-transform shadow-[0_4px_16px_rgba(245,205,0,0.8)] cursor-pointer active:scale-95"
              >
                THWIP!
              </button>
              <div className="absolute bottom-3 left-3 bg-black/85 border border-[#f5cd00]/40 px-3 py-1 rounded text-xs font-['Rubik'] text-white">
                "Not on my watch, Goblin!"
              </div>
            </div>

            {/* Panel 2 */}
            <div className="relative bg-[#1b1f2b] border-2 border-[#ff525f] rounded-2xl overflow-hidden shadow-xl min-h-[260px] flex items-center justify-center group">
              <img
                alt="Iron Man Comic Action"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe2_orq1nyEE1NiaRRgkDDhFtcSF0PssURtT3sy3LBhXpTuQQXf6feR_5yljQuQ098FJrAkqTlqq7_-y3uc5s8CPN-MV3JQL6ExD_9gHHA8hh5yZMeH3rN4hnpTHY2MyHNVpFjIia01Mp_1EF5GLYjzfHCtG84qPNlaHJNY15klLgzCjdT1DF_OD3pY0y774Acx0HQwoeoc1uMr2Ua6Z3xRY9xrDYq5SnEHLds50MlHffSXiomj3py"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => handleSfx('clang', 'CLANG!')}
                className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-[#ff525f] text-white font-['Anybody'] text-base font-black uppercase transform rotate-6 hover:scale-125 transition-transform shadow-[0_4px_16px_rgba(255,82,95,0.8)] cursor-pointer active:scale-95"
              >
                CLANG!
              </button>
              <div className="absolute top-3 right-3 bg-black/85 border border-[#ff525f]/40 px-3 py-1 rounded text-xs font-['Rubik'] text-white">
                "Repulsor at 100% capacity!"
              </div>
            </div>
          </div>

          {/* Sound FX Toast */}
          {toast && (
            <div className="p-2.5 rounded-xl bg-[#00e5ff]/20 border border-[#00e5ff] text-[#00e5ff] text-center font-['Anybody'] text-sm uppercase tracking-wider animate-bounce">
              {toast}
            </div>
          )}

          {/* Live Sound Palette Bar */}
          <div className="flex items-center justify-between bg-[#171b27] border border-[#252a36] p-3 rounded-2xl flex-wrap gap-2">
            <span className="text-xs font-['Rubik'] font-bold text-[#bac9cc]">
              Tap to Hear Panel Sound Effects:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSfx('thwip', 'THWIP!')}
                className="px-3 py-1.5 rounded-lg bg-[#f5cd00] text-[#3a3000] font-['Anybody'] text-xs font-black cursor-pointer hover:scale-105"
              >
                🕸️ THWIP!
              </button>
              <button
                onClick={() => handleSfx('clang', 'CLANG!')}
                className="px-3 py-1.5 rounded-lg bg-[#ff525f] text-white font-['Anybody'] text-xs font-black cursor-pointer hover:scale-105"
              >
                🛡️ CLANG!
              </button>
              <button
                onClick={() => handleSfx('boom', 'BOOM!')}
                className="px-3 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-['Anybody'] text-xs font-black cursor-pointer hover:scale-105"
              >
                💥 BOOM!
              </button>
              <button
                onClick={() => handleSfx('zap', 'ZZZT!')}
                className="px-3 py-1.5 rounded-lg bg-[#00daf3] text-[#00363d] font-['Anybody'] text-xs font-black cursor-pointer hover:scale-105"
              >
                ⚡ ZZZT!
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#090e19] border-t border-[#252a36]">
          <button
            onClick={() => {
              soundManager.playSfx('click');
              setCurrentPage(p => Math.max(1, p - 1));
            }}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl font-['Rubik'] text-xs font-bold uppercase transition-all ${
              currentPage === 1
                ? 'opacity-40 cursor-not-allowed bg-[#1b1f2b] text-[#849396]'
                : 'bg-[#252a36] text-[#dee2f2] hover:bg-[#343946] cursor-pointer'
            }`}
          >
            ← Previous Page
          </button>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map(pg => (
              <span
                key={pg}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentPage === pg ? 'bg-[#00e5ff] w-6' : 'bg-[#303541]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              soundManager.playSfx('click');
              setCurrentPage(p => Math.min(totalPages, p + 1));
            }}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl font-['Rubik'] text-xs font-bold uppercase transition-all ${
              currentPage === totalPages
                ? 'opacity-40 cursor-not-allowed bg-[#1b1f2b] text-[#849396]'
                : 'bg-[#00e5ff] text-[#00363d] hover:brightness-110 cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.4)]'
            }`}
          >
            Next Page →
          </button>
        </div>
      </div>
    </div>
  );
};
