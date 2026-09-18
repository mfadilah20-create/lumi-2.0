import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, Home } from 'lucide-react';
import { LumiCharacter } from './LumiCharacter';
import { soundService } from '../services/soundService';

interface RewardPopupProps {
  isOpen: boolean;
  childName: string;
  title?: string;
  message?: string;
  starsEarned?: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const RewardPopup: React.FC<RewardPopupProps> = ({
  isOpen,
  childName,
  title = 'Kamu Hebat!',
  message = 'Kamu sudah menyelesaikan aktivitas ini!',
  starsEarned = 3,
  onPlayAgain,
  onGoHome,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundService.playSuccess();
      soundService.speak(`Kamu hebat, ${childName}! Luar biasa!`);
      // Trigger joyful celebration confetti
      try {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#FBBF24', '#4ADE80', '#F472B6', '#A78BFA'],
        });
      } catch {
        // safe fallback
      }
    }
  }, [isOpen, childName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 18, stiffness: 260 }}
            className="relative w-full max-w-md bg-gradient-to-b from-amber-50 via-white to-sky-50 rounded-3xl border-4 border-amber-300 shadow-[0_12px_36px_rgba(0,0,0,0.25)] p-6 sm:p-8 text-center flex flex-col items-center overflow-hidden"
          >
            {/* Top decorative badge */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

            {/* Glowing Main Golden Star */}
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="relative -mt-2 mb-2"
            >
              <div className="w-24 h-24 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-full flex items-center justify-center shadow-[0_6px_0_#d97706] border-4 border-white">
                <Star size={56} className="text-white fill-white drop-shadow-md" />
              </div>
            </motion.div>

            {/* Banner Title */}
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 px-6 py-2 rounded-full border-2 border-white shadow-[0_3px_0_#d97706] mb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-wide">
                {title}
              </h2>
            </div>

            <p className="text-slate-700 font-extrabold text-base sm:text-lg mb-1">
              Hebat, <span className="text-sky-600">{childName}</span>!
            </p>
            <p className="text-slate-500 font-bold text-sm max-w-xs mb-4">
              {message}
            </p>

            {/* 3 Stars display */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 * i, type: 'spring' }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-2 ${
                    i <= starsEarned
                      ? 'bg-amber-300 border-amber-500 text-amber-900 shadow-[0_3px_0_#d97706]'
                      : 'bg-slate-100 border-slate-300 text-slate-300'
                  }`}
                >
                  <Star size={24} className={i <= starsEarned ? 'fill-amber-500 text-amber-500' : ''} />
                </motion.div>
              ))}
            </div>

            {/* LUMI Happy Mascot */}
            <div className="mb-5">
              <LumiCharacter state="celebrate" size="sm" showShadow={false} />
            </div>

            {/* Action Buttons: LAGI & HOME */}
            <div className="flex flex-row gap-3 w-full justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundService.playPop();
                  onPlayAgain();
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-b from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-white font-black text-base sm:text-lg rounded-2xl border-2 border-white shadow-[0_5px_0_#0284c7] active:translate-y-1 active:shadow-[0_1px_0_#0284c7] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw size={20} className="stroke-[3]" />
                <span>MAIN LAGI</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundService.playPop();
                  onGoHome();
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-b from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-white font-black text-base sm:text-lg rounded-2xl border-2 border-white shadow-[0_5px_0_#059669] active:translate-y-1 active:shadow-[0_1px_0_#059669] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home size={20} className="stroke-[3]" />
                <span>HOME</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
