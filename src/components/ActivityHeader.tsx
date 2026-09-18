import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { soundService } from '../services/soundService';

interface ActivityHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  accentColor?: string;
}

export const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  title,
  subtitle,
  onBack,
}) => {
  const [isMusicOn, setIsMusicOn] = React.useState(soundService.isMusicOn());

  const toggleMusic = () => {
    soundService.playPop();
    setIsMusicOn(soundService.toggleBgm());
  };

  return (
    <header className="flex items-center justify-between gap-3 p-3 sm:p-5 z-30 select-none">
      {/* Back to Home Button (Storybook Warm Cream Tactile Pill) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          soundService.playPop();
          onBack();
        }}
        className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#FFFDF7] text-[#1E293B] flex items-center justify-center border-2 border-[#FDE68A] shadow-[0_4px_0_rgba(180,83,9,0.12)] active:translate-y-1 active:shadow-[0_1px_0_rgba(180,83,9,0.12)] cursor-pointer hover:bg-amber-50/50 transition-colors"
        aria-label="Kembali ke Beranda"
        title="Kembali ke Beranda"
      >
        <ArrowLeft size={22} className="stroke-[2.8] text-[#92400E]" />
      </motion.button>

      {/* Storybook Title Card */}
      <div className="px-5 sm:px-8 py-2 bg-[#FFFDF7] border-2 border-[#FDE68A] rounded-2xl shadow-[0_4px_12px_rgba(180,83,9,0.06)] text-center max-w-xs sm:max-w-md">
        <h1 className="text-lg sm:text-xl font-black text-[#1E293B] tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] sm:text-xs font-bold text-[#854D0E] opacity-90 leading-tight mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Controls: Music Toggle */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggleMusic}
          className={`w-10 sm:w-11 h-10 sm:h-11 rounded-2xl flex items-center justify-center border-2 border-[#FDE68A] shadow-[0_3px_0_rgba(180,83,9,0.12)] cursor-pointer transition-colors ${
            isMusicOn ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FFFDF7] text-[#94A3B8]'
          }`}
          aria-label="Toggle Musik"
          title={isMusicOn ? 'Matikan musik latar' : 'Nyalakan musik latar'}
        >
          {isMusicOn ? <Volume2 size={18} className="stroke-[2.5]" /> : <VolumeX size={18} />}
        </motion.button>
      </div>
    </header>
  );
};
