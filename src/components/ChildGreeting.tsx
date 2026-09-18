import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, User } from 'lucide-react';
import { soundService } from '../services/soundService';

interface ChildGreetingProps {
  nickname?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ChildGreeting: React.FC<ChildGreetingProps> = ({
  nickname = 'Izar',
  className = '',
  style,
}) => {
  const activeName = (nickname && nickname.trim().length > 0 && nickname.toLowerCase() !== 'adit')
    ? nickname.trim()
    : 'Izar';

  const greetingText = `Halo, ${activeName}!`;

  const handleTap = () => {
    soundService.playPop();
    soundService.speak(`${greetingText} Selamat datang di Hutan Lumi!`);
  };

  return (
    <motion.button
      id="child-greeting-ui"
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96, y: 1 }}
      onClick={handleTap}
      style={style}
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FAF2DE] border-2 sm:border-3 border-[#F6D285] shadow-[0_4px_14px_rgba(180,83,9,0.12),0_1px_3px_rgba(0,0,0,0.06)] cursor-pointer select-none transition-all group focus:outline-none focus:ring-3 focus:ring-amber-400 ${className}`}
      title={greetingText}
      aria-label={greetingText}
    >
      {/* Cute Child Avatar Circle */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-2 border-white flex items-center justify-center shadow-xs overflow-hidden text-amber-900 flex-shrink-0">
        <span className="text-base sm:text-lg select-none">👧</span>
      </div>

      {/* Greeting Typography */}
      <div className="flex flex-col text-left pr-1">
        <span
          className="text-[#4A2810] font-black tracking-tight leading-tight select-none"
          style={{
            fontSize: 'clamp(13px, 1.25vw, 18px)',
            fontFamily: '"Nunito", system-ui, sans-serif',
          }}
        >
          {greetingText}
        </span>
      </div>

      {/* Sparkle subtle icon */}
      <Sparkles className="w-3.5 h-3.5 text-amber-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all flex-shrink-0" />
    </motion.button>
  );
};
