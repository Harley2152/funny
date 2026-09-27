import { useState } from 'react';
import { HEROES_DATA, SHOWS_DATA } from './data/mockData.ts';
import { ShowEpisode } from './types/index.ts';
import { AntiGravityCanvas } from './components/AntiGravityCanvas.tsx';
import { Navbar } from './components/Navbar.tsx';
import { DimensionSelector } from './components/DimensionSelector.tsx';
import { HeroSpotlight } from './components/HeroSpotlight.tsx';
import { ShowsSection } from './components/ShowsSection.tsx';
import { QuestsAndComicSection } from './components/QuestsAndComicSection.tsx';
import { QuestsAndArcadeSection } from './components/QuestsAndArcadeSection.tsx';
import { SoundboardBar } from './components/SoundboardBar.tsx';
import { Footer } from './components/Footer.tsx';
import { SuitSchematicModal } from './components/SuitSchematicModal.tsx';
import { CircuitPuzzleModal } from './components/CircuitPuzzleModal.tsx';
import { WebTargetDrillModal } from './components/WebTargetDrillModal.tsx';
import { VideoPlayerModal } from './components/VideoPlayerModal.tsx';
import { ComicReaderModal } from './components/ComicReaderModal.tsx';
import { SafetyPinModal } from './components/SafetyPinModal.tsx';
import { soundManager } from './utils/audio.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeSector, setActiveSector] = useState<string>('all');
  const [zeroGEnabled, setZeroGEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [xp, setXp] = useState<number>(1450);

  // Active Modals
  const [activeModal, setActiveModal] = useState<
    'none' | 'schematic' | 'circuit' | 'drill' | 'player' | 'comic' | 'safety'
  >('none');
  const [currentShow, setCurrentShow] = useState<ShowEpisode | null>(null);

  // Floating notification toast for sound effects & micro-interactions
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const triggerNotification = (text: string) => {
    setToastNotification(text);
    setTimeout(() => {
      setToastNotification(prev => (prev === text ? null : prev));
    }, 1800);
  };

  const handleGainXp = (amount: number) => {
    setXp(x => x + amount);
    triggerNotification(`Level 8 Progress: +${amount} XP Earned! ⚡`);
  };

  const handleOpenShow = (show: ShowEpisode) => {
    setCurrentShow(show);
    setActiveModal('player');
  };

  const handleSelectDimension = (dimensionId: string) => {
    if (dimensionId === 'marvel') {
      setActiveTab('marvel-heroes');
    } else if (dimensionId === 'anime') {
      setActiveTab('anime-legends');
    } else if (dimensionId === 'arcade') {
      setActiveTab('hero-arcade');
    } else if (dimensionId === 'comics') {
      setActiveTab('comics-manga');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0e131e] text-[#dee2f2] font-['Rubik'] overflow-x-hidden selection:bg-[#00e5ff] selection:text-[#00363d]">
      {/* Living Zero-Gravity Ambient Background Physics Canvas */}
      <AntiGravityCanvas zeroGStrength={zeroGEnabled ? 1 : 0.2} interactive={true} />

      {/* Floating System Audio / Action Feedback Toast */}
      {toastNotification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-[#090e19]/95 border border-[#00e5ff] text-[#00e5ff] font-['Anybody'] text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(0,229,255,0.6)] animate-bounce pointer-events-none">
          {toastNotification}
        </div>
      )}

      {/* Fixed Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        zeroGEnabled={zeroGEnabled}
        setZeroGEnabled={setZeroGEnabled}
        onOpenShieldModal={() => setActiveModal('safety')}
        xp={xp}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 relative z-10">
        {/* VIEW 1: HOME (Design 2 Layout) */}
        {activeTab === 'home' && (
          <div className="flex flex-col w-full animate-fade-in">
            {/* Top Spotlight: SPIDER-MAN CYBER STRIKE */}
            <HeroSpotlight
              mode="cyber-strike"
              zeroGEnabled={zeroGEnabled}
              onActivateWebBlaster={() => setActiveModal('drill')}
              onViewSuitSchematic={() => setActiveModal('schematic')}
              onPlayEpisode={() => {
                setCurrentShow(SHOWS_DATA[0]);
                setActiveModal('player');
              }}
              onPlayGame={() => setActiveModal('drill')}
              onSfxTriggered={triggerNotification}
            />

            {/* Choose Your Dimension 4 Portal Cards */}
            <DimensionSelector
              activeSector={activeSector}
              setActiveSector={setActiveSector}
              onSelectDimension={handleSelectDimension}
              zeroGEnabled={zeroGEnabled}
              showPortalCards={true}
            />

            {/* Trending Hero Shows */}
            <ShowsSection
              title="TRENDING HERO SHOWS"
              subtitle="Hand-picked animated sagas safe for young Champions"
              badge="Parent Approved"
              shows={SHOWS_DATA.slice(0, 4)}
              zeroGEnabled={zeroGEnabled}
              onPlayShow={handleOpenShow}
            />

            {/* Today's Hero Quests + Instant Arcade Picks Split Section */}
            <QuestsAndArcadeSection
              zeroGEnabled={zeroGEnabled}
              onPlayGame={() => setActiveModal('drill')}
              onStartQuest={() => setActiveModal('drill')}
              onReadManga={() => setActiveModal('comic')}
            />

            {/* Interactive Super Hero Soundboard Bar */}
            <SoundboardBar onSfxTriggered={triggerNotification} />
          </div>
        )}

        {/* VIEW 2: MARVEL HEROES (Design 1 Layout) */}
        {activeTab === 'marvel-heroes' && (
          <div className="flex flex-col w-full animate-fade-in">
            {/* Dimension Portal Subheader Bar */}
            <DimensionSelector
              activeSector={activeSector}
              setActiveSector={setActiveSector}
              onSelectDimension={handleSelectDimension}
              zeroGEnabled={zeroGEnabled}
              showPortalCards={false}
            />

            {/* Class-S Hero Spotlight: HEROES OF THE REALM with Holo-Terminal */}
            <HeroSpotlight
              mode="holo-terminal"
              zeroGEnabled={zeroGEnabled}
              onActivateWebBlaster={() => setActiveModal('drill')}
              onViewSuitSchematic={() => setActiveModal('schematic')}
              onPlayEpisode={() => {
                setCurrentShow(SHOWS_DATA[0]);
                setActiveModal('player');
              }}
              onPlayGame={() => setActiveModal('drill')}
              onSfxTriggered={triggerNotification}
            />

            {/* Marvel Animated Adventures */}
            <ShowsSection
              title="MARVEL ANIMATED ADVENTURES"
              subtitle="Kid-Safe Marvel Animated Series & Movies Carousel"
              badge="Ad-Free & Parent Approved"
              shows={SHOWS_DATA.slice(0, 3)}
              zeroGEnabled={zeroGEnabled}
              onPlayShow={handleOpenShow}
            />

            {/* Hero Training Quests + Sound-Action Comic Vault */}
            <QuestsAndComicSection
              zeroGEnabled={zeroGEnabled}
              onStartCircuitPuzzle={() => setActiveModal('circuit')}
              onLaunchTargetDrill={() => setActiveModal('drill')}
              onReadFullComic={() => setActiveModal('comic')}
              onSfxTriggered={triggerNotification}
            />

            {/* Super Hero Soundboard Bar */}
            <SoundboardBar onSfxTriggered={triggerNotification} />
          </div>
        )}

        {/* VIEW 3: ANIME LEGENDS */}
        {activeTab === 'anime-legends' && (
          <div className="flex flex-col w-full animate-fade-in py-6">
            <DimensionSelector
              activeSector="all"
              setActiveSector={setActiveSector}
              onSelectDimension={handleSelectDimension}
              zeroGEnabled={zeroGEnabled}
              showPortalCards={false}
            />
            <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full my-4">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#252a36] to-[#171b27] border border-[#f5cd00]/40 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#f5cd00] text-[#3a3000] font-['Rubik'] text-xs font-bold uppercase">
                    Shonen Dimension Gate
                  </span>
                  <h1 className="font-['Anybody'] text-3xl sm:text-4xl font-black text-white mt-2">
                    ANIME LEGENDS ACADEMY
                  </h1>
                  <p className="font-['Rubik'] text-sm text-[#bac9cc] mt-1 max-w-xl">
                    Train in energy control, ninja duels, and join class 1-A freshmen in their sports festival tournament!
                  </p>
                </div>
                <button
                  onClick={() => {
                    soundManager.playSfx('zap');
                    handleGainXp(50);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#f5cd00] text-[#3a3000] font-['Rubik'] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer whitespace-nowrap"
                >
                  Enter Saiyan Arena (+50 XP)
                </button>
              </div>
            </div>

            <ShowsSection
              title="ANIME LEGENDS SERIES"
              subtitle="Exciting high-energy sagas safe for young Champions"
              badge="Top Rated"
              shows={[SHOWS_DATA[3], SHOWS_DATA[5], SHOWS_DATA[1]]}
              zeroGEnabled={zeroGEnabled}
              onPlayShow={handleOpenShow}
            />

            <QuestsAndArcadeSection
              zeroGEnabled={zeroGEnabled}
              onPlayGame={() => setActiveModal('drill')}
              onStartQuest={() => setActiveModal('drill')}
              onReadManga={() => setActiveModal('comic')}
            />
          </div>
        )}

        {/* VIEW 4: HERO ARCADE */}
        {activeTab === 'hero-arcade' && (
          <div className="flex flex-col w-full animate-fade-in py-6">
            <DimensionSelector
              activeSector="all"
              setActiveSector={setActiveSector}
              onSelectDimension={handleSelectDimension}
              zeroGEnabled={zeroGEnabled}
              showPortalCards={false}
            />
            <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full my-4">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#171b27] to-[#1b1f2b] border border-[#00e5ff]/40 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-xs font-bold uppercase">
                    3D Browser Arena
                  </span>
                  <h1 className="font-['Anybody'] text-3xl sm:text-4xl font-black text-white mt-2">
                    HERO ARCADE // 85+ GAMES
                  </h1>
                  <p className="font-['Rubik'] text-sm text-[#bac9cc] mt-1 max-w-xl">
                    Launch instant 3D games, battle drone bosses, collect spider coins, and level up your champion!
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('drill')}
                  className="px-6 py-3.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-['Rubik'] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer whitespace-nowrap"
                >
                  Launch Web-Rush 3D
                </button>
              </div>
            </div>

            <QuestsAndArcadeSection
              zeroGEnabled={zeroGEnabled}
              onPlayGame={() => setActiveModal('drill')}
              onStartQuest={() => setActiveModal('drill')}
              onReadManga={() => setActiveModal('comic')}
            />

            <SoundboardBar onSfxTriggered={triggerNotification} />
          </div>
        )}

        {/* VIEW 5: COMICS & MANGA */}
        {activeTab === 'comics-manga' && (
          <div className="flex flex-col w-full animate-fade-in py-6">
            <DimensionSelector
              activeSector="all"
              setActiveSector={setActiveSector}
              onSelectDimension={handleSelectDimension}
              zeroGEnabled={zeroGEnabled}
              showPortalCards={false}
            />
            <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full my-4">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#171b27] to-[#252a36] border border-[#ff525f]/40 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#ff525f] text-white font-['Rubik'] text-xs font-bold uppercase">
                    Audio Sound FX Enabled
                  </span>
                  <h1 className="font-['Anybody'] text-3xl sm:text-4xl font-black text-white mt-2">
                    SOUND-ACTION COMIC VAULT
                  </h1>
                  <p className="font-['Rubik'] text-sm text-[#bac9cc] mt-1 max-w-xl">
                    Tap sound bubbles to hear real comic sound effects while reading through interactive kid-safe comic panels!
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('comic')}
                  className="px-6 py-3.5 rounded-xl bg-[#ff525f] text-white font-['Rubik'] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer whitespace-nowrap"
                >
                  Open Full Comic Reader
                </button>
              </div>
            </div>

            <QuestsAndComicSection
              zeroGEnabled={zeroGEnabled}
              onStartCircuitPuzzle={() => setActiveModal('circuit')}
              onLaunchTargetDrill={() => setActiveModal('drill')}
              onReadFullComic={() => setActiveModal('comic')}
              onSfxTriggered={triggerNotification}
            />

            <SoundboardBar onSfxTriggered={triggerNotification} />
          </div>
        )}

        {/* VIEW 6: QUESTS & BADGES */}
        {activeTab === 'quests-badges' && (
          <div className="flex flex-col w-full animate-fade-in py-6">
            <DimensionSelector
              activeSector="all"
              setActiveSector={setActiveSector}
              onSelectDimension={handleSelectDimension}
              zeroGEnabled={zeroGEnabled}
              showPortalCards={false}
            />
            <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full my-4">
              <div className="p-8 rounded-3xl bg-[#1b1f2b] border border-[#00e5ff]/40 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#f5cd00] text-[#3a3000] font-['Rubik'] text-xs font-bold uppercase">
                    Champion Progression
                  </span>
                  <h1 className="font-['Anybody'] text-3xl sm:text-4xl font-black text-white mt-2">
                    S.H.I.E.L.D. ACADEMY QUESTS
                  </h1>
                  <p className="font-['Rubik'] text-sm text-[#bac9cc] mt-1 max-w-xl">
                    Solve engineering circuits, shoot web targets, and claim weekly vibranium avatar frames!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-[#252a36] text-[#f5cd00] font-['Anybody'] text-lg font-bold">
                    {xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
            </div>

            <QuestsAndComicSection
              zeroGEnabled={zeroGEnabled}
              onStartCircuitPuzzle={() => setActiveModal('circuit')}
              onLaunchTargetDrill={() => setActiveModal('drill')}
              onReadFullComic={() => setActiveModal('comic')}
              onSfxTriggered={triggerNotification}
            />

            <QuestsAndArcadeSection
              zeroGEnabled={zeroGEnabled}
              onPlayGame={() => setActiveModal('drill')}
              onStartQuest={() => setActiveModal('drill')}
              onReadManga={() => setActiveModal('comic')}
            />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenShieldModal={() => setActiveModal('safety')}
        showSafeModeBanner={activeTab === 'home'}
      />

      {/* -------------------- Interactive Modals -------------------- */}

      {/* Suit Schematic Holographic Blueprint Modal */}
      <SuitSchematicModal
        hero={HEROES_DATA[0]}
        isOpen={activeModal === 'schematic'}
        onClose={() => setActiveModal('none')}
      />

      {/* Tony Stark's Circuit Puzzle Mini-Game */}
      <CircuitPuzzleModal
        isOpen={activeModal === 'circuit'}
        onClose={() => setActiveModal('none')}
        onPuzzleSolved={handleGainXp}
      />

      {/* Peter's Web Target Drill / Web-Rush Mini-Game */}
      <WebTargetDrillModal
        isOpen={activeModal === 'drill'}
        onClose={() => setActiveModal('none')}
        onDrillCompleted={handleGainXp}
      />

      {/* Animated Series Video Player Theater */}
      <VideoPlayerModal
        show={currentShow}
        isOpen={activeModal === 'player'}
        onClose={() => setActiveModal('none')}
      />

      {/* Sound-Action Comic Reader Modal */}
      <ComicReaderModal
        isOpen={activeModal === 'comic'}
        onClose={() => setActiveModal('none')}
        onSfxTriggered={triggerNotification}
      />

      {/* Kid-Safe Shield Parental Controls Modal */}
      <SafetyPinModal
        isOpen={activeModal === 'safety'}
        onClose={() => setActiveModal('none')}
        onSfxTriggered={triggerNotification}
      />
    </div>
  );
}
