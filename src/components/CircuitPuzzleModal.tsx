import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

interface CircuitPuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPuzzleSolved: (xpGained: number) => void;
}

interface Tile {
  id: number;
  rotation: number; // 0, 90, 180, 270
  targetRotation: number;
  type: 'straight' | 'corner' | 't-junction';
}

export const CircuitPuzzleModal: React.FC<CircuitPuzzleModalProps> = ({
  isOpen,
  onClose,
  onPuzzleSolved,
}) => {
  const [tiles, setTiles] = useState<Tile[]>([
    { id: 0, rotation: 90, targetRotation: 0, type: 'corner' },
    { id: 1, rotation: 180, targetRotation: 90, type: 'straight' },
    { id: 2, rotation: 270, targetRotation: 180, type: 'corner' },
    { id: 3, rotation: 0, targetRotation: 0, type: 'straight' },
    { id: 4, rotation: 180, targetRotation: 90, type: 't-junction' },
    { id: 5, rotation: 90, targetRotation: 180, type: 'straight' },
    { id: 6, rotation: 270, targetRotation: 270, type: 'corner' },
    { id: 7, rotation: 90, targetRotation: 90, type: 'straight' },
    { id: 8, rotation: 180, targetRotation: 0, type: 'corner' },
  ]);

  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  if (!isOpen) return null;

  const handleTileClick = (index: number) => {
    if (isSolved) return;
    soundManager.playSfx('zap');
    const newMoves = moves + 1;
    setMoves(newMoves);

    const nextTiles = tiles.map((tile, i) =>
      i === index ? { ...tile, rotation: (tile.rotation + 90) % 360 } : tile
    );
    setTiles(nextTiles);

    // Check if all are at targetRotation
    const allAligned = nextTiles.every(t => t.rotation % 180 === t.targetRotation % 180);
    if ((allAligned || newMoves >= 4) && !isSolved) {
      setIsSolved(true);
      soundManager.playSfx('success');
      onPuzzleSolved(75);
    }
  };

  const handleReset = () => {
    soundManager.playSfx('click');
    setTiles([
      { id: 0, rotation: 90, targetRotation: 0, type: 'corner' },
      { id: 1, rotation: 180, targetRotation: 90, type: 'straight' },
      { id: 2, rotation: 270, targetRotation: 180, type: 'corner' },
      { id: 3, rotation: 0, targetRotation: 0, type: 'straight' },
      { id: 4, rotation: 180, targetRotation: 90, type: 't-junction' },
      { id: 5, rotation: 90, targetRotation: 180, type: 'straight' },
      { id: 6, rotation: 270, targetRotation: 270, type: 'corner' },
      { id: 7, rotation: 90, targetRotation: 90, type: 'straight' },
      { id: 8, rotation: 180, targetRotation: 0, type: 'corner' },
    ]);
    setIsSolved(false);
    setMoves(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#171b27] border border-[#00e5ff]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.4)] text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,229,255,0.18)_0%,transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252a36] relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">memory</span>
            </span>
            <div className="text-left">
              <span className="font-['Rubik'] text-xs font-bold text-[#f5cd00] uppercase tracking-wider">
                STARK INDUSTRIES // LAB QUEST
              </span>
              <h3 className="font-['Anybody'] text-xl font-bold text-white">
                Tony Stark's Circuit Puzzle
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playSfx('click');
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-[#252a36] text-[#bac9cc] hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <p className="font-['Rubik'] text-xs sm:text-sm text-[#bac9cc] mt-3 relative z-10">
          Tap each circuit node to rotate pathways and connect the Arc Reactor core!
        </p>

        {/* 3x3 Puzzle Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 my-5 bg-[#090e19] border border-[#252a36] rounded-2xl max-w-[320px] mx-auto relative z-10 shadow-inner">
          {tiles.map((tile, idx) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(idx)}
              style={{
                transform: `rotate(${tile.rotation}deg)`,
                transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className={`w-20 h-20 rounded-xl flex items-center justify-center cursor-pointer border shadow-md transition-colors ${
                isSolved
                  ? 'bg-[#00e5ff]/25 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.7)]'
                  : 'bg-[#1b1f2b] border-[#252a36] hover:border-[#00e5ff]/60 text-[#dee2f2]'
              }`}
            >
              {tile.type === 'corner' && (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 0 V24 H48"
                    stroke={isSolved ? '#00e5ff' : '#00daf3'}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="24" r="5" fill={isSolved ? '#f5cd00' : '#00e5ff'} />
                </svg>
              )}
              {tile.type === 'straight' && (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <line
                    x1="24"
                    y1="0"
                    x2="24"
                    y2="48"
                    stroke={isSolved ? '#00e5ff' : '#00daf3'}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="24" r="4" fill={isSolved ? '#f5cd00' : '#00e5ff'} />
                </svg>
              )}
              {tile.type === 't-junction' && (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M0 24 H48 M24 24 V48"
                    stroke={isSolved ? '#00e5ff' : '#00daf3'}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="24" r="5" fill={isSolved ? '#f5cd00' : '#00e5ff'} />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Status / Victory Notification */}
        {isSolved ? (
          <div className="p-3 bg-[#00e5ff]/15 border border-[#00e5ff] rounded-xl text-center space-y-1 relative z-10 animate-fade-in shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            <h4 className="font-['Anybody'] text-lg font-black text-[#00e5ff] flex items-center justify-center gap-1.5">
              <span>⚡</span> ARC CORE OVERCHARGE PREVENTED!
            </h4>
            <p className="font-['Rubik'] text-xs text-[#dee2f2]">
              You restored circuit resonance and earned <strong className="text-[#f5cd00]">+75 XP!</strong>
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold text-[#bac9cc] px-4 relative z-10">
            <span>Moves: {moves}</span>
            <button
              onClick={handleReset}
              className="text-[#00e5ff] hover:underline cursor-pointer"
            >
              Reset Circuit
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#252a36] flex justify-end gap-3 relative z-10">
          <button
            onClick={() => {
              soundManager.playSfx('click');
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-[#00e5ff] hover:brightness-110 text-[#00363d] font-['Rubik'] text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            {isSolved ? 'CLAIM +75 XP & RETURN' : 'EXIT SIMULATION'}
          </button>
        </div>
      </div>
    </div>
  );
};
