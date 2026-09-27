import React from 'react';
import { ZeroGravityCard } from './ZeroGravityCard.tsx';
import { soundManager } from '../utils/audio.ts';

interface DimensionSelectorProps {
  activeSector: string;
  setActiveSector: (sector: string) => void;
  onSelectDimension: (dimensionKey: string) => void;
  zeroGEnabled: boolean;
  showPortalCards?: boolean;
}

export const DimensionSelector: React.FC<DimensionSelectorProps> = ({
  activeSector,
  setActiveSector,
  onSelectDimension,
  zeroGEnabled,
  showPortalCards = true,
}) => {
  const sectors = [
    { id: 'all', label: 'All Marvel (145)', count: 145 },
    { id: 'avengers', label: 'Avengers HQ', count: 42 },
    { id: 'spider-verse', label: 'Spider-Verse', count: 38, icon: 'radar', isSpecial: true },
    { id: 'wakanda', label: 'Wakanda Tech', count: 24 },
    { id: 'x-men', label: 'X-Men Mutants', count: 26 },
    { id: 'cosmic', label: 'Cosmic Guardians', count: 15 },
  ];

  const portals = [
    {
      id: 'marvel',
      title: 'Marvel Multiverse',
      badge: '145 Shows',
      badgeColor: 'bg-[#ff525f] text-white',
      desc: 'Avengers, Spider-Verse, X-Men & Wakandan Tech',
      actionText: 'Enter Gate',
      icon: 'shield',
      accentColor: 'text-[#ff525f]',
      glowColor: 'bg-[#ff525f]/20 group-hover:bg-[#ff525f]/35',
      shadowColor: 'hover:shadow-[0_16px_32px_rgba(255,82,95,0.35)]',
      borderHover: 'hover:border-[#ff525f]/50',
    },
    {
      id: 'anime',
      title: 'Anime Legends',
      badge: 'Top Ranked',
      badgeColor: 'bg-[#f5cd00] text-[#3a3000]',
      desc: 'Shonen Power, Ninja Academy & Saiyan Duels',
      actionText: 'Power Up',
      icon: 'local_fire_department',
      accentColor: 'text-[#f5cd00]',
      glowColor: 'bg-[#f5cd00]/20 group-hover:bg-[#f5cd00]/35',
      shadowColor: 'hover:shadow-[0_16px_32px_rgba(245,205,0,0.3)]',
      borderHover: 'hover:border-[#f5cd00]/50',
    },
    {
      id: 'arcade',
      title: 'Hero Arcade',
      badge: '85+ Games',
      badgeColor: 'bg-[#00e5ff] text-[#00363d]',
      desc: 'Instant 3D browser games, fight bosses & earn XP',
      actionText: 'Play Now',
      icon: 'sports_esports',
      accentColor: 'text-[#00e5ff]',
      glowColor: 'bg-[#00e5ff]/20 group-hover:bg-[#00e5ff]/35',
      shadowColor: 'hover:shadow-[0_16px_32px_rgba(0,229,255,0.35)]',
      borderHover: 'hover:border-[#00e5ff]/50',
    },
    {
      id: 'comics',
      title: 'Comics & Manga',
      badge: 'Audio Sound FX',
      badgeColor: 'bg-[#303541] text-[#9cf0ff]',
      desc: 'Guided kid panels with comic blast sound effects',
      actionText: 'Read Stories',
      icon: 'menu_book',
      accentColor: 'text-[#00daf3]',
      glowColor: 'bg-[#00daf3]/20 group-hover:bg-[#00daf3]/35',
      shadowColor: 'hover:shadow-[0_16px_32px_rgba(0,218,243,0.3)]',
      borderHover: 'hover:border-[#00daf3]/50',
    },
  ];

  return (
    <div className="w-full">
      {/* Dimension Sub-Header & Multiverse Portal Bar */}
      <section className="w-full bg-[#090e19] px-4 sm:px-6 lg:px-10 py-3 border-b border-[#252a36]/50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff525f] text-white font-['Rubik'] text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(255,82,95,0.4)]">
              <span className="material-symbols-outlined text-sm">hub</span>
              DIMENSION PORTAL
            </span>
            <span className="font-['Anybody'] text-base sm:text-lg font-bold text-[#00e5ff] tracking-wide flex items-center gap-2">
              EARTH-616 & MULTIVERSE
              <span className="text-[#bac9cc] font-['Rubik'] text-xs font-normal hidden sm:inline">
                | Sector 07-A
              </span>
            </span>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
            {sectors.map(sec => {
              const isSelected = activeSector === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    soundManager.playSfx('click');
                    setActiveSector(sec.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-['Rubik'] text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                      : sec.isSpecial
                      ? 'bg-[#1b1f2b] text-[#ffb3b3] hover:bg-[#252a36] hover:text-white'
                      : 'bg-[#1b1f2b] text-[#bac9cc] hover:text-[#dee2f2] hover:bg-[#252a36]'
                  }`}
                >
                  {sec.icon && <span className="material-symbols-outlined text-sm">{sec.icon}</span>}
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Choose Your Dimension 4 Portal Cards (from Design 2) */}
      {showPortalCards && (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Anybody'] text-2xl sm:text-3xl font-extrabold text-white uppercase flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-3xl">
                    travel_explore
                  </span>
                  Choose Your Dimension
                </h2>
                <p className="font-['Rubik'] text-sm sm:text-base text-[#bac9cc] mt-1">
                  Tap a universe gate to unlock exclusive series, arcade battles & quests
                </p>
              </div>
              <span className="hidden sm:inline-block font-['Rubik'] text-xs font-bold text-[#00e5ff] uppercase tracking-wider bg-[#252a36] px-3.5 py-1 rounded-full border border-[#00e5ff]/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                4 Portals Online
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {portals.map((portal, idx) => (
                <ZeroGravityCard
                  key={portal.id}
                  variant={zeroGEnabled ? ((['1', '2', '3'][idx % 3]) as '1' | '2' | '3') : 'none'}
                  intensity={0.8}
                >
                  <div
                    onClick={() => {
                      soundManager.playSfx('zap');
                      onSelectDimension(portal.id);
                    }}
                    className={`group relative rounded-2xl bg-gradient-to-b from-[#1b1f2b] to-[#171b27] border border-[#252a36] overflow-hidden p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg ${portal.shadowColor} ${portal.borderHover}`}
                  >
                    {/* Living Ambient Aura */}
                    <div
                      className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all ${portal.glowColor}`}
                    />

                    {/* Top Row: Icon & Tag */}
                    <div className="flex items-center justify-between relative z-10">
                      <div
                        className={`w-12 h-12 rounded-xl bg-[#252a36] flex items-center justify-center ${portal.accentColor} group-hover:scale-110 transition-transform shadow-inner`}
                      >
                        <span className="material-symbols-outlined text-3xl">{portal.icon}</span>
                      </div>
                      <span
                        className={`font-['Rubik'] text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${portal.badgeColor}`}
                      >
                        {portal.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1 relative z-10 pt-4">
                      <h3 className="font-['Anybody'] text-lg font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                        {portal.title}
                      </h3>
                      <p className="font-['Rubik'] text-xs text-[#bac9cc] leading-relaxed">
                        {portal.desc}
                      </p>
                    </div>

                    {/* Action Arrow */}
                    <div
                      className={`flex items-center gap-1 font-['Rubik'] text-xs font-bold ${portal.accentColor} group-hover:translate-x-1.5 transition-transform pt-2`}
                    >
                      <span>{portal.actionText}</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </div>
                  </div>
                </ZeroGravityCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
