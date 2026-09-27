import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

interface SoundboardBarProps {
  onSfxTriggered?: (text: string) => void;
}

interface FloatingComicPop {
  id: number;
  text: string;
  x: number;
  y: number;
  colorClass: string;
  rotation: number;
}

export const SoundboardBar: React.FC<SoundboardBarProps> = ({ onSfxTriggered }) => {
  const [floatingPops, setFloatingPops] = useState<FloatingComicPop[]>([]);

  const triggerSound = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: 'thwip' | 'boom' | 'zap' | 'smash',
    label: string,
    colorClass: string
  ) => {
    soundManager.playSfx(type);
    if (onSfxTriggered) {
      onSfxTriggered(label);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const newPop: FloatingComicPop = {
      id: Date.now() + Math.random(),
      text: label,
      x: rect.left + rect.width / 4,
      y: rect.top - 20,
      colorClass,
      rotation: (Math.random() - 0.5) * 20,
    };

    setFloatingPops(prev => [...prev, newPop]);

    setTimeout(() => {
      setFloatingPops(prev => prev.filter(p => p.id !== newPop.id));
    }, 1100);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#1b1f2b] border border-[#252a36] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        {/* Glow Accent */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#00e5ff]/20 flex items-center justify-center text-[#00e5ff] shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            <span className="material-symbols-outlined text-4xl">graphic_eq</span>
          </div>
          <div>
            <span className="font-['Rubik'] text-xs text-[#00e5ff] uppercase font-bold tracking-wider">
              Interactive Sound FX Bar
            </span>
            <h3 className="font-['Anybody'] text-2xl font-black text-white">
              Super Hero Soundboard
            </h3>
            <p className="font-['Rubik'] text-xs sm:text-sm text-[#bac9cc]">
              Tap buttons to trigger comic action audio effects!
            </p>
          </div>
        </div>

        {/* Quick FX Audio Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={e =>
              triggerSound(e, 'thwip', 'THWIP!!', 'text-[#00e5ff] drop-shadow-[0_4px_12px_rgba(0,229,255,0.8)]')
            }
            className="px-4 py-2.5 rounded-xl bg-[#252a36] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-['Anybody'] text-sm uppercase font-bold transition-all shadow-sm active:scale-95 cursor-pointer border border-[#00e5ff]/20"
          >
            🕸️ THWIP!
          </button>

          <button
            onClick={e =>
              triggerSound(e, 'boom', 'KABOOM!!', 'text-[#ff525f] drop-shadow-[0_4px_12px_rgba(255,82,95,0.8)]')
            }
            className="px-4 py-2.5 rounded-xl bg-[#252a36] hover:bg-[#ff525f] hover:text-white text-[#ff525f] font-['Anybody'] text-sm uppercase font-bold transition-all shadow-sm active:scale-95 cursor-pointer border border-[#ff525f]/20"
          >
            💥 BOOM!
          </button>

          <button
            onClick={e =>
              triggerSound(e, 'zap', 'ZAAAP!!', 'text-[#f5cd00] drop-shadow-[0_4px_12px_rgba(245,205,0,0.8)]')
            }
            className="px-4 py-2.5 rounded-xl bg-[#252a36] hover:bg-[#f5cd00] hover:text-[#3a3000] text-[#f5cd00] font-['Anybody'] text-sm uppercase font-bold transition-all shadow-sm active:scale-95 cursor-pointer border border-[#f5cd00]/20"
          >
            ⚡ ZAP!
          </button>

          <button
            onClick={e =>
              triggerSound(e, 'smash', 'SMASH!!', 'text-[#00daf3] drop-shadow-[0_4px_12px_rgba(0,218,243,0.8)]')
            }
            className="px-4 py-2.5 rounded-xl bg-[#252a36] hover:bg-[#00daf3] hover:text-[#00363d] text-[#00daf3] font-['Anybody'] text-sm uppercase font-bold transition-all shadow-sm active:scale-95 cursor-pointer border border-[#00daf3]/20"
          >
            👊 SMASH!
          </button>
        </div>
      </div>

      {/* Floating Animated Zero-G Comic Popups */}
      {floatingPops.map(pop => (
        <div
          key={pop.id}
          style={{
            left: `${pop.x}px`,
            top: `${pop.y}px`,
            transform: `translateY(-60px) scale(1.4) rotate(${pop.rotation}deg)`,
            transition: 'all 0.9s cubic-bezier(0.1, 0.9, 0.2, 1)',
          }}
          className={`fixed z-50 pointer-events-none font-['Anybody'] text-2xl font-black ${pop.colorClass} animate-fade-out select-none`}
        >
          {pop.text}
        </div>
      ))}
    </section>
  );
};
