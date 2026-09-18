import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { ForestBackground } from '../ForestBackground';
import { ActivityHeader } from '../ActivityHeader';
import { LumiCharacter } from '../LumiCharacter';
import { LumiSpeechBubble } from '../LumiSpeechBubble';
import { RewardPopup } from '../RewardPopup';
import { FeedbackBanner } from '../FeedbackBanner';
import { WordIllustration } from '../WordIllustrations';
import { PROTOTYPE_WORDS, PROTOTYPE_SYLLABLES, WORD_BANK } from '../../data/wordBank';
import { soundService } from '../../services/soundService';
import { LumiState } from '../../types';

interface MembacaScreenProps {
  childName: string;
  onBack: () => void;
}

export const MembacaScreen: React.FC<MembacaScreenProps> = ({
  childName,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'suku-kata' | 'kata'>('suku-kata');
  const [selectedSyllableIdx, setSelectedSyllableIdx] = useState<number>(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number>(0);

  const [lumiState, setLumiState] = useState<LumiState>('greeting');
  const [lumiSpeech, setLumiSpeech] = useState<string>('Ayo baca bersama LUMI!');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showReward, setShowReward] = useState<boolean>(false);
  const [highlightedPart, setHighlightedPart] = useState<number | null>(null);

  const currentSyllable = PROTOTYPE_SYLLABLES[selectedSyllableIdx];
  const currentWord = PROTOTYPE_WORDS[selectedWordIdx];

  // Tap letter in syllable (e.g. [B] then [A])
  const handleTapLetterInSyllable = (letter: string, sound: string) => {
    soundService.playPop();
    setLumiSpeech(`Huruf ${letter}, bunyinya /${sound}/!`);
    soundService.speak(letter);
  };

  // Blend syllable together
  const handleBlendSyllable = () => {
    soundService.playSparkle();
    setLumiState('celebrate');
    setFeedbackStatus('correct');
    const msg = `${currentSyllable.consonant}... ${currentSyllable.vowel}... dibaca ${currentSyllable.syllable}!`;
    setLumiSpeech(msg);
    soundService.speak(`${currentSyllable.syllable}! Hebat!`, () => {
      setTimeout(() => setFeedbackStatus('idle'), 2000);
    });
  };

  // Tap word: highlight syllable by syllable, then full word!
  const handleReadWord = async () => {
    soundService.playPop();
    setLumiState('pointing');

    // Step 1: highlight first syllable
    setHighlightedPart(0);
    soundService.speak(currentWord.syllables[0]);

    // Step 2: highlight second syllable
    setTimeout(() => {
      setHighlightedPart(1);
      soundService.speak(currentWord.syllables[1]);
    }, 900);

    // Step 3: highlight entire word and celebrate
    setTimeout(() => {
      setHighlightedPart(null);
      soundService.playSuccess();
      setLumiState('celebrate');
      setFeedbackStatus('correct');
      const msg = `${currentWord.word}! Kamu pintar membaca, ${childName}!`;
      setLumiSpeech(msg);
      soundService.speak(msg, () => {
        setTimeout(() => setFeedbackStatus('idle'), 2000);
      });
    }, 1900);
  };

  const handleFinishSession = () => {
    setShowReward(true);
  };

  return (
    <ForestBackground>
      <div className="relative w-full h-full min-h-screen flex flex-col justify-between select-none">
        <ActivityHeader
          title="Belajar Membaca"
          subtitle="Gabungkan huruf jadi kata!"
          onBack={onBack}
          bgGradient="from-sky-100 to-sky-200"
        />

        <FeedbackBanner
          status={feedbackStatus}
          message="Hebat! Kamu bisa membaca!"
        />

        {/* TAB SELECTOR: SUKU KATA vs KATA UTUH */}
        <div className="w-full px-4 mb-2 z-20">
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto bg-white/80 backdrop-blur-xs p-1.5 rounded-2xl border-2 border-sky-300 shadow-xs">
            <button
              onClick={() => {
                soundService.playPop();
                setActiveTab('suku-kata');
                setLumiSpeech('Sentuh huruf untuk mengeja, lalu gabungkan!');
              }}
              className={`flex-1 py-2 rounded-xl font-black text-sm transition-all cursor-pointer ${
                activeTab === 'suku-kata'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-sky-800 hover:bg-sky-50'
              }`}
            >
              Suku Kata
            </button>
            <button
              onClick={() => {
                soundService.playPop();
                setActiveTab('kata');
                setLumiSpeech('Ayo baca kata utuh bersama gambarnya!');
              }}
              className={`flex-1 py-2 rounded-xl font-black text-sm transition-all cursor-pointer ${
                activeTab === 'kata'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-sky-800 hover:bg-sky-50'
              }`}
            >
              Kata Utuh
            </button>
          </div>
        </div>

        {/* MAIN READING BOARD */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-5 z-20">
          <AnimatePresence mode="wait">
            {/* TAB 1: SUKU KATA (BA, BI, BU / MA, MI, MU) */}
            {activeTab === 'suku-kata' && (
              <motion.div
                key="suku-kata"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-sky-300 shadow-[0_12px_32px_rgba(56,189,248,0.2)] p-5 sm:p-7 flex flex-col items-center"
              >
                {/* Syllable Selector Carousel */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-4 max-w-full">
                  {PROTOTYPE_SYLLABLES.map((s, idx) => (
                    <button
                      key={s.syllable}
                      onClick={() => {
                        soundService.playPop();
                        setSelectedSyllableIdx(idx);
                        soundService.speak(s.syllable);
                      }}
                      className={`px-4 py-2 rounded-xl font-black text-base border-2 cursor-pointer transition-all ${
                        idx === selectedSyllableIdx
                          ? 'bg-sky-400 text-white border-sky-600 shadow-[0_3px_0_#0284c7]'
                          : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                      }`}
                    >
                      {s.syllable}
                    </button>
                  ))}
                </div>

                {/* Big Blending Interactive Cards */}
                <div className="flex items-center justify-center gap-3 sm:gap-5 mb-6">
                  {/* Consonant Card */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTapLetterInSyllable(currentSyllable.consonant, 'b')}
                    className="w-20 sm:w-24 h-24 sm:h-28 rounded-3xl bg-gradient-to-b from-amber-100 to-amber-200 border-3 border-amber-400 shadow-[0_6px_0_#d97706] flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-4xl sm:text-5xl font-black text-amber-900">
                      {currentSyllable.consonant}
                    </span>
                    <span className="text-[10px] font-extrabold text-amber-700 mt-1">
                      SENTUH
                    </span>
                  </motion.button>

                  <span className="text-3xl font-black text-slate-400">+</span>

                  {/* Vowel Card */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTapLetterInSyllable(currentSyllable.vowel, 'a')}
                    className="w-20 sm:w-24 h-24 sm:h-28 rounded-3xl bg-gradient-to-b from-rose-100 to-rose-200 border-3 border-rose-400 shadow-[0_6px_0_#e11d48] flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-4xl sm:text-5xl font-black text-rose-900">
                      {currentSyllable.vowel}
                    </span>
                    <span className="text-[10px] font-extrabold text-rose-700 mt-1">
                      SENTUH
                    </span>
                  </motion.button>

                  <span className="text-3xl font-black text-slate-400">=</span>

                  {/* Result Syllable Card */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleBlendSyllable}
                    className="w-24 sm:w-28 h-24 sm:h-28 rounded-3xl bg-gradient-to-b from-emerald-200 to-emerald-300 border-3 border-emerald-500 shadow-[0_6px_0_#059669] flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-3xl sm:text-4xl font-black text-emerald-950">
                      {currentSyllable.syllable}
                    </span>
                    <span className="text-[10px] font-black text-emerald-800 uppercase mt-1">
                      BUNYIKAN!
                    </span>
                  </motion.button>
                </div>

                {/* Big Blend Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBlendSyllable}
                  className="py-3 px-8 bg-gradient-to-b from-sky-400 to-sky-500 text-white font-black text-lg rounded-2xl border-3 border-white shadow-[0_5px_0_#0284c7] active:translate-y-1 active:shadow-[0_1px_0_#0284c7] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Volume2 size={22} />
                  <span>DENGARKAN: {currentSyllable.syllable}</span>
                </motion.button>
              </motion.div>
            )}

            {/* TAB 2: KATA UTUH (BOLA, BUKU, MATA, SAPI) */}
            {activeTab === 'kata' && (
              <motion.div
                key="kata"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-sky-300 shadow-[0_12px_32px_rgba(56,189,248,0.2)] p-5 sm:p-7 flex flex-col items-center"
              >
                {/* Word Selectors */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                  {PROTOTYPE_WORDS.map((w, idx) => (
                    <button
                      key={w.word}
                      onClick={() => {
                        soundService.playPop();
                        setSelectedWordIdx(idx);
                        setHighlightedPart(null);
                        soundService.speak(w.word);
                      }}
                      className={`px-4 py-2 rounded-xl font-black text-sm sm:text-base border-2 cursor-pointer transition-all ${
                        idx === selectedWordIdx
                          ? 'bg-sky-500 text-white border-sky-600 shadow-[0_3px_0_#0284c7]'
                          : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                      }`}
                    >
                      {w.word}
                    </button>
                  ))}
                </div>

                {/* Big Word Illustration */}
                <div className="w-28 sm:w-36 h-28 sm:h-36 mb-3 flex items-center justify-center">
                  <WordIllustration name={currentWord.icon} className="w-full h-full drop-shadow-md" />
                </div>

                {/* Syllable by Syllable interactive word display */}
                <div className="flex items-center gap-2 sm:gap-3 mb-6">
                  {currentWord.syllables.map((syl, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        soundService.playPop();
                        setHighlightedPart(idx);
                        soundService.speak(syl);
                      }}
                      className={`px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-black text-3xl sm:text-4xl border-3 transition-all cursor-pointer ${
                        highlightedPart === idx
                          ? 'bg-amber-300 text-amber-950 border-amber-500 shadow-[0_6px_0_#d97706] scale-110'
                          : 'bg-sky-100 text-sky-900 border-sky-300 shadow-[0_4px_0_#7dd3fc]'
                      }`}
                    >
                      {syl}
                    </motion.button>
                  ))}
                </div>

                {/* Read aloud button */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReadWord}
                    className="py-3 px-6 bg-gradient-to-b from-emerald-400 to-emerald-500 text-white font-black text-base sm:text-lg rounded-2xl border-3 border-white shadow-[0_5px_0_#059669] active:translate-y-1 active:shadow-[0_1px_0_#059669] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Volume2 size={22} />
                    <span>BACA BERSAMA</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFinishSession}
                    className="py-3 px-5 bg-gradient-to-b from-amber-300 to-amber-400 text-amber-950 font-black text-base rounded-2xl border-2 border-white shadow-[0_4px_0_#d97706] cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles size={18} />
                    <span>Selesai</span>
                  </motion.button>
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
          title="Hebat Membaca!"
          message={`Kamu sudah belajar membaca kata bersama LUMI!`}
          starsEarned={3}
          onPlayAgain={() => {
            setShowReward(false);
            setFeedbackStatus('idle');
          }}
          onGoHome={onBack}
        />
      </div>
    </ForestBackground>
  );
};
