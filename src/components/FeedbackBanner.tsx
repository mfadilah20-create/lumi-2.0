import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, Heart } from 'lucide-react';

interface FeedbackBannerProps {
  status: 'idle' | 'correct' | 'wrong';
  message?: string;
  onClear?: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  status,
  message,
}) => {
  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          {status === 'correct' ? (
            <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 border-3 border-emerald-400 text-emerald-800 rounded-full shadow-[0_8px_24px_rgba(16,185,129,0.3)]">
              <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white shadow-xs">
                <CheckCircle2 size={20} className="stroke-[3]" />
              </div>
              <span className="text-lg font-black tracking-wide">
                {message || 'Hebat! Kamu benar!'}
              </span>
              <Sparkles size={20} className="text-amber-500 fill-amber-400 animate-pulse" />
            </div>
          ) : (
            <motion.div
              animate={{ x: [-8, 8, -6, 6, -3, 3, 0] }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 px-6 py-3 bg-rose-50 border-3 border-rose-300 text-rose-800 rounded-full shadow-[0_8px_24px_rgba(244,63,94,0.2)]"
            >
              <div className="w-8 h-8 rounded-full bg-rose-300 flex items-center justify-center text-rose-700 shadow-xs">
                <Heart size={18} className="fill-rose-500 text-rose-600" />
              </div>
              <span className="text-lg font-black tracking-wide">
                {message || 'Hmm... coba lagi, yuk.'}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
