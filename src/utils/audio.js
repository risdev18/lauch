/**
 * Luxury Audio Engine: Ceremonial SFX & Melodic Electronic Festival Soundtrack
 * High-fidelity, client-side synthesized via Web Audio API.
 * Clean, non-intrusive, no annoying loops.
 */

class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.85;
    this.isPlayingMusic = false;
    this.isPlayingPartySong = false;
    this.musicTimer = null;
    this.step = 0;

    // Direct YouTube Audio Tracks
    this.ganpatiAudio = typeof window !== 'undefined' ? new Audio('/audio/ganpati_intro.mp3') : null;
    this.partyAudio = typeof window !== 'undefined' ? new Audio('/audio/party_shuru.mp3') : null;

    if (this.ganpatiAudio) {
      this.ganpatiAudio.preload = 'auto';
    }
    if (this.partyAudio) {
      this.partyAudio.preload = 'auto';
      this.partyAudio.loop = true;
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  unmute() {
    this.isMuted = false;
    this.init();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.ganpatiAudio) this.ganpatiAudio.volume = this.volume;
    if (this.partyAudio) this.partyAudio.volume = this.volume;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!muted) {
      this.init();
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }
      if (this.ganpatiAudio) this.ganpatiAudio.volume = this.volume;
      if (this.partyAudio) this.partyAudio.volume = this.volume;
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      if (this.ganpatiAudio) this.ganpatiAudio.volume = 0;
      if (this.partyAudio) this.partyAudio.volume = 0;
    }
    return this.isMuted;
  }

  toggleMute() {
    return this.setMuted(!this.isMuted);
  }

  // GANPATI INTRO TRACK (Plays when ribbon is cut & countdown/cloth unveil begins)
  playGanpatiIntro() {
    this.unmute();
    if (!this.ganpatiAudio) return;
    try {
      this.ganpatiAudio.currentTime = 0;
      this.ganpatiAudio.volume = this.isMuted ? 0 : this.volume;
      const promise = this.ganpatiAudio.play();
      if (promise) promise.catch(() => {});
    } catch (e) {
      console.warn('Ganpati audio playback prevented:', e);
    }
  }

  stopGanpatiIntro(fadeDuration = 0.6) {
    if (!this.ganpatiAudio) return;
    const initialVol = this.ganpatiAudio.volume;
    const steps = 12;
    const stepTime = (fadeDuration * 1000) / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps || !this.ganpatiAudio) {
        clearInterval(interval);
        if (this.ganpatiAudio) {
          this.ganpatiAudio.pause();
          this.ganpatiAudio.currentTime = 0;
          this.ganpatiAudio.volume = this.volume;
        }
      } else {
        this.ganpatiAudio.volume = Math.max(0, initialVol * (1 - step / steps));
      }
    }, stepTime);
  }

  // PARTY SHURU TRACK (Plays when the OMBRIX name is revealed!)
  playPartyShuru() {
    this.unmute();
    this.stopConcertMusic();
    if (!this.partyAudio) return;
    try {
      this.partyAudio.currentTime = 0;
      this.partyAudio.volume = this.isMuted ? 0 : this.volume;
      this.partyAudio.loop = true;
      this.isPlayingPartySong = true;
      const promise = this.partyAudio.play();
      if (promise) promise.catch(() => {});
    } catch (e) {
      console.warn('Party audio playback prevented:', e);
    }
  }

  stopPartyShuru() {
    this.isPlayingPartySong = false;
    if (this.partyAudio) {
      this.partyAudio.pause();
    }
  }

  togglePartyShuru() {
    if (this.partyAudio && !this.partyAudio.paused) {
      this.stopPartyShuru();
      return false;
    } else {
      this.playPartyShuru();
      return true;
    }
  }

  // 1. Precise Metallic Scissor Snip
  playScissorSnip() {
    this.unmute();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.02));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.07);

    oscGain.gain.setValueAtTime(0.4, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 1b. Dramatic Cinematic Countdown Chime (3, 2, 1)
  playCountdownTick(num) {
    this.unmute();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Resonant harmonic pitch rising as countdown progresses
    const pitches = { 3: 392.00, 2: 523.25, 1: 783.99 };
    const pitch = pitches[num] || 440;

    // Cinematic sub-bass boom
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(140, now);
    sub.frequency.exponentialRampToValueAtTime(45, now + 0.4);
    subGain.gain.setValueAtTime(0.75, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    sub.connect(subGain);
    subGain.connect(this.sfxGain);
    sub.start(now);
    sub.stop(now + 0.45);

    // Golden metallic chime
    const bell = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    bell.type = 'triangle';
    bell.frequency.setValueAtTime(pitch, now);
    bellGain.gain.setValueAtTime(0.6, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    bell.connect(bellGain);
    bellGain.connect(this.sfxGain);
    bell.start(now);
    bell.stop(now + 0.75);
  }

  // 1c. Ceremonial Silk Cloth Unveiling Slide / Whoosh
  playClothWhoosh() {
    this.unmute();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const duration = 2.4;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.linearRampToValueAtTime(1100, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(200, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);
  }

  // 2. Subtle Champagne Cork Pop
  playConfettiPop() {
    this.unmute();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  // 3. Cinematic Fireworks Boom
  playFirework() {
    this.unmute();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Deep sub-bass boom
    const boom = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boom.type = 'triangle';
    boom.frequency.setValueAtTime(140, now);
    boom.frequency.exponentialRampToValueAtTime(32, now + 0.8);

    boomGain.gain.setValueAtTime(0.85, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    boom.connect(boomGain);
    boomGain.connect(this.sfxGain);
    boom.start(now);
    boom.stop(now + 0.85);
  }

  // 4. Royal Orchestral Brass Fanfare
  playFanfare() {
    this.unmute();
    if (!this.ctx) return;

    const chords = [
      { notes: [261.63, 329.63, 392.00], time: 0, duration: 0.28 },
      { notes: [293.66, 369.99, 440.00], time: 0.28, duration: 0.28 },
      { notes: [329.63, 415.30, 493.88], time: 0.56, duration: 0.35 },
      { notes: [523.25, 659.25, 783.99, 1046.50], time: 0.91, duration: 2.0 }
    ];

    chords.forEach(({ notes, time, duration }) => {
      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + time;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.09, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    });
  }

  // 5. Dignified Audience Applause
  playApplause() {
    this.unmute();
    if (!this.ctx) return;

    const duration = 2.5;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const mod = Math.sin(i / 1500) * 0.4 + 0.6;
      data[i] = (Math.random() * 2 - 1) * mod;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1300, now);
    filter.Q.setValueAtTime(1.4, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);
  }

  // 6. Sophisticated Melodic Electronic Festival Soundtrack (Deep, Warm, Ambient 124 BPM)
  startConcertMusic() {
    this.unmute();
    if (!this.ctx || this.isPlayingMusic) return;
    this.isPlayingMusic = true;
    this.step = 0;

    const bpm = 124;
    const stepInterval = (60 / bpm / 4) * 1000;

    // Harmonic Minor / Melodic Techno chords progression (Sophisticated, cinematic)
    const melody = [
      329.63, 0, 392.00, 0, 493.88, 0, 587.33, 0,
      493.88, 0, 392.00, 0, 329.63, 0, 293.66, 0,
      369.99, 0, 440.00, 0, 523.25, 0, 659.25, 0,
      523.25, 0, 440.00, 0, 329.63, 0, 392.00, 0
    ];

    const bass = [
      82.41, 82.41, 0, 82.41, 98.00, 98.00, 0, 98.00,
      110.00, 110.00, 0, 110.00, 73.42, 73.42, 0, 73.42
    ];

    this.musicTimer = setInterval(() => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const now = this.ctx.currentTime;
      const beat16 = this.step % 32;
      const beat4 = this.step % 4;

      // Warm kick on 1 and 3
      if (beat4 === 0) {
        this.synthKick(now);
      }

      // Soft closed hi-hat on offbeats
      if (beat4 === 2) {
        this.synthHiHat(now);
      }

      // Melodic warm synth pad
      const freq = melody[beat16];
      if (freq > 0) {
        this.synthLead(freq, now);
      }

      // Warm analog sub-bass
      const bFreq = bass[this.step % 16];
      if (bFreq > 0 && beat4 === 0) {
        this.synthBass(bFreq, now);
      }

      this.step = (this.step + 1) % 64;
    }, stepInterval);
  }

  stopConcertMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleConcertMusic() {
    return this.togglePartyShuru();
  }

  synthKick(time) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.14);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    osc.connect(gain);
    gain.connect(this.musicGain);
    osc.start(time);
    osc.stop(time + 0.18);
  }

  synthHiHat(time) {
    if (!this.ctx || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(8000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    noise.start(time);
  }

  synthLead(freq, time) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, time);
    filter.frequency.exponentialRampToValueAtTime(800, time + 0.18);
    filter.Q.setValueAtTime(2, time);

    gain.gain.setValueAtTime(0.1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  synthBass(freq, time) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.26);
  }
}

export const audio = new LuxuryAudioEngine();
