// Web Audio API Procedural Sound Effects Synthesizer
class SoundController {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.initAudioContext();
    }

    initAudioContext() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    ensureContext() {
        this.initAudioContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    // Gentle swoosh for candy swap
    playSwap() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    }

    // Invalid swap bounce back sound
    playInvalidSwap() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.12);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);
    }

    // Melodic pop/chime with pitch rising as combo increases
    playMatch(combo = 1) {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const basePitches = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        const pitchIndex = Math.min(combo - 1, basePitches.length - 1);
        const freq = basePitches[pitchIndex];

        const now = this.ctx.currentTime;

        // Primary bell tone
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        // Harmonic overtone for that classic candy chime sparkle
        const overtone = this.ctx.createOscillator();
        const overGain = this.ctx.createGain();
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, now);
        overGain.gain.setValueAtTime(0.08, now);
        overGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        overtone.connect(overGain);
        overGain.connect(this.ctx.destination);

        osc.start(now);
        overtone.start(now);
        osc.stop(now + 0.28);
        overtone.stop(now + 0.2);
    }

    // Special candy creation chime
    playSpecialCreated() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50];
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + idx * 0.05;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.18, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.18);
        });
    }

    // Explosive blast for Wrapped candies / Striped beam
    playExplosion() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.25;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.25);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
    }

    // Color Bomb lightning zap / activation sound
    playColorBomb() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    // Victory fanfare
    playWin() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [
            { f: 523.25, d: 0.12 }, // C5
            { f: 659.25, d: 0.12 }, // E5
            { f: 783.99, d: 0.12 }, // G5
            { f: 1046.50, d: 0.35 } // C6
        ];

        let offset = 0;
        const now = this.ctx.currentTime;
        notes.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + offset;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, start);

            gain.gain.setValueAtTime(0.28, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + note.d);
            offset += note.d * 0.85;
        });
    }

    // Game Over sound
    playGameOver() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [440, 392, 349.23, 293.66];
        let offset = 0;
        const now = this.ctx.currentTime;

        notes.forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + offset;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.2, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.25);
            offset += 0.2;
        });
    }
}

window.soundController = new SoundController();
