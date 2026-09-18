import React from 'react';
import { motion } from 'motion/react';
import { soundService } from '../../services/soundService';

interface ActivityButtonProps {
  icon: string;
  label: string;
  color: ActivityButtonColor;
  onPress: () => void;
}

type ActivityButtonColor = 'amber' | 'purple' | 'emerald' | 'sky' | 'pink';

const colorStyles: Record<ActivityButtonColor, {
  bg: string;
  border: string;
  shadow: string;
  activeShadow: string;
  ring: string;
  iconBg: string;
}> = {
  amber: {
    bg: 'from-amber-300 to-amber-400',
    border: 'border-amber-500',
    shadow: 'shadow-[0_6px_0_#b45309,0_8px_20px_rgba(180,83,9,0.3)]',
    activeShadow: 'shadow-[0_2px_0_#b45309,0_4px_10px_rgba(180,83,9,0.2)]',
    ring: 'hover:ring-amber-200',
    iconBg: 'bg-amber-100',
  },
  purple: {
    bg: 'from-purple-300 to-purple-400',
    border: 'border-purple-500',
    shadow: 'shadow-[0_6px_0_#7e22ce,0_8px_20px_rgba(126,34,206,0.3)]',
    activeShadow: 'shadow-[0_2px_0_#7e22ce,0_4px_10px_rgba(126,34,206,0.2)]',
    ring: 'hover:ring-purple-200',
    iconBg: 'bg-purple-100',
  },
  emerald: {
    bg: 'from-emerald-300 to-emerald-400',
    border: 'border-emerald-500',
    shadow: 'shadow-[0_6px_0_#047857,0_8px_20px_rgba(4,120,87,0.3)]',
    activeShadow: 'shadow-[0_2px_0_#047857,0_4px_10px_rgba(4,120,87,0.2)]',
    ring: 'hover:ring-emerald-200',
    iconBg: 'bg-emerald-100',
  },
  sky: {
    bg: 'from-sky-300 to-sky-400',
    border: 'border-sky-500',
    shadow: 'shadow-[0_6px_0_#0369a1,0_8px_20px_rgba(3,105,161,0.3)]',
    activeShadow: 'shadow-[0_2px_0_#0369a1,0_4px_10px_rgba(3,105,161,0.2)]',
    ring: 'hover:ring-sky-200',
    iconBg: 'bg-sky-100',
  },
  pink: {
    bg: 'from-pink-300 to-pink-400',
    border: 'border-pink-500',
    shadow: 'shadow-[0_6px_0_#be185d,0_8px_20px_rgba(190,24,93,0.3)]',
    activeShadow: 'shadow-[0_2px_0_#be185d,0_4px_10px_rgba(190,24,93,0.2)]',
    ring: 'hover:ring-pink-200',
    iconBg: 'bg-pink-100',
  },
};

export const ActivityButton: React.FC<ActivityButtonProps> = ({
  icon,
  label,
  color,
  onPress,
}) => {
  const c = colorStyles[color];

  const handleClick = () => {
    soundService.playPop();
    soundService.playSparkle();
    onPress();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 3 }}
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center gap-1.5 sm:gap-2
        w-full h-full rounded-3xl bg-gradient-to-b ${c.bg} border-3 ${c.border}
        ${c.shadow} active:${c.activeShadow}
        transition-all duration-150 cursor-pointer select-none
        focus:outline-none focus:ring-4 ${c.ring}
        p-3 sm:p-4`}
      aria-label={label}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
          rounded-2xl ${c.iconBg} shadow-inner`}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl drop-shadow-sm">
          {icon}
        </span>
      </div>
      <span
        className="font-extrabold text-white text-sm sm:text-base md:text-lg
          tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]
          text-center leading-tight"
      >
        {label}
      </span>
    </motion.button>
  );
};
