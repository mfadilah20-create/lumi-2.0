import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { ForestBackground } from '../ForestBackground';
import { ActivityHeader } from '../ActivityHeader';
import { LumiCharacter } from '../LumiCharacter';
import { RewardPopup } from '../RewardPopup';
import { soundService } from '../../services/soundService';

interface CeritaScreenProps {
  childName: string;
  onBack: () => void;
}

interface StoryPage {
  pageNumber: number;
  text: string;
  highlightWords: string[];
  illustrationScene: string;
  narration: string;
  interactiveHint: string;
}

interface StoryBook {
  id: string;
  title: string;
  coverEmoji: string;
  tag: string;
  color: string;
  description: string;
  pages: StoryPage[];
}

const STORIES: StoryBook[] = [
  {
    id: 'bola-hilang',
    title: 'Bola yang Hilang',
    coverEmoji: '⚽',
    tag: 'Cerita Utama',
    color: 'from-amber-100 to-rose-200 border-rose-400',
    description: 'Lumi mencari bola merah kesayangannya yang menggelinding ke balik semak.',
    pages: [
      {
        pageNumber: 1,
        text: 'Lumi sedang asyik bermain BOLA merah di taman hijau.',
        highlightWords: ['LUMI', 'BOLA', 'TAMAN'],
        illustrationScene: 'playing-ball',
        narration: 'Lumi sedang asyik bermain bola merah di taman hijau.',
        interactiveHint: 'Ketuk bola merah untuk memantulkannya!',
      },
      {
        pageNumber: 2,
        text: 'Wusss! Bola memantul dan menggelinding ke balik SEMAK.',
        highlightWords: ['BOLA', 'SEMAK'],
        illustrationScene: 'ball-in-bush',
        narration: 'Wusss! Bola memantul dan menggelinding ke balik semak-semak.',
        interactiveHint: 'Ketuk semak untuk mencari bolanya!',
      },
      {
        pageNumber: 3,
        text: 'Ada KELINCI putih yang menemukan bola itu! "Ini bolamu, Lumi!" kata Kelinci.',
        highlightWords: ['KELINCI', 'BOLA', 'LUMI'],
        illustrationScene: 'bunny-found',
        narration: 'Ada kelinci putih yang menemukan bola itu! Ini bolamu, Lumi, kata Kelinci baik hati.',
        interactiveHint: 'Sentuh kelinci untuk menerima bolanya!',
      },
      {
        pageNumber: 4,
        text: 'Lumi dan Kelinci pun BERMAIN bola bersama dengan gembira!',
        highlightWords: ['LUMI', 'KELINCI', 'BERMAIN', 'BOLA'],
        illustrationScene: 'playing-together',
        narration: 'Lumi dan kelinci pun bermain bola bersama dengan gembira!',
        interactiveHint: 'Ketuk Lumi dan Kelinci untuk bersorak!',
      },
    ],
  },
  {
    id: 'apel-pohon',
    title: 'Apel Manis di Pohon',
    coverEmoji: '🍎',
    tag: 'Petualangan',
    color: 'from-emerald-100 to-teal-200 border-emerald-400',
    description: 'Lumi melihat buah apel lezat di atas dahan pohon yang tinggi.',
    pages: [
      {
        pageNumber: 1,
        text: 'LUMI berjalan santai di dalam hutan hijau yang sejuk.',
        highlightWords: ['LUMI', 'HUTAN'],
        illustrationScene: 'forest-walk',
        narration: 'Lumi berjalan santai di dalam hutan hijau yang sejuk.',
        interactiveHint: 'Ketuk Lumi untuk melambai!',
      },
      {
        pageNumber: 2,
        text: 'LUMI melihat APEL merah manis di atas POHON tinggi.',
        highlightWords: ['APEL', 'POHON'],
        illustrationScene: 'tree-apple',
        narration: 'Lumi melihat apel merah manis di atas pohon tinggi.',
        interactiveHint: 'Sentuh buah apel di atas pohon!',
      },
      {
        pageNumber: 3,
        text: 'Pluk! Apel manis jatuh ke atas rumput lembut.',
        highlightWords: ['APEL', 'RUMPUT'],
        illustrationScene: 'apple-fall',
        narration: 'Pluk! Apel manis jatuh ke atas rumput lembut.',
        interactiveHint: 'Sentuh apel yang memantul!',
      },
      {
        pageNumber: 4,
        text: 'LUMI makan apel lezat bersama sahabat dan TEMAN.',
        highlightWords: ['LUMI', 'APEL', 'TEMAN'],
        illustrationScene: 'eat-together',
        narration: 'Lumi makan apel lezat bersama sahabat dan teman.',
        interactiveHint: 'Ketuk sahabat hutan untuk berpesta!',
      },
    ],
  },
];

export const CeritaScreen: React.FC<CeritaScreenProps> = ({
  childName,
  onBack,
}) => {
  const [selectedStory, setSelectedStory] = useState<StoryBook | null>(null);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [showReward, setShowReward] = useState<boolean>(false);
  const [interacted, setInteracted] = useState<boolean>(false);

  const activePages = selectedStory?.pages || STORIES[0].pages;
  const currentPage = activePages[currentPageIdx];

  useEffect(() => {
    if (!selectedStory) return;
    setInteracted(false);
    const timer = setTimeout(() => {
      soundService.speak(currentPage.narration);
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedStory, currentPageIdx]);

  const handleStartStory = (story: StoryBook) => {
    soundService.playPop();
    setSelectedStory(story);
    setCurrentPageIdx(0);
    setInteracted(false);
  };

  const handleNext = () => {
    soundService.playPop();
    if (currentPageIdx < activePages.length - 1) {
      setCurrentPageIdx((prev) => prev + 1);
    } else {
      soundService.playSuccess();
      setShowReward(true);
    }
  };

  const handlePrev = () => {
    soundService.playPop();
    if (currentPageIdx > 0) {
      setCurrentPageIdx((prev) => prev - 1);
    }
  };

  const handleInteractiveSceneTouch = () => {
    soundService.playSparkle();
    setInteracted(true);
  };

  return (
    <ForestBackground>
      <div className="relative w-full h-full min-h-screen flex flex-col justify-between select-none">
        <ActivityHeader
          title={selectedStory ? selectedStory.title : 'Pilih Cerita'}
          subtitle={selectedStory ? `Halaman ${currentPageIdx + 1} dari ${activePages.length}` : 'Petualangan seru bersama Lumi'}
          onBack={selectedStory ? () => setSelectedStory(null) : onBack}
          bgGradient="from-pink-100 to-rose-200"
        />

        {/* WORKSPACE CONTENT */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-6 z-20">
          <AnimatePresence mode="wait">
            {/* VIEW 1: STORY SELECTION SCREEN */}
            {!selectedStory && (
              <motion.div
                key="story-selection"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-pink-300 shadow-[0_12px_32px_rgba(219,39,119,0.2)] p-6 sm:p-8 flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider mb-2 inline-block">
                    Dunia Buku Cerita
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                    Pilih Cerita Favoritmu!
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-pink-700">
                    Dengarkan dongeng interaktif dengan suara dan animasi
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-4">
                  {STORIES.map((story) => (
                    <motion.button
                      key={story.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleStartStory(story)}
                      className={`flex flex-col items-start p-5 bg-gradient-to-b ${story.color} rounded-3xl border-3 shadow-[0_6px_0_rgba(0,0,0,0.1)] cursor-pointer text-left relative transition-transform`}
                    >
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/90 text-rose-800 font-black text-[11px] shadow-xs">
                        {story.tag}
                      </span>
                      <div className="text-4xl mb-2">{story.coverEmoji}</div>
                      <h3 className="text-lg font-black text-slate-900 mb-1">
                        {story.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-700 line-clamp-2">
                        {story.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-black text-rose-700 bg-white/70 px-3 py-1 rounded-full">
                        <BookOpen size={14} />
                        <span>Mulai Baca</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Upcoming story placeholder */}
                <div className="w-full p-3 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    <span className="text-xs font-bold">Sahabat Baru di Hutan Ajaib</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Segera Datang
                  </span>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: INTERACTIVE STORY READER */}
            {selectedStory && (
              <motion.div
                key="story-reader"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full max-w-2xl bg-[#fffbf5] rounded-3xl border-4 border-pink-300 shadow-[0_12px_36px_rgba(219,39,119,0.22)] p-5 sm:p-7 flex flex-col items-center"
              >
                {/* Top status bar */}
                <div className="flex items-center justify-between w-full mb-3 px-1">
                  <span className="text-xs sm:text-sm font-black text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                    Halaman {currentPage.pageNumber} dari {activePages.length}
                  </span>
                  <button
                    onClick={() => soundService.speak(currentPage.narration)}
                    className="flex items-center gap-1.5 text-xs font-black text-sky-700 bg-sky-100 hover:bg-sky-200 px-3 py-1 rounded-full cursor-pointer transition-colors shadow-xs"
                    title="Dengarkan Ulang"
                  >
                    <Volume2 size={14} />
                    <span>Baca Ulang</span>
                  </button>
                </div>

                {/* INTERACTIVE SCENE ILLUSTRATION */}
                <div
                  onClick={handleInteractiveSceneTouch}
                  className="relative w-full h-52 sm:h-64 bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-100 rounded-2xl border-3 border-pink-200 overflow-hidden shadow-inner flex items-center justify-center cursor-pointer mb-3"
                  title="Sentuh gambar untuk melihat keajaiban cerita!"
                >
                  <AnimatePresence mode="wait">
                    {/* BOLA YANG HILANG SCENES */}
                    {currentPage.illustrationScene === 'playing-ball' && (
                      <motion.div
                        key="playing-ball"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-6"
                      >
                        <LumiCharacter state="greeting" size="md" showShadow={false} />
                        {/* Bouncing Beach Ball */}
                        <motion.div
                          animate={interacted ? { y: [-40, 0, -20, 0], rotate: [0, 180, 360] } : { y: [0, -10, 0] }}
                          transition={{ repeat: interacted ? 0 : Infinity, duration: 1.2 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-amber-400 to-sky-400 border-3 border-white shadow-lg flex items-center justify-center text-2xl cursor-pointer"
                        >
                          ⚽
                        </motion.div>
                      </motion.div>
                    )}

                    {currentPage.illustrationScene === 'ball-in-bush' && (
                      <motion.div
                        key="ball-in-bush"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-6"
                      >
                        <LumiCharacter state="curious" size="md" showShadow={false} />
                        {/* Bushes with peek-a-boo ball */}
                        <motion.div
                          animate={interacted ? { rotate: [-8, 8, -8, 0] } : {}}
                          transition={{ duration: 0.6 }}
                          className="relative flex items-center justify-center"
                        >
                          <div className="w-24 h-20 bg-emerald-600 rounded-full border-3 border-emerald-700 shadow-md flex items-center justify-center">
                            <span className="text-3xl">🌿</span>
                          </div>
                          <motion.div
                            animate={interacted ? { y: -25, opacity: 1 } : { y: 5, opacity: 0.8 }}
                            className="absolute -top-3 right-2 text-2xl"
                          >
                            ⚽
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}

                    {currentPage.illustrationScene === 'bunny-found' && (
                      <motion.div
                        key="bunny-found"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-8"
                      >
                        <LumiCharacter state="happy" size="md" showShadow={false} />
                        <motion.div
                          animate={interacted ? { scale: [1, 1.2, 1] } : {}}
                          className="flex flex-col items-center"
                        >
                          <span className="text-5xl">🐰</span>
                          <span className="text-2xl mt-[-10px]">⚽</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {currentPage.illustrationScene === 'playing-together' && (
                      <motion.div
                        key="playing-together"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-6"
                      >
                        <LumiCharacter state="celebrate" size="md" showShadow={false} />
                        <span className="text-5xl animate-bounce">🐰</span>
                        <span className="text-3xl animate-pulse">⚽</span>
                      </motion.div>
                    )}

                    {/* APEL POHON SCENES FALLBACK */}
                    {currentPage.illustrationScene === 'forest-walk' && (
                      <motion.div key="sc1" className="flex items-center justify-center gap-6">
                        <LumiCharacter state="greeting" size="md" showShadow={false} />
                        <span className="text-5xl">🌲</span>
                      </motion.div>
                    )}
                    {currentPage.illustrationScene === 'tree-apple' && (
                      <motion.div key="sc2" className="flex items-center justify-center gap-6">
                        <LumiCharacter state="curious" size="md" showShadow={false} />
                        <span className="text-6xl">🌳🍎</span>
                      </motion.div>
                    )}
                    {currentPage.illustrationScene === 'apple-fall' && (
                      <motion.div key="sc3" className="flex items-center justify-center gap-6">
                        <LumiCharacter state="happy" size="md" showShadow={false} />
                        <span className="text-5xl animate-bounce">🍎</span>
                      </motion.div>
                    )}
                    {currentPage.illustrationScene === 'eat-together' && (
                      <motion.div key="sc4" className="flex items-center justify-center gap-6">
                        <LumiCharacter state="celebrate" size="md" showShadow={false} />
                        <span className="text-5xl">🐰🍎</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interactive hint overlay */}
                  <div className="absolute bottom-2 right-3 bg-white/85 px-3 py-1 rounded-full text-[11px] font-black text-pink-700 flex items-center gap-1.5 shadow-xs">
                    <Sparkles size={13} className="text-amber-500 fill-amber-400" />
                    <span>{currentPage.interactiveHint}</span>
                  </div>
                </div>

                {/* STORY TEXT WITH CLICKABLE VOCABULARY */}
                <div className="text-center my-2 max-w-lg">
                  <p className="text-lg sm:text-xl font-black text-slate-800 leading-relaxed">
                    {currentPage.text.split(' ').map((word, i) => {
                      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toUpperCase();
                      const isHighlighted = currentPage.highlightWords.includes(cleanWord);
                      return (
                        <span
                          key={i}
                          className={
                            isHighlighted
                              ? 'text-pink-600 bg-pink-100 px-2 py-0.5 rounded-lg font-black border-b-2 border-pink-400 mx-0.5 inline-block cursor-pointer hover:bg-pink-200'
                              : 'mx-0.5'
                          }
                          onClick={() => {
                            if (isHighlighted) {
                              soundService.playPop();
                              soundService.speak(word);
                            }
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </p>
                </div>

                {/* NAVIGATION BUTTONS */}
                <div className="flex items-center justify-between w-full mt-3 pt-3 border-t border-pink-100">
                  <motion.button
                    disabled={currentPageIdx === 0}
                    whileHover={currentPageIdx > 0 ? { scale: 1.04 } : {}}
                    whileTap={currentPageIdx > 0 ? { scale: 0.96 } : {}}
                    onClick={handlePrev}
                    className={`py-2.5 px-4 sm:px-5 rounded-2xl font-black text-sm border-2 flex items-center gap-1.5 cursor-pointer ${
                      currentPageIdx > 0
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <ArrowLeft size={16} />
                    <span>Sebelumnya</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="py-2.5 px-6 bg-gradient-to-b from-pink-400 to-pink-500 hover:from-pink-300 hover:to-pink-400 text-white font-black text-sm sm:text-base rounded-2xl border-2 border-white shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-[0_1px_0_#be123c] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentPageIdx === activePages.length - 1 ? 'Selesai!' : 'Lanjut'}</span>
                    <ArrowRight size={18} className="stroke-[3]" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* REWARD POPUP */}
        <RewardPopup
          isOpen={showReward}
          childName={childName}
          title="Cerita Selesai!"
          message={`Hebat, ${childName}! Kamu sudah menyelesaikan cerita ${selectedStory?.title || ''}!`}
          starsEarned={3}
          onPlayAgain={() => {
            setShowReward(false);
            setCurrentPageIdx(0);
          }}
          onGoHome={() => {
            setShowReward(false);
            setSelectedStory(null);
          }}
        />
      </div>
    </ForestBackground>
  );
};
