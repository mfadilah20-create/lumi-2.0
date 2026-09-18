import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ForestBackground } from '../ForestBackground';
import { ActivityHeader } from '../ActivityHeader';
import { LumiCharacter } from '../LumiCharacter';
import { LumiSpeechBubble } from '../LumiSpeechBubble';
import { RewardPopup } from '../RewardPopup';
import { FeedbackBanner } from '../FeedbackBanner';
import { WordIllustration } from '../WordIllustrations';
import { PROTOTYPE_LETTERS, WORD_BANK } from '../../data/wordBank';
import { soundService } from '../../services/soundService';
import { LumiState } from '../../types';

interface MenulisScreenProps {
  childName: string;
  onBack: () => void;
}

// Letter stroke coordinates definitions for simple tracing guidance
const LETTER_STROKES: Record<string, { start: { x: number; y: number }; waypoints: { x: number; y: number }[]; lines: { x1: number; y1: number; x2: number; y2: number; label: string }[] }> = {
  A: {
    start: { x: 150, y: 50 },
    waypoints: [
      { x: 150, y: 50 },
      { x: 75, y: 230 },
      { x: 150, y: 50 },
      { x: 225, y: 230 },
      { x: 100, y: 150 },
      { x: 200, y: 150 },
    ],
    lines: [
      { x1: 150, y1: 50, x2: 75, y2: 230, label: '1' },
      { x1: 150, y1: 50, x2: 225, y2: 230, label: '2' },
      { x1: 100, y1: 150, x2: 200, y2: 150, label: '3' },
    ],
  },
  B: {
    start: { x: 80, y: 50 },
    waypoints: [
      { x: 80, y: 50 },
      { x: 80, y: 230 },
      { x: 160, y: 95 },
      { x: 80, y: 140 },
      { x: 170, y: 185 },
      { x: 80, y: 230 },
    ],
    lines: [
      { x1: 80, y1: 50, x2: 80, y2: 230, label: '1' },
      { x1: 80, y1: 50, x2: 180, y2: 140, label: '2' },
      { x1: 80, y1: 140, x2: 180, y2: 230, label: '3' },
    ],
  },
  C: {
    start: { x: 210, y: 80 },
    waypoints: [
      { x: 210, y: 80 },
      { x: 130, y: 50 },
      { x: 80, y: 140 },
      { x: 130, y: 230 },
      { x: 210, y: 200 },
    ],
    lines: [
      { x1: 210, y1: 80, x2: 80, y2: 140, label: '1' },
      { x1: 80, y1: 140, x2: 210, y2: 200, label: '2' },
    ],
  },
  M: {
    start: { x: 70, y: 230 },
    waypoints: [
      { x: 70, y: 230 },
      { x: 70, y: 60 },
      { x: 150, y: 170 },
      { x: 230, y: 60 },
      { x: 230, y: 230 },
    ],
    lines: [
      { x1: 70, y1: 230, x2: 70, y2: 60, label: '1' },
      { x1: 70, y1: 60, x2: 150, y2: 170, label: '2' },
      { x1: 150, y1: 170, x2: 230, y2: 60, label: '3' },
      { x1: 230, y1: 60, x2: 230, y2: 230, label: '4' },
    ],
  },
  S: {
    start: { x: 210, y: 80 },
    waypoints: [
      { x: 210, y: 80 },
      { x: 130, y: 60 },
      { x: 90, y: 105 },
      { x: 190, y: 170 },
      { x: 140, y: 225 },
      { x: 80, y: 200 },
    ],
    lines: [
      { x1: 210, y1: 80, x2: 90, y2: 105, label: '1' },
      { x1: 90, y1: 105, x2: 190, y2: 170, label: '2' },
      { x1: 190, y1: 170, x2: 80, y2: 200, label: '3' },
    ],
  },
};

export const MenulisScreen: React.FC<MenulisScreenProps> = ({
  childName,
  onBack,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [lumiState, setLumiState] = useState<LumiState>('pointing');
  const [lumiSpeech, setLumiSpeech] = useState<string>('Ayo ikuti jalannya!');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showReward, setShowReward] = useState<boolean>(false);
  const [progressCount, setProgressCount] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const currentItem = WORD_BANK[selectedLetter] || WORD_BANK['A'];
  const strokeData = LETTER_STROKES[selectedLetter] || LETTER_STROKES['A'];
  const lastWarningTimeRef = useRef<number>(0);

  useEffect(() => {
    soundService.speak(`Ayo ikuti jalannya! Huruf ${selectedLetter}!`);
    resetCanvas();
  }, [selectedLetter]);

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setProgressCount(0);
    setFeedbackStatus('idle');
    setLumiState('pointing');
    setLumiSpeech('Ayo ikuti jalannya!');
  };

  const distToSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const handleStartDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    soundService.playPop();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);

    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#22C55E'; // Soft vibrant green ink
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    // Check if child moves too far outside the guided path
    const minDistance = Math.min(
      ...strokeData.lines.map((l) => distToSegment(coords.x, coords.y, l.x1, l.y1, l.x2, l.y2))
    );
    if (minDistance > 46 && Date.now() - lastWarningTimeRef.current > 3800 && feedbackStatus !== 'correct') {
      lastWarningTimeRef.current = Date.now();
      setFeedbackStatus('wrong');
      setLumiState('encourage');
      setLumiSpeech('Pelan-pelan, yuk.');
      soundService.speak('Pelan-pelan, yuk.');
      setTimeout(() => {
        setFeedbackStatus((prev) => (prev === 'wrong' ? 'idle' : prev));
      }, 2000);
    }

    // Increment progress
    setProgressCount((prev) => {
      const next = prev + 1;
      if (next === 30) {
        soundService.playTone(523, 0.1);
      }
      if (next >= 50 && feedbackStatus !== 'correct') {
        completeTracing();
      }
      return next;
    });
  };

  const handleEndDraw = () => {
    isDrawingRef.current = false;
  };

  const completeTracing = () => {
    soundService.playSuccess();
    setFeedbackStatus('correct');
    setLumiState('celebrate');
    const msg1 = `Hebat! Kamu membuat ${currentItem.letter}!`;
    setLumiSpeech(msg1);
    soundService.speak(msg1, () => {
      const msg2 = `${currentItem.letter} seperti ${currentItem.word}!`;
      setLumiSpeech(msg2);
      soundService.speak(msg2, () => {
        setShowReward(true);
      });
    });
  };

  return (
    <ForestBackground>
      <div className="relative w-full h-full min-h-screen flex flex-col justify-between select-none">
        <ActivityHeader
          title="Menulis Huruf"
          subtitle="Ikuti garis dengan jarimu!"
          onBack={onBack}
          bgGradient="from-purple-100 to-purple-200"
        />

        <FeedbackBanner
          status={feedbackStatus}
          message={`Hebat! Kamu membuat ${currentItem.letter}!`}
        />

        {/* LETTER SELECTOR */}
        <div className="w-full px-4 mb-2 z-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-2xl mx-auto">
            {PROTOTYPE_LETTERS.map((letter) => {
              const isSelected = letter === selectedLetter;
              return (
                <motion.button
                  key={letter}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    soundService.playPop();
                    setSelectedLetter(letter);
                  }}
                  className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all cursor-pointer border-3 ${
                    isSelected
                      ? 'bg-purple-400 text-white border-white shadow-[0_5px_0_#7e22ce] scale-105'
                      : 'bg-white/90 text-slate-700 border-purple-200 shadow-[0_3px_0_rgba(0,0,0,0.1)] hover:bg-purple-50'
                  }`}
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* TRACING CANVAS WORKSPACE */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-5 z-20">
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-xs rounded-3xl border-4 border-purple-300 shadow-[0_12px_32px_rgba(147,51,234,0.18)] p-5 sm:p-7 flex flex-col items-center">
            {/* Top info badge: Letter + Connected Word Image */}
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-purple-700">
                  Huruf {currentItem.letter}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-2xl border border-purple-200">
                <WordIllustration name={currentItem.svgIcon} className="w-8 h-8" />
                <span className="text-sm font-black text-purple-900">
                  {currentItem.word}
                </span>
              </div>
            </div>

            {/* Tracing Board with Dotted Path and Interactive Layer */}
            <div className="relative w-[280px] sm:w-[320px] h-[260px] sm:h-[280px] bg-amber-50/70 rounded-3xl border-3 border-dashed border-purple-300 overflow-hidden shadow-inner flex items-center justify-center">
              {/* DOTTED BACKGROUND GUIDELINE */}
              <svg
                viewBox="0 0 300 280"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Dotted path strokes */}
                {strokeData.lines.map((line, idx) => (
                  <g key={idx}>
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#CBD5E1"
                      strokeWidth="24"
                      strokeLinecap="round"
                    />
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#9333EA"
                      strokeWidth="4"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                    />
                    {/* Direction label pill */}
                    <circle
                      cx={(line.x1 + line.x2) / 2}
                      cy={(line.y1 + line.y2) / 2}
                      r="12"
                      fill="#A855F7"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <text
                      x={(line.x1 + line.x2) / 2}
                      y={(line.y1 + line.y2) / 2 + 4}
                      fill="#FFFFFF"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {line.label}
                    </text>
                  </g>
                ))}

                {/* Animated Start Target Ring */}
                <circle
                  cx={strokeData.start.x}
                  cy={strokeData.start.y}
                  r="14"
                  fill="#F59E0B"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  className="animate-ping opacity-75"
                />
                <circle
                  cx={strokeData.start.x}
                  cy={strokeData.start.y}
                  r="14"
                  fill="#F59E0B"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
              </svg>

              {/* CHILD DRAWING CANVAS */}
              <canvas
                ref={canvasRef}
                width={300}
                height={280}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                onMouseDown={handleStartDraw}
                onMouseMove={handleDraw}
                onMouseUp={handleEndDraw}
                onMouseLeave={handleEndDraw}
                onTouchStart={handleStartDraw}
                onTouchMove={handleDraw}
                onTouchEnd={handleEndDraw}
              />
            </div>

            {/* Instruction & Controls */}
            <div className="flex items-center justify-between w-full mt-4 px-2">
              <span className="text-xs sm:text-sm font-bold text-slate-500">
                Tarik garis dari lingkaran kuning ⭐
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    soundService.playPop();
                    resetCanvas();
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  title="Hapus & Ulangi"
                >
                  <RotateCcw size={14} />
                  Ulangi
                </button>
                <button
                  onClick={completeTracing}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check size={14} />
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* BOTTOM LUMI COMPANION */}
        <footer className="w-full p-3 sm:p-4 flex items-center justify-center gap-4 z-20">
          <LumiCharacter
            state={lumiState}
            size="sm"
            onClick={() => soundService.speak(lumiSpeech)}
          />
          <LumiSpeechBubble
            message={lumiSpeech}
            pointerDirection="left"
            className="max-w-xs sm:max-w-md"
            onSpeak={() => soundService.speak(lumiSpeech)}
          />
        </footer>

        {/* REWARD POPUP */}
        <RewardPopup
          isOpen={showReward}
          childName={childName}
          title="Hebat!"
          message={`Kamu sudah berhasil menulis huruf ${currentItem.letter}!`}
          starsEarned={3}
          onPlayAgain={() => {
            setShowReward(false);
            resetCanvas();
          }}
          onGoHome={onBack}
        />
      </div>
    </ForestBackground>
  );
};
