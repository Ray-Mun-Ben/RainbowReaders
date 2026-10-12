// Rainbow Readers - Audio Engine
// Uses native Web Speech API & Web Audio API synthesizer
// 100% Offline-friendly, zero external asset dependencies

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis || null;
    this.speaking = false;
  }

  initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Synthesize pleasant tones using Web Audio API
  playTone(freq = 440, type = 'sine', duration = 0.25, volume = 0.15) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio synthesis error:', e);
    }
  }

  // Positive feedback chime when student selects correct MCQ option
  playSuccessChime() {
    try {
      this.initCtx();
      const now = this.ctx ? this.ctx.currentTime : 0;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.35, 0.2);
        }, idx * 100);
      });
    } catch (e) {}
  }

  // Celebratory fanfare when unlocking Starter Badge
  playCelebrationFanfare() {
    try {
      this.initCtx();
      const chords = [
        { freq: 440, delay: 0 },
        { freq: 554.37, delay: 120 },
        { freq: 659.25, delay: 240 },
        { freq: 880, delay: 400 },
        { freq: 880, delay: 550 },
        { freq: 1108.73, delay: 700 }
      ];
      chords.forEach(c => {
        setTimeout(() => {
          this.playTone(c.freq, 'sine', 0.45, 0.25);
        }, c.delay);
      });
    } catch (e) {}
  }

  playClick() {
    this.playTone(800, 'sine', 0.05, 0.05);
  }

  // Phonics & Word Speech Synthesizer
  speak(text, { rate = 0.82, pitch = 1.05, onStart = null, onEnd = null } = {}) {
    if (!this.synth) {
      console.warn('SpeechSynthesis not supported on this browser.');
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous speech
    this.synth.cancel();

    // Natural phonics adjustments
    let cleanText = text;
    // When pronouncing single letters, emphasize clear phonics
    if (text.length === 1 && /[A-Za-z]/.test(text)) {
      cleanText = text.toUpperCase();
    }

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = rate; // slightly slower for young CBC learners
    utter.pitch = pitch; // friendly, cheerful pitch

    // Try finding an English voice (prefer en-GB or en-US)
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female')))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      if (enVoice) {
        utter.voice = enVoice;
      }
    }

    utter.onstart = () => {
      this.speaking = true;
      if (onStart) onStart();
    };

    utter.onend = () => {
      this.speaking = false;
      if (onEnd) onEnd();
    };

    utter.onerror = () => {
      this.speaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utter);
  }

  // Read sentence with word-by-word visual highlight timing
  speakSentenceWithHighlight(wordsArray, onWordChange, onComplete) {
    if (!this.synth) {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < wordsArray.length) {
          if (onWordChange) onWordChange(idx);
          idx++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 600);
      return;
    }

    this.synth.cancel();
    const fullText = wordsArray.join(' ');
    const utter = new SpeechSynthesisUtterance(fullText);
    utter.rate = 0.78; // measured pace for early readers
    utter.pitch = 1.05;

    let wordIndex = 0;
    utter.onboundary = (event) => {
      if (event.name === 'word') {
        if (onWordChange && wordIndex < wordsArray.length) {
          onWordChange(wordIndex);
          wordIndex++;
        }
      }
    };

    utter.onstart = () => {
      if (onWordChange) onWordChange(0);
    };

    utter.onend = () => {
      this.speaking = false;
      if (onWordChange) onWordChange(-1); // clear highlight
      if (onComplete) onComplete();
    };

    utter.onerror = () => {
      this.speaking = false;
      if (onWordChange) onWordChange(-1);
      if (onComplete) onComplete();
    };

    this.synth.speak(utter);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.speaking = false;
  }
}

export const sound = new SoundEngine();
