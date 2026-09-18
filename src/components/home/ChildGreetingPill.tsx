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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="relative flex items-center cursor-pointer group select-none"
      onClick={handleTap}
      title={greetingText}
    >
      {/* Greeting pill background */}
      <div
        className="flex items-center justify-center px-4 py-2 rounded-full
          shadow-[0_3px_12px_rgba(0,0,0,0.1)] border-2 border-amber-300/60
          transition-all group-hover:ring-4 group-hover:ring-amber-300/60"
        style={{
          backgroundColor: '#FAF2DE',
        }}
      >
        <span
          className="text-[#4A2810] font-black tracking-tight truncate select-none"
          style={{
            fontSize: 'clamp(13px, 1.5vw, 20px)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
        >
          {greetingText}
        </span>
      </div>
    </motion.div>
  );
};
