import React from 'react';
import { motion } from 'motion/react';
import { ChildProfile } from '../../types';
import { soundService } from '../../services/soundService';

interface ChildGreetingPillProps {
  childProfile?: ChildProfile;
  childName?: string;
}

export const ChildGreetingPill: React.FC<ChildGreetingPillProps> = ({
  childProfile,
  childName,
}) => {
  const activeNickname = (childProfile?.nickname || childName || '').trim();
  const greetingText = activeNickname
    ? `Halo, ${activeNickname}!`
    : 'Halo, teman LUMI!';

  const handleTap = () => {
    soundService.playPop();
    soundService.speak(`${greetingText} Selamat datang di Hutan Lumi!`);
  };

  return (
    <motion.div
      id="hotspot-greeting"
      style={{
        top: '6.8%',
        left: '2.4%',
        width: '24.6%',
        height: '11.2%',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="absolute z-30 flex items-center cursor-pointer group select-none"
      onClick={handleTap}
      title={greetingText}
    >
      {/* Seamless background fill for text area to match the master artwork pill */}
      <div
        className="absolute left-[38%] right-[4%] top-[14%] bottom-[14%] rounded-r-full flex items-center justify-center px-2 pointer-events-none"
        style={{
          backgroundColor: '#FAF2DE',
        }}
      >
        <span
          className="text-[#4A2810] font-black tracking-tight truncate w-full text-center select-none"
          style={{
            fontSize: 'clamp(11px, 1.35vw, 19px)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
        >
          {greetingText}
        </span>
      </div>

      {/* Interactive hover/tap ring feedback */}
      <div className="w-full h-full rounded-full transition-all group-hover:ring-4 group-hover:ring-amber-300/60" />
    </motion.div>
  );
};
