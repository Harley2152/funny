import React from 'react';
import { ARCADE_GAMES } from '../data/mockData.ts';
import { ZeroGravityCard } from './ZeroGravityCard.tsx';
import { soundManager } from '../utils/audio.ts';

interface QuestsAndArcadeSectionProps {
  zeroGEnabled: boolean;
  onPlayGame: (gameTitle: string) => void;
  onStartQuest: (questName: string) => void;
  onReadManga: () => void;
}

export const QuestsAndArcadeSection: React.FC<QuestsAndArcadeSectionProps> = ({
  zeroGEnabled,
  onPlayGame,
  onStartQuest,
  onReadManga,
}) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Hero Daily Quests (Gamified) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#f5cd00] text-3xl">military_tech</span>
              <h3 className="font-['Anybody'] text-2xl font-bold text-white uppercase">
                Today's Hero Quests
              </h3>
            </div>
            <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00] bg-[#f5cd00]/10 border border-[#f5cd00]/20 px-3 py-1 rounded-full uppercase">
              Resets in 4h 12m
            </span>
          </div>

          {/* Level Reward Banner Callout */}
          <div className="rounded-2xl bg-gradient-to-r from-[#252a36] to-[#1b1f2b] border border-[#252a36] p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#f5cd00]/20 flex items-center justify-center text-[#f5cd00] shadow-[0_0_12px_rgba(245,205,0,0.5)]">
                <span className="material-symbols-outlined text-3xl">token</span>
              </div>
              <div>
                <p className="font-['Rubik'] text-xs font-bold text-[#f5cd00] uppercase">
                  Level 10 Unlock Target
                </p>
                <h5 className="font-['Anybody'] text-base font-bold text-white">
                  Neon Web-Shooter Avatar Frame
                </h5>
              </div>
            </div>
            <span className="font-['Rubik'] text-xs sm:text-sm font-black text-[#00e5ff] whitespace-nowrap">
              225 / 500 XP
            </span>
          </div>

          {/* Quests Interactive List */}
          <div className="flex flex-col gap-3">
            {/* Quest Item 1 (Completed) */}
            <div className="p-4 rounded-2xl bg-[#1b1f2b] border border-[#252a36] flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl font-bold">check_circle</span>
                </div>
                <div>
                  <p className="font-['Rubik'] text-sm font-bold text-white line-through opacity-75">
                    Solve Peter Parker's Science Riddle
                  </p>
                  <span className="font-['Rubik'] text-xs text-[#bac9cc]">
                    Earned Web Chemistry Badge
                  </span>
                </div>
              </div>
              <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00]">+50 XP ⚡</span>
            </div>

            {/* Quest Item 2 (Active CTA) */}
            <div className="p-4 rounded-2xl bg-[#1b1f2b] border border-[#252a36] flex items-center justify-between hover:bg-[#252a36] transition-colors shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#ff525f]/20 text-[#ff525f] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">sports_esports</span>
                </div>
                <div>
                  <p className="font-['Rubik'] text-sm font-bold text-white">
                    Play 1 Round of Web-Chaser 3D
                  </p>
                  <span className="font-['Rubik'] text-xs text-[#bac9cc]">
                    Dodge laser drones in the arcade
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.playSfx('zap');
                  onStartQuest('Web-Chaser 3D');
                }}
                className="px-4 py-2 rounded-xl bg-[#ff525f] text-white font-['Rubik'] text-xs font-bold uppercase hover:brightness-110 shadow-[0_4px_12px_rgba(255,82,95,0.4)] transition-all cursor-pointer whitespace-nowrap"
              >
                Start Quest (+100 XP)
              </button>
            </div>

            {/* Quest Item 3 (Comic Quest) */}
            <div className="p-4 rounded-2xl bg-[#1b1f2b] border border-[#252a36] flex items-center justify-between hover:bg-[#252a36] transition-colors shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#f5cd00]/20 text-[#f5cd00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">auto_stories</span>
                </div>
                <div>
                  <p className="font-['Rubik'] text-sm font-bold text-white">
                    Read Chapter 1 of 'Shadow Ninja'
                  </p>
                  <span className="font-['Rubik'] text-xs text-[#bac9cc]">
                    Listen to at least 3 audio sound FX
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.playSfx('laser');
                  onReadManga();
                }}
                className="px-4 py-2 rounded-xl bg-[#303541] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-['Rubik'] text-xs font-bold uppercase transition-all cursor-pointer whitespace-nowrap"
              >
                Read (+75 XP)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Top Arcade Minigames */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#00e5ff] text-3xl">sports_esports</span>
              <h3 className="font-['Anybody'] text-2xl font-bold text-white uppercase">
                Instant Arcade Picks
              </h3>
            </div>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onPlayGame('All 85 Arcade Games');
              }}
              className="font-['Rubik'] text-xs font-bold text-[#00e5ff] hover:underline uppercase tracking-wide cursor-pointer"
            >
              View All 85 Games →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARCADE_GAMES.map((game, idx) => (
              <ZeroGravityCard
                key={game.id}
                variant={zeroGEnabled ? ((['1', '2'][idx % 2]) as '1' | '2') : 'none'}
                intensity={0.6}
              >
                <div className="group rounded-2xl bg-[#1b1f2b] border border-[#252a36] p-3.5 flex flex-col gap-3 shadow-md hover:border-[#00e5ff]/50 transition-all">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#252a36]">
                    <img
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={game.image}
                    />
                    <span className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-['Rubik'] font-bold text-[#f5cd00] flex items-center gap-1 shadow">
                      <span className="material-symbols-outlined text-xs">star</span>
                      {game.rating.toFixed(1)}
                    </span>
                    <span
                      className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded font-['Rubik'] text-[11px] font-bold uppercase shadow"
                      style={{
                        backgroundColor: game.tagColor,
                        color: game.tagColor === '#f5cd00' ? '#3a3000' : '#00363d',
                      }}
                    >
                      {game.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-['Anybody'] text-base font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                        {game.title}
                      </h5>
                      <p className="font-['Rubik'] text-xs text-[#bac9cc]">{game.score}</p>
                    </div>
                    <button
                      onClick={() => {
                        soundManager.playSfx('zap');
                        onPlayGame(game.title);
                      }}
                      className="px-4 py-2 rounded-xl font-['Rubik'] text-xs uppercase font-black hover:brightness-110 shadow-lg cursor-pointer transition-transform active:scale-95"
                      style={{
                        backgroundColor: game.tagColor,
                        color: game.tagColor === '#f5cd00' ? '#3a3000' : '#00363d',
                      }}
                    >
                      PLAY
                    </button>
                  </div>
                </div>
              </ZeroGravityCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
