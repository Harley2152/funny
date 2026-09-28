import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio.ts';

interface WebTargetDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDrillCompleted: (xpGained: number) => void;
}

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  hit: boolean;
  speedX: number;
  speedY: number;
  type: 'drone' | 'pumpkin-bomb' | 'symbiote';
}

export const WebTargetDrillModal: React.FC<WebTargetDrillModalProps> = ({
  isOpen,
  onClose,
  onDrillCompleted,
}) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [webSplatters, setWebSplatters] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Initialize targets and reset state when opened
  useEffect(() => {
    if (!isOpen) return;

    setScore(0);
    setTimeLeft(25);
    setGameOver(false);
    setWebSplatters([]);

    const initialTargets: Target[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 65,
      size: 45 + Math.random() * 20,
      hit: false,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      type: (['drone', 'pumpkin-bomb', 'symbiote'][i % 3]) as 'drone' | 'pumpkin-bomb' | 'symbiote',
    }));
    setTargets(initialTargets);
  }, [isOpen]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen || gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      soundManager.playSfx('success');
      onDrillCompleted(100);
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isOpen, timeLeft, gameOver, onDrillCompleted]);

  // Target movement loop
  useEffect(() => {
    if (!isOpen || gameOver) return;

    const moveInterval = setInterval(() => {
      setTargets(prev =>
        prev.map(tgt => {
          if (tgt.hit) return tgt;
          let newX = tgt.x + tgt.speedX;
          let newY = tgt.y + tgt.speedY;
          let newSpeedX = tgt.speedX;
          let newSpeedY = tgt.speedY;

          if (newX < 10 || newX > 85) newSpeedX *= -1;
          if (newY < 10 || newY > 80) newSpeedY *= -1;

          return {
            ...tgt,
            x: Math.max(10, Math.min(85, newX)),
            y: Math.max(10, Math.min(80, newY)),
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isOpen, gameOver]);

  if (!isOpen) return null;

  const handleShootTarget = (targetId: number, e: React.MouseEvent) => {
    if (gameOver) return;
    soundManager.playSfx('thwip');

    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setWebSplatters(prev => [...prev, { id: Date.now(), x: clickX, y: clickY }]);
    }

    const target = targets.find(t => t.id === targetId);
    if (!target || target.hit) return;

    setTargets(prev =>
      prev.map(t => (t.id === targetId ? { ...t, hit: true } : t))
    );

    const nextScore = score + 1;
    setScore(nextScore);

    if (nextScore >= 10 && !gameOver) {
      setGameOver(true);
      soundManager.playSfx('success');
      onDrillCompleted(100);
    }

    // Respawn target after delay
    setTimeout(() => {
      setTargets(prev =>
        prev.map(t => {
          if (t.id === targetId) {
            return {
              ...t,
              hit: false,
              x: 15 + Math.random() * 70,
              y: 15 + Math.random() * 65,
              speedX: (Math.random() - 0.5) * 2,
              speedY: (Math.random() - 0.5) * 2,
            };
          }
          return t;
        })
      );
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#171b27] border border-[#ff525f]/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(255,82,95,0.4)] overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,82,95,0.15)_0%,transparent_75%)] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252a36] relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#ff525f]/20 text-[#ff525f] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">crisis_alert</span>
            </span>
            <div>
              <span className="font-['Rubik'] text-xs font-bold text-[#ff525f] uppercase tracking-wider">
                WEB-RUSH // COMBAT DRILL
              </span>
              <h3 className="font-['Anybody'] text-xl font-bold text-white">
                Peter's Web Target Drill
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-['Anybody'] text-sm font-bold text-[#f5cd00]">
              <span className="material-symbols-outlined text-lg">timer</span>
              {timeLeft}s
            </div>
            <div className="px-3 py-1 rounded-lg bg-[#252a36] font-['Anybody'] text-sm font-bold text-[#00e5ff]">
              Hit: {score} / 10
            </div>
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

        {/* Interactive Combat Arena */}
        <div className="relative w-full h-[360px] bg-[#090e19] border border-[#252a36] rounded-2xl my-4 overflow-hidden select-none cursor-crosshair">
          {/* Cybernetic HUD overlay */}
          <div className="absolute inset-0 border border-[#00e5ff]/20 pointer-events-none rounded-2xl" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#00e5ff]/15 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-[#00e5ff]/15 pointer-events-none" />

          {/* Drifting Floating Targets */}
          {targets.map(tgt => {
            if (tgt.hit) {
              return (
                <div
                  key={tgt.id}
                  style={{ left: `${tgt.x}%`, top: `${tgt.y}%` }}
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-[#00e5ff] font-['Anybody'] font-black text-lg animate-ping"
                >
                  🕸️ THWIP! +10
                </div>
              );
            }

            return (
              <button
                key={tgt.id}
                onClick={e => handleShootTarget(tgt.id, e)}
                style={{
                  left: `${tgt.x}%`,
                  top: `${tgt.y}%`,
                  width: `${tgt.size}px`,
                  height: `${tgt.size}px`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-transform hover:scale-115 active:scale-90 shadow-lg cursor-pointer"
              >
                {tgt.type === 'drone' && (
                  <div className="w-full h-full rounded-full bg-[#ff525f]/25 border border-[#ff525f] flex items-center justify-center text-[#ff525f] shadow-[0_0_12px_rgba(255,82,95,0.6)]">
                    <span className="material-symbols-outlined text-2xl animate-spin" style={{ animationDuration: '4s' }}>
                      adjust
                    </span>
                  </div>
                )}
                {tgt.type === 'pumpkin-bomb' && (
                  <div className="w-full h-full rounded-full bg-[#f5cd00]/25 border border-[#f5cd00] flex items-center justify-center text-[#f5cd00] shadow-[0_0_12px_rgba(245,205,0,0.6)]">
                    <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                  </div>
                )}
                {tgt.type === 'symbiote' && (
                  <div className="w-full h-full rounded-full bg-[#00e5ff]/25 border border-[#00e5ff] flex items-center justify-center text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.6)]">
                    <span className="material-symbols-outlined text-2xl">pest_control</span>
                  </div>
                )}
              </button>
            );
          })}

          {/* Web splatters */}
          {webSplatters.map(splat => (
            <div
              key={splat.id}
              style={{ left: `${splat.x}px`, top: `${splat.y}px` }}
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-2xl text-[#00e5ff]/80 animate-fade-out"
            >
              🕸️
            </div>
          ))}

          {/* Game Over Modal Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-fade-in z-30">
              <span className="text-4xl mb-2">🏆</span>
              <h3 className="font-['Anybody'] text-2xl font-black text-[#00e5ff]">
                DRILL COMPLETE!
              </h3>
              <p className="font-['Rubik'] text-sm text-[#dee2f2] mt-1">
                You tagged {score} rogue cyber drones and protected the sector!
              </p>
              <div className="my-3 px-4 py-1.5 rounded-full bg-[#f5cd00]/20 text-[#f5cd00] font-['Anybody'] font-bold text-sm">
                +100 XP EARNED ⚡
              </div>
              <button
                onClick={() => {
                  soundManager.playSfx('click');
                  onClose();
                }}
                className="mt-2 px-6 py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-lg"
              >
                CLAIM REWARD & RETURN
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs font-['Rubik'] text-[#bac9cc] pt-2">
          <span>Click or tap targets to fire nanotech webs</span>
          <span className="text-[#00e5ff] font-bold">Spider-Sense: HIGH</span>
        </div>
      </div>
    </div>
  );
};
