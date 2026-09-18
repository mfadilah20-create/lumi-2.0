import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LumiIdleOverlayProps {
  onTap: () => void;
  heartEffect: boolean;
}

export const LumiIdleOverlay: React.FC<LumiIdleOverlayProps> = ({
  onTap,
  heartEffect,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural blinking cycle: blinks every ~3.6 seconds for 160ms
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setIsBlinking(true);
      blinkTimeout = setTimeout(() => {
        setIsBlinking(false);
      }, 160);
    }, 3800);

    return () => {
      clearInterval(interval);
      clearTimeout(blinkTimeout);
    };
  }, []);

  return (
    <div
      id="hotspot-lumi"
      style={{
        top: '24%',
        left: '37%',
        width: '23%',
        height: '30%',
      }}
      className="absolute z-25 cursor-pointer rounded-3xl group select-none"
      onClick={onTap}
      title="Ketuk Lumi untuk menyapa!"
    >
      {/* GENTLE LUMI IDLE BREATHING & AMBIENT LIFE */}
      <motion.div
        animate={{
          y: [0, -1.8, 0],
          scaleY: [1, 1.018, 1],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full pointer-events-none"
      >
        {/* 1. Sprout / Leaf Gentle Breeze Sway on Lumi's Head */}
        <motion.div
          animate={{
            rotate: [-3.5, 4.5, -3.5],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ originX: 0.5, originY: 1 }}
          className="absolute top-[3%] left-[45%] w-[12%] h-[15%] pointer-events-none"
        >
          {/* Translucent leaf sheen highlight */}
          <div className="w-full h-full bg-emerald-400/20 rounded-full blur-[1px]" />
        </motion.div>

        {/* 2. Natural Eye Blinking Overlay (Appears briefly every ~3.8s) */}
        <AnimatePresence>
          {isBlinking && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.2 }}
              transition={{ duration: 0.08 }}
              className="absolute top-[39%] left-[34%] w-[32%] h-[12%] flex items-center justify-between px-1 pointer-events-none"
            >
              {/* Left Eye Happy Arc */}
              <svg viewBox="0 0 24 12" className="w-[38%] h-full stroke-amber-950 stroke-[3.5] fill-none stroke-linecap-round">
                <path d="M 3,10 Q 12,2 21,10" />
              </svg>
              {/* Right Eye Happy Arc */}
              <svg viewBox="0 0 24 12" className="w-[38%] h-full stroke-amber-950 stroke-[3.5] fill-none stroke-linecap-round">
                <path d="M 3,10 Q 12,2 21,10" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Subtle Cheeks Blush Pulse */}
        <motion.div
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[48%] left-[28%] w-[44%] h-[10%] flex justify-between px-1 pointer-events-none"
        >
          <div className="w-3.5 h-2.5 rounded-full bg-rose-400/40 blur-[1px]" />
          <div className="w-3.5 h-2.5 rounded-full bg-rose-400/40 blur-[1px]" />
        </motion.div>

        {/* 4. Tiny friendly arm wave / tilt */}
        <motion.div
          animate={{
            rotate: [0, 4, 0, -2, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[55%] right-[22%] w-[12%] h-[16%] pointer-events-none origin-top-left"
        />
      </motion.div>

      {/* TAP HEARTS & SPARKLES BURST FEEDBACK */}
      <AnimatePresence>
        {heartEffect && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: [0, 1.25, 1], opacity: 1, y: -28 }}
            exit={{ scale: 1.3, opacity: 0, y: -45 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-2xl font-black drop-shadow-md pointer-events-none z-40"
          >
            <span className="animate-bounce">❤️</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            <span className="text-xl">✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover ring sheen */}
      <div className="w-full h-full rounded-3xl transition-colors group-hover:bg-white/10" />
    </div>
  );
};
