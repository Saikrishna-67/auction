/**
 * Anime Draft Wheel - High-Performance 1,000+ Slice Engine
 * Features Radial Chronometer Precision, Real-time Needle Tracking, & SFX
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.lastTickTime = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTick(pitchMod = 1.0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.ctx.state === 'suspended') return;

    const now = this.ctx.currentTime;
    if (now - this.lastTickTime < 0.018) return;
    this.lastTickTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const baseFreq = 740 * pitchMod + (Math.random() * 60 - 30);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.028);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.032);
    } catch (e) {}
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.ctx.state === 'suspended') return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.18, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      } catch (e) {}
    });
  }
}

class AnimeWheel {
  constructor(canvasId, flapperId, onComplete, onTick) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.flapper = document.getElementById(flapperId);
    this.onComplete = onComplete;
    this.onTick = onTick; // Real-time passing needle callback

    this.sound = new SoundEngine();
    this.items = [];
    this.theme = 'onepiece';
    this.currentAngle = 0;
    this.isSpinning = false;
    this.lastSliceIndex = -1;

    this.setupDPI();
    window.addEventListener('resize', () => {
      this.setupDPI();
      this.draw();
    });
  }

  setupDPI() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const size = Math.max(300, Math.min(rect.width || 540, rect.height || 540, 540));

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.center = size / 2;
    this.radius = this.center - 16;
  }

  setTheme(theme) {
    this.theme = theme;
    this.draw();
  }

  setItems(items) {
    this.items = items;
    this.lastSliceIndex = -1;
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const center = this.center;
    const radius = this.radius;
    const numSlices = this.items.length;
    const isNaruto = this.theme === 'naruto';

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (numSlices === 0) {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = '600 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All Characters Drafted!', center, center);
      return;
    }

    const arcSize = (2 * Math.PI) / numSlices;
    const pointerAngle = (3 * Math.PI) / 2;

    // 1. Outer Metallic Rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, radius + 10, 0, 2 * Math.PI);
    ctx.fillStyle = isNaruto ? '#1a0e05' : '#1e1b18';
    ctx.fill();
    ctx.lineWidth = 7;
    ctx.strokeStyle = isNaruto ? '#e85d04' : '#d4af37';
    ctx.stroke();

    // Rivet Studs
    const numStuds = Math.max(16, Math.min(48, Math.floor(numSlices / 10) * 2));
    for (let i = 0; i < numStuds; i++) {
      const studAngle = (i * (2 * Math.PI) / numStuds) + this.currentAngle;
      const sx = center + (radius + 6) * Math.cos(studAngle);
      const sy = center + (radius + 6) * Math.sin(studAngle);

      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, 2 * Math.PI);
      ctx.fillStyle = isNaruto ? '#faa307' : '#f9d774';
      ctx.fill();
      ctx.strokeStyle = isNaruto ? '#6a040f' : '#8c6b16';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // 2. High-Performance Sector Rendering
    const isHighDensity = numSlices > 80;

    if (isHighDensity) {
      // Draw smooth continuous colored rainbow / faction sectors
      const step = Math.max(1, Math.floor(numSlices / 180));
      for (let i = 0; i < numSlices; i += step) {
        const startAngle = this.currentAngle + i * arcSize;
        const endAngle = startAngle + arcSize * step;
        const char = this.items[i];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.closePath();

        const defaultPalette = isNaruto
          ? ['#d00000', '#f77f00', '#2b2d42', '#38b000', '#3a0ca3', '#0077b6', '#e85d04']
          : ['#c1121f', '#0077b6', '#2a9d8f', '#f4a261', '#6a4c93', '#2b2d42', '#d4af37'];
        
        ctx.fillStyle = char.color || defaultPalette[(i / step) % defaultPalette.length];
        ctx.fill();

        // Graduation tick line
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.stroke();
        ctx.restore();
      }

      // Draw Inner Chronometer Dial Ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius * 0.72, 0, 2 * Math.PI);
      ctx.lineWidth = 2;
      ctx.strokeStyle = isNaruto ? 'rgba(247, 127, 0, 0.4)' : 'rgba(212, 175, 55, 0.4)';
      ctx.stroke();
      ctx.restore();

    } else {
      // Named Slices for small to medium counts
      for (let i = 0; i < numSlices; i++) {
        const startAngle = this.currentAngle + i * arcSize;
        const endAngle = startAngle + arcSize;
        const character = this.items[i];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.closePath();

        const defaultColors = isNaruto 
          ? ['#d00000', '#f77f00', '#2b2d42', '#38b000', '#3a0ca3', '#0077b6']
          : ['#c1121f', '#0077b6', '#2a9d8f', '#f4a261', '#6a4c93', '#2b2d42'];
        
        ctx.fillStyle = character.color || defaultColors[i % defaultColors.length];
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isNaruto ? '#211306' : '#2b2318';
        ctx.stroke();

        // Text label
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(startAngle + arcSize / 2);

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fffdf7';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;

        const fontSize = numSlices > 50 ? 10 : (numSlices > 25 ? 12 : 14);
        ctx.font = `600 ${fontSize}px "Cinzel", sans-serif`;

        let displayName = character.name;
        if (displayName.length > 15 && numSlices > 20) {
          displayName = displayName.split(' ')[0] + ' ' + (displayName.split(' ')[1]?.[0] || '') + '.';
        }

        ctx.fillText(displayName, radius - 18, 0);
        ctx.restore();
        ctx.restore();
      }
    }

    // 3. Center Medallion
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(center, center, 44, 0, 2 * Math.PI);
    ctx.fillStyle = isNaruto ? '#1a0e05' : '#261b11';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = isNaruto ? '#f77f00' : '#e5a93c';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 35, 0, 2 * Math.PI);
    const grad = ctx.createRadialGradient(center - 4, center - 4, 2, center, center, 35);
    if (isNaruto) {
      grad.addColorStop(0, '#fca311');
      grad.addColorStop(0.7, '#d00000');
      grad.addColorStop(1, '#370617');
    } else {
      grad.addColorStop(0, '#f9e498');
      grad.addColorStop(0.7, '#c68d2b');
      grad.addColorStop(1, '#815611');
    }
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isNaruto ? '🍃' : '☠️', center, center);

    ctx.restore();
  }

  spin() {
    if (this.isSpinning || this.items.length === 0) return;
    this.isSpinning = true;
    this.sound.init();

    const pointerAngle = (3 * Math.PI) / 2; // Pointer at Top
    const numSlices = this.items.length;
    const arcSize = (2 * Math.PI) / numSlices;

    const targetSliceIndex = Math.floor(Math.random() * numSlices);
    const sliceSubOffset = (0.2 + Math.random() * 0.6) * arcSize;

    const normalizedCurrent = (this.currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    let desiredTargetAngle = pointerAngle - (targetSliceIndex * arcSize + sliceSubOffset);
    desiredTargetAngle = (desiredTargetAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    const extraSpins = (6 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
    const totalRotationDelta = extraSpins + ((desiredTargetAngle - normalizedCurrent + 2 * Math.PI) % (2 * Math.PI));

    const startAngle = this.currentAngle;
    const finalAngle = startAngle + totalRotationDelta;

    const duration = 4500 + Math.random() * 600;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 4);
      this.currentAngle = startAngle + totalRotationDelta * ease;

      // Pointer tick detection & Real-time passing character calculation
      const pointerNormalized = (pointerAngle - this.currentAngle) % (2 * Math.PI);
      const positivePointer = (pointerNormalized + 2 * Math.PI) % (2 * Math.PI);
      const currentSlice = Math.floor(positivePointer / arcSize) % numSlices;

      if (currentSlice !== this.lastSliceIndex) {
        this.lastSliceIndex = currentSlice;
        this.sound.playTick();
        this.triggerFlapperWiggle();

        if (this.onTick && this.items[currentSlice]) {
          this.onTick(this.items[currentSlice], currentSlice);
        }
      }

      this.draw();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.currentAngle = finalAngle;
        this.draw();

        this.sound.playVictory();
        if (this.onComplete) {
          const winner = this.items[targetSliceIndex];
          this.onComplete(winner, targetSliceIndex);
        }
      }
    };

    requestAnimationFrame(animate);
  }

  triggerFlapperWiggle() {
    if (!this.flapper) return;
    this.flapper.classList.remove('tick-wiggle');
    void this.flapper.offsetWidth;
    this.flapper.classList.add('tick-wiggle');
  }
}

// Confetti Particle Explosion
class ConfettiCannon {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    this.setup();
    window.addEventListener('resize', () => this.setup());
  }

  setup() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(theme = 'onepiece') {
    this.setup();
    this.particles = [];
    this.active = true;

    const colors = theme === 'naruto'
      ? ['#f77f00', '#d00000', '#ffb703', '#38b000', '#0077b6', '#fff']
      : ['#f72585', '#7209b7', '#3a0ca3', '#ffd166', '#06d6a0', '#ef476f'];

    for (let i = 0; i < 160; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.42,
        vx: (Math.random() - 0.5) * 24,
        vy: (Math.random() - 0.8) * 22 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 14,
        gravity: 0.45,
        drag: 0.96,
        alpha: 1
      });
    }

    this.animate();
  }

  animate() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let alive = 0;
    for (let p of this.particles) {
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rSpeed;
      p.alpha -= 0.0075;

      if (p.alpha > 0) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    }

    if (alive > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.active = false;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
