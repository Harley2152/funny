import React, { useState } from 'react';
import { ZeroGravityCard } from './ZeroGravityCard.tsx';
import { COMIC_PANELS, QUESTS_DATA } from '../data/mockData.ts';
import { soundManager } from '../utils/audio.ts';

interface QuestsAndComicSectionProps {
  zeroGEnabled: boolean;
  onStartCircuitPuzzle: () => void;
  onLaunchTargetDrill: () => void;
  onReadFullComic: () => void;
  onSfxTriggered: (soundText: string) => void;
}

export const QuestsAndComicSection: React.FC<QuestsAndComicSectionProps> = ({
  zeroGEnabled,
  onStartCircuitPuzzle,
  onLaunchTargetDrill,
  onReadFullComic,
  onSfxTriggered,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBubbleClick = (sfx: 'thwip' | 'boom' | 'zap' | 'smash' | 'clang', soundText: string) => {
    soundManager.playSfx(sfx);
    onSfxTriggered(soundText);
    setToastMessage(`♪ Sound Effect: "${soundText}"`);
    setTimeout(() => {
      setToastMessage(null);
    }, 1500);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Marvel Daily Quests & Skill Simulators */}
        <div className="lg:col-span-7 bg-[#171b27] border border-[#252a36] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#252a36]">
              <div>
                <span className="text-[#ff525f] font-['Rubik'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">military_tech</span>
                  S.H.I.E.L.D. ACADEMY
                </span>
                <h2 className="font-['Anybody'] text-2xl sm:text-3xl font-bold text-[#c3f5ff] mt-0.5">
                  HERO TRAINING QUESTS
                </h2>
              </div>
              <div className="text-right">
                <span className="font-['Rubik'] text-[11px] font-bold text-[#bac9cc] uppercase tracking-wider">
                  DAILY RESET
                </span>
                <p className="font-['Anybody'] text-lg font-bold text-[#f5cd00]">04h 22m</p>
              </div>
            </div>

            {/* Quest Task Items */}
            <div className="space-y-3.5 mt-5">
              {/* Quest 1 */}
              <div className="bg-[#1b1f2b] border border-[#252a36] p-4 rounded-xl flex items-center justify-between gap-3 hover:bg-[#252a36] transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
                    <span className="material-symbols-outlined text-2xl">memory</span>
                  </div>
                  <div>
                    <h4 className="font-['Anybody'] text-base font-bold text-[#dee2f2]">
                      Tony Stark's Circuit Puzzle
                    </h4>
                    <p className="font-['Rubik'] text-xs text-[#bac9cc] mt-0.5">
                      Re-route 3 arc energy pathways before the core overcharges.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00] whitespace-nowrap">
                    +75 XP ⚡
                  </span>
                  <button
                    onClick={() => {
                      soundManager.playSfx('zap');
                      onStartCircuitPuzzle();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#00e5ff] hover:brightness-110 text-[#00363d] font-['Rubik'] text-xs font-bold uppercase transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] cursor-pointer"
                  >
                    START
                  </button>
                </div>
              </div>

              {/* Quest 2 */}
              <div className="bg-[#1b1f2b] border border-[#252a36] p-4 rounded-xl flex items-center justify-between gap-3 hover:bg-[#252a36] transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#ff525f]/20 text-[#ff525f] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,82,95,0.25)]">
                    <span className="material-symbols-outlined text-2xl">crisis_alert</span>
                  </div>
                  <div>
                    <h4 className="font-['Anybody'] text-base font-bold text-[#dee2f2]">
                      Peter's Web Target Drill
                    </h4>
                    <p className="font-['Rubik'] text-xs text-[#bac9cc] mt-0.5">
                      Hit 10 moving robot targets in under 30 seconds.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00] whitespace-nowrap">
                    +100 XP ⚡
                  </span>
                  <button
                    onClick={() => {
                      soundManager.playSfx('thwip');
                      onLaunchTargetDrill();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#ff525f] hover:brightness-110 text-white font-['Rubik'] text-xs font-bold uppercase transition-all shadow-[0_0_12px_rgba(255,82,95,0.3)] cursor-pointer"
                  >
                    LAUNCH
                  </button>
                </div>
              </div>

              {/* Quest 3 */}
              <div className="bg-[#1b1f2b] border border-[#252a36] p-4 rounded-xl flex items-center justify-between gap-3 hover:bg-[#252a36] transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#f5cd00]/20 text-[#f5cd00] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">vpn_key</span>
                  </div>
                  <div>
                    <h4 className="font-['Anybody'] text-base font-bold text-[#dee2f2]">
                      Wakandan Vibranium Cipher
                    </h4>
                    <p className="font-['Rubik'] text-xs text-[#bac9cc] mt-0.5">
                      Decipher Shuri's secret coded lab notes.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00] whitespace-nowrap">
                    +50 XP ⚡
                  </span>
                  <button
                    onClick={() => {
                      soundManager.playSfx('click');
                      onSfxTriggered('Complete previous quests to unlock Cipher!');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#303541] hover:bg-[#343946] text-[#bac9cc] font-['Rubik'] text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    LOCKED
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quest Reward Banner */}
          <div className="mt-6 p-4 bg-[#1b1f2b] border border-[#252a36] rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f5cd00] flex items-center justify-center text-[#3a3000] font-bold text-lg shadow-[0_0_14px_rgba(245,205,0,0.5)]">
                🛡️
              </span>
              <div>
                <p className="font-['Rubik'] text-xs font-bold text-[#dee2f2]">
                  Weekly Reward: Vibranium Avatar Border
                </p>
                <p className="font-['Rubik'] text-[11px] text-[#bac9cc]">
                  Complete 2 more daily quests to claim!
                </p>
              </div>
            </div>
            <div className="w-24 h-2 bg-[#303541] rounded-full overflow-hidden shrink-0">
              <div className="h-full bg-[#f5cd00] w-2/3 shadow-[0_0_8px_rgba(245,205,0,0.8)]" />
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Comic Reader & Audio Panel */}
        <ZeroGravityCard
          variant={zeroGEnabled ? '3' : 'none'}
          intensity={0.6}
          className="lg:col-span-5 h-full"
        >
          <div className="bg-[#1b1f2b] border border-[#252a36] rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden h-full">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[#f5cd00] font-['Rubik'] text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">menu_book</span> MARVEL COMIC VAULT
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#ff525f] text-white font-['Rubik'] text-[11px] font-bold">
                  ISSUE #1
                </span>
              </div>
              <h2 className="font-['Anybody'] text-2xl font-black text-[#c3f5ff] mt-1">
                SOUND-ACTION COMIC
              </h2>
              <p className="font-['Rubik'] text-xs text-[#bac9cc] mt-1">
                Tap sound effect bubbles to hear live comic panel audio!
              </p>

              {/* Interactive Comic Panel Preview Frame */}
              <div className="mt-4 bg-[#090e19] border border-[#252a36] rounded-xl p-3 relative overflow-hidden min-h-[220px]">
                {/* Simulated Comic Strip Layout */}
                <div className="grid grid-cols-2 gap-2.5 w-full h-full">
                  {/* Panel 1 */}
                  <div className="relative bg-[#252a36] rounded-lg overflow-hidden h-40 group cursor-pointer">
                    <img
                      alt={COMIC_PANELS[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={COMIC_PANELS[0].image}
                    />
                    {/* Clickable Comic Bubble 1 */}
                    <button
                      onClick={() => handleBubbleClick('thwip', 'THWIP!')}
                      className="absolute top-2 right-2 px-3 py-1 rounded-full bg-[#f5cd00] text-[#3a3000] font-['Anybody'] text-xs font-black uppercase transform -rotate-12 hover:scale-125 transition-transform shadow-[0_4px_12px_rgba(245,205,0,0.5)] cursor-pointer active:scale-95"
                    >
                      THWIP!
                    </button>
                  </div>

                  {/* Panel 2 */}
                  <div className="relative bg-[#252a36] rounded-lg overflow-hidden h-40 group cursor-pointer">
                    <img
                      alt={COMIC_PANELS[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={COMIC_PANELS[1].image}
                    />
                    {/* Clickable Comic Bubble 2 */}
                    <button
                      onClick={() => handleBubbleClick('clang', 'CLANG!')}
                      className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-[#ff525f] text-white font-['Anybody'] text-xs font-black uppercase transform rotate-6 hover:scale-125 transition-transform shadow-[0_4px_12px_rgba(255,82,95,0.5)] cursor-pointer active:scale-95"
                    >
                      CLANG!
                    </button>
                  </div>
                </div>

                {/* Central Sound Notification Banner */}
                {toastMessage && (
                  <div className="absolute bottom-2 inset-x-4 bg-[#090e19]/95 border border-[#00e5ff] text-[#00e5ff] text-center py-1 rounded font-['Rubik'] text-xs uppercase tracking-wider shadow-lg animate-fade-in pointer-events-none">
                    {toastMessage}
                  </div>
                )}
              </div>

              {/* Sound FX Panel Quick Triggers */}
              <div className="flex items-center justify-center gap-2 mt-3.5 flex-wrap">
                <span className="font-['Rubik'] text-xs text-[#bac9cc] font-bold">Tap FX:</span>
                <button
                  onClick={() => handleBubbleClick('zap', 'ZZZT! ⚡')}
                  className="px-2.5 py-1 rounded bg-[#252a36] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-['Anybody'] text-xs font-bold transition-colors cursor-pointer"
                >
                  ZZZT! ⚡
                </button>
                <button
                  onClick={() => handleBubbleClick('boom', 'BOOM! 💥')}
                  className="px-2.5 py-1 rounded bg-[#252a36] hover:bg-[#ff525f] hover:text-white text-[#ff525f] font-['Anybody'] text-xs font-bold transition-colors cursor-pointer"
                >
                  BOOM! 💥
                </button>
                <button
                  onClick={() => handleBubbleClick('smash', 'KAPOW! 🥊')}
                  className="px-2.5 py-1 rounded bg-[#252a36] hover:bg-[#f5cd00] hover:text-[#3a3000] text-[#f5cd00] font-['Anybody'] text-xs font-bold transition-colors cursor-pointer"
                >
                  KAPOW! 🥊
                </button>
              </div>
            </div>

            {/* Read Full Comic & Bookmark Buttons */}
            <div className="mt-5 pt-3 border-t border-[#252a36] flex items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playSfx('laser');
                  onReadFullComic();
                }}
                className="flex-1 h-11 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Anybody'] text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,229,255,0.4)] hover:brightness-110 transition-all font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">auto_stories</span>
                READ FULL COMIC
              </button>
              <button
                onClick={() => {
                  soundManager.playSfx('click');
                  setBookmarked(!bookmarked);
                  onSfxTriggered(bookmarked ? 'Bookmark removed' : 'Comic Bookmarked to Vault!');
                }}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  bookmarked
                    ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff]'
                    : 'bg-[#252a36] border-[#303541] text-[#dee2f2] hover:text-[#00e5ff]'
                }`}
                title="Bookmark Issue"
              >
                <span className="material-symbols-outlined text-xl">
                  {bookmarked ? 'bookmark' : 'bookmark_add'}
                </span>
              </button>
            </div>
          </div>
        </ZeroGravityCard>
      </div>
    </section>
  );
};
