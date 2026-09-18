import React from 'react';

interface IllustrationProps {
  name: string;
  className?: string;
}

export const WordIllustration: React.FC<IllustrationProps> = ({ name, className = 'w-24 h-24' }) => {
  const norm = name.toLowerCase();

  switch (norm) {
    case 'apple':
    case 'apel':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Apple shadow */}
          <ellipse cx="50" cy="90" rx="32" ry="7" fill="#000000" fillOpacity="0.12" />
          {/* Apple body */}
          <path
            d="M50 32 C38 18 16 26 16 52 C16 78 36 90 50 88 C64 90 84 78 84 52 C84 26 62 18 50 32 Z"
            fill="url(#appleRedGrad)"
            stroke="#DC2626"
            strokeWidth="2.5"
          />
          {/* Highlight */}
          <path
            d="M30 36 C24 44 24 58 28 66"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
          {/* Stem */}
          <path
            d="M50 30 C50 18 56 12 60 10"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Leaf */}
          <path
            d="M52 24 C64 16 76 22 72 32 C60 34 54 28 52 24 Z"
            fill="#4ADE80"
            stroke="#15803D"
            strokeWidth="2"
          />
          <path d="M54 24 C62 26 66 28 70 30" stroke="#166534" strokeWidth="1" />
          <defs>
            <linearGradient id="appleRedGrad" x1="20" y1="25" x2="80" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F87171" />
              <stop offset="0.4" stopColor="#EF4444" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'ball':
    case 'bola':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="90" rx="34" ry="7" fill="#000000" fillOpacity="0.12" />
          {/* Ball sphere */}
          <circle cx="50" cy="50" rx="38" ry="38" r="38" fill="url(#ballBase)" stroke="#2563EB" strokeWidth="2.5" />
          {/* Beach ball stripes */}
          <path d="M50 12 C34 26 34 74 50 88 C38 88 12 74 12 50 C12 26 38 12 50 12 Z" fill="#FBBF24" />
          <path d="M50 12 C66 26 66 74 50 88 C62 88 88 74 88 50 C88 26 62 12 50 12 Z" fill="#F43F5E" />
          <path d="M50 12 C42 28 42 72 50 88 C58 72 58 28 50 12 Z" fill="#3B82F6" />
          {/* White top cap */}
          <ellipse cx="50" cy="20" rx="10" ry="6" fill="#FFFFFF" />
          {/* Specular shine */}
          <ellipse cx="38" cy="30" rx="8" ry="4" transform="rotate(-30 38 30)" fill="#FFFFFF" fillOpacity="0.75" />
          <defs>
            <radialGradient id="ballBase" cx="40%" cy="35%" r="65%">
              <stop stopColor="#93C5FD" />
              <stop offset="1" stopColor="#1D4ED8" />
            </radialGradient>
          </defs>
        </svg>
      );

    case 'gecko':
    case 'cicak':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.1" />
          {/* Tail curving */}
          <path
            d="M50 68 Q54 84 40 92 Q32 88 44 76"
            fill="#34D399"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Back legs */}
          <path d="M38 60 Q22 68 20 58" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M62 60 Q78 68 80 58" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" />
          {/* Front legs */}
          <path d="M36 38 Q20 30 22 42" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M64 38 Q80 30 78 42" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" />
          {/* Body */}
          <ellipse cx="50" cy="50" rx="15" ry="24" fill="#6EE7B7" stroke="#059669" strokeWidth="2.5" />
          {/* Head */}
          <ellipse cx="50" cy="24" rx="14" ry="12" fill="#6EE7B7" stroke="#059669" strokeWidth="2.5" />
          {/* Cute big eyes */}
          <circle cx="43" cy="20" r="5.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
          <circle cx="43" cy="20" r="3" fill="#1E293B" />
          <circle cx="41.5" cy="18.5" r="1.2" fill="#FFFFFF" />

          <circle cx="57" cy="20" r="5.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
          <circle cx="57" cy="20" r="3" fill="#1E293B" />
          <circle cx="55.5" cy="18.5" r="1.2" fill="#FFFFFF" />
          {/* Smile */}
          <path d="M47 28 Q50 31 53 28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          {/* Spots */}
          <circle cx="47" cy="42" r="2" fill="#059669" />
          <circle cx="54" cy="48" r="2.5" fill="#059669" />
          <circle cx="48" cy="56" r="2" fill="#059669" />
        </svg>
      );

    case 'mango':
    case 'mangga':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="30" ry="6" fill="#000000" fillOpacity="0.12" />
          {/* Mango fruit shape */}
          <path
            d="M48 24 C68 20 84 38 80 62 C76 82 56 88 40 84 C26 80 20 62 26 44 C30 30 38 24 48 24 Z"
            fill="url(#mangoGrad)"
            stroke="#D97706"
            strokeWidth="2.5"
          />
          {/* Stem & Leaf */}
          <path d="M48 24 C46 14 42 10 38 8" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <path
            d="M48 18 C58 10 70 12 72 20 C64 24 54 22 48 18 Z"
            fill="#4ADE80"
            stroke="#15803D"
            strokeWidth="2"
          />
          {/* Cheeky highlight */}
          <path
            d="M34 38 C32 46 32 58 38 68"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <defs>
            <linearGradient id="mangoGrad" x1="30" y1="25" x2="75" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="0.6" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'cow':
    case 'sapi':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="32" ry="6" fill="#000000" fillOpacity="0.12" />
          {/* Body */}
          <rect x="28" y="44" width="46" height="32" rx="16" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
          {/* Spots on body */}
          <path d="M36 50 Q44 48 42 58 Q34 60 36 50 Z" fill="#334155" />
          <path d="M60 52 Q68 56 64 66 Q54 62 60 52 Z" fill="#334155" />
          {/* Legs */}
          <rect x="34" y="70" width="8" height="16" rx="4" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
          <rect x="58" y="70" width="8" height="16" rx="4" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
          {/* Head */}
          <circle cx="50" cy="36" r="18" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
          {/* Horns */}
          <path d="M38 22 Q40 14 36 12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 22 Q60 14 64 12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          {/* Ears */}
          <ellipse cx="32" cy="32" rx="6" ry="4" transform="rotate(-20 32 32)" fill="#FED7AA" stroke="#334155" strokeWidth="1.5" />
          <ellipse cx="68" cy="32" rx="6" ry="4" transform="rotate(20 68 32)" fill="#FED7AA" stroke="#334155" strokeWidth="1.5" />
          {/* Muzzle (Snout) */}
          <ellipse cx="50" cy="44" rx="13" ry="8" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="1.5" />
          <circle cx="46" cy="44" r="1.8" fill="#BE185D" />
          <circle cx="54" cy="44" r="1.8" fill="#BE185D" />
          {/* Eyes */}
          <circle cx="43" cy="32" r="3" fill="#1E293B" />
          <circle cx="42" cy="31" r="1" fill="#FFFFFF" />
          <circle cx="57" cy="32" r="3" fill="#1E293B" />
          <circle cx="56" cy="31" r="1" fill="#FFFFFF" />
        </svg>
      );

    case 'hat':
    case 'topi':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="85" rx="36" ry="7" fill="#000000" fillOpacity="0.12" />
          {/* Hat dome */}
          <path
            d="M32 60 C32 34 40 24 50 24 C60 24 68 34 68 60 Z"
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="2.5"
          />
          {/* Ribbon */}
          <path d="M31 54 C38 52 62 52 69 54 L69 60 C62 58 38 58 31 60 Z" fill="#FBBF24" />
          {/* Brim */}
          <ellipse cx="50" cy="62" rx="36" ry="12" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Top highlight */}
          <ellipse cx="46" cy="34" rx="6" ry="4" fill="#FFFFFF" fillOpacity="0.6" />
        </svg>
      );

    case 'mama':
    case 'mother':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="30" ry="6" fill="#000000" fillOpacity="0.1" />
          {/* Warm Pink/Rose Dress */}
          <path d="M30 84 C30 68 40 62 50 62 C60 62 70 68 70 84 Z" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="2" />
          {/* Mother Hair Back */}
          <ellipse cx="50" cy="42" rx="22" ry="24" fill="#92400E" />
          {/* Face */}
          <circle cx="50" cy="44" r="16" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
          {/* Hair Front / Bun */}
          <circle cx="50" cy="20" r="10" fill="#92400E" />
          <path d="M34 38 C38 30 62 30 66 38 C64 34 58 32 50 32 C42 32 36 34 34 38 Z" fill="#78350F" />
          {/* Cute Friendly Eyes Smiling */}
          <path d="M42 42 Q45 39 48 42" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M52 42 Q55 39 58 42" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Rosy Cheeks */}
          <circle cx="41" cy="47" r="2.5" fill="#FB7185" fillOpacity="0.7" />
          <circle cx="59" cy="47" r="2.5" fill="#FB7185" fillOpacity="0.7" />
          {/* Gentle Smile */}
          <path d="M47 48 Q50 52 53 48" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Flower Hair Accessory */}
          <circle cx="62" cy="26" r="4" fill="#F43F5E" />
          <circle cx="62" cy="26" r="1.8" fill="#FDE047" />
          {/* Little heart */}
          <path d="M50 72 C48 68 44 68 44 71 C44 74 50 78 50 78 C50 78 56 74 56 71 C56 68 52 68 50 72 Z" fill="#F43F5E" />
        </svg>
      );

    case 'cat':
    case 'kucing':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.12" />
          {/* Ears */}
          <path d="M30 38 L24 16 L42 26 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          <path d="M28 34 L26 22 L38 28 Z" fill="#FED7AA" />
          <path d="M70 38 L76 16 L58 26 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          <path d="M72 34 L74 22 L62 28 Z" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="50" cy="46" rx="26" ry="22" fill="#FDBA74" stroke="#C2410C" strokeWidth="2.5" />
          {/* Eyes */}
          <ellipse cx="40" cy="44" rx="4" ry="5" fill="#1E293B" />
          <circle cx="38.5" cy="42" r="1.5" fill="#FFFFFF" />
          <ellipse cx="60" cy="44" rx="4" ry="5" fill="#1E293B" />
          <circle cx="58.5" cy="42" r="1.5" fill="#FFFFFF" />
          {/* Pink nose */}
          <polygon points="50,52 46,48 54,48" fill="#F43F5E" />
          {/* Mouth */}
          <path d="M46 54 Q50 58 54 54" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <line x1="34" y1="50" x2="20" y2="48" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="54" x2="18" y2="56" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="66" y1="50" x2="80" y2="48" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="66" y1="54" x2="82" y2="56" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'rabbit':
    case 'kelinci':
    case 'rabbit-hat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.12" />
          {/* Long Ears */}
          <ellipse cx="38" cy="22" rx="7" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" transform="rotate(-8 38 22)" />
          <ellipse cx="38" cy="22" rx="4" ry="12" fill="#FCE7F3" transform="rotate(-8 38 22)" />
          <ellipse cx="62" cy="22" rx="7" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" transform="rotate(8 62 22)" />
          <ellipse cx="62" cy="22" rx="4" ry="12" fill="#FCE7F3" transform="rotate(8 62 22)" />
          {/* Head & Body */}
          <ellipse cx="50" cy="68" rx="20" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="50" cy="48" rx="18" ry="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="43" cy="46" r="3" fill="#334155" />
          <circle cx="42" cy="45" r="1" fill="#FFFFFF" />
          <circle cx="57" cy="46" r="3" fill="#334155" />
          <circle cx="56" cy="45" r="1" fill="#FFFFFF" />
          {/* Snout */}
          <circle cx="50" cy="52" r="2" fill="#F43F5E" />
          <path d="M48 54 Q50 56 52 54" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="36" cy="50" r="3" fill="#FDA4AF" fillOpacity="0.6" />
          <circle cx="64" cy="50" r="3" fill="#FDA4AF" fillOpacity="0.6" />
        </svg>
      );

    case 'boat':
    case 'kapal':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="85" rx="36" ry="6" fill="#000000" fillOpacity="0.12" />
          {/* Waves */}
          <path d="M10 75 Q20 70 30 75 T50 75 T70 75 T90 75" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          {/* Hull */}
          <path d="M22 55 L30 74 L70 74 L78 55 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          {/* Cabin */}
          <rect x="36" y="38" width="28" height="17" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {/* Porhole windows */}
          <circle cx="44" cy="46" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="56" cy="46" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          {/* Mast & flag */}
          <line x1="50" y1="38" x2="50" y2="20" stroke="#78350F" strokeWidth="2.5" />
          <polygon points="50,20 66,26 50,32" fill="#3B82F6" />
        </svg>
      );

    case 'heart':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.12" />
          <path
            d="M50 30 C40 14 15 22 15 48 C15 72 45 84 50 86 C55 84 85 72 85 48 C85 22 60 14 50 30 Z"
            fill="url(#heartGrad)"
            stroke="#E11D48"
            strokeWidth="2.5"
          />
          <ellipse cx="32" cy="38" rx="6" ry="3" transform="rotate(-30 32 38)" fill="#FFFFFF" fillOpacity="0.6" />
          <defs>
            <linearGradient id="heartGrad" x1="20" y1="20" x2="80" y2="80">
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#E11D48" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      // Golden friendly star fallback
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="88" rx="26" ry="5" fill="#000000" fillOpacity="0.1" />
          <path
            d="M50 14 L61 38 L87 41 L67 59 L73 85 L50 71 L27 85 L33 59 L13 41 L39 38 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="48" r="2.5" fill="#78350F" />
          <circle cx="56" cy="48" r="2.5" fill="#78350F" />
          <path d="M46 56 Q50 60 54 56" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
