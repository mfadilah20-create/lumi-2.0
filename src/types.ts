export type LumiState =
  | 'idle'
  | 'greeting'
  | 'pointing'
  | 'happy'
  | 'curious'
  | 'encourage'
  | 'celebrate'
  | 'reading'
  | 'sleepy';

export type ActivityScreen =
  | 'onboarding'
  | 'home'
  | 'belajar-huruf'
  | 'menulis'
  | 'bermain'
  | 'membaca'
  | 'cerita';

export interface WordBankItem {
  letter: string;
  lowercase: string;
  word: string;
  phoneticSound: string;
  exampleSentence: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  svgIcon: string;
  description: string;
}

export interface ChildProfile {
  nickname: string;
  avatar?: string;
}

export interface UserProfile {
  nickname: string;
  hasOnboarded: boolean;
  starsCollected: number;
  completedLetters: string[];
  completedGames: string[];
  soundSettings: {
    bgm: number;
    lumi: number;
    sfx: number;
  };
}

export interface StoryPage {
  pageNumber: number;
  illustrationType: 'meeting-rabbit' | 'lost-path' | 'helping-friend' | 'happy-home';
  text: string;
  highlightWords: string[];
  interactivePrompt: string;
  interactiveItem: string;
}

export interface SyllableItem {
  syllables: string[];
  word: string;
  letter: string;
  meaning: string;
  iconType: string;
}

export interface SentenceItem {
  text: string;
  words: string[];
  illustration: string;
  meaning: string;
}
