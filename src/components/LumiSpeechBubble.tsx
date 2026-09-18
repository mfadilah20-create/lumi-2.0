import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';

interface LumiSpeechBubbleProps {
  message: string;
  subMessage?: string;
  speakerText?: string;
  pointerDirection?: 'left' | 'bottom' | 'right' | 'top';
  className?: string;
  onSpeak?: () => void;
}

export const LumiSpeechBubble: React.FC<LumiSpeechBubbleProps> = ({
  message,
  subMessage,
  speakerText,
  pointerDirection = 'right',
  className = '',
  onSpeak,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 3 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative inline-flex items-center gap-3 bg-[#FFFDF7] px-4 sm:px-5 py-3 sm:py-3.5 rounded-3xl border-3 border-[#FDE68A] shadow-[0_6px_16px_rgba(180,83,9,0.08),0_2px_4px_rgba(0,0,0,0.04)] max-w-sm sm:max-w-md ${className}`}
    >
      <div className="flex-1 text-left">
        <p className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight leading-snug">
          {message}
        </p>
        {subMessage && (
          <p className="text-xs sm:text-sm font-bold text-[#64748B] mt-0.5 leading-snug">
            {subMessage}
          </p>
        )}
      </div>

      {onSpeak && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onSpeak();
          }}
          className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#FEF3C7] text-[#92400E] border-2 border-[#FDE68A] flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#FDE68A] transition-colors"
          title="Dengar suara Lumi"
          aria-label="Dengar suara Lumi"
        >
          <Volume2 size={16} className="stroke-[2.5]" />
        </motion.button>
      )}

      {/* Pointer triangle */}
      {pointerDirection === 'right' && (
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[12px] border-l-[#FFFDF7] filter drop-shadow-[2px_0_1px_rgba(253,230,138,0.8)]" />
      )}
      {pointerDirection === 'left' && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[12px] border-r-[#FFFDF7] filter drop-shadow-[-2px_0_1px_rgba(253,230,138,0.8)]" />
      )}
      {pointerDirection === 'bottom' && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-[12px] border-t-[#FFFDF7] filter drop-shadow-[0_2px_1px_rgba(253,230,138,0.8)]" />
      )}
      {pointerDirection === 'top' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[12px] border-b-[#FFFDF7] filter drop-shadow-[0_-2px_1px_rgba(253,230,138,0.8)]" />
      )}
    </motion.div>
  );
};
