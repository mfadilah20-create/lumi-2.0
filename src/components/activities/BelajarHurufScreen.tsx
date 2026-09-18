import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { ForestBackground } from '../ForestBackground';
import { ActivityHeader } from '../ActivityHeader';
import { LumiCharacter } from '../LumiCharacter';
import { LumiSpeechBubble } from '../LumiSpeechBubble';
import { AudioButton } from '../AudioButton';
import { WordIllustration } from '../WordIllustrations';
import { RewardPopup } from '../RewardPopup';
import { FeedbackBanner } from '../FeedbackBanner';
import { PROTOTYPE_LETTERS, WORD_BANK } from '../../data/wordBank';
import { soundService } from '../../services/soundService';
import { LumiState } from '../../types';

interface BelajarHurufProps {
  childName: string;
  onBack: () => void;
}

export const BelajarHurufScreen: React.FC<BelajarHurufProps> = ({
  childName,
  onBack,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [lumiState, setLumiState] = useState<LumiState>('greeting');
  const [lumiSpeech, setLumiSpeech] = useState<string>('Ini huruf A. A untuk Apel!');
  const [practiceMode, setPracticeMode] = useState<boolean>(false);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showReward, setShowReward] = useState<boolean>(false);

  const currentItem = WORD_BANK[selectedLetter] || WORD_BANK['A'];

  const handleSelectLetter = (letter: string) => {
    soundService.playPop();
    setSelectedLetter(letter);
    setPracticeMode(false);
    setFeedbackStatus('idle');

    const item = WORD_BANK[letter];
    if (item) {
      setLumiState('pointing');
      const speech = `Ini huruf ${item.letter}. ${item.letter} untuk ${item.word}!`;
      setLumiSpeech(speech);
      soundService.speak(speech);
    }
  };

  const handleTouchLetter = () => {
    soundService.playSparkle();
    setLumiState('happy');
    const msg = `Huruf ${currentItem.letter}... bunyi nya /${currentItem.phoneticSound}/!`;
    setLumiSpeech(msg);
    soundService.speak(msg);
  };

  const handleTouchObject = () => {
    soundService.playPop();
    setLumiState('celebrate');
    const msg = `${currentItem.word}! ${currentItem.letter} untuk ${currentItem.word}!`;
    setLumiSpeech(msg);
    soundService.speak(msg);
  };

  const handleStartPractice = () => {
    soundService.playPop();
    setPracticeMode(true);
    setFeedbackStatus('idle');
    setLumiState('curious');
    const msg = `Yang mana huruf ${currentItem.letter}? Yuk sentuh!`;
    setLumiSpeech(msg);
    soundService.speak(msg);
  };

  const handleAnswerPractice = (chosenLetter: string) => {
    if (chosenLetter === currentItem.letter) {
      soundService.playSuccess();
      setFeedbackStatus('correct');
      setFeedbackMessage(`Hebat! Itu huruf ${currentItem.letter}!`);
      setLumiState('celebrate');
      soundService.speak(`Hebat, ${childName}! Kamu benar!`, () => {
        setShowReward(true);
      });
    } else {
      soundService.playGentleRetry();
      setFeedbackStatus('wrong');
      setFeedbackMessage('Hmm... coba lagi, yuk.');
      setLumiState('encourage');
      soundService.speak('Hmm... coba lagi, yuk.');
      setTimeout(() => setFeedbackStatus('idle'), 2200);
    }
  };

  // 3 choices for the practice
  const practiceChoices = [
    currentItem.letter,
    ...PROTOTYPE_LETTERS.filter((l) => l !== currentItem.letter).slice(0, 2),
  ].sort();

  return (
    <ForestBackground>
      <div className="relative w-full h-full min-h-screen flex flex-col justify-between select-none">
        <ActivityHeader
          title="Belajar Huruf"
          subtitle="Kenali huruf dan bendanya!"
          onBack={onBack}
          bgGradient="from-yellow-100 to-amber-200"
        />

        <FeedbackBanner status={feedbackStatus} message={feedbackMessage} />

        {/* LETTER SELECTOR PILLS */}
        <div className="w-full px-4 mb-2 z-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-2xl mx-auto">
            {PROTOTYPE_LETTERS.map((letter) => {
              const item = WORD_BANK[letter];
              const isSelected = letter === selectedLetter;
              return (
                <motion.button
                  key={letter}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectLetter(letter)}
                  className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all cursor-pointer border-3 ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 border-white shadow-[0_5px_0_#d97706] scale-105'
                      : 'bg-white/90 text-slate-700 border-amber-200 shadow-[0_3px_0_rgba(0,0,0,0.1)] hover:bg-amber-50'
                  }`}
                  aria-label={`Pilih huruf ${letter}`}
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* MAIN INTERACTIVE LEARNING CARD */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-6 z-20">
          <AnimatePresence mode="wait">
            {!practiceMode ? (
              // LEARNING VIEW
              <motion.div
                key={currentItem.letter}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-amber-300 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-5 sm:p-8 flex flex-col items-center"
              >
                {/* Upper row: Big Letter & Object Illustration */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full items-center justify-items-center mb-6">
                  {/* Big Touchable Letter */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleTouchLetter}
                    className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-amber-100 rounded-3xl border-3 border-amber-300 shadow-[0_6px_0_#d97706] cursor-pointer w-full max-w-[200px]"
                    title="Sentuh untuk mendengar bunyi huruf!"
                  >
                    <div className="text-6xl sm:text-8xl font-black text-amber-600 tracking-tight leading-none drop-shadow-sm">
                      {currentItem.letter}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-amber-400 leading-none mt-1">
                      {currentItem.lowercase}
                    </div>
                    <span className="text-xs font-black text-amber-800 uppercase tracking-widest mt-2 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      Sentuh Aku!
                    </span>
                  </motion.div>

                  {/* Touchable Object Illustration */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleTouchObject}
                    className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-sky-50 to-sky-100 rounded-3xl border-3 border-sky-300 shadow-[0_6px_0_#0284c7] cursor-pointer w-full max-w-[200px]"
                    title="Sentuh gambar untuk mendengar kata!"
                  >
                    <WordIllustration name={currentItem.svgIcon} className="w-24 sm:w-32 h-24 sm:h-32 drop-shadow-md" />
                    <div className="text-xl sm:text-2xl font-black text-sky-900 tracking-wide mt-2">
                      {currentItem.word}
                    </div>
                    <span className="text-xs font-black text-sky-800 uppercase tracking-widest mt-1 bg-sky-200/80 px-2.5 py-0.5 rounded-full">
                      Sentuh Gambar!
                    </span>
                  </motion.div>
                </div>

                {/* Audio bar button: "A... Apel!" */}
                <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-300 px-5 py-2.5 rounded-full mb-6 shadow-xs">
                  <AudioButton
                    textToSpeak={`${currentItem.letter}... ${currentItem.word}! ${currentItem.letter} untuk ${currentItem.word}!`}
                    size="md"
                    label={`${currentItem.letter}... ${currentItem.word}!`}
                  />
                </div>

                {/* Start Mini-Practice Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartPractice}
                  className="py-3.5 px-8 bg-gradient-to-b from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-white font-black text-lg sm:text-xl rounded-2xl border-3 border-white shadow-[0_6px_0_#059669] active:translate-y-1 active:shadow-[0_2px_0_#059669] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>COBA TEBAK HURUF</span>
                  <Sparkles size={22} className="animate-spin" />
                </motion.button>
              </motion.div>
            ) : (
              // PRACTICE QUIZ VIEW ("Tebak Huruf")
              <motion.div
                key="practice-quiz"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-emerald-300 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-6 sm:p-8 flex flex-col items-center text-center"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 mb-2">
                  <WordIllustration name={currentItem.svgIcon} className="w-full h-full drop-shadow-md" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">
                  Huruf awal untuk <span className="text-emerald-600">{currentItem.word}</span> apa ya?
                </h3>
                <p className="text-sm font-bold text-slate-500 mb-6">
                  Pilih huruf yang cocok:
                </p>

                {/* Choices */}
                <div className="flex gap-4 sm:gap-6 justify-center mb-6 w-full max-w-md">
                  {practiceChoices.map((choice) => (
                    <motion.button
                      key={choice}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleAnswerPractice(choice)}
                      className="flex-1 py-4 sm:py-5 bg-gradient-to-b from-amber-200 to-amber-300 hover:from-amber-100 hover:to-amber-200 text-amber-950 font-black text-3xl sm:text-4xl rounded-2xl border-3 border-white shadow-[0_6px_0_#d97706] active:translate-y-1 active:shadow-[0_2px_0_#d97706] transition-all cursor-pointer"
                    >
                      {choice}
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setPracticeMode(false)}
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Kembali ke pengenalan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* BOTTOM LUMI COMPANION BAR */}
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
          title="Kamu Hebat!"
          message={`Kamu sudah mengenali huruf ${currentItem.letter} dan kata ${currentItem.word}!`}
          starsEarned={3}
          onPlayAgain={() => {
            setShowReward(false);
            setPracticeMode(false);
            setFeedbackStatus('idle');
          }}
          onGoHome={onBack}
        />
      </div>
    </ForestBackground>
  );
};
