import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

interface SafetyPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSfxTriggered?: (text: string) => void;
}

export const SafetyPinModal: React.FC<SafetyPinModalProps> = ({
  isOpen,
  onClose,
  onSfxTriggered,
}) => {
  const [screenTimeLimit, setScreenTimeLimit] = useState(60);
  const [coppaSafe, setCoppaSafe] = useState(true);
  const [soundEffectsAllowed, setSoundEffectsAllowed] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    soundManager.playSfx('success');
    setSaved(true);
    if (onSfxTriggered) {
      onSfxTriggered('Safety settings updated!');
    }
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#171b27] border border-[#252a36] rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252a36]">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </span>
            <div>
              <span className="font-['Rubik'] text-xs font-bold text-[#00e5ff] uppercase tracking-wider">
                PARENTAL CONTROLS & SHIELD
              </span>
              <h3 className="font-['Anybody'] text-xl font-bold text-white">
                HeroVerse Safe Mode
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playSfx('click');
              onClose();
            }}
            className="w-8 h-8 rounded-xl bg-[#252a36] text-[#bac9cc] hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 my-5 text-xs font-['Rubik'] text-[#dee2f2]">
          <div className="p-3 bg-[#090e19] border border-[#252a36] rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-white">COPPA Child Privacy Lock</p>
              <p className="text-[11px] text-[#bac9cc]">Ad-free, zero data tracking enabled</p>
            </div>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                setCoppaSafe(!coppaSafe);
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                coppaSafe ? 'bg-[#00e5ff]' : 'bg-[#303541]'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  coppaSafe ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="p-3 bg-[#090e19] border border-[#252a36] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Daily Screen Time Limit</span>
              <span className="font-bold text-[#f5cd00]">{screenTimeLimit} Minutes</span>
            </div>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={screenTimeLimit}
              onChange={e => setScreenTimeLimit(Number(e.target.value))}
              className="w-full accent-[#00e5ff] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#849396]">
              <span>15m</span>
              <span>60m</span>
              <span>120m</span>
              <span>180m</span>
            </div>
          </div>

          <div className="p-3 bg-[#090e19] border border-[#252a36] rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-white">Audio & Sound FX Synthesizer</p>
              <p className="text-[11px] text-[#bac9cc]">Allow interactive comic panel sounds</p>
            </div>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                setSoundEffectsAllowed(!soundEffectsAllowed);
                soundManager.enabled = !soundEffectsAllowed;
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEffectsAllowed ? 'bg-[#00e5ff]' : 'bg-[#303541]'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  soundEffectsAllowed ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#252a36] flex justify-end gap-2.5">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer"
          >
            {saved ? '✓ SETTINGS SAVED' : 'SAVE & APPLY SAFETY PIN'}
          </button>
        </div>
      </div>
    </div>
  );
};
