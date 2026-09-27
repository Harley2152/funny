import React, { useState, useEffect } from 'react';
import { ShowEpisode } from '../types/index.ts';
import { soundManager } from '../utils/audio.ts';

interface VideoPlayerModalProps {
  show: ShowEpisode | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ show, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(show?.progressPercent || 35);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(true);
    setProgress(show?.progressPercent || 35);
  }, [isOpen, show]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isOpen || !show) return null;

  const togglePlay = () => {
    soundManager.playSfx('click');
    setIsPlaying(p => !p);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#171b27] border border-[#252a36] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#090e19] border-b border-[#252a36]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#ff525f] text-white font-['Rubik'] text-xs font-bold uppercase">
              {show.ageRating}
            </span>
            <span className="font-['Anybody'] text-base sm:text-lg font-bold text-white truncate max-w-md">
              {show.title}
            </span>
          </div>
          <button
            onClick={() => {
              soundManager.playSfx('click');
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-[#1b1f2b] text-[#bac9cc] hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Video Canvas / Player Preview */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            alt={show.title}
            src={show.image}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100 opacity-80'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Central Play/Pause Watermark Overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-[#00e5ff] text-[#00363d] flex items-center justify-center shadow-[0_0_24px_rgba(0,229,255,0.8)] cursor-pointer hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined text-4xl">play_arrow</span>
            </button>
          )}

          {/* Bottom Custom Playback Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#090e19] to-transparent flex flex-col gap-2">
            {/* Timeline Progress Bar */}
            <div
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.round(clickPos * 100));
              }}
              className="w-full h-2 bg-[#303541] rounded-full overflow-hidden cursor-pointer relative group/timeline"
            >
              <div
                className="h-full bg-[#00e5ff] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-[#dee2f2] pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    soundManager.playSfx('click');
                    setMuted(!muted);
                  }}
                  className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {muted ? 'volume_off' : 'volume_up'}
                  </span>
                </button>
                <span className="font-['Rubik'] text-xs text-[#bac9cc]">
                  {Math.floor((progress / 100) * 22)}:00 / {show.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-['Rubik'] text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/20 px-2 py-0.5 rounded">
                  HD 1080p
                </span>
                <span className="text-[#f5cd00] font-['Rubik'] text-xs font-bold">
                  ★ {show.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Information & Lore */}
        <div className="p-6 bg-[#171b27] flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[#00e5ff] font-['Rubik'] text-xs font-bold uppercase">
              {show.series}
            </span>
            <h4 className="font-['Anybody'] text-xl font-bold text-white">{show.title}</h4>
            <p className="font-['Rubik'] text-xs sm:text-sm text-[#bac9cc] leading-relaxed">
              {show.description}
            </p>
          </div>
          <div className="flex sm:flex-col justify-end gap-2 shrink-0">
            <button
              onClick={() => {
                soundManager.playSfx('click');
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer"
            >
              Close Theater
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
