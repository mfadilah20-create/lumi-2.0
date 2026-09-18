import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Music, Mic, RotateCcw, User, Check, Shield } from 'lucide-react';
import { soundService } from '../services/soundService';

interface ParentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  onUpdateNickname: (newName: string) => void;
  onResetProgress: () => void;
}

export const ParentSettingsModal: React.FC<ParentSettingsModalProps> = ({
  isOpen,
  onClose,
  nickname,
  onUpdateNickname,
  onResetProgress,
}) => {
  // Simple parent gate question (e.g. 5 + 3 = 8)
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  // Volumes state
  const currentVols = soundService.getVolumes();
  const [bgmVol, setBgmVol] = useState(Math.round(currentVols.bgm * 100));
  const [lumiVol, setLumiVol] = useState(Math.round(currentVols.lumi * 100));
  const [sfxVol, setSfxVol] = useState(Math.round(currentVols.sfx * 100));

  // Edit name state
  const [editName, setEditName] = useState(nickname);
  const [savedNameSuccess, setSavedNameSuccess] = useState(false);

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateAnswer.trim() === '7') {
      soundService.playSuccess();
      setGateUnlocked(true);
      setGateError(false);
    } else {
      soundService.playGentleRetry();
      setGateError(true);
    }
  };

  const handleVolumeChange = (type: 'bgm' | 'lumi' | 'sfx', val: number) => {
    if (type === 'bgm') {
      setBgmVol(val);
      soundService.setVolumes(val / 100, lumiVol / 100, sfxVol / 100);
    } else if (type === 'lumi') {
      setLumiVol(val);
      soundService.setVolumes(bgmVol / 100, val / 100, sfxVol / 100);
    } else {
      setSfxVol(val);
      soundService.setVolumes(bgmVol / 100, lumiVol / 100, val / 100);
      soundService.playPop();
    }
  };

  const handleSaveNickname = () => {
    if (editName.trim()) {
      onUpdateNickname(editName.trim());
      setSavedNameSuccess(true);
      soundService.playSuccess();
      setTimeout(() => setSavedNameSuccess(false), 2000);
    }
  };

  const handleClose = () => {
    soundService.playPop();
    setGateUnlocked(false);
    setGateAnswer('');
    setGateError(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-6 sm:p-7 overflow-hidden text-slate-800"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Tutup"
            >
              <X size={22} className="stroke-[2.5]" />
            </button>

            {!gateUnlocked ? (
              // PARENT GATE SCREEN
              <div className="py-4 text-center">
                <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 border-2 border-sky-300">
                  <Shield size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-1">
                  Zona Orang Tua
                </h3>
                <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto mb-5">
                  Untuk melanjutkan ke pengaturan, silakan jawab pertanyaan berikut:
                </p>

                <form onSubmit={handleGateSubmit} className="max-w-xs mx-auto">
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-4">
                    <p className="text-lg font-black text-amber-900 mb-2">
                      Berapakah 3 + 4 = ?
                    </p>
                    <input
                      type="number"
                      value={gateAnswer}
                      onChange={(e) => setGateAnswer(e.target.value)}
                      placeholder="Ketik angka di sini..."
                      autoFocus
                      className="w-full text-center text-2xl font-black py-2.5 px-4 bg-white rounded-xl border-2 border-amber-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {gateError && (
                    <p className="text-rose-600 font-bold text-sm mb-3">
                      Jawaban belum tepat, silakan coba lagi.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base rounded-2xl shadow-[0_4px_0_#059669] cursor-pointer"
                  >
                    Buka Pengaturan
                  </motion.button>
                </form>
              </div>
            ) : (
              // SETTINGS CONTENT
              <div>
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">
                      Pengaturan Orang Tua
                    </h3>
                    <p className="text-xs font-bold text-slate-400">
                      Kelola suara dan profil si kecil
                    </p>
                  </div>
                </div>

                {/* 1. SUARA / VOLUME SLIDERS */}
                <div className="space-y-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-black text-slate-700 flex items-center gap-2">
                    <Volume2 size={18} className="text-sky-600" />
                    Pengaturan Suara
                  </h4>

                  {/* Musik Latar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Music size={14} className="text-purple-500" />
                        Musik Latar (Hutan)
                      </span>
                      <span>{bgmVol}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bgmVol}
                      onChange={(e) => handleVolumeChange('bgm', Number(e.target.value))}
                      className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Suara LUMI */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Mic size={14} className="text-emerald-500" />
                        Suara LUMI
                      </span>
                      <span>{lumiVol}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={lumiVol}
                      onChange={(e) => handleVolumeChange('lumi', Number(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Efek Suara */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Volume2 size={14} className="text-amber-500" />
                        Efek Suara (Pop, Twinkle)
                      </span>
                      <span>{sfxVol}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sfxVol}
                      onChange={(e) => handleVolumeChange('sfx', Number(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* 2. GANTI NAMA PANGGILAN */}
                <div className="mb-6">
                  <h4 className="text-sm font-black text-slate-700 flex items-center gap-2 mb-2">
                    <User size={18} className="text-sky-600" />
                    Nama Panggilan Anak
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      maxLength={15}
                      className="flex-1 px-3 py-2 bg-slate-50 border-2 border-slate-300 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={handleSaveNickname}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {savedNameSuccess ? <Check size={18} /> : 'Simpan'}
                    </button>
                  </div>
                </div>

                {/* 3. GAMBAR MASTER HOME REFERENCE */}
                <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="text-xs font-black text-slate-700 mb-1">
                    🖼️ Gambar Master Home
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Gunakan file gambar referensi asli (PNG/JPG) langsung dari perangkat Anda:
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-lg cursor-pointer transition-colors">
                      Pilih Gambar
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              const res = evt.target?.result as string;
                              if (res) {
                                localStorage.setItem('lumi_custom_master_image', res);
                                soundService.playSuccess();
                                window.location.reload();
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <button
                      onClick={() => {
                        localStorage.removeItem('lumi_custom_master_image');
                        soundService.playPop();
                        window.location.reload();
                      }}
                      className="px-2.5 py-1.5 text-slate-500 hover:text-slate-700 text-xs font-medium cursor-pointer"
                    >
                      Pulihkan Default
                    </button>
                  </div>
                </div>

                {/* 4. RESET PROGRESS */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500">Reset Semua Data</p>
                    <p className="text-[11px] text-slate-400">Hapus nama & mulai awal</p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Mulai ulang aplikasi dari awal?')) {
                        onResetProgress();
                        handleClose();
                      }
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
