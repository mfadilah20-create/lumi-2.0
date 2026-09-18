import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundService } from '../services/soundService';

interface ForestBackgroundProps {
  children?: React.ReactNode;
  dimmed?: boolean;
}

export const ForestBackground: React.FC<ForestBackgroundProps> = ({
  children,
  dimmed = false,
}) => {
  // Interactive woodland creatures state
  const [bunnyHop, setBunnyHop] = useState(false);
  const [squirrelTwitch, setSquirrelTwitch] = useState(false);
  const [fawnWiggle, setFawnWiggle] = useState(false);
  const [birdSing, setBirdSing] = useState(false);
  const [doorKnock, setDoorKnock] = useState(false);

  const handleBunny = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    setBunnyHop(true);
    setTimeout(() => setBunnyHop(false), 900);
  };

  const handleSquirrel = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playSparkle();
    setSquirrelTwitch(true);
    setTimeout(() => setSquirrelTwitch(false), 800);
  };

  const handleFawn = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    setFawnWiggle(true);
    setTimeout(() => setFawnWiggle(false), 900);
  };

  const handleBird = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playSparkle();
    setBirdSing(true);
    setTimeout(() => setBirdSing(false), 900);
  };

  const handleDoor = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playPop();
    setDoorKnock(true);
    setTimeout(() => setDoorKnock(false), 600);
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#CBEBF6] flex flex-col justify-between selection:bg-amber-200">
      {/* ============================================================ */}
      {/* 1. MASTER 2D STORYBOOK ILLUSTRATION: HUTAN TEMAN LUMI        */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Soft morning sky background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#BAE6FD] via-60% to-[#DCFCE7]" />

        {/* Gentle Morning Sunbeams Streaming from Top-Left */}
        <div className="absolute -top-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-yellow-200/30 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* SVG Storybook Atmosphere & Rich Environment Overlays */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="skyHaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#BAE6FD" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="mountainFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#A5B4FC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>

            <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            <linearGradient id="meadowFore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="40%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>

            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="waterfallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E0F2FE" />
              <stop offset="65%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="treeBark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#854D0E" />
              <stop offset="40%" stopColor="#A16207" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="leafCluster1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            <linearGradient id="leafCluster2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKGROUND: Distant Mountains in Morning Mist */}
          <g id="distant-mountains" opacity="0.85">
            {/* Far Mountain Peak Center-Right */}
            <polygon points="620,440 760,220 900,440" fill="url(#mountainFar)" />
            {/* Snowy / Highlight peak */}
            <polygon points="730,268 760,220 790,268 775,260 760,272 745,262" fill="#FFFFFF" opacity="0.85" />
            {/* Second Mountain Peak */}
            <polygon points="840,450 960,260 1080,450" fill="url(#mountainFar)" opacity="0.8" />
            <polygon points="935,300 960,260 985,300 970,295 960,305 950,296" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* BACKGROUND: Soft Clouds */}
          <g opacity="0.9">
            <path
              d="M120 140 C100 140 80 125 90 105 C100 85 130 85 145 95 C160 75 200 70 220 90 C240 80 270 95 270 115 C285 110 305 125 300 140 Z"
              fill="#FFFFFF"
            />
            <path
              d="M1100 120 C1080 120 1060 105 1070 90 C1080 75 1110 75 1125 82 C1140 65 1175 62 1195 78 C1215 70 1245 80 1245 100 C1260 95 1280 105 1275 120 Z"
              fill="#FFFFFF"
            />
            <path
              d="M480 90 C460 90 445 78 455 64 C465 50 490 50 500 58 C512 44 540 42 555 54 C570 48 592 56 592 70 C605 66 618 78 615 90 Z"
              fill="#FFFFFF"
              opacity="0.75"
            />
          </g>

          {/* MIDGROUND: Rolling Green Hills & Pine Groves */}
          <g id="rolling-hills">
            {/* Far rolling hill */}
            <path
              d="M-50 550 Q300 380 750 460 Q1100 520 1490 430 L1490 650 L-50 650 Z"
              fill="url(#hillFar)"
              opacity="0.9"
            />
            {/* Pine Trees on far ridge */}
            <g fill="#166534" opacity="0.8">
              <polygon points="340,430 355,380 370,430" />
              <polygon points="360,435 375,375 390,435" />
              <polygon points="380,440 395,385 410,440" />
              <polygon points="860,460 875,400 890,460" />
              <polygon points="885,465 900,410 915,465" />
              <polygon points="910,470 925,415 940,470" />
            </g>
            {/* Mid rolling hill */}
            <path
              d="M-50 630 Q400 480 900 540 Q1250 580 1490 520 L1490 850 L-50 850 Z"
              fill="url(#hillMid)"
            />
          </g>

          {/* MIDGROUND RIGHT: Layered Waterfall & Rocky River */}
          <g id="waterfall-stream">
            {/* Cliff rocks */}
            <path
              d="M1170 360 Q1230 340 1280 360 L1320 530 Q1260 560 1180 520 Z"
              fill="#64748B"
              stroke="#334155"
              strokeWidth="2"
            />
            <path
              d="M1200 420 Q1250 400 1270 420 L1290 520 Q1240 540 1190 510 Z"
              fill="#94A3B8"
            />
            {/* Water cascade stream */}
            <path
              d="M1218 360 C1222 410 1214 460 1228 520 L1265 520 C1252 460 1260 410 1252 360 Z"
              fill="url(#waterfallGrad)"
            />
            {/* Water flow highlights */}
            <line x1="1232" y1="370" x2="1236" y2="510" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="12 6" opacity="0.8" />
            <line x1="1245" y1="380" x2="1248" y2="505" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 8" opacity="0.8" />
            {/* Froth and mist at waterfall pool */}
            <ellipse cx="1246" cy="524" rx="42" ry="14" fill="#E0F2FE" opacity="0.9" />
            <ellipse cx="1242" cy="520" rx="28" ry="8" fill="#FFFFFF" opacity="0.95" />
            {/* Stream continuing forward right */}
            <path
              d="M1210 528 C1210 570 1240 620 1260 680 C1280 740 1340 820 1440 880 L1490 880 L1490 520 Z"
              fill="#38BDF8"
              opacity="0.85"
            />
            <path
              d="M1230 535 C1230 575 1255 620 1275 675 C1290 720 1330 780 1400 840"
              stroke="#BAE6FD"
              strokeWidth="4"
              strokeDasharray="16 8"
              fill="none"
              opacity="0.9"
            />
          </g>

          {/* FOREGROUND MEADOW & WINDING PATH */}
          <g id="foreground-meadow">
            {/* Full base meadow */}
            <path
              d="M-50 680 Q350 600 720 630 Q1100 660 1490 620 L1490 920 L-50 920 Z"
              fill="url(#meadowFore)"
            />
            {/* Soft winding path in meadow center */}
            <path
              d="M560 920 C580 820 640 760 690 720 C730 685 750 660 760 630 L800 630 C790 665 770 695 730 730 C690 770 650 830 640 920 Z"
              fill="url(#pathGrad)"
              opacity="0.9"
            />
            {/* Stepping stones on path */}
            <ellipse cx="600" cy="880" rx="14" ry="7" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
            <ellipse cx="635" cy="830" rx="12" ry="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <ellipse cx="675" cy="780" rx="11" ry="5.5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
            <ellipse cx="715" cy="735" rx="9" ry="4.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
          </g>

          {/* FOREGROUND LEFT: The Storybook Oak Treehouse Trunk */}
          <g id="treehouse-trunk">
            {/* Big tree trunk arching from left */}
            <path
              d="M-40 900 L-40 180 C40 220 120 320 150 460 C180 580 190 750 140 900 Z"
              fill="url(#treeBark)"
            />
            {/* Bark texture grooves */}
            <path d="M20 300 Q60 420 50 600" stroke="#582900" strokeWidth="6" strokeLinecap="round" opacity="0.4" fill="none" />
            <path d="M80 400 Q120 520 110 750" stroke="#582900" strokeWidth="5" strokeLinecap="round" opacity="0.4" fill="none" />
            {/* Branch reaching right for lantern & squirrel */}
            <path
              d="M120 350 C170 330 240 310 280 315 C260 335 200 355 135 375 Z"
              fill="#854D0E"
            />
          </g>

          {/* FOREGROUND RIGHT: Wooden Post Fence */}
          <g id="wooden-fence" opacity="0.95">
            {/* Rails */}
            <rect x="1220" y="650" width="220" height="14" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <rect x="1220" y="700" width="220" height="14" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            {/* Posts */}
            <rect x="1230" y="620" width="22" height="130" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
            <polygon points="1230,620 1241,605 1252,620" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            <rect x="1350" y="615" width="22" height="135" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
            <polygon points="1350,615 1361,600 1372,615" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          </g>

          {/* OVERHEAD CANOPY: Rich Foliage Frame along Top */}
          <g id="overhead-foliage">
            {/* Top-left cluster */}
            <path
              d="M-40 -40 Q60 -20 120 60 Q180 140 100 200 Q20 220 -40 180 Z"
              fill="url(#leafCluster1)"
            />
            <path
              d="M40 -30 Q140 30 180 100 Q150 170 70 160 Q-10 140 40 -30 Z"
              fill="url(#leafCluster2)"
              opacity="0.9"
            />
            {/* Top-right cluster */}
            <path
              d="M1480 -40 Q1380 -20 1320 60 Q1260 140 1340 200 Q1420 220 1480 180 Z"
              fill="url(#leafCluster1)"
            />
            <path
              d="M1400 -30 Q1300 30 1260 100 Q1290 170 1370 160 Q1450 140 1400 -30 Z"
              fill="url(#leafCluster2)"
              opacity="0.9"
            />
          </g>

          {/* FOREGROUND MEADOW BLADES & WILDFLOWERS */}
          <g id="foreground-flora">
            {/* Daisies Left */}
            <g transform="translate(180, 810) scale(1.1)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
              <circle cx="-10" cy="-6" r="8" fill="#FFFFFF" />
              <circle cx="10" cy="-6" r="8" fill="#FFFFFF" />
              <circle cx="-10" cy="6" r="8" fill="#FFFFFF" />
              <circle cx="10" cy="6" r="8" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="7" fill="#FBBF24" />
            </g>
            <g transform="translate(240, 845) scale(0.9)">
              <circle cx="0" cy="0" r="12" fill="#FDA4AF" />
              <circle cx="-8" cy="-5" r="7" fill="#FDA4AF" />
              <circle cx="8" cy="-5" r="7" fill="#FDA4AF" />
              <circle cx="-8" cy="5" r="7" fill="#FDA4AF" />
              <circle cx="8" cy="5" r="7" fill="#FDA4AF" />
              <circle cx="0" cy="0" r="6" fill="#FDE047" />
            </g>
            {/* Daisies Right */}
            <g transform="translate(1080, 820) scale(1.0)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
              <circle cx="-10" cy="-6" r="8" fill="#FFFFFF" />
              <circle cx="10" cy="-6" r="8" fill="#FFFFFF" />
              <circle cx="-10" cy="6" r="8" fill="#FFFFFF" />
              <circle cx="10" cy="6" r="8" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="7" fill="#FBBF24" />
            </g>
            <g transform="translate(1140, 850) scale(0.85)">
              <circle cx="0" cy="0" r="12" fill="#F472B6" />
              <circle cx="-8" cy="-5" r="7" fill="#F472B6" />
              <circle cx="8" cy="-5" r="7" fill="#F472B6" />
              <circle cx="-8" cy="5" r="7" fill="#F472B6" />
              <circle cx="8" cy="5" r="7" fill="#F472B6" />
              <circle cx="0" cy="0" r="6" fill="#FDE047" />
            </g>
          </g>
        </svg>

        {/* Soft Organic Vignette on Meadow Base for Smooth UI Integration */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#154625]/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* 2. ADORABLE INTERACTIVE CREATURES (EXACT REFERENCE ROSTER)   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* 1. COZY TREEHOUSE DOOR WITH ROUND WINDOW (Left Trunk) */}
        <motion.div
          className="absolute left-2 sm:left-6 bottom-28 sm:bottom-36 pointer-events-auto cursor-pointer z-10"
          animate={doorKnock ? { scale: [1, 0.95, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
          onClick={handleDoor}
          title="Pintu Rumah Pohon (Ketuk yuk!)"
          whileHover={{ scale: 1.04 }}
        >
          <svg viewBox="0 0 120 150" className="w-24 sm:w-32 h-28 sm:h-38 drop-shadow-lg">
            {/* Outer wooden arch frame */}
            <path
              d="M20 140 L20 70 C20 20 100 20 100 70 L100 140 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="4"
            />
            {/* Door surface */}
            <path
              d="M28 138 L28 72 C28 32 92 32 92 72 L92 138 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="2.5"
            />
            {/* Wooden door vertical planks */}
            <line x1="49" y1="46" x2="49" y2="138" stroke="#92400E" strokeWidth="2" />
            <line x1="71" y1="46" x2="71" y2="138" stroke="#92400E" strokeWidth="2" />
            {/* Circular glowing window */}
            <circle cx="60" cy="74" r="16" fill="#FEF08A" stroke="#B45309" strokeWidth="3" />
            {/* Window cross bars */}
            <line x1="44" y1="74" x2="76" y2="74" stroke="#B45309" strokeWidth="2" />
            <line x1="60" y1="58" x2="60" y2="90" stroke="#B45309" strokeWidth="2" />
            {/* Brass doorknob */}
            <circle cx="82" cy="105" r="4" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* 2. GLOWING LANTERN HANGING FROM TREE (Left) */}
        <motion.div
          className="absolute left-20 sm:left-32 top-36 sm:top-48 pointer-events-auto cursor-pointer z-10"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          onClick={() => soundService.playSparkle()}
          title="Lentera Hutan Hangat"
          style={{ transformOrigin: 'top center' }}
        >
          <svg viewBox="0 0 50 80" className="w-10 sm:w-14 h-16 sm:h-22 drop-shadow-md">
            {/* Hanging chain/peg */}
            <line x1="25" y1="0" x2="25" y2="20" stroke="#78350F" strokeWidth="3" />
            {/* Lantern Cap */}
            <path d="M10 28 L25 18 L40 28 Z" fill="#92400E" stroke="#451A03" strokeWidth="2" />
            {/* Glowing Glass Chamber */}
            <rect x="14" y="28" width="22" height="30" rx="4" fill="#FEF08A" stroke="#78350F" strokeWidth="2" />
            {/* Warm glowing candle flame */}
            <ellipse cx="25" cy="43" rx="4" ry="7" fill="#F59E0B" />
            <ellipse cx="25" cy="44" rx="2" ry="4" fill="#FEF9C3" />
            {/* Lantern Base */}
            <rect x="12" y="58" width="26" height="6" rx="2" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* 3. CUTE SQUIRREL ON BRANCH (Left, above lantern) */}
        <motion.div
          className="absolute left-10 sm:left-24 top-20 sm:top-28 pointer-events-auto cursor-pointer z-20"
          animate={squirrelTwitch ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : { y: [0, -2, 0] }}
          transition={squirrelTwitch ? { duration: 0.6 } : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          onClick={handleSquirrel}
          title="Tupai Hutan Teman (Sentuh aku!)"
          whileHover={{ scale: 1.1 }}
        >
          <svg viewBox="0 0 80 80" className="w-12 sm:w-16 h-12 sm:h-16 drop-shadow-md">
            {/* Big Fluffy Curled Tail */}
            <path
              d="M32 55 C12 55 4 35 12 20 C20 5 45 10 38 28 C34 38 42 46 45 52 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="2"
            />
            {/* Squirrel Body */}
            <ellipse cx="50" cy="52" rx="16" ry="14" fill="#D97706" stroke="#B45309" strokeWidth="2" />
            <ellipse cx="54" cy="52" rx="8" ry="10" fill="#FED7AA" />
            {/* Head & Ear */}
            <circle cx="56" cy="34" r="12" fill="#D97706" stroke="#B45309" strokeWidth="2" />
            <ellipse cx="62" cy="22" rx="4" ry="8" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
            <ellipse cx="62" cy="23" rx="2" ry="5" fill="#FED7AA" />
            {/* Face */}
            <circle cx="62" cy="33" r="2.5" fill="#1E293B" />
            <circle cx="63" cy="32" r="0.8" fill="#FFFFFF" />
            <circle cx="67" cy="37" r="1.5" fill="#B45309" />
            <circle cx="58" cy="38" r="3" fill="#FB7185" opacity="0.7" />
            {/* Acorn in paws */}
            <ellipse cx="66" cy="48" rx="4" ry="5" fill="#78350F" />
          </svg>
        </motion.div>

        {/* 4. ADORABLE WHITE BUNNY IN FLOWER MEADOW (Bottom Left) */}
        <motion.div
          className="absolute left-8 sm:left-24 bottom-3 sm:bottom-6 pointer-events-auto cursor-pointer z-20"
          animate={bunnyHop ? { y: [-24, 0], rotate: [0, 8, -8, 0] } : { y: [0, -3, 0] }}
          transition={bunnyHop ? { duration: 0.65, ease: 'easeOut' } : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          onClick={handleBunny}
          title="Kelinci Putih Hutan Teman (Sentuh aku!)"
          whileHover={{ scale: 1.1 }}
        >
          <svg viewBox="0 0 90 90" className="w-16 sm:w-20 h-16 sm:h-20 drop-shadow-lg">
            {/* Long Ears */}
            <ellipse cx="36" cy="22" rx="6" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" transform="rotate(-8 36 22)" />
            <ellipse cx="36" cy="22" rx="3.5" ry="12" fill="#FCE7F3" transform="rotate(-8 36 22)" />
            <ellipse cx="54" cy="22" rx="6" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" transform="rotate(8 54 22)" />
            <ellipse cx="54" cy="22" rx="3.5" ry="12" fill="#FCE7F3" transform="rotate(8 54 22)" />
            {/* Fluffy Body & Head */}
            <ellipse cx="45" cy="64" rx="24" ry="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="45" cy="42" r="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Face */}
            <circle cx="38" cy="40" r="3" fill="#1E293B" />
            <circle cx="39" cy="39" r="1" fill="#FFFFFF" />
            <circle cx="52" cy="40" r="3" fill="#1E293B" />
            <circle cx="53" cy="39" r="1" fill="#FFFFFF" />
            <circle cx="45" cy="46" r="2" fill="#FB7185" />
            {/* Cheeks */}
            <circle cx="32" cy="44" r="3.5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="58" cy="44" r="3.5" fill="#FDA4AF" opacity="0.8" />
            {/* Fluffy Tail */}
            <circle cx="20" cy="65" r="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* 5. CUTE BABY FAWN / DEER PEEKING OVER FENCE (Bottom Right) */}
        <motion.div
          className="absolute right-4 sm:right-16 bottom-14 sm:bottom-20 pointer-events-auto cursor-pointer z-20"
          animate={fawnWiggle ? { y: [-12, 0], rotate: [0, 5, -5, 0] } : { y: [0, -2, 0] }}
          transition={fawnWiggle ? { duration: 0.6 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          onClick={handleFawn}
          title="Anak Rusa Hutan Teman (Sentuh aku!)"
          whileHover={{ scale: 1.08 }}
        >
          <svg viewBox="0 0 100 110" className="w-18 sm:w-26 h-20 sm:h-28 drop-shadow-lg">
            {/* Body behind fence */}
            <ellipse cx="50" cy="85" rx="28" ry="22" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            {/* White Spots on body */}
            <circle cx="42" cy="82" r="2.5" fill="#FFFFFF" />
            <circle cx="54" cy="80" r="3" fill="#FFFFFF" />
            <circle cx="48" cy="90" r="2" fill="#FFFFFF" />
            <circle cx="62" cy="86" r="2.5" fill="#FFFFFF" />
            {/* Neck & Head */}
            <ellipse cx="50" cy="50" rx="20" ry="18" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <ellipse cx="50" cy="55" rx="11" ry="8" fill="#FED7AA" />
            {/* Big Friendly Ears */}
            <ellipse cx="30" cy="34" rx="8" ry="16" fill="#D97706" stroke="#92400E" strokeWidth="2" transform="rotate(-30 30 34)" />
            <ellipse cx="30" cy="34" rx="4" ry="10" fill="#FCE7F3" transform="rotate(-30 30 34)" />
            <ellipse cx="70" cy="34" rx="8" ry="16" fill="#D97706" stroke="#92400E" strokeWidth="2" transform="rotate(30 70 34)" />
            <ellipse cx="70" cy="34" rx="4" ry="10" fill="#FCE7F3" transform="rotate(30 70 34)" />
            {/* Big Cute Eyes */}
            <circle cx="42" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="43" cy="46" r="1.5" fill="#FFFFFF" />
            <circle cx="58" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="59" cy="46" r="1.5" fill="#FFFFFF" />
            {/* Nose & Smile */}
            <ellipse cx="50" cy="56" rx="3.5" ry="2.5" fill="#451A03" />
            <path d="M47 59 Q50 62 53 59" stroke="#451A03" strokeWidth="1.5" fill="none" />
            {/* Cheeks */}
            <circle cx="36" cy="54" r="3.5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="64" cy="54" r="3.5" fill="#FDA4AF" opacity="0.8" />
          </svg>
        </motion.div>

        {/* 6. SINGING BLUEBIRD ON TREE BRANCH (Top Right) */}
        <motion.div
          className="absolute right-6 sm:right-16 top-16 sm:top-24 pointer-events-auto cursor-pointer z-20"
          animate={birdSing ? { y: [-8, 0], scale: [1, 1.2, 1] } : { y: [0, -3, 0] }}
          transition={birdSing ? { duration: 0.5 } : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          onClick={handleBird}
          title="Burung Biru Hutan Teman (Sentuh aku!)"
          whileHover={{ scale: 1.15 }}
        >
          <svg viewBox="0 0 70 70" className="w-12 sm:w-16 h-12 sm:h-16 drop-shadow-md">
            {/* Body */}
            <ellipse cx="36" cy="38" rx="18" ry="15" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <ellipse cx="40" cy="42" rx="10" ry="9" fill="#BAE6FD" />
            {/* Wing */}
            <path d="M30 36 C20 38 18 50 32 46 Z" fill="#0284C7" />
            {/* Head */}
            <circle cx="46" cy="30" r="12" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            {/* Eye */}
            <circle cx="49" cy="28" r="3" fill="#0F172A" />
            <circle cx="50" cy="27" r="1" fill="#FFFFFF" />
            {/* Yellow Beak */}
            <polygon points="56,30 66,32 56,36" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            {/* Tail */}
            <polygon points="18,40 6,32 14,48" fill="#0284C7" />
          </svg>
        </motion.div>

        {/* 7. FLUTTERING YELLOW BUTTERFLY (Near center) */}
        <motion.div
          className="absolute left-1/2 ml-16 sm:ml-28 top-32 sm:top-40 pointer-events-auto cursor-pointer z-15"
          animate={{
            x: [-10, 15, -10],
            y: [-12, 10, -12],
            rotate: [-6, 8, -6],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          onClick={() => soundService.playSparkle()}
          title="Kupu-kupu Hutan"
          whileHover={{ scale: 1.25 }}
        >
          <svg viewBox="0 0 40 40" className="w-7 sm:w-9 h-7 sm:h-9 drop-shadow-xs">
            {/* Wings */}
            <ellipse cx="14" cy="16" rx="8" ry="11" fill="#FDE047" stroke="#D97706" strokeWidth="1.2" transform="rotate(-20 14 16)" />
            <ellipse cx="26" cy="16" rx="8" ry="11" fill="#FDE047" stroke="#D97706" strokeWidth="1.2" transform="rotate(20 26 16)" />
            <ellipse cx="16" cy="25" rx="5" ry="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <ellipse cx="24" cy="25" rx="5" ry="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            {/* Body */}
            <line x1="20" y1="12" x2="20" y2="28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            {/* Antennae */}
            <path d="M20 12 Q17 6 15 7" stroke="#78350F" strokeWidth="1" fill="none" />
            <path d="M20 12 Q23 6 25 7" stroke="#78350F" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. MODAL DIM OVERLAY                                         */}
      {/* ============================================================ */}
      {dimmed && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs z-30 transition-opacity" />
      )}

      {/* ============================================================ */}
      {/* 4. MAIN INTERACTIVE CONTENT LAYER                            */}
      {/* ============================================================ */}
      <div className="relative z-20 flex-1 flex flex-col w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};
