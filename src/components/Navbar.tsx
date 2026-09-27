import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  zeroGEnabled: boolean;
  setZeroGEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenShieldModal: () => void;
  xp: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  zeroGEnabled,
  setZeroGEnabled,
  onOpenShieldModal,
  xp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'marvel-heroes', label: 'Marvel Heroes' },
    { id: 'anime-legends', label: 'Anime Legends' },
    { id: 'hero-arcade', label: 'Hero Arcade' },
    { id: 'comics-manga', label: 'Comics & Manga' },
    { id: 'quests-badges', label: 'Quests & Badges' },
  ];

  const handleNavClick = (id: string) => {
    soundManager.playSfx('click');
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const toggleZeroG = () => {
    soundManager.playSfx('zap');
    setZeroGEnabled(prev => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090e19]/90 backdrop-blur-xl border-b border-[#252a36]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <img
              alt="HeroVerse Kids Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XO8Hjqh8-bukWikX6mNqKPGG12AMwCDhBA4UBi-xVWQRJ77e9MEncrc2Gpdy2CYAchIfgJ76chd8LnNEpRgCgcFjk8GGHR6fMZiBYb81civxbfEAoRrXOi1lBD1lbHtt_eLZl2Uk3AyvJKrQ9eYaND_FC7Q5ZXL8pkERTA-ZMpn3_CAXRQX1lwBelkAhxZjqwfznWGO5bRHlEL0XMHgZezulrqDrsPkSX2y8Qwk6So3dGenlLKsGNblpw"
            />
            <span className="font-['Anybody'] font-bold text-xl uppercase tracking-wider text-[#00e5ff] hidden sm:inline-block drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
              HeroVerse
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5 ml-2">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-['Rubik'] text-[13px] font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.45)]'
                      : 'text-[#bac9cc] hover:text-[#dee2f2] hover:bg-[#1b1f2b]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Search, Status, Physics Switch & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Search Box */}
          <div className="hidden md:flex items-center bg-[#171b27] border border-[#252a36] rounded-xl px-3 py-1.5 w-52 lg:w-64 shadow-[0_0_12px_rgba(0,229,255,0.1)] focus-within:border-[#00e5ff]/50 focus-within:shadow-[0_0_16px_rgba(0,229,255,0.3)] transition-all">
            <span className="material-symbols-outlined text-[#00e5ff] text-xl mr-2">bolt</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search heroes, shows, games..."
              className="w-full bg-transparent font-['Rubik'] text-xs text-[#dee2f2] placeholder:text-[#849396] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#849396] hover:text-[#dee2f2] text-xs ml-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Zero-G Float Physics Toggle */}
          <button
            onClick={toggleZeroG}
            title={zeroGEnabled ? 'Zero-Gravity Floating Enabled' : 'Zero-Gravity Floating Paused'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold font-['Rubik'] transition-all ${
              zeroGEnabled
                ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'bg-[#1b1f2b] border-[#252a36] text-[#bac9cc]'
            }`}
          >
            <span className={`material-symbols-outlined text-base ${zeroGEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
              public
            </span>
            <span>{zeroGEnabled ? '0-G FLOAT: ON' : '0-G FLOAT: OFF'}</span>
          </button>

          {/* Kid Gamification Level & XP Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-[#1b1f2b] border border-[#252a36] px-3 py-1.5 rounded-xl">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 text-[11px] font-bold">
                <span className="text-[#f5cd00] uppercase tracking-wider">Level 8</span>
                <span className="text-[#bac9cc]">{xp.toLocaleString()} XP ⚡</span>
              </div>
              <div className="w-24 h-1.5 bg-[#303541] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[#f5cd00] rounded-full shadow-[0_0_8px_rgba(245,205,0,0.8)] transition-all duration-500"
                  style={{ width: `${Math.min(100, (xp / 2000) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Parental Controls Shield Button */}
          <button
            onClick={() => {
              soundManager.playSfx('click');
              onOpenShieldModal();
            }}
            type="button"
            className="w-10 h-10 rounded-xl bg-[#1b1f2b] border border-[#252a36] flex items-center justify-center text-[#00daf3] hover:bg-[#00e5ff] hover:text-[#00363d] transition-all shadow-sm"
            title="Kid-Safe Shield & Safety Controls"
          >
            <span className="material-symbols-outlined text-xl">security</span>
          </button>

          {/* Profile Avatar */}
          <div className="flex items-center pl-1">
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.45)] hover:scale-105 transition-transform cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwQSFe9A-MkoOTMQIuid-18o56iDdt11-1jbJe3qaBVtidhCOFdr9OLW5hsB8wMeMJdiZeedRJ30_h2ft3Ow6faOwEZOKYSgMiyB6Qp1YnFT0lqBKv1RHmw5c1TzBBE-okIV_AARy4u9hIKwxo1wTqHTu-AaQ1rtTsvXoCZuNQ0d7ZDJbf1zr0Vh-ceO3f2TSY50Gkdca-ONnCc4oU5shEssC78XdH6q7H77x_38YX73X7yvJxZHww"
            />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-xl bg-[#1b1f2b] border border-[#252a36] flex items-center justify-center text-[#dee2f2]"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#090e19] border-b border-[#252a36] px-4 py-3 space-y-2">
          <div className="flex sm:hidden items-center justify-between bg-[#1b1f2b] p-2.5 rounded-xl mb-2">
            <div className="text-xs font-bold text-[#f5cd00]">Level 8 (1,450 XP ⚡)</div>
            <button
              onClick={toggleZeroG}
              className="text-xs px-2.5 py-1 rounded bg-[#00e5ff]/20 text-[#00e5ff]"
            >
              {zeroGEnabled ? '0-G ON' : '0-G OFF'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg font-['Rubik'] text-xs font-bold text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#00e5ff] text-[#00363d]'
                    : 'bg-[#171b27] text-[#dee2f2] hover:bg-[#252a36]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
