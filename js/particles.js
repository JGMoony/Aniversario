/**
 * ====================================================================
 * SISTEMA DE PARTÍCULAS Y TÚNEL DE CORALINE (Canvas 2D)
 * ====================================================================
 * Dibuja el fondo dinámico del vórtice estrellado de la puerta secreta
 * y gestiona las explosiones de confeti con corazones, botones y llaves.
 */

class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.confettiParticles = [];
    this.width = 0;
    this.height = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.tunnelAngle = 0;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX - this.width / 2) * 0.1;
      this.targetMouseY = (e.clientY - this.height / 2) * 0.1;
    });

    // Crear partículas de polvo estelar cósmico
    const count = window.innerWidth < 768 ? 60 : 130;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createStarParticle());
    }

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  createStarParticle() {
    const colors = ['#00f2fe', '#4facfe', '#c084fc', '#e879f9', '#fef08a', '#ffffff'];
    return {
      x: (Math.random() - 0.5) * this.width * 1.5,
      y: (Math.random() - 0.5) * this.height * 1.5,
      z: Math.random() * 1000 + 100, // Profundidad 3D
      size: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      angle: Math.random() * Math.PI * 2
    };
  }

  drawTunnelRings() {
    const ctx = this.ctx;
    const cx = this.centerX + this.mouseX;
    const cy = this.centerY + this.mouseY;

    // Espiral sutil del túnel de la puerta secreta
    const rings = 7;
    for (let i = 1; i <= rings; i++) {
      const radius = (i * 75 + (this.tunnelAngle * 18) % 75);
      const alpha = Math.max(0, 0.15 - (i * 0.018));

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy,
        radius * 1.4,
        radius * 0.9,
        this.tunnelAngle * 0.05 + i * 0.2,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 242, 254, ${alpha})` : `rgba(217, 70, 239, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawStars() {
    const ctx = this.ctx;
    const cx = this.centerX + this.mouseX;
    const cy = this.centerY + this.mouseY;

    for (let p of this.particles) {
      // Movimiento hacia adelante (efecto túnel espacial)
      if (!this.isReducedMotion) {
        p.z -= 1.2;
        if (p.z <= 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * this.width * 1.5;
          p.y = (Math.random() - 0.5) * this.height * 1.5;
        }
      }

      // Proyección perspectiva 3D a 2D
      const k = 400 / p.z;
      const px = p.x * k + cx;
      const py = p.y * k + cy;

      if (px >= -50 && px <= this.width + 50 && py >= -50 && py <= this.height + 50) {
        p.angle += p.twinkleSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.angle));

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size * k * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0, currentAlpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Dibuja un botón de Coraline realista para el confeti
  drawButton(ctx, x, y, size, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Borde exterior
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.fill();
    ctx.strokeStyle = '#1a1921';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Borde interior / aro hendido
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4 agujeros del botón
    const holeOffset = size * 0.32;
    const holeRadius = size * 0.12;
    ctx.fillStyle = '#0f0e17';
    [
      [-holeOffset, -holeOffset],
      [holeOffset, -holeOffset],
      [-holeOffset, holeOffset],
      [holeOffset, holeOffset]
    ].forEach(([hx, hy]) => {
      ctx.beginPath();
      ctx.arc(hx, hy, holeRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Hilo cruzado (X)
    ctx.beginPath();
    ctx.moveTo(-holeOffset, -holeOffset);
    ctx.lineTo(holeOffset, holeOffset);
    ctx.moveTo(holeOffset, -holeOffset);
    ctx.lineTo(-holeOffset, holeOffset);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  }

  // Dibuja un corazón vectorial para el confeti
  drawHeart(ctx, x, y, size, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(size / 15, size / 15);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -15, 5, 0, 15);
    ctx.bezierCurveTo(15, 5, 10, -10, 0, 0);
    ctx.fillStyle = color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;
    ctx.fill();
    ctx.restore();
  }

  // Explosión de confeti con botones, corazones y chispas
  launchCelebration(originX, originY) {
    const x = originX || this.centerX;
    const y = originY || this.centerY;
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#00f2fe', '#fbbf24', '#a855f7', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      const type = Math.random() > 0.65 ? 'button' : (Math.random() > 0.4 ? 'heart' : 'sparkle');

      this.confettiParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 4,
        gravity: 0.28,
        friction: 0.96,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        size: type === 'button' ? Math.random() * 7 + 9 : (type === 'heart' ? Math.random() * 9 + 8 : Math.random() * 5 + 3),
        color: colors[Math.floor(Math.random() * colors.length)],
        type: type,
        alpha: 1,
        life: 1
      });
    }
  }

  drawConfetti() {
    const ctx = this.ctx;

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.rotation += p.vRot;
      p.life -= 0.009;
      p.alpha = Math.max(0, p.life);

      ctx.save();
      ctx.globalAlpha = p.alpha;

      if (p.type === 'button') {
        this.drawButton(ctx, p.x, p.y, p.size, p.color, p.rotation);
      } else if (p.type === 'heart') {
        this.drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation);
      } else {
        // Chispita / rectángulo
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      }

      ctx.restore();

      if (p.life <= 0 || p.y > this.height + 50) {
        this.confettiParticles.splice(i, 1);
      }
    }
  }

  animate() {
    // Fondo oscuro con transparencia sutil para estela de movimiento
    this.ctx.fillStyle = 'rgba(9, 10, 22, 0.35)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Suavizado del ratón
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.tunnelAngle += 0.015;

    this.drawTunnelRings();
    this.drawStars();
    this.drawConfetti();

    requestAnimationFrame(() => this.animate());
  }
}

export let particles = null;
export function initParticles(canvasId) {
  particles = new ParticleCanvas(canvasId);
  return particles;
}
