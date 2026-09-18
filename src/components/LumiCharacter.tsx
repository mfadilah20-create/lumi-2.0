import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LumiState } from '../types';
import { soundService } from '../services/soundService';

interface LumiCharacterProps {
  state?: LumiState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  showShadow?: boolean;
}

export const LumiCharacter: React.FC<LumiCharacterProps> = ({
  state = 'idle',
  size = 'md',
  className = '',
  onClick,
  showShadow = true,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Automatic gentle blink every 3.5 - 5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    soundService.playPop();
    onClick?.();
  };

  const dimensions = {
    sm: { w: 110, h: 132 },
    md: { w: 150, h: 180 },
    lg: { w: 220, h: 264 },
    xl: { w: 280, h: 336 },
  }[size];

  // Motion variants for states
  const bodyAnim = {
    idle: {
      y: [0, -4, 0],
      transition: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
    },
    greeting: {
      y: [0, -3, 0],
      rotate: [0, 2, -2, 0],
      transition: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
    },
    pointing: {
      y: [0, -3, 0],
      transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
    },
    happy: {
      y: [0, -14, 0, -8, 0],
      rotate: [0, 3, -3, 0],
      transition: { repeat: Infinity, duration: 1.6, ease: 'easeOut' },
    },
    celebrate: {
      y: [0, -18, 0, -10, 0],
      rotate: [-3, 3, -2, 2, 0],
      transition: { repeat: Infinity, duration: 1.4, ease: 'easeOut' },
    },
    curious: {
      rotate: [0, 6, 6, 0],
      y: [0, -2, 0],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
    },
    encourage: {
      scale: [1, 1.03, 1],
      y: [0, -4, 0],
      transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
    },
    reading: {
      y: [0, -2, 0],
      transition: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
    },
    sleepy: {
      y: [0, 2, 0],
      rotate: [0, 3, 0],
      transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
    },
  }[state];

  return (
    <motion.div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer ${className}`}
      style={{ width: dimensions.w, height: dimensions.h }}
      animate={bodyAnim}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      role="img"
      aria-label={`Lumi character - ${state}`}
    >
      <svg
        viewBox="0 0 160 190"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="lumiHeadGrad" x1="20" y1="20" x2="140" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.8" stopColor="#F0F9FF" />
            <stop offset="1" stopColor="#E0F2FE" />
          </linearGradient>

          <linearGradient id="lumiVisorGrad" x1="40" y1="40" x2="120" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F172A" />
            <stop offset="0.7" stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="lumiBlueAccent" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="lumiHeart" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ground Contact Shadow & Forest Meadow Integration */}
        {showShadow && (
          <g id="lumi-grounding">
            {/* Ambient diffused shadow */}
            <ellipse cx="80" cy="180" rx="48" ry="11" fill="#14381C" fillOpacity="0.22" />
            {/* Direct contact shadow under boots */}
            <ellipse cx="62" cy="178" rx="15" ry="5" fill="#0A1F10" fillOpacity="0.38" />
            <ellipse cx="98" cy="178" rx="15" ry="5" fill="#0A1F10" fillOpacity="0.38" />
            {/* Tiny forest meadow grass blades overlapping the boots */}
            <path d="M46 182 Q43 174 40 169 Q44 173 48 178 Z" fill="#22C55E" />
            <path d="M49 181 Q51 172 54 168 Q53 174 51 180 Z" fill="#4ADE80" />
            <path d="M109 181 Q112 173 115 168 Q113 174 109 179 Z" fill="#22C55E" />
            <path d="M112 182 Q115 175 119 171 Q117 176 113 181 Z" fill="#4ADE80" />
            {/* Little buttercup flower next to foot */}
            <circle cx="41" cy="169" r="2.2" fill="#FDE047" />
          </g>
        )}

        {/* 1. SPROUT (Tunas di atas kepala) */}
        <g id="lumi-sprout" className="origin-[80px_32px]">
          <path d="M80 32 Q80 18 78 12" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          {/* Left leaf */}
          <path
            d="M78 14 C70 6 56 12 66 22 C74 24 78 18 78 14 Z"
            fill="#4ADE80"
            stroke="#16A34A"
            strokeWidth="1.8"
          />
          {/* Right leaf */}
          <path
            d="M78 14 C86 4 100 10 92 20 C84 22 80 16 78 14 Z"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.8"
          />
        </g>

        {/* 2. LEGS & BOOTS */}
        <g id="lumi-legs">
          {/* Left leg */}
          <rect x="54" y="146" width="16" height="24" rx="8" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <path
            d="M50 162 C50 156 72 156 72 162 L74 172 C74 175 68 177 62 177 C54 177 50 175 50 172 Z"
            fill="url(#lumiBlueAccent)"
            stroke="#0284C7"
            strokeWidth="1.8"
          />
          {/* Right leg */}
          <rect x="90" y="146" width="16" height="24" rx="8" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <path
            d="M86 162 C86 156 108 156 108 162 L110 172 C110 175 104 177 98 177 C90 177 86 175 86 172 Z"
            fill="url(#lumiBlueAccent)"
            stroke="#0284C7"
            strokeWidth="1.8"
          />
        </g>

        {/* 3. BODY */}
        <g id="lumi-body">
          {/* Torso */}
          <rect
            x="48"
            y="98"
            width="64"
            height="54"
            rx="24"
            fill="url(#lumiHeadGrad)"
            stroke="#BAE6FD"
            strokeWidth="2.5"
          />
          {/* Blue chest curved bib matching reference */}
          <path
            d="M54 112 C66 108 94 108 106 112 C106 128 96 138 80 138 C64 138 54 128 54 112 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1.5"
          />
          {/* Golden Heart Badge */}
          <g transform="translate(80, 124)">
            <path
              d="M0 -7 C-5 -12 -12 -6 -12 0 C-12 7 -2 12 0 14 C2 12 12 7 12 0 C12 -6 5 -12 0 -7 Z"
              fill="url(#lumiHeart)"
              stroke="#D97706"
              strokeWidth="1.4"
            />
            {/* Heart shine */}
            <circle cx="-3" cy="-3" r="1.5" fill="#FFFFFF" fillOpacity="0.85" />
          </g>
        </g>

        {/* 4. ARMS & HANDS (Conditional per state) */}
        <g id="lumi-arms">
          {/* Left Arm: Relaxed at side with white mitten */}
          {state !== 'celebrate' && state !== 'reading' && (
            <g id="left-arm">
              <path
                d="M48 108 C36 112 32 128 36 140"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M48 108 C36 112 32 128 36 140"
                stroke="#BAE6FD"
                strokeWidth="16"
                strokeLinecap="round"
                strokeOpacity="0.4"
              />
              {/* White Mitten Hand */}
              <circle cx="36" cy="140" r="8" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
            </g>
          )}

          {/* Right Arm: State specific */}
          {state === 'greeting' && (
            <g id="right-arm-wave">
              <motion.g
                animate={{ rotate: [0, 15, -8, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                style={{ transformOrigin: '112px 104px' }}
              >
                <path
                  d="M110 102 C122 92 134 76 142 62"
                  stroke="#FFFFFF"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <circle cx="142" cy="62" r="9" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
                <circle cx="137" cy="58" r="4" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
              </motion.g>
            </g>
          )}

          {state === 'pointing' && (
            <g id="right-arm-pointing">
              <path
                d="M110 102 C122 92 134 76 144 62"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* White Mitten Hand pointing towards speech bubble */}
              <circle cx="144" cy="62" r="9.5" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
              <circle cx="138" cy="57" r="4.5" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
            </g>
          )}

          {(state === 'celebrate' || state === 'happy') && (
            <g id="arms-up">
              {/* Both arms up */}
              <path
                d="M48 108 C36 94 30 76 26 62"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <circle cx="26" cy="62" r="8.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.8" />
              {state === 'celebrate' && (
                <>
                  <path
                    d="M112 108 C124 94 130 76 134 62"
                    stroke="#FFFFFF"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <circle cx="134" cy="62" r="8.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.8" />
                </>
              )}
            </g>
          )}

          {state === 'reading' && (
            <g id="arms-reading">
              {/* Small colorful book held by hands */}
              <path d="M52 124 C62 134 76 136 80 136" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
              <path d="M108 124 C98 134 84 136 80 136" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
              {/* Book */}
              <rect x="62" y="128" width="36" height="24" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
              <line x1="80" y1="128" x2="80" y2="152" stroke="#0284C7" strokeWidth="2" />
              <path d="M66 134 H76 M66 140 H74 M84 134 H94 M84 140 H92" stroke="#FFFFFF" strokeWidth="1.8" />
            </g>
          )}

          {state !== 'greeting' && state !== 'pointing' && state !== 'celebrate' && state !== 'reading' && (
            <g id="right-arm-idle">
              <path
                d="M112 108 C124 112 128 130 124 142"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <circle cx="124" cy="142" r="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.8" />
            </g>
          )}
        </g>

        {/* 5. HEAD & HEADPHONES */}
        <g id="lumi-head">
          {/* Blue Headphone Ear Cups */}
          <ellipse cx="22" cy="64" rx="9" ry="17" fill="url(#lumiBlueAccent)" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="22" cy="64" rx="4" ry="10" fill="#E0F2FE" />
          <ellipse cx="138" cy="64" rx="9" ry="17" fill="url(#lumiBlueAccent)" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="138" cy="64" rx="4" ry="10" fill="#E0F2FE" />

          {/* Headphone Arch */}
          <path
            d="M26 56 C30 26 130 26 134 56"
            stroke="#0284C7"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* White Outer Monitor Helmet */}
          <rect
            x="24"
            y="28"
            width="112"
            height="72"
            rx="34"
            fill="url(#lumiHeadGrad)"
            stroke="#BAE6FD"
            strokeWidth="3.5"
          />

          {/* Inner Dark Blue Visor Screen */}
          <rect
            x="36"
            y="38"
            width="88"
            height="52"
            rx="24"
            fill="url(#lumiVisorGrad)"
            stroke="#0369A1"
            strokeWidth="2"
          />

          {/* Subtle screen reflection top curved */}
          <path
            d="M48 42 C64 40 96 40 112 42 C104 46 56 46 48 42 Z"
            fill="#38BDF8"
            fillOpacity="0.25"
          />

          {/* 6. EXPRESSIVE GLOWING DIGITAL FACE */}
          <g id="lumi-face" filter="url(#cyanGlow)">
            {/* Blinking State */}
            {isBlinking || state === 'sleepy' ? (
              <g stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round">
                <line x1="52" y1="62" x2="68" y2="62" />
                <line x1="92" y1="62" x2="108" y2="62" />
                <path d="M74 74 Q80 77 86 74" fill="none" strokeWidth="2.5" />
              </g>
            ) : state === 'happy' || state === 'celebrate' || state === 'pointing' || state === 'greeting' ? (
              // Bubbly happy inverted arch eyes ^ ^
              <g stroke="#67E8F9" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d="M52 64 Q60 52 68 64" />
                <path d="M92 64 Q100 52 108 64" />
                {/* Big open smiling mouth matching reference */}
                <path
                  d="M72 70 Q80 82 88 70 Z"
                  fill="#FFFFFF"
                  stroke="#67E8F9"
                  strokeWidth="2"
                />
              </g>
            ) : state === 'curious' ? (
              // One wide eye, one arched eyebrow
              <g stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round">
                <circle cx="60" cy="62" r="6" fill="#38BDF8" />
                <circle cx="58" cy="60" r="2" fill="#FFFFFF" />
                <path d="M92 64 Q100 56 108 62" fill="none" strokeWidth="4" />
                {/* Cute small 'o' mouth */}
                <circle cx="80" cy="74" r="3" fill="#38BDF8" />
              </g>
            ) : state === 'encourage' ? (
              // Caring gentle eyes
              <g stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M52 60 Q60 54 68 60" />
                <circle cx="60" cy="64" r="2" fill="#67E8F9" />
                <path d="M92 60 Q100 54 108 60" />
                <circle cx="100" cy="64" r="2" fill="#67E8F9" />
                <path d="M72 72 Q80 78 88 72" strokeWidth="3" />
              </g>
            ) : (
              // Standard cheerful smiling eyes (idle, greeting, pointing, reading)
              <g stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d="M52 64 Q60 54 68 64" />
                <circle cx="60" cy="62" r="2" fill="#67E8F9" />
                <path d="M92 64 Q100 54 108 64" />
                <circle cx="100" cy="62" r="2" fill="#67E8F9" />
                {/* Cheerful curve smile */}
                <path d="M72 72 Q80 78 88 72" strokeWidth="3" />
              </g>
            )}

            {/* Rosy Cheeks */}
            <circle cx="48" cy="70" r="3.5" fill="#F472B6" fillOpacity="0.75" />
            <circle cx="112" cy="70" r="3.5" fill="#F472B6" fillOpacity="0.75" />
          </g>
        </g>

        {/* Celebration Stars surrounding head */}
        {state === 'celebrate' && (
          <g>
            <motion.path
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              d="M20 30 L23 38 L31 38 L25 43 L27 51 L20 46 L13 51 L15 43 L9 38 L17 38 Z"
              fill="#FBBF24"
            />
            <motion.path
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              d="M138 24 L140 30 L146 30 L141 34 L143 40 L138 36 L133 40 L135 34 L130 30 L136 30 Z"
              fill="#FBBF24"
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
