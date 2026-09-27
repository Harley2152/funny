export interface Hero {
  id: string;
  name: string;
  alias: string;
  universe: string;
  title: string;
  lore: string;
  image: string;
  powerLevel: number;
  stats: {
    agility: number;
    agilityLabel: string;
    strength: number;
    strengthLabel: string;
    intellect: number;
    intellectLabel: string;
  };
  badges: Array<{ id: string; name: string; icon: string; color: string }>;
  tags: string[];
  themeColor: string;
  glowColor: string;
  sfxSound: 'thwip' | 'boom' | 'zap' | 'smash' | 'clang';
  sfxLabel: string;
}

export interface ShowEpisode {
  id: string;
  title: string;
  series: string;
  category: string;
  description: string;
  image: string;
  ageRating: string;
  duration: string;
  rating: number;
  progressPercent: number;
  progressText: string;
  badgeText?: string;
  badgeColor?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  status: 'available' | 'completed' | 'locked';
  actionType: 'circuit' | 'target-drill' | 'riddle' | 'comic';
  categoryColor: string;
}

export interface ArcadeGame {
  id: string;
  title: string;
  category: string;
  image: string;
  score: string;
  rating: number;
  tagColor: string;
}

export interface ComicPanel {
  id: string;
  title: string;
  image: string;
  bubbles: Array<{
    text: string;
    sfx: 'thwip' | 'boom' | 'zap' | 'smash' | 'clang';
    positionClass: string;
    rotationClass: string;
    colorClass: string;
  }>;
}
