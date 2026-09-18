import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, RotateCcw, Target, Layers, Wind } from 'lucide-react';
import { ForestBackground } from '../ForestBackground';
import { ActivityHeader } from '../ActivityHeader';
import { LumiCharacter } from '../LumiCharacter';
import { LumiSpeechBubble } from '../LumiSpeechBubble';
import { RewardPopup } from '../RewardPopup';
import { FeedbackBanner } from '../FeedbackBanner';
import { WordIllustration } from '../WordIllustrations';
import { PROTOTYPE_LETTERS, WORD_BANK } from '../../data/wordBank';
import { soundService } from '../../services/soundService';
import { LumiState } from '../../types';

interface BermainScreenProps {
  childName: string;
  onBack: () => void;
}

type GameType = 'menu' | 'cari-huruf' | 'pasangkan' | 'tangkap-huruf';

export const BermainScreen: React.FC<BermainScreenProps> = ({
  childName,
  onBack,
}) => {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [lumiState, setLumiState] = useState<LumiState>('greeting');
  const [lumiSpeech, setLumiSpeech] = useState<string>('Pilih game seru yang ingin kamu mainkan!');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showReward, setShowReward] = useState<boolean>(false);
  const [rewardTitle, setRewardTitle] = useState<string>('Hebat!');
  const [rewardSubtitle, setRewardSubtitle] = useState<string>('Kamu berhasil!');

  // ================= GAME 1: CARI HURUF STATE =================
  const [cariTarget, setCariTarget] = useState<string>('A');
  const [cariOptions, setCariOptions] = useState<string[]>([]);
  const [cariFound, setCariFound] = useState<string | null>(null);

  const initCariHuruf = (targetLetter = 'A') => {
    setCariTarget(targetLetter);
    setCariFound(null);
    setFeedbackStatus('idle');
    const others = PROTOTYPE_LETTERS.filter((l) => l !== targetLetter);
    // Shuffle and pick 3 options
    const shuffled = [targetLetter, ...others.slice(0, 3)].sort(() => Math.random() - 0.5);
    setCariOptions(shuffled);
    const msg = `Ayo cari huruf ${targetLetter}!`;
    setLumiSpeech(msg);
    setLumiState('curious');
    soundService.speak(msg);
  };

  const handleCariSelect = (letter: string) => {
    if (letter === cariTarget) {
      soundService.playSuccess();
      setCariFound(letter);
      setFeedbackStatus('correct');
      setFeedbackMessage(`Hebat! Itu huruf ${cariTarget}!`);
      setLumiState('celebrate');
      soundService.speak(`Bagus sekali, ${childName}! Kamu menemukan huruf ${cariTarget}!`, () => {
        setRewardTitle('Pencari Hebat!');
        setRewardSubtitle(`Kamu berhasil menemukan huruf ${cariTarget}!`);
        setShowReward(true);
      });
    } else {
      soundService.playGentleRetry();
      setFeedbackStatus('wrong');
      setFeedbackMessage('Hmm... coba lagi, yuk.');
      setLumiState('encourage');
      soundService.speak('Hmm... coba lagi, yuk.');
      setTimeout(() => setFeedbackStatus('idle'), 2000);
    }
  };

  // ================= GAME 2: PASANGKAN (MATCHING) STATE =================
  const [matchPairs, setMatchPairs] = useState<{ letter: string; word: string; icon: string }[]>([]);
  const [selectedLetterCard, setSelectedLetterCard] = useState<string | null>(null);
  const [selectedWordCard, setSelectedWordCard] = useState<string | null>(null);
  const [matchedLetters, setMatchedLetters] = useState<string[]>([]);

  const initPasangkan = () => {
    const pairs = ['A', 'B', 'C'].map((l) => ({
      letter: l,
      word: WORD_BANK[l].word,
      icon: WORD_BANK[l].svgIcon,
    }));
    setMatchPairs(pairs);
    setSelectedLetterCard(null);
    setSelectedWordCard(null);
    setMatchedLetters([]);
    setFeedbackStatus('idle');
    const msg = 'Pasangkan huruf dengan gambarnya yang cocok, ya!';
    setLumiSpeech(msg);
    setLumiState('curious');
    soundService.speak(msg);
  };

  const handleSelectLetterCard = (letter: string) => {
    if (matchedLetters.includes(letter)) return;
    soundService.playPop();
    setSelectedLetterCard(letter);

    // If word card is already chosen, check match
    if (selectedWordCard) {
      checkMatch(letter, selectedWordCard);
    } else {
      soundService.speak(`Huruf ${letter}`);
    }
  };

  const handleSelectWordCard = (wordLetter: string) => {
    if (matchedLetters.includes(wordLetter)) return;
    soundService.playPop();
    setSelectedWordCard(wordLetter);

    // If letter card is already chosen, check match
    if (selectedLetterCard) {
      checkMatch(selectedLetterCard, wordLetter);
    } else {
      soundService.speak(WORD_BANK[wordLetter].word);
    }
  };

  const checkMatch = (letter: string, wordLetter: string) => {
    if (letter === wordLetter) {
      soundService.playSparkle();
      const updated = [...matchedLetters, letter];
      setMatchedLetters(updated);
      setSelectedLetterCard(null);
      setSelectedWordCard(null);
      setFeedbackStatus('correct');
      setFeedbackMessage(`Cocok! ${letter} untuk ${WORD_BANK[letter].word}!`);
      setLumiState('celebrate');
      soundService.speak(`Cocok! ${letter} untuk ${WORD_BANK[letter].word}!`);

      if (updated.length === matchPairs.length) {
        setTimeout(() => {
          setRewardTitle('Pasangan Cocok!');
          setRewardSubtitle('Semua huruf dan gambar sudah terpasang!');
          setShowReward(true);
        }, 1200);
      }
    } else {
      soundService.playGentleRetry();
      setSelectedLetterCard(null);
      setSelectedWordCard(null);
      setFeedbackStatus('wrong');
      setFeedbackMessage('Belum cocok... coba lagi, yuk!');
      setLumiState('encourage');
      soundService.speak('Belum cocok... coba lagi, yuk!');
      setTimeout(() => setFeedbackStatus('idle'), 2000);
    }
  };

  // ================= GAME 3: TANGKAP HURUF (CATCHING) STATE =================
  const [catchTarget, setCatchTarget] = useState<string>('M');
  const [catchScore, setCatchScore] = useState<number>(0);
  const [floatingLeaves, setFloatingLeaves] = useState<
    { id: number; letter: string; x: number; y: number; speed: number }[]
  >([]);

  const initTangkapHuruf = (target = 'M') => {
    setCatchTarget(target);
    setCatchScore(0);
    setFeedbackStatus('idle');

    // Generate 5 initial leaves floating
    const initial = [
      { id: 1, letter: target, x: 20, y: 15, speed: 3 },
      { id: 2, letter: 'A', x: 70, y: 30, speed: 4 },
      { id: 3, letter: target, x: 45, y: 60, speed: 3.5 },
      { id: 4, letter: 'B', x: 80, y: 75, speed: 4.2 },
      { id: 5, letter: target, x: 15, y: 70, speed: 3.8 },
    ];
    setFloatingLeaves(initial);

    const msg = `Ayo tangkap daun dengan huruf ${target}!`;
    setLumiSpeech(msg);
    setLumiState('happy');
    soundService.speak(msg);
  };

  const handleCatchLeaf = (leafId: number, letter: string) => {
    if (letter === catchTarget) {
      soundService.playSparkle();
      soundService.playPop();
      // Remove leaf
      setFloatingLeaves((prev) => prev.filter((l) => l.id !== leafId));
      const nextScore = catchScore + 1;
      setCatchScore(nextScore);
      setFeedbackStatus('correct');
      setFeedbackMessage(`Dapat! Daun huruf ${catchTarget}!`);
      setLumiState('celebrate');

      if (nextScore >= 3) {
        soundService.playSuccess();
        setTimeout(() => {
          setRewardTitle('Penangkap Hebat!');
          setRewardSubtitle(`Kamu berhasil menangkap daun huruf ${catchTarget}!`);
          setShowReward(true);
        }, 800);
      }
    } else {
      soundService.playGentleRetry();
      setFeedbackStatus('wrong');
      setFeedbackMessage(`Itu huruf ${letter}... cari ${catchTarget}, ya!`);
      setLumiState('encourage');
      setTimeout(() => setFeedbackStatus('idle'), 2000);
    }
  };

  const startSubGame = (type: GameType) => {
    soundService.playPop();
    setCurrentGame(type);
    if (type === 'cari-huruf') initCariHuruf('A');
    if (type === 'pasangkan') initPasangkan();
    if (type === 'tangkap-huruf') initTangkapHuruf('M');
  };

  return (
    <ForestBackground>
      <div className="relative w-full h-full min-h-screen flex flex-col justify-between select-none">
        <ActivityHeader
          title={
            currentGame === 'menu'
              ? 'Bermain Game'
              : currentGame === 'cari-huruf'
              ? 'Cari Huruf'
              : currentGame === 'pasangkan'
              ? 'Pasangkan Kartu'
              : 'Tangkap Daun Huruf'
          }
          subtitle={
            currentGame === 'menu'
              ? 'Pilih petualanganmu!'
              : currentGame === 'cari-huruf'
              ? `Cari huruf ${cariTarget}!`
              : currentGame === 'pasangkan'
              ? 'Cocokkan huruf dan gambar'
              : `Tangkap daun huruf ${catchTarget}!`
          }
          onBack={currentGame === 'menu' ? onBack : () => setCurrentGame('menu')}
          bgGradient="from-green-100 to-emerald-200"
        />

        <FeedbackBanner status={feedbackStatus} message={feedbackMessage} />

        {/* WORKSPACE CONTENT */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-5 z-20">
          <AnimatePresence mode="wait">
            {/* 1. GAME SELECTION MENU */}
            {currentGame === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-emerald-300 shadow-[0_12px_32px_rgba(22,163,74,0.18)] p-6 sm:p-8 flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                    Pilih Game Seru!
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-emerald-700">
                    Bermain sambil mengenal huruf bersama LUMI
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                  {/* 1. Cari Huruf (Functional) */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startSubGame('cari-huruf')}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-gradient-to-b from-amber-100 to-amber-200 hover:from-amber-50 hover:to-amber-100 rounded-3xl border-3 border-amber-400 shadow-[0_5px_0_#d97706] cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px]">
                      Main
                    </span>
                    <div className="text-3xl mb-1.5">🎈</div>
                    <span className="text-sm sm:text-base font-black text-amber-950 mb-0.5">
                      Cari Huruf
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 leading-tight">
                      Temukan huruf yang diminta
                    </span>
                  </motion.button>

                  {/* 2. Pasangkan (Functional) */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startSubGame('pasangkan')}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-gradient-to-b from-sky-100 to-sky-200 hover:from-sky-50 hover:to-sky-100 rounded-3xl border-3 border-sky-400 shadow-[0_5px_0_#0284c7] cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px]">
                      Main
                    </span>
                    <div className="text-3xl mb-1.5">🧠</div>
                    <span className="text-sm sm:text-base font-black text-sky-950 mb-0.5">
                      Pasangkan
                    </span>
                    <span className="text-[11px] font-bold text-sky-800 leading-tight">
                      Cocokkan kartu & gambar
                    </span>
                  </motion.button>

                  {/* 3. Tangkap Huruf (Functional) */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startSubGame('tangkap-huruf')}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-gradient-to-b from-emerald-100 to-emerald-200 hover:from-emerald-50 hover:to-emerald-100 rounded-3xl border-3 border-emerald-400 shadow-[0_5px_0_#059669] cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px]">
                      Main
                    </span>
                    <div className="text-3xl mb-1.5">🎯</div>
                    <span className="text-sm sm:text-base font-black text-emerald-950 mb-0.5">
                      Tangkap Huruf
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 leading-tight">
                      Sentuh daun berhuruf
                    </span>
                  </motion.button>

                  {/* 4. Puzzle Huruf (Upcoming) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      soundService.playPop();
                      setFeedbackStatus('idle');
                      const msg = 'Puzzle Huruf akan segera hadir di petualangan berikutnya!';
                      setLumiSpeech(msg);
                      soundService.speak(msg);
                    }}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl border-2 border-slate-200 opacity-90 cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px]">
                      Segera
                    </span>
                    <div className="text-3xl mb-1.5 opacity-80">🧩</div>
                    <span className="text-sm font-black text-slate-700 mb-0.5">
                      Puzzle Huruf
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 leading-tight">
                      Susun kepingan puzzle
                    </span>
                  </motion.button>

                  {/* 5. Hubungkan (Upcoming) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      soundService.playPop();
                      const msg = 'Game Hubungkan garis akan segera hadir!';
                      setLumiSpeech(msg);
                      soundService.speak(msg);
                    }}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl border-2 border-slate-200 opacity-90 cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px]">
                      Segera
                    </span>
                    <div className="text-3xl mb-1.5 opacity-80">🔗</div>
                    <span className="text-sm font-black text-slate-700 mb-0.5">
                      Hubungkan
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 leading-tight">
                      Tarik garis ke bayangan
                    </span>
                  </motion.button>

                  {/* 6. Susun Huruf (Upcoming) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      soundService.playPop();
                      const msg = 'Kereta susun huruf akan segera datang!';
                      setLumiSpeech(msg);
                      soundService.speak(msg);
                    }}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl border-2 border-slate-200 opacity-90 cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px]">
                      Segera
                    </span>
                    <div className="text-3xl mb-1.5 opacity-80">🚂</div>
                    <span className="text-sm font-black text-slate-700 mb-0.5">
                      Susun Huruf
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 leading-tight">
                      Susun di gerbong kereta
                    </span>
                  </motion.button>

                  {/* 7. Tebak Bunyi (Upcoming) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      soundService.playPop();
                      const msg = 'Tebak Bunyi fonik huruf akan segera datang!';
                      setLumiSpeech(msg);
                      soundService.speak(msg);
                    }}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl border-2 border-slate-200 opacity-90 cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px]">
                      Segera
                    </span>
                    <div className="text-3xl mb-1.5 opacity-80">🔊</div>
                    <span className="text-sm font-black text-slate-700 mb-0.5">
                      Tebak Bunyi
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 leading-tight">
                      Dengarkan lalu pilih
                    </span>
                  </motion.button>

                  {/* 8. Pasangan Cepat (Upcoming) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      soundService.playPop();
                      const msg = 'Game Pasangan Cepat akan segera datang!';
                      setLumiSpeech(msg);
                      soundService.speak(msg);
                    }}
                    className="flex flex-col items-center p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl border-2 border-slate-200 opacity-90 cursor-pointer text-center relative"
                  >
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px]">
                      Segera
                    </span>
                    <div className="text-3xl mb-1.5 opacity-80">🌟</div>
                    <span className="text-sm font-black text-slate-700 mb-0.5">
                      Pasangan Cepat
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 leading-tight">
                      Temukan kartu kembar
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* 2. GAME 1: CARI HURUF */}
            {currentGame === 'cari-huruf' && (
              <motion.div
                key="cari-huruf"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-amber-300 shadow-[0_12px_32px_rgba(245,158,11,0.2)] p-6 sm:p-8 flex flex-col items-center"
              >
                <div className="bg-amber-100 px-6 py-2.5 rounded-full border-2 border-amber-400 mb-6 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-amber-900">
                    Cari huruf: <span className="text-3xl text-rose-600 underline decoration-amber-400">{cariTarget}</span>
                  </span>
                </div>

                {/* 4 Storybook Leaf/Stone Cards */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm mb-6">
                  {cariOptions.map((letter, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleCariSelect(letter)}
                      className={`h-24 sm:h-28 rounded-3xl border-4 flex items-center justify-center font-black text-4xl sm:text-5xl shadow-[0_6px_0_#b45309] active:translate-y-1 active:shadow-[0_2px_0_#b45309] transition-all cursor-pointer ${
                        cariFound === letter
                          ? 'bg-emerald-300 text-emerald-950 border-white shadow-[0_6px_0_#059669]'
                          : 'bg-gradient-to-b from-amber-100 via-yellow-100 to-amber-200 text-amber-950 border-amber-300'
                      }`}
                    >
                      {letter}
                    </motion.button>
                  ))}
                </div>

                {/* Next target selector buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Ganti Target:</span>
                  {PROTOTYPE_LETTERS.map((l) => (
                    <button
                      key={l}
                      onClick={() => initCariHuruf(l)}
                      className={`w-8 h-8 rounded-xl font-black text-sm border-2 cursor-pointer ${
                        cariTarget === l
                          ? 'bg-amber-400 border-amber-600 text-amber-950'
                          : 'bg-slate-100 border-slate-300 text-slate-600'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. GAME 2: PASANGKAN (MATCHING) */}
            {currentGame === 'pasangkan' && (
              <motion.div
                key="pasangkan"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-sky-300 shadow-[0_12px_32px_rgba(56,189,248,0.2)] p-5 sm:p-7 flex flex-col items-center"
              >
                <p className="text-base sm:text-lg font-black text-slate-700 mb-4">
                  Sentuh satu huruf, lalu sentuh gambarnya yang cocok!
                </p>

                {/* Matching Board: Left Column (Letters) vs Right Column (Images) */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-md mb-6">
                  {/* Letters Column */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                      Huruf
                    </span>
                    {matchPairs.map((pair) => {
                      const isMatched = matchedLetters.includes(pair.letter);
                      const isSelected = selectedLetterCard === pair.letter;
                      return (
                        <motion.button
                          key={pair.letter}
                          disabled={isMatched}
                          whileHover={!isMatched ? { scale: 1.05 } : {}}
                          whileTap={!isMatched ? { scale: 0.95 } : {}}
                          onClick={() => handleSelectLetterCard(pair.letter)}
                          className={`h-20 rounded-2xl border-3 flex items-center justify-center font-black text-3xl transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-300 opacity-70'
                              : isSelected
                              ? 'bg-sky-400 text-white border-white shadow-[0_5px_0_#0284c7] scale-105'
                              : 'bg-white text-slate-800 border-sky-200 shadow-[0_4px_0_#bae6fd]'
                          }`}
                        >
                          {pair.letter}
                          {isMatched && <Check size={20} className="ml-2 text-emerald-600 stroke-[3]" />}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Words/Images Column (Shuffled visually) */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                      Gambar
                    </span>
                    {[...matchPairs].reverse().map((pair) => {
                      const isMatched = matchedLetters.includes(pair.letter);
                      const isSelected = selectedWordCard === pair.letter;
                      return (
                        <motion.button
                          key={pair.letter}
                          disabled={isMatched}
                          whileHover={!isMatched ? { scale: 1.05 } : {}}
                          whileTap={!isMatched ? { scale: 0.95 } : {}}
                          onClick={() => handleSelectWordCard(pair.letter)}
                          className={`h-20 rounded-2xl border-3 flex items-center justify-center gap-3 px-3 transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 border-emerald-300 opacity-70'
                              : isSelected
                              ? 'bg-sky-400 border-white shadow-[0_5px_0_#0284c7] scale-105'
                              : 'bg-white border-sky-200 shadow-[0_4px_0_#bae6fd]'
                          }`}
                        >
                          <WordIllustration name={pair.icon} className="w-10 h-10" />
                          <span
                            className={`font-black text-base sm:text-lg ${
                              isSelected ? 'text-white' : 'text-slate-800'
                            }`}
                          >
                            {pair.word}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={initPasangkan}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  Mulai Ulang Pasangan
                </button>
              </motion.div>
            )}

            {/* 4. GAME 3: TANGKAP HURUF (FLOATING FOREST LEAVES) */}
            {currentGame === 'tangkap-huruf' && (
              <motion.div
                key="tangkap-huruf"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-emerald-300 shadow-[0_12px_32px_rgba(16,185,129,0.2)] p-5 sm:p-7 flex flex-col items-center"
              >
                {/* Score & Target Header */}
                <div className="flex items-center justify-between w-full mb-3 px-3">
                  <div className="bg-emerald-100 border-2 border-emerald-400 px-4 py-1.5 rounded-full text-sm font-black text-emerald-900">
                    Target: Daun Huruf <span className="text-xl text-rose-600">{catchTarget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                          i <= catchScore
                            ? 'bg-amber-400 border-amber-600 text-amber-950 shadow-xs'
                            : 'bg-slate-100 border-slate-300 text-slate-400'
                        }`}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating River / Sky Field with Animated Leaves */}
                <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#ecfdf5] to-[#d1fae5] rounded-3xl border-3 border-emerald-300 overflow-hidden shadow-inner p-4">
                  {floatingLeaves.map((leaf) => (
                    <motion.button
                      key={leaf.id}
                      animate={{
                        y: [0, -12, 0],
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: leaf.speed,
                        ease: 'easeInOut',
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCatchLeaf(leaf.id, leaf.letter)}
                      style={{
                        position: 'absolute',
                        left: `${leaf.x}%`,
                        top: `${leaf.y}%`,
                      }}
                      className="group cursor-pointer -translate-x-1/2 -translate-y-1/2"
                    >
                      {/* Leaf Shape SVG with letter in center */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full drop-shadow-md">
                          <path
                            d="M10 50 C10 20 20 10 50 10 C50 40 40 50 10 50 Z"
                            fill="#86EFAC"
                            stroke="#16A34A"
                            strokeWidth="3"
                          />
                          <path d="M10 50 Q30 30 50 10" stroke="#16A34A" strokeWidth="2" fill="none" />
                        </svg>
                        <span className="relative z-10 font-black text-2xl text-emerald-950 drop-shadow-xs">
                          {leaf.letter}
                        </span>
                      </div>
                    </motion.button>
                  ))}

                  {floatingLeaves.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Sparkles size={40} className="text-amber-500 mb-2 animate-bounce" />
                      <p className="text-lg font-black text-emerald-900">
                        Semua daun tertangkap!
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between w-full mt-3 px-2">
                  <span className="text-xs font-bold text-slate-500">
                    Sentuh daun huruf {catchTarget} yang melayang!
                  </span>
                  <button
                    onClick={() => initTangkapHuruf(catchTarget)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    Acak Daun
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* BOTTOM LUMI COMPANION */}
        <footer className="w-full p-3 sm:p-4 flex items-center justify-center gap-4 z-20">
          <LumiCharacter
            state={lumiState}
            size="sm"
            onClick={() => soundService.speak(lumiSpeech)}
          />
          <LumiSpeechBubble
            message={lumiSpeech}
            pointerDirection="left"
            className="max-w-xs sm:max-w-md"
            onSpeak={() => soundService.speak(lumiSpeech)}
          />
        </footer>

        {/* REWARD POPUP */}
        <RewardPopup
          isOpen={showReward}
          childName={childName}
          title={rewardTitle}
          message={rewardSubtitle}
          starsEarned={3}
          onPlayAgain={() => {
            setShowReward(false);
            if (currentGame === 'cari-huruf') initCariHuruf(cariTarget);
            if (currentGame === 'pasangkan') initPasangkan();
            if (currentGame === 'tangkap-huruf') initTangkapHuruf(catchTarget);
          }}
          onGoHome={() => {
            setShowReward(false);
            setCurrentGame('menu');
          }}
        />
      </div>
    </ForestBackground>
  );
};
