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
      style={{
        top: '25%',
        left: '54%',
        width: '16%',
        height: '14%',
      }}
      className="absolute z-25 cursor-pointer flex items-center justify-center select-none group"
      onClick={handleClick}
      title="Yuk, pilih aktivitasnya!"
    >
      {/* Subtle floating/breathing idle animation (No continuous aggressive bouncing) */}
      <motion.div
        animate={{
          y: [0, -2.5, 0],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        {/* Subtle breathing glow ring on hover */}
        <div className="absolute inset-0 rounded-2xl transition-all group-hover:ring-3 group-hover:ring-sky-300/50" />
      </motion.div>
    </div>
  );
};
