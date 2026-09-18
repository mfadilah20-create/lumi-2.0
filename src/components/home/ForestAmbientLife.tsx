import React from 'react';
import { motion } from 'motion/react';

export const ForestAmbientLife: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15 select-none">
      {/* ============================================================== */}
      {/* 1. SOFT SUNLIGHT / GODRAYS (Translucent warm forest light)     */}
      {/* ============================================================== */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-[28%] w-[45%] h-[65%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(254, 240, 138, 0.28) 0%, rgba(253, 224, 71, 0.1) 45%, transparent 75%)',
          transform: 'rotate(-4deg)',
        }}
      />
      {/* Individual subtle sunbeam streaks */}
      <motion.div
        animate={{ opacity: [0.12, 0.25, 0.12], x: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-0 left-[34%] w-[12%] h-[70%] pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%)',
          filter: 'blur(3px)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.1, 0.22, 0.1], x: [0, -3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-0 left-[48%] w-[14%] h-[60%] pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, transparent 0%, rgba(254, 243, 199, 0.25) 50%, transparent 100%)',
          filter: 'blur(4px)',
        }}
      />

      {/* ============================================================== */}
      {/* 2. CLOUDS (Slow horizontal drift in the top sky)               */}
      {/* ============================================================== */}
      <motion.div
        animate={{ x: [-20, 35, -20] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[2.5%] left-[32%] w-[18%] h-[6%] opacity-40 pointer-events-none"
      >
        <svg viewBox="0 0 120 40" className="w-full h-full fill-white/80 filter blur-[0.5px]">
          <path d="M10,30 Q15,12 35,15 Q45,2 65,10 Q85,4 95,18 Q110,18 110,30 Z" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ x: [25, -25, 25] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-[4%] left-[62%] w-[14%] h-[5%] opacity-35 pointer-events-none"
      >
        <svg viewBox="0 0 100 35" className="w-full h-full fill-white/75 filter blur-[0.5px]">
          <path d="M10,25 Q18,10 35,12 Q45,2 60,10 Q75,6 85,16 Q95,16 95,25 Z" />
        </svg>
      </motion.div>

      {/* ============================================================== */}
      {/* 3. WATERFALL FLOW (Left cliff, continuous flowing water)       */}
      {/* ============================================================== */}
      <div
        className="absolute top-[21%] left-[5%] w-[13.5%] h-[30%] overflow-hidden pointer-events-none"
        style={{ clipPath: 'polygon(15% 0%, 85% 0%, 98% 100%, 2% 100%)' }}
      >
        {/* Shimmering vertical cascading water threads */}
        <motion.div
          animate={{ y: ['-50%', '0%'] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          className="w-full h-[200%] flex flex-col"
        >
          {[0, 1].map((idx) => (
            <div key={idx} className="w-full h-1/2 relative flex justify-around px-1">
              <div className="w-[18%] h-full bg-gradient-to-b from-white/40 via-sky-200/50 to-white/60 blur-[0.5px] rounded-full" />
              <div className="w-[22%] h-full bg-gradient-to-b from-sky-100/50 via-white/70 to-sky-200/50 blur-[0.6px] rounded-full" />
              <div className="w-[16%] h-full bg-gradient-to-b from-white/35 via-sky-100/60 to-white/50 blur-[0.5px] rounded-full" />
              <div className="w-[19%] h-full bg-gradient-to-b from-cyan-100/45 via-white/65 to-sky-200/40 blur-[0.6px] rounded-full" />
            </div>
          ))}
        </motion.div>

        {/* Soft water spray / sparkles */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-white/35 pointer-events-none"
        />
      </div>

      {/* Waterfall Splash Mist (At the basin/pool) */}
      <motion.div
        animate={{ scale: [0.95, 1.06, 0.95], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[49%] left-[4.8%] w-[14%] h-[6%] rounded-full bg-white/45 filter blur-[3px] pointer-events-none"
      />
      {/* Tiny rising mist bubble particles */}
      <motion.div
        animate={{ y: [0, -12, -20], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        className="absolute top-[49%] left-[8%] w-2 h-2 rounded-full bg-white/70 filter blur-[0.5px]"
      />
      <motion.div
        animate={{ y: [0, -10, -18], opacity: [0, 0.7, 0], scale: [0.6, 1.1, 0.4] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
        className="absolute top-[49.5%] left-[12%] w-1.5 h-1.5 rounded-full bg-white/80 filter blur-[0.5px]"
      />

      {/* ============================================================== */}
      {/* 4. STREAM / RIVER POOL (Gentle flowing/shimmering water)        */}
      {/* ============================================================== */}
      <div className="absolute top-[53%] left-[6%] w-[18%] h-[20%] pointer-events-none">
        {/* Soft horizontal ripple glints */}
        <motion.div
          animate={{ scaleX: [0.85, 1.15, 0.85], opacity: [0.25, 0.65, 0.25], x: [-3, 3, -3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[25%] left-[15%] w-[60%] h-[3px] rounded-full bg-white/60 blur-[0.6px]"
        />
        <motion.div
          animate={{ scaleX: [1.1, 0.85, 1.1], opacity: [0.3, 0.7, 0.3], x: [3, -3, 3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[50%] left-[25%] w-[55%] h-[2.5px] rounded-full bg-white/55 blur-[0.6px]"
        />
        <motion.div
          animate={{ scaleX: [0.9, 1.1, 0.9], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          className="absolute top-[72%] left-[10%] w-[50%] h-[2px] rounded-full bg-white/50 blur-[0.6px]"
        />
      </div>

      {/* ============================================================== */}
      {/* 5. TREE CANOPY & LEAF SWAY                                     */}
      {/* ============================================================== */}
      {/* Top-right large foliage subtle ambient sway */}
      <motion.div
        animate={{ rotate: [-0.8, 1.0, -0.8] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[30%] h-[28%] pointer-events-none origin-top-right"
      >
        {/* Soft leaf highlight overlay */}
        <div
          className="w-full h-full opacity-10 bg-gradient-to-bl from-emerald-200 to-transparent rounded-bl-full"
          style={{ filter: 'blur(8px)' }}
        />
      </motion.div>

      {/* Drifting Leaves (3 gentle, stylized leaves floating across breeze) */}
      <motion.div
        animate={{
          x: [0, 90, 180],
          y: [0, 80, 160],
          rotate: [0, 140, 260],
          opacity: [0, 0.75, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[8%] left-[22%] w-3.5 h-3.5 text-emerald-400 pointer-events-none"
      >
        🍃
      </motion.div>
      <motion.div
        animate={{
          x: [0, -80, -160],
          y: [0, 90, 180],
          rotate: [0, -120, -240],
          opacity: [0, 0.7, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4.5 }}
        className="absolute top-[12%] right-[24%] w-3.5 h-3.5 text-amber-300 pointer-events-none"
      >
        🍂
      </motion.div>
      <motion.div
        animate={{
          x: [0, 70, 140],
          y: [0, 75, 150],
          rotate: [15, 90, 200],
          opacity: [0, 0.65, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-[18%] left-[45%] w-3 h-3 text-emerald-300 pointer-events-none"
      >
        🍃
      </motion.div>

      {/* ============================================================== */}
      {/* 6. WILDFLOWER & GRASS GENTLE SWAY                              */}
      {/* ============================================================== */}
      {/* Left meadow flowers */}
      <motion.div
        animate={{ rotate: [-2, 2.5, -2] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[64.5%] left-[25.8%] w-[4%] h-[6%] origin-bottom pointer-events-none"
      >
        <div className="w-full h-full flex items-center justify-center opacity-75 drop-shadow-xs text-xs">
          🌸
        </div>
      </motion.div>
      {/* Right meadow flowers */}
      <motion.div
        animate={{ rotate: [2.5, -2, 2.5] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[65.5%] left-[69.5%] w-[4%] h-[6%] origin-bottom pointer-events-none"
      >
        <div className="w-full h-full flex items-center justify-center opacity-75 drop-shadow-xs text-xs">
          🌼
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* 7. BUTTERFLIES (Gentle flutter over the flower meadow)         */}
      {/* ============================================================== */}
      {/* Butterfly 1: Golden-yellow butterfly near left river meadow */}
      <motion.div
        animate={{
          x: [0, 14, 24, 8, 0],
          y: [0, -10, -4, -12, 0],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[57%] left-[17.5%] w-6 h-6 pointer-events-none"
      >
        <motion.div
          animate={{ scaleX: [1, 0.25, 1] }}
          transition={{ duration: 0.28, repeat: Infinity, ease: 'easeInOut' }}
          className="text-base filter drop-shadow-xs"
        >
          🦋
        </motion.div>
      </motion.div>

      {/* Butterfly 2: Soft cyan butterfly on the right */}
      <motion.div
        animate={{
          x: [0, -16, -8, -22, 0],
          y: [0, -8, -14, -6, 0],
        }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute top-[47%] left-[76%] w-6 h-6 pointer-events-none"
      >
        <motion.div
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut' }}
          className="text-base filter drop-shadow-xs"
        >
          🦋
        </motion.div>
      </motion.div>

      {/* ============================================================== */}
      {/* 8. SMALL FOREST ANIMALS SUBTLE IDLE LIFE                       */}
      {/* ============================================================== */}
      {/* Squirrel on tree branch (top left) - tiny tail & ear twitch */}
      <div className="absolute top-[13.5%] left-[5.2%] w-[8%] h-[12%] pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 3, 0, -2, 0], y: [0, -1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        />
      </div>

      {/* White Bunny in meadow (bottom left) - soft breathing & ear wiggle */}
      <div className="absolute top-[67.5%] left-[8%] w-[9%] h-[18%] pointer-events-none">
        <motion.div
          animate={{ scaleY: [1, 1.025, 1], y: [0, -0.8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        />
      </div>

      {/* Deer in background right - soft breathing */}
      <div className="absolute top-[51.5%] left-[87.5%] w-[11.5%] h-[24%] pointer-events-none">
        <motion.div
          animate={{ scaleY: [1, 1.018, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        />
      </div>

      {/* Bluebird perched on branch (top right) - head tilt & wing shuffle */}
      <div className="absolute top-[15.5%] left-[89.5%] w-[8%] h-[11%] pointer-events-none">
        <motion.div
          animate={{ rotate: [0, -4, 0, 3, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
