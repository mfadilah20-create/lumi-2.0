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

interface ActivityDefinition {
  id: ActivityScreen;
  icon: string;
  label: string;
  spoken: string;
  color: 'amber' | 'purple' | 'emerald' | 'sky' | 'pink';
}

const activities: ActivityDefinition[] = [
  { id: 'belajar-huruf', icon: '🔤', label: 'Belajar Huruf', spoken: 'Belajar Huruf', color: 'amber' },
  { id: 'menulis', icon: '✏️', label: 'Menulis', spoken: 'Menulis Huruf', color: 'purple' },
  { id: 'bermain', icon: '🎮', label: 'Bermain', spoken: 'Bermain Mini Game', color: 'emerald' },
  { id: 'membaca', icon: '📖', label: 'Membaca', spoken: 'Membaca Kata', color: 'sky' },
  { id: 'cerita', icon: '📚', label: 'Cerita', spoken: 'Mendengarkan Cerita', color: 'pink' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  childProfile,
  childName,
  onSelectActivity,
  onOpenSettings,
}) => {
  const [isMusicActive, setIsMusicActive] = useState(soundService.isMusicOn());
  const [lumiHeartEffect, setLumiHeartEffect] = useState(false);
  const [lumiState, setLumiState] = useState<'idle' | 'greeting' | 'happy'>('idle');
  const activeNickname = (childProfile?.nickname || childName || 'Izar').trim();

  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      soundService.speak(`Halo, ${activeNickname}! Yuk, pilih aktivitasnya!`);
      setLumiState('greeting');
      setTimeout(() => setLumiState('idle'), 3000);
    }, 600);
    return () => clearTimeout(greetingTimer);
  }, [activeNickname]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    setIsMusicActive(soundService.toggleBgm());
  };

  const handleSelect = (activity: ActivityDefinition) => {
    soundService.playPop();
    soundService.playSparkle();
    soundService.speak(`Ayo ${activity.spoken}!`);
    setLumiState('happy');
    setTimeout(() => onSelectActivity(activity.id), 280);
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
      'Yuk pilih salah satu tombol warna-warni di bawah!',
      'Kamu anak pintar dan hebat! Ayo kita mulai!',
    ];
    soundService.speak(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <ForestBackground>
      <div className="relative z-30 flex h-full min-h-screen flex-col px-3 sm:px-6 lg:px-10">
        <div className="flex items-start justify-between pt-4 sm:pt-6">
          <ChildGreetingPill childProfile={childProfile} childName={activeNickname} />
          <div className="flex items-center gap-2 sm:gap-3">
            <AudioButton variant="circle" isMuted={!isMusicActive} onClick={toggleMusic} />
            <SettingsButton onOpen={onOpenSettings} />
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-4 hidden -translate-x-1/2 sm:block">
          <div className="relative w-[min(52vw,590px)] rounded-[2rem] border-[5px] border-[#7b3f1c] bg-gradient-to-b from-[#bd7138] via-[#9f5428] to-[#7d3b1c] px-8 py-3 text-center shadow-[0_8px_0_rgba(67,30,13,0.45),0_14px_28px_rgba(39,28,12,0.25)]">
            <div className="absolute -top-8 left-[10%] h-10 w-3 rounded-full bg-[#d59a5d] shadow-[0_0_0_2px_#75401f]" />
            <div className="absolute -top-8 right-[10%] h-10 w-3 rounded-full bg-[#d59a5d] shadow-[0_0_0_2px_#75401f]" />
            <div className="font-black tracking-wide text-white [text-shadow:0_3px_0_#6b3218]">
              <span className="text-4xl text-rose-300 sm:text-5xl">L</span>
              <span className="text-4xl text-amber-300 sm:text-5xl">U</span>
              <span className="text-4xl text-sky-300 sm:text-5xl">M</span>
              <span className="text-4xl text-emerald-300 sm:text-5xl">i</span>
            </div>
            <div className="mt-1 text-xs font-extrabold text-[#fff4d6] sm:text-sm">Teman kecil untuk tumbuh dan belajar</div>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center pb-3 pt-12 sm:pb-5 sm:pt-20">
          <div className="relative w-[min(58vw,420px)] max-w-[420px] sm:w-[min(34vw,360px)]">
            <LumiCharacter state={lumiState} size="xl" onClick={handleTapLumi} showShadow />
            <AnimatePresence>
              {lumiHeartEffect && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: [0, 1.25, 1], opacity: 1, y: -28 }}
                  exit={{ scale: 1.3, opacity: 0, y: -45 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute -top-2 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 text-2xl font-black drop-shadow-md"
                >
                  <span className="animate-bounce">❤️</span>
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <span>✨</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="pointer-events-auto absolute -right-[min(20vw,150px)] top-[20%] w-[min(40vw,230px)] sm:-right-[min(18vw,190px)] sm:top-[14%]">
              <LumiSpeechBubble />
            </div>
          </div>
        </div>

        <div className="w-full pb-4 sm:pb-7">
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2.5 sm:gap-4">
            {activities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="h-24 sm:h-32 lg:h-36">
                <ActivityButton {...activity} onPress={() => handleSelect(activity)} />
              </div>
            ))}
          </div>
          <div className="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-2.5 sm:mt-4 sm:gap-4">
            {activities.slice(3).map((activity) => (
              <div key={activity.id} className="h-24 sm:h-32 lg:h-36">
                <ActivityButton {...activity} onPress={() => handleSelect(activity)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ForestBackground>
  );
};
