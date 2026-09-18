import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ForestBackground } from './ForestBackground';
import { LumiCharacter } from './LumiCharacter';
import { soundService } from '../services/soundService';

interface OnboardingScreenProps {
  onComplete: (nickname: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'splash' | 'ask-name' | 'greeting'>('splash');
  const [name, setName] = useState('');

  const handleStart = () => {
    soundService.playPop();
    soundService.startBgm();
    setStep('ask-name');
    soundService.speak('Halo! Siapa namamu?');
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      soundService.playSuccess();
      setStep('greeting');
      soundService.speak(`Hai, ${name.trim()}! Aku LUMI. Mau bermain bersama?`);
    }
  };

  const handleFinish = () => {
    soundService.playSuccess();
    onComplete(name.trim());
  };

  return (
    <ForestBackground>
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 select-none z-20">
        {/* STEP 1: SPLASH */}
        {step === 'splash' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-sm sm:max-w-md bg-[#FFFDF7]/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border-3 border-[#FDE68A] shadow-[0_12px_32px_rgba(180,83,9,0.12)]"
          >
            {/* Storybook Logo Badge */}
            <div className="flex items-center gap-2 bg-[#FEF9C3] border-2 border-[#FDE047] px-5 py-2 rounded-full mb-3 shadow-xs">
              <span className="text-xl">🌱</span>
              <span className="text-2xl sm:text-3xl font-black text-[#92400E] tracking-wider">
                LUMI
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#854D0E] mb-3">
              Teman kecil untuk tumbuh dan belajar.
            </p>

            <LumiCharacter state="greeting" size="lg" className="my-1" />

            <p className="text-sm sm:text-base font-black text-[#334155] mt-2 mb-6 leading-relaxed">
              Selamat datang di <span className="text-[#15803D]">Hutan Teman LUMI</span>!
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleStart}
              className="w-full py-3.5 sm:py-4 px-6 bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-lg sm:text-xl rounded-2xl border-2 border-white shadow-[0_6px_0_#15803D] active:translate-y-1 active:shadow-[0_2px_0_#15803D] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>MULAI PETUALANGAN</span>
              <Sparkles size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2: CHILD NICKNAME */}
        {step === 'ask-name' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-sm sm:max-w-md bg-[#FFFDF7]/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border-3 border-[#FDE68A] shadow-[0_12px_32px_rgba(180,83,9,0.12)] w-full"
          >
            <LumiCharacter state="curious" size="md" className="mb-2" />

            <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] mb-1">
              Siapa namamu?
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#64748B] mb-5">
              Tulis nama panggilanmu, ya!
            </p>

            <form onSubmit={handleNameSubmit} className="w-full space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama panggilan..."
                maxLength={12}
                autoFocus
                className="w-full text-center text-2xl sm:text-3xl font-black text-[#1E293B] py-3 px-4 bg-[#FFFBEB] border-2 border-[#FDE68A] rounded-2xl focus:outline-none focus:border-[#F59E0B] shadow-inner tracking-wide"
              />

              <motion.button
                type="submit"
                disabled={!name.trim()}
                whileHover={name.trim() ? { scale: 1.04 } : {}}
                whileTap={name.trim() ? { scale: 0.96 } : {}}
                className={`w-full py-3.5 sm:py-4 px-6 font-black text-lg sm:text-xl rounded-2xl border-2 border-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  name.trim()
                    ? 'bg-[#38BDF8] text-white shadow-[0_6px_0_#0284C7] active:translate-y-1 active:shadow-[0_2px_0_#0284C7]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300'
                }`}
              >
                <span>LANJUT</span>
                <ArrowRight size={22} className="stroke-[3]" />
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: GREETING & CONFIRMATION */}
        {step === 'greeting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-sm sm:max-w-md bg-[#FFFDF7]/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border-3 border-[#FDE68A] shadow-[0_12px_32px_rgba(180,83,9,0.12)] w-full"
          >
            <LumiCharacter state="happy" size="lg" className="mb-2" />

            <div className="bg-[#FEF9C3] border-2 border-[#FDE68A] px-5 py-3 rounded-2xl mb-5 shadow-xs">
              <p className="text-xl sm:text-2xl font-black text-[#1E293B]">
                Hai, <span className="text-[#0284C7]">{name.trim()}</span>! Aku LUMI.
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#854D0E] mt-1">
                Mau bermain dan belajar bersama?
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinish}
              className="w-full py-3.5 sm:py-4 px-6 bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-xl sm:text-2xl rounded-2xl border-2 border-white shadow-[0_6px_0_#15803D] active:translate-y-1 active:shadow-[0_2px_0_#15803D] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>AYO!</span>
              <Sparkles size={24} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </ForestBackground>
  );
};
