import React from 'react';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';
import { soundService } from '../services/soundService';

interface SettingsButtonProps {
  onOpen: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  onOpen,
  className = '',
  style,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    onOpen();
  };

  return (
    <motion.button
      id="settings-button-ui"
      whileHover={{ scale: 1.1, rotate: 20 }}
      whileTap={{ scale: 0.92, rotate: -15 }}
      onClick={handleClick}
      style={style}
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#4A2810] border-2 sm:border-3 border-[#F6D285] shadow-[0_4px_14px_rgba(180,83,9,0.12),0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center cursor-pointer hover:bg-[#FFFDF6] transition-colors focus:outline-none focus:ring-3 focus:ring-amber-400 select-none ${className}`}
      title="Pengaturan Orang Tua"
      aria-label="Pengaturan Orang Tua"
    >
      <Settings className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-[#7A4B1A]" />
    </motion.button>
  );
};
