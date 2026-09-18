import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { soundService } from '../services/soundService';

interface AudioButtonProps {
  textToSpeak?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'circle' | 'icon';
  isMuted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  onClick,
  size = 'md',
  variant = 'circle',
  isMuted = false,
  className = '',
  style,
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();

    if (onClick) {
      onClick();
    } else if (textToSpeak) {
      setIsPlaying(true);
      soundService.speak(textToSpeak, () => {
        setIsPlaying(false);
      });
    }
  };

  if (variant === 'circle' || variant === 'icon') {
    return (
      <motion.button
        id="audio-button-ui"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={handlePlay}
        style={style}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#4A2810] border-2 sm:border-3 border-[#F6D285] shadow-[0_4px_14px_rgba(180,83,9,0.12),0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center cursor-pointer hover:bg-[#FFFDF6] transition-colors focus:outline-none focus:ring-3 focus:ring-amber-400 select-none ${className}`}
        title={isMuted ? 'Nyalakan Musik & Suara' : 'Matikan Musik'}
        aria-label={isMuted ? 'Nyalakan Musik & Suara' : 'Matikan Musik'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-amber-700/60" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-[#7A4B1A]" />
        )}
      </motion.button>
    );
  }

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1.5',
    md: 'p-2.5 text-sm gap-2',
    lg: 'p-3.5 text-base gap-2.5',
  }[size];

  const iconSizes = {
    sm: 16,
    md: 22,
    lg: 28,
  }[size];

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handlePlay}
      style={style}
      className={`inline-flex items-center justify-center font-bold text-sky-800 bg-gradient-to-b from-sky-100 to-sky-200 border-2 border-sky-400 rounded-full shadow-[0_3px_0_#38bdf8] active:translate-y-0.5 active:shadow-[0_1px_0_#38bdf8] transition-all cursor-pointer ${sizeClasses} ${className}`}
      aria-label={label || 'Dengarkan suara'}
    >
      <motion.span
        animate={isPlaying ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 0.8 }}
      >
        {isMuted ? (
          <VolumeX size={iconSizes} className="text-sky-600 drop-shadow-xs" />
        ) : (
          <Volume2 size={iconSizes} className="text-sky-600 drop-shadow-xs" />
        )}
      </motion.span>
      {label && <span className="font-extrabold pr-1 text-sky-900">{label}</span>}
    </motion.button>
  );
};
