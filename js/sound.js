/**
 * ====================================================================
 * SINTETIZADOR DE AUDIO WEB (Zero dependencias, 100% confiable)
 * ====================================================================
 * Genera efectos de sonido y una hermosa melodía de caja de música
 * inspirada en Coraline usando la Web Audio API nativa.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicPlaying = false;
    this.musicInterval = null;
    this.masterGain = null;
    this.musicGain = null;
    this.currentNoteIndex = 0;
  }

  // Inicializa el contexto de audio tras la primera interacción del usuario
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sonido de click suave
  playClick() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Sonido de burbuja al explotar (Popping)
  playPop() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Pitch sweep rápido hacia arriba y caída
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(950, t + 0.04);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.12);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Sonido cómico y tierno cuando el botón "No gracias" se escapa
  playEvasive() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.linearRampToValueAtTime(680, t + 0.08);
    osc.frequency.linearRampToValueAtTime(420, t + 0.16);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Sonido de apertura de puerta secreta / modal mágico
  playDoorOpen() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    // Tono campana místico
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.05);

      gain.gain.setValueAtTime(0, t);
      gain.gain.setValueAtTime(0.25, t + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + i * 0.05);
      osc.stop(t + i * 0.05 + 0.85);
    });
  }

  // Explosión de chispas y campanas mágicas al aceptar el "Sí por favor"
  playCelebrationSparkle() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    // Escala pentatónica resplandeciente
    const notes = [440, 554.37, 659.25, 830.61, 880, 1108.73, 1318.51, 1661.22, 1760];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.07);

      gain.gain.setValueAtTime(0, t);
      gain.gain.setValueAtTime(0.28, t + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + i * 0.07);
      osc.stop(t + i * 0.07 + 0.95);
    });
  }

  // Tono de nota de caja de música (timbre metálico dulce y misterioso)
  playMusicBoxNote(freq, duration = 1.2, volume = 0.3) {
    if (this.isMuted || !this.isMusicPlaying) return;
    this.init();
    const t = this.ctx.currentTime;

    // Onda fundamental
    const osc1 = this.ctx.createOscillator();
    // Armónico metálico campana
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.02, t); // Ligeramente desafinado para toque caja de música antigua

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(volume * 0.4, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.musicGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration + 0.05);
    osc2.stop(t + duration + 0.05);
  }

  // Melodía romántica y mágica estilo "Coraline Dreaming Lullaby / Vals Secreto"
  startMusicBox() {
    this.init();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Frecuencias para la melodía en compás 3/4 (Caja de música de ensueño)
    const melody = [
      // Frase 1 (Coraline Theme Chimes)
      { f: 659.25, d: 0.5 }, // E5
      { f: 523.25, d: 0.5 }, // C5
      { f: 587.33, d: 0.5 }, // D5
      { f: 659.25, d: 0.8 }, // E5
      { f: 783.99, d: 0.4 }, // G5
      { f: 659.25, d: 1.0 }, // E5

      // Frase 2
      { f: 523.25, d: 0.5 }, // C5
      { f: 440.00, d: 0.5 }, // A4
      { f: 493.88, d: 0.5 }, // B4
      { f: 523.25, d: 0.8 }, // C5
      { f: 659.25, d: 0.4 }, // E5
      { f: 587.33, d: 1.0 }, // D5

      // Frase 3 (Romántica y cálida)
      { f: 659.25, d: 0.5 }, // E5
      { f: 783.99, d: 0.5 }, // G5
      { f: 880.00, d: 0.6 }, // A5
      { f: 1046.5, d: 0.9 }, // C6
      { f: 880.00, d: 0.5 }, // A5
      { f: 783.99, d: 1.1 }, // G5

      // Frase 4 (Cierre suave y resolución)
      { f: 659.25, d: 0.5 }, // E5
      { f: 587.33, d: 0.5 }, // D5
      { f: 523.25, d: 0.7 }, // C5
      { f: 493.88, d: 0.5 }, // B4
      { f: 523.25, d: 1.4 }, // C5 (resolución)
      { f: 0, d: 0.6 }       // Pausa sutil
    ];

    let step = 0;

    const playNext = () => {
      if (!this.isMusicPlaying) return;

      const current = melody[step % melody.length];
      step++;

      if (current.f > 0) {
        this.playMusicBoxNote(current.f, current.d * 1.8, 0.22);
        // Acompañamiento sutil de bajo cada 3 tiempos
        if (step % 3 === 1) {
          this.playMusicBoxNote(current.f / 2, 1.5, 0.12);
        }
      }

      const nextDelay = current.d * 850; // Tempo suave
      this.musicInterval = setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  stopMusicBox() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusicBox();
      return false;
    } else {
      this.startMusicBox();
      return true;
    }
  }
}

export const sound = new SoundEngine();
