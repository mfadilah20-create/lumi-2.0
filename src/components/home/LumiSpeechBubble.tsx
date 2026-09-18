import React from 'react';
import { motion } from 'motion/react';
import { soundService } from '../../services/soundService';

interface LumiSpeechBubbleProps {
  onTap?: () => void;
}

export const LumiSpeechBubble: React.FC<LumiSpeechBubbleProps> = ({ onTap }) => {
  const handleClick = () => {
    soundService.playPop();
    soundService.speak('Yuk, pilih aktivitasnya!');
    if (onTap) onTap();
  };

  return (
    <div
      id="hotspot-speech-bubble"
      className="relative cursor-pointer select-none group w-full"
      onClick={handleClick}
      title="Yuk, pilih aktivitasnya!"
    >
      <motion.div
        animate={{
          y: [0, -3, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        {/* Speech bubble body */}
        <div
          className="relative bg-white/95 rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5
            shadow-[0_4px_16px_rgba(0,0,0,0.12)] border-2 border-sky-200
            transition-all group-hover:ring-3 group-hover:ring-sky-300/50"
        >
          <span
            className="text-sky-800 font-bold text-xs sm:text-sm text-center
              leading-snug whitespace-nowrap select-none"
          >
            Yuk, pilih aktivitasnya!
          </span>
          {/* Bubble tail pointing down-left toward Lumi */}
          <div
            className="absolute -bottom-2 left-6 w-0 h-0
              border-l-[8px] border-l-transparent
              border-r-[8px] border-r-transparent
              border-t-[10px] border-t-white"
          />
          <div
            className="absolute -bottom-2.5 left-5 w-0 h-0
              border-l-[9px] border-l-transparent
              border-r-[9px] border-r-transparent
              border-t-[11px] border-t-sky-200"
            style={{ zIndex: -1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
