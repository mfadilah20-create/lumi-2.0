import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ActivityScreen, ChildProfile } from '../types';
import { soundService } from '../services/soundService';
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

const ACTIVITIES = [
  { id: 'belajar-huruf' as ActivityScreen, icon: '🔤', label: 'Belajar Huruf', spoken: 'Belajar Huruf', color: 'amber' as const },
  { id: 'menulis'       as ActivityScreen, icon: '✏️',  label: 'Menulis',       spoken: 'Menulis Huruf', color: 'purple' as const },
  { id: 'bermain'       as ActivityScreen, icon: '🎮',  label: 'Bermain',       spoken: 'Bermain Mini Game', color: 'emerald' as const },
  { id: 'membaca'       as ActivityScreen, icon: '📖',  label: 'Membaca',       spoken: 'Membaca Kata',  color: 'sky' as const },
  { id: 'cerita'        as ActivityScreen, icon: '📚',  label: 'Cerita',        spoken: 'Mendengarkan Cerita', color: 'pink' as const },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  childProfile,
  childName,
  onSelectActivity,
  onOpenSettings,
}) => {
  const [isMusicActive, setIsMusicActive] = useState(soundService.isMusicOn());
  const [lumiState, setLumiState]   = useState<'idle' | 'greeting' | 'happy'>('idle');
  const [heartEffect, setHeartEffect] = useState(false);

  const activeName = (childProfile?.nickname || childName || 'Izar').trim();

  useEffect(() => {
    const t = setTimeout(() => {
      soundService.speak(`Halo, ${activeName}! Yuk, pilih aktivitasnya!`);
      setLumiState('greeting');
      setTimeout(() => setLumiState('idle'), 3000);
    }, 600);
    return () => clearTimeout(t);
  }, [activeName]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    setIsMusicActive(soundService.toggleBgm());
  };

  const handleSelectActivity = (id: ActivityScreen, spoken: string) => {
    soundService.playPop();
    soundService.playSparkle();
    soundService.speak(`Ayo ${spoken}!`);
    setLumiState('happy');
    setTimeout(() => onSelectActivity(id), 280);
  };

  const handleTapLumi = () => {
    soundService.playSuccess();
    setHeartEffect(true);
    setLumiState('happy');
    const lines = [
      `Halo ${activeName}! Aku Lumi, senang bisa belajar bersamamu!`,
      'Yuk pilih salah satu tombol warna-warni di bawah!',
      'Kamu anak pintar dan hebat! Ayo kita mulai!',
    ];
    soundService.speak(lines[Math.floor(Math.random() * lines.length)]);
    setTimeout(() => { setHeartEffect(false); setLumiState('idle'); }, 1600);
  };

  return (
    /*
     * Root: full-viewport, no scroll.
     * Green gradient covers everything so no black / cyan ever peeks out.
     */
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{ background: 'linear-gradient(to bottom, #5aad5a 60%, #3d8c3d 100%)' }}
    >
      {/* ── LAYER 0: forest background image ─────────────────────────────
          forest_clean.jpg is 1400×768 but the illustrated content only
          occupies the top ~50 % of the image (the rest is black).
          We render the <img> at 200 % height inside a 68 vh clipped zone
          so the illustrated half fills exactly that zone, and the black
          half is pushed below the clip boundary and never shown.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden"
        style={{ height: '68vh', zIndex: 0 }}
      >
        <img
          src="/forest_clean.jpg"
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            /* 200% of the clip zone → illustrated top-50 % of image fills the zone */
            height: '200%',
            objectFit: 'cover',
            objectPosition: 'center top',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {/* Soft gradient at the forest bottom to blend into the meadow */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '30%',
            background: 'linear-gradient(to bottom, transparent, #4a9c4a)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── LAYER 0b: meadow that fills the lower area behind buttons ─── */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          top: '60vh',
          background: 'linear-gradient(to bottom, #4a9c4a 0%, #3a7d3a 40%, #2d6b2d 100%)',
          zIndex: 0,
        }}
      />

      {/* ── LAYER 40: UI chrome (greeting + audio/settings) ──────────── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between px-3 sm:px-5 pt-3 sm:pt-4"
        style={{ zIndex: 40 }}
      >
        <ChildGreetingPill childProfile={childProfile} childName={activeName} />

        <div className="flex items-center gap-2 sm:gap-3">
          <AudioButton variant="circle" isMuted={!isMusicActive} onClick={toggleMusic} />
          <SettingsButton onOpen={onOpenSettings} />
        </div>
      </div>

      {/* ── LAYER 20: LUMI character ──────────────────────────────────── */}
      {/*
          Positioned so LUMI's visual center sits at ~47 % from left and
          ~38 % from top — matching the painted LUMI in master_home.png.
          size="lg" renders at 220×264 px which is ~24 % of a 1080 p screen.
      */}
      <div
        className="absolute"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          /* bottom of LUMI lands at ~68 vh — the bottom of the forest zone */
          bottom: '32vh',
          zIndex: 20,
        }}
      >
        <div className="relative">
          <LumiCharacter
            state={lumiState}
            size="lg"
            onClick={handleTapLumi}
            showShadow
          />

          {/* Heart / sparkle tap effect */}
          <AnimatePresence>
            {heartEffect && (
              <motion.div
                key="heart"
                initial={{ scale: 0, opacity: 0, y: 10 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1, y: -32 }}
                exit={{ scale: 1.4, opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-2xl font-black drop-shadow-md"
                style={{ zIndex: 60 }}
              >
                <span className="animate-bounce">❤️</span>
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>✨</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── LAYER 30: speech bubble ───────────────────────────────────── */}
      {/*
          Right of LUMI, vertically aligned with LUMI's upper body.
          Uses absolute positioning anchored to the same horizontal center,
          shifted right by ~14 vw.
      */}
      <div
        className="absolute"
        style={{
          left: '50%',
          /* shift right: clear LUMI's width (≈110px at lg) + gap */
          transform: 'translateX(calc(110px + 1vw))',
          bottom: 'calc(32vh + 5.5rem)',
          width: 'clamp(140px, 16vw, 210px)',
          zIndex: 30,
        }}
      >
        <LumiSpeechBubble />
      </div>

      {/* ── LAYER 50: activity buttons ────────────────────────────────── */}
      {/*
          Occupy the bottom 32 vh of the screen over the meadow layer.
          Layout: row-1 = 3 buttons, row-2 = 2 buttons centred.
      */}
      <div
        className="absolute left-0 right-0 bottom-0 flex flex-col justify-center gap-2 sm:gap-3 px-3 sm:px-6 lg:px-10"
        style={{ height: '32vh', zIndex: 50 }}
      >
        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-3xl mx-auto" style={{ flex: '1 1 auto', maxHeight: '46%' }}>
          {ACTIVITIES.slice(0, 3).map((act) => (
            <ActivityButton
              key={act.id}
              icon={act.icon}
              label={act.label}
              color={act.color}
              onPress={() => handleSelectActivity(act.id, act.spoken)}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-[49%] sm:max-w-[44%] mx-auto" style={{ flex: '1 1 auto', maxHeight: '46%' }}>
          {ACTIVITIES.slice(3).map((act) => (
            <ActivityButton
              key={act.id}
              icon={act.icon}
              label={act.label}
              color={act.color}
              onPress={() => handleSelectActivity(act.id, act.spoken)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
