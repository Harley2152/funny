import React, { useRef } from 'react';
import { ShowEpisode } from '../types/index.ts';
import { ZeroGravityCard } from './ZeroGravityCard.tsx';
import { soundManager } from '../utils/audio.ts';

interface ShowsSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  shows: ShowEpisode[];
  zeroGEnabled: boolean;
  onPlayShow: (show: ShowEpisode) => void;
}

export const ShowsSection: React.FC<ShowsSectionProps> = ({
  title,
  subtitle = 'Hand-picked animated sagas safe for young Champions',
  badge = 'Ad-Free & Parent Approved',
  shows,
  zeroGEnabled,
  onPlayShow,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    soundManager.playSfx('click');
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    soundManager.playSfx('click');
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-8 bg-[#090e19]/60">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[#00e5ff] font-['Rubik'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">smart_display</span>
              HeroVerse Watch Room
            </span>
            <h2 className="font-['Anybody'] text-2xl sm:text-3xl font-black text-[#c3f5ff] uppercase mt-0.5">
              {title}
            </h2>
            <p className="font-['Rubik'] text-xs sm:text-sm text-[#bac9cc] mt-0.5">{subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            {badge && (
              <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-[#1b1f2b] border border-[#252a36] text-[#bac9cc] font-['Rubik'] text-xs font-bold items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-sm text-[#00e5ff]">shield</span>
                {badge}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollLeft}
                className="w-9 h-9 rounded-xl bg-[#1b1f2b] border border-[#252a36] hover:bg-[#252a36] text-[#dee2f2] flex items-center justify-center transition-colors cursor-pointer"
                title="Scroll Left"
              >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button
                onClick={scrollRight}
                className="w-9 h-9 rounded-xl bg-[#1b1f2b] border border-[#252a36] hover:bg-[#252a36] text-[#dee2f2] flex items-center justify-center transition-colors cursor-pointer"
                title="Scroll Right"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid & Horizontal Scroll */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 overflow-x-auto pb-2 scrollbar-none"
        >
          {shows.map((show, idx) => (
            <ZeroGravityCard
              key={show.id}
              variant={zeroGEnabled ? ((['1', '2', '3'][idx % 3]) as '1' | '2' | '3') : 'none'}
              intensity={0.7}
            >
              <div className="bg-[#1b1f2b] border border-[#252a36] rounded-2xl overflow-hidden shadow-lg group hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between h-full">
                {/* Thumbnail Header */}
                <div className="relative w-full aspect-video bg-[#252a36] overflow-hidden">
                  <img
                    alt={show.title}
                    src={show.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1f2b] via-transparent to-transparent" />

                  {/* Age & Duration Badges */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#ff525f] text-white font-['Rubik'] text-[11px] font-black tracking-wider shadow">
                    {show.ageRating}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-[#090e19]/80 backdrop-blur font-['Rubik'] text-[11px] font-bold text-[#dee2f2]">
                    {show.duration}
                  </span>

                  {/* Big Play Button Overlay */}
                  <button
                    onClick={() => {
                      soundManager.playSfx('laser');
                      onPlayShow(show);
                    }}
                    className="absolute inset-0 m-auto w-13 h-13 rounded-full bg-[#00e5ff] text-[#00363d] flex items-center justify-center opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all shadow-[0_0_20px_rgba(0,229,255,0.7)] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-3xl">play_arrow</span>
                  </button>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold text-[#00e5ff] mb-1">
                      <span>{show.series}</span>
                      <span className="text-[#f5cd00]">★ {show.rating.toFixed(1)} Rating</span>
                    </div>
                    <h3 className="font-['Anybody'] text-lg font-bold text-[#dee2f2] group-hover:text-[#00e5ff] transition-colors line-clamp-1">
                      {show.title}
                    </h3>
                    <p className="font-['Rubik'] text-xs text-[#bac9cc] mt-1 line-clamp-2 leading-relaxed">
                      {show.description}
                    </p>
                  </div>

                  {/* Watch Progress & CTA */}
                  <div className="mt-4 pt-2 border-t border-[#252a36]">
                    <div className="flex items-center justify-between text-[11px] font-['Rubik'] font-bold text-[#bac9cc] mb-1.5">
                      <span>{show.progressText}</span>
                      <span className="text-[#00e5ff]">{show.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#303541] rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-[#00e5ff] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                        style={{ width: `${show.progressPercent}%` }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        soundManager.playSfx('laser');
                        onPlayShow(show);
                      }}
                      className="w-full h-10 rounded-xl bg-[#252a36] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-['Rubik'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {show.progressPercent > 0 ? 'play_arrow' : 'play_circle'}
                      </span>
                      {show.progressPercent > 0 ? 'Resume Episode' : 'Watch Premiere'}
                    </button>
                  </div>
                </div>
              </div>
            </ZeroGravityCard>
          ))}
        </div>
      </div>
    </section>
  );
};
