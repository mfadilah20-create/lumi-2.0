import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ActivityScreen, ChildProfile } from '../types';
import { soundService } from '../services/soundService';
import { ForestAmbientLife } from './home/ForestAmbientLife';
import { LumiIdleOverlay } from './home/LumiIdleOverlay';
import { LumiSpeechBubble } from './home/LumiSpeechBubble';
import { ChildGreetingPill } from './home/ChildGreetingPill';

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
  const [creatureToast, setCreatureToast] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<ActivityScreen | null>(null);

  const activeNickname = (childProfile?.nickname || childName || 'Izar').trim();

  // Background image resolution with fallback
  const [bgSrc, setBgSrc] = useState<string>(() => {
    try {
      const custom = localStorage.getItem('lumi_custom_master_image');
      if (custom) return custom;
    } catch {
      // ignore
    }
    return '/master_home.jpg';
  });

  useEffect(() => {
    // Welcoming voice invitation
    const timer = setTimeout(() => {
      soundService.speak(`Halo, ${activeNickname}! Yuk, pilih aktivitasnya!`);
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
    if (activeButton) return;
    setActiveButton(activity);

    // Audio feedback
    soundService.playPop();
    soundService.playSparkle();
    soundService.speak(`Ayo ${spokenTitle}!`);

    // 280ms interaction animation duration, then navigate smoothly
    setTimeout(() => {
      onSelectActivity(activity);
    }, 280);
  };

  const handleTapLumi = () => {
    soundService.playSuccess();
    setLumiHeartEffect(true);
    setTimeout(() => setLumiHeartEffect(false), 1600);
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

  return (
    <div
      id="lumi-home-root"
      className="relative w-full h-screen bg-[#9ce5ec] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Dynamic Toast / Feedback Popups */}
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

      {/* ================================================================ */}
      {/* MASTER HOME VIEWPORT CONTAINER (Preserves Exact 16:10 / 16:9)     */}
      {/* ================================================================ */}
      <div
        id="lumi-master-stage"
        className="relative w-full h-full flex items-center justify-center shadow-2xl"
        style={{
          aspectRatio: '16 / 10.2',
          maxHeight: '100vh',
          maxWidth: 'calc(100vh * (16 / 10.2))',
        }}
      >
        {/* The Master Reference Artwork Background */}
        <img
          id="master-home-artwork"
          src={bgSrc}
          alt="LUMI Master Home Screen"
          onError={() => {
            if (bgSrc !== '/master_home.png') {
              setBgSrc('/master_home.png');
            } else {
              setBgSrc('/master_home.jpg');
            }
          }}
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />

        {/* ============================================================== */}
        {/* FOREST AMBIENT LIFE LAYER (Waterfall, stream, wind, leaves...) */}
        {/* ============================================================== */}
        <ForestAmbientLife />

        {/* ============================================================== */}
        {/* 1. CHILD GREETING (Top-Left, Single Element, Dynamic Nickname)  */}
        {/* ============================================================== */}
        <ChildGreetingPill
          childProfile={childProfile}
          childName={activeNickname}
        />

        {/* ============================================================== */}
        {/* 2. MUSIC AUDIO TOGGLE HOTSPOT (Top-Right near settings)        */}
        {/* ============================================================== */}
        <button
          id="hotspot-audio-toggle"
          onClick={toggleMusic}
          style={{
            top: '3.4%',
            right: '9.2%',
            width: '4.8%',
            height: '9.8%',
          }}
          className="absolute z-30 rounded-full flex items-center justify-center bg-white/70 hover:bg-white/90 text-sky-600 shadow-md border-2 border-white/80 transition-transform hover:scale-110 active:scale-90 cursor-pointer backdrop-blur-xs"
          title={isMusicActive ? 'Matikan Musik' : 'Nyalakan Musik'}
        >
          {isMusicActive ? (
            <Volume2 className="w-[55%] h-[55%]" />
          ) : (
            <VolumeX className="w-[55%] h-[55%] text-slate-400" />
          )}
        </button>

        {/* ============================================================== */}
        {/* 3. SETTINGS HOTSPOT (Top-Right over gear icon)                 */}
        {/* ============================================================== */}
        <div
          id="hotspot-settings"
          style={{
            top: '3.4%',
            right: '2.6%',
            width: '5.6%',
            height: '9.8%',
          }}
          className="absolute z-30 rounded-full cursor-pointer transition-all hover:ring-4 hover:ring-sky-300/70 hover:scale-105 active:scale-95 flex items-center justify-center group"
          onClick={() => {
            soundService.playPop();
            onOpenSettings();
          }}
          title="Pengaturan Orang Tua"
        >
          <div className="w-full h-full rounded-full bg-white/0 group-hover:bg-white/20 transition-colors" />
        </div>

        {/* ============================================================== */}
        {/* 4. LUMI CHARACTER (Gentle idle breathing, blink, antenna, tap)  */}
        {/* ============================================================== */}
        <LumiIdleOverlay
          onTap={handleTapLumi}
          heartEffect={lumiHeartEffect}
        />

        {/* ============================================================== */}
        {/* 5. SPEECH BUBBLE (Subtle idle float, “Yuk, pilih aktivitasnya!”)*/}
        {/* ============================================================== */}
        <LumiSpeechBubble />

        {/* ============================================================== */}
        {/* THE FIVE ACTIVITY BUTTON HOTSPOTS                              */}
        {/* With 200–400ms soft press effect & subtle sparkle feedback     */}
        {/* ============================================================== */}

        {/* ROW 1 - BUTTON 1: BELAJAR HURUF (Yellow, ABC) */}
        <motion.button
          id="hotspot-activity-belajar-huruf"
          animate={
            activeButton === 'belajar-huruf'
              ? { scale: [1, 1.06, 0.95], transition: { duration: 0.28 } }
              : { scale: 1 }
          }
          style={{
            top: '50.4%',
            left: '19.3%',
            width: '21.4%',
            height: '22.0%',
            borderRadius: 'clamp(16px, 2.8vw, 36px)',
          }}
          className="absolute z-30 cursor-pointer transition-colors duration-150 group border-transparent hover:ring-6 hover:ring-amber-300/70 hover:bg-white/15 active:scale-95 focus:outline-none"
          onClick={() => handleSelect('belajar-huruf', 'Belajar Huruf')}
          title="Belajar Huruf: Mengenal Alfabet A sampai Z"
        >
          <span className="sr-only">Belajar Huruf</span>
          {activeButton === 'belajar-huruf' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping">✨</span>
            </div>
          )}
        </motion.button>

        {/* ROW 1 - BUTTON 2: MENULIS (Purple/Lavender, Pencil) */}
        <motion.button
          id="hotspot-activity-menulis"
          animate={
            activeButton === 'menulis'
              ? { scale: [1, 1.06, 0.95], transition: { duration: 0.28 } }
              : { scale: 1 }
          }
          style={{
            top: '50.4%',
            left: '41.2%',
            width: '18.8%',
            height: '22.0%',
            borderRadius: 'clamp(16px, 2.8vw, 36px)',
          }}
          className="absolute z-30 cursor-pointer transition-colors duration-150 group border-transparent hover:ring-6 hover:ring-purple-300/70 hover:bg-white/15 active:scale-95 focus:outline-none"
          onClick={() => handleSelect('menulis', 'Menulis Huruf')}
          title="Menulis: Latihan Menulis Huruf dan Menebalkan Garis"
        >
          <span className="sr-only">Menulis</span>
          {activeButton === 'menulis' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping">✨</span>
            </div>
          )}
        </motion.button>

        {/* ROW 1 - BUTTON 3: BERMAIN (Green, Game Controller) */}
        <motion.button
          id="hotspot-activity-bermain"
          animate={
            activeButton === 'bermain'
              ? { scale: [1, 1.06, 0.95], transition: { duration: 0.28 } }
              : { scale: 1 }
          }
          style={{
            top: '50.4%',
            left: '60.5%',
            width: '20.0%',
            height: '22.0%',
            borderRadius: 'clamp(16px, 2.8vw, 36px)',
          }}
          className="absolute z-30 cursor-pointer transition-colors duration-150 group border-transparent hover:ring-6 hover:ring-emerald-300/70 hover:bg-white/15 active:scale-95 focus:outline-none"
          onClick={() => handleSelect('bermain', 'Bermain Mini Game')}
          title="Bermain: Tebak Huruf, Pasangan Kartu, & Tangkap Buah"
        >
          <span className="sr-only">Bermain</span>
          {activeButton === 'bermain' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping">✨</span>
            </div>
          )}
        </motion.button>

        {/* ROW 2 - BUTTON 4: MEMBACA (Sky Blue, Open Book) */}
        <motion.button
          id="hotspot-activity-membaca"
          animate={
            activeButton === 'membaca'
              ? { scale: [1, 1.06, 0.95], transition: { duration: 0.28 } }
              : { scale: 1 }
          }
          style={{
            top: '73.2%',
            left: '27.6%',
            width: '22.4%',
            height: '20.2%',
            borderRadius: 'clamp(16px, 2.8vw, 36px)',
          }}
          className="absolute z-30 cursor-pointer transition-colors duration-150 group border-transparent hover:ring-6 hover:ring-sky-300/70 hover:bg-white/15 active:scale-95 focus:outline-none"
          onClick={() => handleSelect('membaca', 'Membaca Kata')}
          title="Membaca: Belajar Mengeja Kata dan Fonik"
        >
          <span className="sr-only">Membaca</span>
          {activeButton === 'membaca' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping">✨</span>
            </div>
          )}
        </motion.button>

        {/* ROW 2 - BUTTON 5: CERITA (Pink, Fairy Tale Book) */}
        <motion.button
          id="hotspot-activity-cerita"
          animate={
            activeButton === 'cerita'
              ? { scale: [1, 1.06, 0.95], transition: { duration: 0.28 } }
              : { scale: 1 }
          }
          style={{
            top: '73.2%',
            left: '50.8%',
            width: '21.5%',
            height: '20.2%',
            borderRadius: 'clamp(16px, 2.8vw, 36px)',
          }}
          className="absolute z-30 cursor-pointer transition-colors duration-150 group border-transparent hover:ring-6 hover:ring-pink-300/70 hover:bg-white/15 active:scale-95 focus:outline-none"
          onClick={() => handleSelect('cerita', 'Mendengarkan Cerita')}
          title="Cerita: Petualangan Lumi di Hutan Ajaib"
        >
          <span className="sr-only">Cerita</span>
          {activeButton === 'cerita' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping">✨</span>
            </div>
          )}
        </motion.button>

        {/* ============================================================== */}
        {/* INTERACTIVE FOREST CREATURES (Sound & Delight Easter Eggs)     */}
        {/* ============================================================== */}

        {/* Squirrel on Oak Tree */}
        <div
          id="creature-squirrel"
          style={{
            top: '14%',
            left: '5.5%',
            width: '7.5%',
            height: '12%',
          }}
          className="absolute z-20 cursor-pointer rounded-full group"
          onClick={() => showToast('Cip cip! Tupai kecil melompat gembira!')}
          title="Tupai Kecil"
        >
          <div className="w-full h-full rounded-full transition-transform group-hover:scale-110 active:scale-95" />
        </div>

        {/* Hobbit Treehouse Door */}
        <div
          id="creature-treehouse-door"
          style={{
            top: '35%',
            left: '2%',
            width: '12%',
            height: '26%',
          }}
          className="absolute z-20 cursor-pointer rounded-full group"
          onClick={() => {
            soundService.playPop();
            showToast('Tok tok tok! Pintu rumah pohon Lumi!');
          }}
          title="Rumah Pohon"
        >
          <div className="w-full h-full rounded-full transition-transform group-hover:scale-105 active:scale-95" />
        </div>

        {/* White Bunny */}
        <div
          id="creature-bunny"
          style={{
            top: '68%',
            left: '8.5%',
            width: '8.5%',
            height: '18%',
          }}
          className="absolute z-20 cursor-pointer rounded-full group"
          onClick={() => showToast('Kelinci putih melompat di rumput hijau!')}
          title="Kelinci Putih"
        >
          <div className="w-full h-full rounded-full transition-transform group-hover:scale-110 active:scale-95" />
        </div>

        {/* Baby Fawn / Deer */}
        <div
          id="creature-deer"
          style={{
            top: '52%',
            left: '88%',
            width: '11%',
            height: '24%',
          }}
          className="absolute z-20 cursor-pointer rounded-full group"
          onClick={() => showToast('Rusa kecil mengintip ramah dari balik pagar!')}
          title="Rusa Kecil"
        >
          <div className="w-full h-full rounded-full transition-transform group-hover:scale-110 active:scale-95" />
        </div>

        {/* Bluebird */}
        <div
          id="creature-bird"
          style={{
            top: '16%',
            left: '90%',
            width: '8%',
            height: '11%',
          }}
          className="absolute z-20 cursor-pointer rounded-full group"
          onClick={() => showToast('Burung biru bernyanyi merdu!')}
          title="Burung Biru"
        >
          <div className="w-full h-full rounded-full transition-transform group-hover:scale-110 active:scale-95" />
        </div>
      </div>
    </div>
  );
};
