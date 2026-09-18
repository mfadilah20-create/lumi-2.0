import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ActivityScreen, ChildProfile } from '../types';
import { soundService } from '../services/soundService';
import { ForestBackground } from './ForestBackground';
import { LumiCharacter } from './LumiCharacter';
import { AudioButton } from './AudioButton';
import { SettingsButton } from './SettingsButton';
import { ChildGreetingPill } from './home/ChildGreetingPill';
import { LumiSpeechBubble } from './home/LumiSpeechBubble';
import { ActivityButton } from './home/ActivityButton';

interface HomeScreenProps {
  childProfile?: ChildProfile;
  childName: string;
  onSelectActivity: (activity: ActivityScreen) => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  childProfile,
  childName,
  onSelectActivity,
  onOpenSettings,
}) => {
  const [isMusicActive, setIsMusicActive] = useState(soundService.isMusicOn());
  const [lumiHeartEffect, setLumiHeartEffect] = useState(false);
  const [lumiState, setLumiState] = useState<'idle' | 'greeting' | 'happy'>('idle');
  const [creatureToast, setCreatureToast] = useState<string | null>(null);

  const activeNickname = (childProfile?.nickname || childName || 'Izar').trim();

  useEffect(() => {
    const timer = setTimeout(() => {
      soundService.speak(`Halo, ${activeNickname}! Yuk, pilih aktivitasnya!`);
      setLumiState('greeting');
      setTimeout(() => setLumiState('idle'), 3000);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeNickname]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    const newState = soundService.toggleBgm();
    setIsMusicActive(newState);
  };

  const handleSelect = (activity: ActivityScreen, spokenTitle: string) => {
    soundService.playPop();
    soundService.playSparkle();
    soundService.speak(`Ayo ${spokenTitle}!`);
    setLumiState('happy');
    setTimeout(() => onSelectActivity(activity), 280);
  };

  const handleTapLumi = () => {
    soundService.playSuccess();
    setLumiHeartEffect(true);
    setLumiState('happy');
    setTimeout(() => {
      setLumiHeartEffect(false);
      setLumiState('idle');
    }, 1600);
    const quotes = [
      `Halo ${activeNickname}! Aku Lumi, senang bisa belajar bersamamu!`,
      `Yuk pilih salah satu tombol warna-warni di bawah!`,
      `Kamu anak pintar dan hebat! Ayo kita mulai!`,
    ];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    soundService.speak(picked);
  };

  const showToast = (message: string, sound: 'pop' | 'success' = 'pop') => {
    if (sound === 'pop') soundService.playPop();
    else soundService.playSuccess();
    setCreatureToast(message);
    setTimeout(() => setCreatureToast(null), 2000);
  };

  const activities: {
    id: ActivityScreen;
    icon: string;
    label: string;
    spoken: string;
    color: 'amber' | 'purple' | 'emerald' | 'sky' | 'pink';
  }[] = [
    { id: 'belajar-huruf', icon: '🔤', label: 'Belajar Huruf', spoken: 'Belajar Huruf', color: 'amber' },
    { id: 'menulis', icon: '✏️', label: 'Menulis', spoken: 'Menulis Huruf', color: 'purple' },
    { id: 'bermain', icon: '🎮', label: 'Bermain', spoken: 'Bermain Mini Game', color: 'emerald' },
    { id: 'membaca', icon: '📖', label: 'Membaca', spoken: 'Membaca Kata', color: 'sky' },
    { id: 'cerita', icon: '📚', label: 'Cerita', spoken: 'Mendengarkan Cerita', color: 'pink' },
  ];

  return (
    <ForestBackground>
      {/* Toast / Feedback Popups */}
      <AnimatePresence>
        {creatureToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 z-50 bg-white/95 px-5 py-2.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] border-2 border-amber-300 flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>{creatureToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar: Greeting (left), Audio + Settings (right) */}
      <div className="relative z-30 flex items-start justify-between w-full px-3 sm:px-5 pt-3 sm:pt-5">
        <ChildGreetingPill
          childProfile={childProfile}
          childName={activeNickname}
        />

        <div className="flex items-center gap-2 sm:gap-3">
          <AudioButton
            variant="circle"
            isMuted={!isMusicActive}
            onClick={toggleMusic}
          />
          <SettingsButton onOpen={onOpenSettings} />
        </div>
      </div>

      {/* LUMI Character + Speech Bubble (center area) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 pt-2 sm:pt-4">
        <div className="relative flex items-start justify-center w-full max-w-md">
          {/* Lumi Character */}
          <div className="relative flex flex-col items-center">
            <LumiCharacter
              state={lumiState}
              size="lg"
              onClick={handleTapLumi}
              showShadow={true}
            />
            {/* Tap hearts effect */}
            <AnimatePresence>
              {lumiHeartEffect && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: [0, 1.25, 1], opacity: 1, y: -28 }}
                  exit={{ scale: 1.3, opacity: 0, y: -45 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-2xl font-black drop-shadow-md pointer-events-none z-40"
                >
                  <span className="animate-bounce">❤️</span>
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="text-xl">✨</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Speech Bubble */}
          <div className="absolute -right-2 sm:right-4 top-4 sm:top-8 w-36 sm:w-44 z-20">
            <LumiSpeechBubble />
          </div>
        </div>
      </div>

      {/* Activity Buttons */}
      <div className="relative z-30 w-full px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6">
        {/* Row 1: 3 buttons */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-3 sm:mb-4">
          {activities.slice(0, 3).map((act) => (
            <div key={act.id} className="h-24 sm:h-28 md:h-32">
              <ActivityButton
                icon={act.icon}
                label={act.label}
                color={act.color}
                onPress={() => handleSelect(act.id, act.spoken)}
              />
            </div>
          ))}
        </div>

        {/* Row 2: 2 buttons centered */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[27rem] sm:max-w-md mx-auto">
          {activities.slice(3, 5).map((act) => (
            <div key={act.id} className="h-24 sm:h-28 md:h-32">
              <ActivityButton
                icon={act.icon}
                label={act.label}
                color={act.color}
                onPress={() => handleSelect(act.id, act.spoken)}
              />
            </div>
          ))}
        </div>
      </div>
    </ForestBackground>
  );
};
