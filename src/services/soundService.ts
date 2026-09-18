/**
 * Audio System for LUMI
 * - Web Audio API procedural sound synthesizer (sparkles, pops, cheerful chimes, soft retry)
 * - Calming Forest Background Music synthesizer with automatic ducking
 * - Indonesian Text-To-Speech with priority queuing and ducking
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private bgmGainNode: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;
  private bgmVolume: number = 0.35;
  private lumiVolume: number = 0.9;
  private sfxVolume: number = 0.8;
  private isDucked: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolumes(bgm: number, lumi: number, sfx: number) {
    this.bgmVolume = Math.max(0, Math.min(1, bgm));
    this.lumiVolume = Math.max(0, Math.min(1, lumi));
    this.sfxVolume = Math.max(0, Math.min(1, sfx));

    if (this.bgmGainNode && this.ctx) {
      const targetVol = this.isDucked ? this.bgmVolume * 0.2 : this.bgmVolume * 0.3;
      this.bgmGainNode.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
  }

  public getVolumes() {
    return {
      bgm: this.bgmVolume,
      lumi: this.lumiVolume,
      sfx: this.sfxVolume,
    };
  }

  // --- Sound Effects (SFX) ---

  // Soft tactile pop when touching cards or buttons
  public playPop() {
    try {
      this.initContext();
      if (!this.ctx || this.sfxVolume === 0) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

      gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // safe fallback
    }
  }

  // Gentle star sparkle chime
  public playSparkle() {
    try {
      this.initContext();
      if (!this.ctx || this.sfxVolume === 0) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const start = now + idx * 0.06;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2 * this.sfxVolume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch {
      // safe fallback
    }
  }

  // Correct answer celebration chime (soft warm major triad)
  public playSuccess() {
    try {
      this.initContext();
      if (!this.ctx || this.sfxVolume === 0) return;

      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const start = now + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.28 * this.sfxVolume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // safe fallback
    }
  }

  // Gentle encouraging sound on misstep ("Hmm... coba lagi, yuk") - never harsh!
  public playGentleRetry() {
    try {
      this.initContext();
      if (!this.ctx || this.sfxVolume === 0) return;

      const notes = [392, 349.23]; // G4, F4 - soft warm marimba
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const start = now + idx * 0.12;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18 * this.sfxVolume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // safe fallback
    }
  }

  // Letter tap sound
  public playTone(freq: number = 440, duration: number = 0.25) {
    try {
      this.initContext();
      if (!this.ctx || this.sfxVolume === 0) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // safe fallback
    }
  }

  // --- Background Music (Hutan Teman LUMI Peaceful Melody) ---

  public toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isBgmPlaying;
  }

  public isMusicOn() {
    return this.isBgmPlaying;
  }

  public startBgm() {
    try {
      this.initContext();
      if (!this.ctx || this.isBgmPlaying || this.bgmVolume === 0) return;

      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume * 0.25, this.ctx.currentTime);
      this.bgmGainNode.connect(this.ctx.destination);

      this.isBgmPlaying = true;

      // Pentatonic soothing forest notes: C4, D4, E4, G4, A4, C5
      const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
      const melodyPattern = [0, 2, 3, 4, 3, 2, 4, 5, 4, 3, 2, 0];
      let step = 0;

      this.bgmIntervalId = window.setInterval(() => {
        if (!this.ctx || !this.isBgmPlaying || !this.bgmGainNode) return;
        const noteIdx = melodyPattern[step % melodyPattern.length];
        const freq = scale[noteIdx];
        step++;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        const currentVol = this.isDucked ? 0.04 : 0.12;
        noteGain.gain.setValueAtTime(currentVol, now);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(noteGain);
        noteGain.connect(this.bgmGainNode);

        osc.start(now);
        osc.stop(now + 0.65);
      }, 700);
    } catch {
      // safe fallback
    }
  }

  public stopBgm() {
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    this.isBgmPlaying = false;
  }

  // --- Voice Ducking & Indonesian Speech ---

  private setDucking(ducked: boolean) {
    this.isDucked = ducked;
    if (this.bgmGainNode && this.ctx) {
      const targetVol = ducked ? this.bgmVolume * 0.08 : this.bgmVolume * 0.25;
      this.bgmGainNode.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.1);
    }
  }

  public speak(text: string, onEnd?: () => void) {
    if (this.lumiVolume === 0) {
      onEnd?.();
      return;
    }

    if (!('speechSynthesis' in window)) {
      this.playTone(587, 0.3);
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.88; // Slightly gentle & clear for 4-6 year olds
      utterance.pitch = 1.35; // Cheerful, warm, friendly companion pitch
      utterance.volume = this.lumiVolume;

      const voices = window.speechSynthesis.getVoices();
      const indonesianVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('Indonesian'));
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }

      this.setDucking(true);

      utterance.onend = () => {
        this.setDucking(false);
        onEnd?.();
      };

      utterance.onerror = () => {
        this.setDucking(false);
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.setDucking(false);
      onEnd?.();
    }
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.setDucking(false);
  }
}

export const soundService = new SoundService();
