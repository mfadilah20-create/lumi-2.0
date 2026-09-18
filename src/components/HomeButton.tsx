import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { soundService } from '../services/soundService';

interface HomeButtonProps {
  onClick: () => void;
  variant?: 'icon' | 'pill';
  label?: string;
  className?: string;
}

export const HomeButton: React.FC<HomeButtonProps> = ({
  onClick,
  variant = 'pill',
  label = 'Kembali ke Hutan',
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    onClick();
  };

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-emerald-700 border-2 border-emerald-300 shadow-md flex items-center justify-center cursor-pointer hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-3 focus:ring-emerald-400 ${className}`}
        title="Kembali ke Beranda"
        aria-label="Kembali ke Beranda"
      >
        <Home className="w-6 h-6 stroke-[2.5]" />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 1 }}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 text-emerald-800 font-black text-sm sm:text-base border-2 border-emerald-300 shadow-[0_4px_12px_rgba(16,185,129,0.15)] cursor-pointer hover:bg-emerald-50 transition-all focus:outline-none focus:ring-3 focus:ring-emerald-400 ${className}`}
      title={label}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 stroke-[3] text-emerald-600" />
      <Home className="w-5 h-5 stroke-[2.5] text-emerald-600" />
      <span>{label}</span>
    </motion.button>
  );
};
