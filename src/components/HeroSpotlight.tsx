import React, { useState } from 'react';
import { Hero } from '../types/index.ts';
import { HEROES_DATA } from '../data/mockData.ts';
import { ZeroGravityCard } from './ZeroGravityCard.tsx';
import { soundManager } from '../utils/audio.ts';

interface HeroSpotlightProps {
  mode: 'cyber-strike' | 'holo-terminal';
  zeroGEnabled: boolean;
  onActivateWebBlaster: () => void;
  onViewSuitSchematic: () => void;
  onPlayEpisode: (title: string) => void;
  onPlayGame: () => void;
  onSfxTriggered: (text: string) => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  mode,
  zeroGEnabled,
  onActivateWebBlaster,
  onViewSuitSchematic,
  onPlayEpisode,
  onPlayGame,
  onSfxTriggered,
}) => {
  const [selectedHero, setSelectedHero] = useState<Hero>(HEROES_DATA[0]);
  const [activePowerFilter, setActivePowerFilter] = useState<'all' | 'web' | 'strength' | 'tech' | 'mystic'>('web');
  const [blasterFiring, setBlasterFiring] = useState(false);
  const [squadAdded, setSquadAdded] = useState(false);

  const handleSelectHero = (hero: Hero) => {
    soundManager.playSfx(hero.sfxSound);
    setSelectedHero(hero);
    onSfxTriggered(hero.sfxLabel);
  };

  const handleBlasterClick = () => {
    soundManager.playSfx('thwip');
    setBlasterFiring(true);
    onActivateWebBlaster();
    onSfxTriggered('THWIP!! WEB BLASTER FIRED!');
    setTimeout(() => {
      setBlasterFiring(false);
    }, 1500);
  };

  const handlePlayHeroSfx = () => {
    soundManager.playSfx(selectedHero.sfxSound);
    onSfxTriggered(selectedHero.sfxLabel);
  };

  /* ------------------- Render: CYBER STRIKE (Home view) ------------------- */
  if (mode === 'cyber-strike') {
    return (
      <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-10 pt-4 pb-10">
        {/* Ambient Neon Backdrops */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00e5ff]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#ff525f]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto rounded-3xl bg-[#171b27] border border-[#252a36] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Cyber Circuit Overlay Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(0,229,255,0.12)_0%,transparent_60%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
            {/* Text & Content Left Panel */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col items-start gap-5">
              {/* Spotlight Badge & Universe Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff525f] text-white font-['Rubik'] text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(255,82,95,0.6)]">
                  <span className="material-symbols-outlined text-sm">stars</span> Hero Of The Week
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#252a36] text-[#c3f5ff] font-['Rubik'] text-xs font-bold uppercase border border-[#00e5ff]/20">
                  <span className="material-symbols-outlined text-sm text-[#00e5ff]">verified</span> Earth-616 Official
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f5cd00]/15 text-[#f5cd00] font-['Rubik'] text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">bolt</span> New Episode 12
                </span>
              </div>

              {/* Main Hero Headline */}
              <div className="space-y-2">
                <h1 className="font-['Anybody'] text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  SPIDER-MAN: <br />
                  <span className="text-[#00e5ff] drop-shadow-[0_0_25px_rgba(0,229,255,0.65)]">
                    CYBER STRIKE
                  </span>
                </h1>
                <p className="font-['Rubik'] text-base sm:text-lg text-[#bac9cc] max-w-xl leading-relaxed">
                  Web-sling through the neon skyway of Neo-New York and foil Doctor Octopus’s quantum mainframe glitch before midnight!
                </p>
              </div>

              {/* Hero Power Stats Pill Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg bg-[#1b1f2b]/80 border border-[#252a36] p-3.5 rounded-2xl backdrop-blur-md">
                <div className="flex flex-col items-center sm:items-start px-2 py-1">
                  <span className="font-['Rubik'] text-[11px] font-bold text-[#bac9cc] uppercase tracking-wider">Power Level</span>
                  <span className="font-['Anybody'] text-lg sm:text-xl text-[#f5cd00] font-black flex items-center gap-1">
                    9,200 <span className="text-xs">⚡</span>
                  </span>
                </div>
                <div className="flex flex-col items-center sm:items-start px-2 py-1 border-x border-[#252a36]">
                  <span className="font-['Rubik'] text-[11px] font-bold text-[#bac9cc] uppercase tracking-wider">Universe</span>
                  <span className="font-['Anybody'] text-lg sm:text-xl text-[#c3f5ff] font-black">Marvel-616</span>
                </div>
                <div className="flex flex-col items-center sm:items-start px-2 py-1">
                  <span className="font-['Rubik'] text-[11px] font-bold text-[#bac9cc] uppercase tracking-wider">Squad Perk</span>
                  <span className="font-['Anybody'] text-lg sm:text-xl text-[#ff525f] font-black">+25% Speed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full">
                <button
                  onClick={() => {
                    soundManager.playSfx('laser');
                    onPlayEpisode('Spider-Man: Cyber Strike - Ep 1-12');
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff525f] hover:brightness-110 text-white font-['Rubik'] text-sm font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(255,82,95,0.45)] transition-all hover:-translate-y-1 active:translate-y-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">play_arrow</span>
                  Watch Ep 1–12
                </button>
                <button
                  onClick={() => {
                    soundManager.playSfx('zap');
                    onPlayGame();
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-sm font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(0,229,255,0.4)] transition-all hover:-translate-y-1 active:translate-y-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">sports_esports</span>
                  Play Web-Rush
                </button>
                <button
                  onClick={() => {
                    soundManager.playSfx('click');
                    setSquadAdded(!squadAdded);
                    onSfxTriggered(squadAdded ? 'Removed from squad' : 'Added Spider-Man to Squad!');
                  }}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-md ${
                    squadAdded
                      ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff]'
                      : 'bg-[#252a36] border-[#303541] text-[#dee2f2] hover:text-[#00e5ff]'
                  }`}
                  title={squadAdded ? 'In Active Squad' : 'Add to Squad'}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {squadAdded ? 'check' : 'group_add'}
                  </span>
                </button>
              </div>
            </div>

            {/* Hero Showcase Art Right Panel */}
            <div className="lg:col-span-5 relative flex items-center justify-center p-6 sm:p-10 min-h-[420px] lg:min-h-[560px]">
              {/* Concentric Cyber Glow Rings */}
              <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#00e5ff]/20 to-[#ff525f]/15 blur-2xl animate-pulse" />
              <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#00e5ff]/20 shadow-[0_0_60px_rgba(0,229,255,0.35)]" />

              {/* Spider-Man Cyber Image with Anti-Gravity Float */}
              <ZeroGravityCard
                variant={zeroGEnabled ? '1' : 'none'}
                intensity={1.2}
                className="relative z-10 w-full max-w-[420px]"
              >
                <div className="relative group cursor-pointer">
                  <img
                    alt="Spider-Man in high-tech cybernetic strike crouch against luminous blue HUD"
                    className="w-full h-auto object-contain max-h-[500px] drop-shadow-[0_15px_35px_rgba(0,229,255,0.4)] mx-auto transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA6QPsm4V1ZdPiN3e8orMhTtT2YX2DnIKsss5WghJ7Sr-3kYVLCXXbKE1Rddm5KZ1ahdOBG28Ises0ZAHupz1IwOUTMicMFeAeZSWCfw68HQ7pW7nDsg8WJpLmOdylLllxzn2d3nu2Gm9EK5Sybzg68OM2X-xNXgDOMQYpTeZv_FkBogZGlpTkrm8PhJs4mzdVV853Rsohe7sq_m2s7-9XYeK-2vOD2m9hAKgVXDm_UL-JGI1oZ6FbTV7Hd6i9C34WhA"
                  />
                  {/* Quick Badge Floating Tag */}
                  <div className="absolute bottom-4 right-4 bg-[#090e19]/90 backdrop-blur-md border border-[#00e5ff]/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-ping" />
                    <span className="font-['Rubik'] text-[11px] font-bold text-[#00e5ff] uppercase">
                      Nanotech Active
                    </span>
                  </div>
                </div>
              </ZeroGravityCard>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------- Render: HOLO-TERMINAL (Marvel Heroes view) ------------------- */
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Section Intro & Power Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[#f5cd00] font-['Rubik'] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">emergency_home</span>
              CLASS-S HERO SPOTLIGHT
            </span>
            <h1 className="font-['Anybody'] text-3xl sm:text-4xl font-black text-[#c3f5ff] tracking-tight mt-1">
              HEROES OF THE REALM
            </h1>
          </div>

          {/* Superpower Toggles */}
          <div className="flex items-center gap-1.5 bg-[#1b1f2b] p-1 rounded-xl border border-[#252a36]">
            <button
              onClick={() => {
                soundManager.playSfx('click');
                setActivePowerFilter('web');
              }}
              className={`px-3 py-1 rounded-lg font-['Rubik'] text-xs font-bold flex items-center gap-1 transition-all ${
                activePowerFilter === 'web'
                  ? 'bg-[#252a36] text-[#00e5ff] shadow-sm border border-[#00e5ff]/30'
                  : 'text-[#bac9cc] hover:bg-[#252a36]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">toll</span> Web-Slinging
            </button>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                setActivePowerFilter('strength');
              }}
              className={`px-3 py-1 rounded-lg font-['Rubik'] text-xs font-bold flex items-center gap-1 transition-all ${
                activePowerFilter === 'strength'
                  ? 'bg-[#252a36] text-[#ff525f] shadow-sm border border-[#ff525f]/30'
                  : 'text-[#bac9cc] hover:bg-[#252a36]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">fitness_center</span> Strength
            </button>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                setActivePowerFilter('tech');
              }}
              className={`px-3 py-1 rounded-lg font-['Rubik'] text-xs font-bold flex items-center gap-1 transition-all ${
                activePowerFilter === 'tech'
                  ? 'bg-[#252a36] text-[#f5cd00] shadow-sm border border-[#f5cd00]/30'
                  : 'text-[#bac9cc] hover:bg-[#252a36]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">memory</span> Tech Armor
            </button>
            <button
              onClick={() => {
                soundManager.playSfx('click');
                setActivePowerFilter('mystic');
              }}
              className={`px-3 py-1 rounded-lg font-['Rubik'] text-xs font-bold flex items-center gap-1 transition-all ${
                activePowerFilter === 'mystic'
                  ? 'bg-[#252a36] text-[#00daf3] shadow-sm border border-[#00daf3]/30'
                  : 'text-[#bac9cc] hover:bg-[#252a36]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">auto_fix_high</span> Mystic Arts
            </button>
          </div>
        </div>

        {/* Main Showcase Grid: Interactive Holo-Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#171b27] border border-[#252a36] rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {/* Living Hologram Ambient Aura Background */}
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700"
            style={{ backgroundColor: `${selectedHero.themeColor}15` }}
          />
          <div className="absolute left-1/4 -bottom-20 w-80 h-80 bg-[#ff525f]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Hologram Visual & Cybernetic Targeting Reticle */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] bg-[#090e19] border border-[#252a36]/80 rounded-xl p-4 overflow-hidden">
            {/* Cybernetic Targeting Reticle & Hologram Circles */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              viewBox="0 0 500 500"
              fill="none"
            >
              <circle
                cx="250"
                cy="250"
                r="180"
                stroke={selectedHero.themeColor}
                strokeDasharray="8 6"
                strokeWidth="2"
                className="animate-reticle-slow origin-center"
              />
              <circle
                cx="250"
                cy="250"
                r="140"
                stroke="#00e5ff"
                strokeWidth="1.5"
                className="animate-reticle-reverse origin-center"
              />
              <circle
                cx="250"
                cy="250"
                r="90"
                stroke="#ff525f"
                strokeDasharray="12 4"
                strokeWidth="1.5"
              />
              <line
                stroke={selectedHero.themeColor}
                strokeOpacity="0.35"
                strokeWidth="1"
                x1="250"
                x2="250"
                y1="20"
                y2="480"
              />
              <line
                stroke={selectedHero.themeColor}
                strokeOpacity="0.35"
                strokeWidth="1"
                x1="20"
                x2="480"
                y1="250"
                y2="250"
              />
              <text fill="#00e5ff" fontFamily="Rubik" fontSize="11" x="70" y="90">
                SEC: HUD-{selectedHero.universe.toUpperCase()}-884
              </text>
              <text fill="#f5cd00" fontFamily="Rubik" fontSize="11" x="350" y="440">
                TARGET: LOCKED
              </text>
            </svg>

            {/* Hero Character Portrait with Zero-G Float */}
            <ZeroGravityCard
              variant={zeroGEnabled ? '2' : 'none'}
              intensity={1.2}
              className="relative z-10 flex items-center justify-center w-full"
            >
              <img
                alt={selectedHero.name}
                className="relative z-10 max-h-[420px] w-auto object-contain drop-shadow-[0_0_24px_rgba(0,229,255,0.45)] hover:scale-105 transition-transform duration-500"
                src={selectedHero.image}
              />
            </ZeroGravityCard>

            {/* Character Dimension & Alias Badge Overlay */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1 bg-[#090e19]/85 backdrop-blur-md border border-[#252a36] p-3 rounded-lg shadow-lg">
              <span className="font-['Rubik'] text-[11px] font-bold text-[#ff525f] uppercase tracking-wider">
                {selectedHero.alias}
              </span>
              <span className="font-['Anybody'] text-xl font-bold text-[#c3f5ff]">
                {selectedHero.name}
              </span>
              <span className="font-['Rubik'] text-xs text-[#bac9cc] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                {selectedHero.title}
              </span>
            </div>

            {/* Quick Audio SFX Trigger Button */}
            <button
              onClick={handlePlayHeroSfx}
              type="button"
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b1f2b] border border-[#252a36] hover:bg-[#ff525f] hover:text-white text-[#ffb3b3] font-['Rubik'] text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
              {selectedHero.sfxLabel}
            </button>
          </div>

          {/* Right Column: Combat Terminal Stats, Kid Lore & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5 z-10">
            <div>
              {/* Hero Title & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#ff525f]/20 text-[#ffb3b3] font-['Rubik'] text-[11px] font-bold uppercase">
                    {selectedHero.tags[0] || 'Avenger Reserve'}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f5cd00]/20 text-[#ffecac] font-['Rubik'] text-[11px] font-bold uppercase">
                    {selectedHero.tags[1] || 'Spider-Army Leader'}
                  </span>
                </div>
                <span className="font-['Rubik'] text-xs text-[#bac9cc]">Suit Status: 100% ONLINE</span>
              </div>

              {/* Kid-Friendly Lore Snippet */}
              <p className="font-['Rubik'] text-sm sm:text-base text-[#dee2f2] mt-3 leading-relaxed">
                {selectedHero.lore}
              </p>

              {/* Holographic Power & Attributes Bar Chart */}
              <div className="mt-5 bg-[#1b1f2b] border border-[#252a36] rounded-xl p-4 space-y-3.5">
                {/* Stat 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold">
                    <span className="text-[#dee2f2] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#00e5ff] text-base">sprint</span>
                      AGILITY & REFLEXES
                    </span>
                    <span className="text-[#00e5ff]">{selectedHero.stats.agilityLabel}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#303541] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00e5ff] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.7)] transition-all duration-700"
                      style={{ width: `${selectedHero.stats.agility}%` }}
                    />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold">
                    <span className="text-[#dee2f2] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#ff525f] text-base">sports_kabaddi</span>
                      SUPER STRENGTH
                    </span>
                    <span className="text-[#ff525f]">{selectedHero.stats.strengthLabel}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#303541] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff525f] rounded-full shadow-[0_0_8px_rgba(255,82,95,0.7)] transition-all duration-700"
                      style={{ width: `${selectedHero.stats.strength}%` }}
                    />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-['Rubik'] font-bold">
                    <span className="text-[#dee2f2] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#f5cd00] text-base">psychology</span>
                      SCIENCE INTELLECT & GADGETS
                    </span>
                    <span className="text-[#f5cd00]">{selectedHero.stats.intellectLabel}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#303541] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f5cd00] rounded-full shadow-[0_0_8px_rgba(245,205,0,0.7)] transition-all duration-700"
                      style={{ width: `${selectedHero.stats.intellect}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Unlocked Collectible Badges Preview */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-['Rubik'] text-xs font-bold text-[#bac9cc] uppercase tracking-wider">
                  Unlocked Badges:
                </span>
                <div className="flex items-center gap-2">
                  {selectedHero.badges.map(badge => (
                    <span
                      key={badge.id}
                      className="w-8 h-8 rounded-lg bg-[#252a36] border border-[#303541] flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform"
                      title={badge.name}
                    >
                      <span className={`material-symbols-outlined text-lg ${badge.color}`}>
                        {badge.icon}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Signature Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleBlasterClick}
                className={`flex-1 min-w-[200px] h-12 rounded-xl font-['Anybody'] text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(255,82,95,0.5)] transition-all active:translate-y-0.5 cursor-pointer ${
                  blasterFiring
                    ? 'bg-[#00e5ff] text-[#00363d]'
                    : 'bg-[#ff525f] text-white hover:bg-[#ff3b4b]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${
                    blasterFiring ? 'animate-spin' : ''
                  }`}
                >
                  {blasterFiring ? 'cyclone' : 'all_inclusive'}
                </span>
                {blasterFiring ? 'WEB FIRED!' : 'ACTIVATE WEB-BLASTER'}
              </button>

              <button
                onClick={() => {
                  soundManager.playSfx('click');
                  onViewSuitSchematic();
                }}
                className="px-5 h-12 rounded-xl bg-[#1b1f2b] border border-[#252a36] hover:bg-[#252a36] text-[#00e5ff] font-['Anybody'] text-sm uppercase font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">biotech</span>
                VIEW SUIT SCHEMATIC
              </button>
            </div>
          </div>
        </div>

        {/* Character Roster Quick-Switch Carousel Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {HEROES_DATA.slice(1).map((hero, idx) => {
            const isCurrent = selectedHero.id === hero.id;
            return (
              <ZeroGravityCard
                key={hero.id}
                variant={zeroGEnabled ? ((['1', '2', '3'][idx % 3]) as '1' | '2' | '3') : 'none'}
                intensity={0.6}
              >
                <div
                  onClick={() => handleSelectHero(hero)}
                  className={`rounded-xl p-3.5 border transition-all cursor-pointer group shadow-sm flex flex-col justify-between min-h-[190px] ${
                    isCurrent
                      ? 'bg-[#252a36] border-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.3)] -translate-y-1'
                      : 'bg-[#1b1f2b] border-[#252a36] hover:-translate-y-1 hover:bg-[#252a36]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Rubik'] text-[11px] font-bold text-[#ffb3b3] uppercase">
                      {hero.universe}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: hero.themeColor }}
                    />
                  </div>

                  <div className="my-2 text-center">
                    <img
                      alt={hero.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover ring-2 shadow-md group-hover:scale-105 transition-transform"
                      style={{ borderColor: hero.themeColor }}
                      src={hero.image}
                    />
                    <h4 className="font-['Anybody'] text-sm sm:text-base font-bold text-[#dee2f2] mt-2 group-hover:text-[#00e5ff] transition-colors line-clamp-1">
                      {hero.name}
                    </h4>
                    <p className="font-['Rubik'] text-[11px] text-[#bac9cc] line-clamp-1">
                      {hero.title}
                    </p>
                  </div>

                  <div
                    className={`w-full py-1 rounded text-center font-['Rubik'] text-[11px] font-bold transition-colors ${
                      isCurrent
                        ? 'bg-[#00e5ff] text-[#00363d]'
                        : 'bg-[#303541] text-[#dee2f2] group-hover:bg-[#00e5ff] group-hover:text-[#00363d]'
                    }`}
                  >
                    {isCurrent ? 'Active Hero' : 'Select Hero'}
                  </div>
                </div>
              </ZeroGravityCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
