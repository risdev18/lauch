import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas({ active = true, count = 5 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#D4AF37', // Gold
      '#F2E3B0', // Champagne
      '#FFFFFF', // Bright White
      '#641C27', // Burgundy
      '#00F0FF', // Cyan accent
      '#FFA500', // Amber
    ];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.size = Math.random() * 2.5 + 1.5;
        this.gravity = 0.08;
      }

      update() {
        this.vx *= 0.98;
        this.vy = this.vy * 0.98 + this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 8;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    class Rocket {
      constructor() {
        this.x = Math.random() * (width * 0.8) + width * 0.1;
        this.y = height;
        this.targetY = Math.random() * (height * 0.45) + height * 0.12;
        this.speed = Math.random() * 4 + 7;
        this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
        this.particles = [];
      }

      update() {
        if (!this.exploded) {
          this.x += this.vx;
          this.y += this.vy;
          if (this.vy >= 0 || this.y <= this.targetY) {
            this.explode();
          }
        } else {
          for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].alpha <= 0) {
              this.particles.splice(i, 1);
            }
          }
        }
      }

      explode() {
        this.exploded = true;
        const particleCount = Math.floor(Math.random() * 40) + 50;
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw(context) {
        if (!this.exploded) {
          context.save();
          context.fillStyle = this.color;
          context.shadowColor = this.color;
          context.shadowBlur = 10;
          context.beginPath();
          context.arc(this.x, this.y, 3, 0, Math.PI * 2);
          context.fill();
          // Spark trail
          context.fillStyle = '#FFFFFF';
          context.fillRect(this.x - 1, this.y + 4, 2, 6);
          context.restore();
        } else {
          for (const p of this.particles) {
            p.draw(context);
          }
        }
      }
    }

    const rockets = [];
    let lastLaunch = 0;

    const render = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      // Launch new rockets periodically
      if (timestamp - lastLaunch > 700 && rockets.length < 12) {
        rockets.push(new Rocket());
        lastLaunch = timestamp;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(ctx);
        if (rockets[i].exploded && rockets[i].particles.length === 0) {
          rockets.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initial burst of 3 rockets
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        rockets.push(new Rocket());
      }, i * 220);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-25"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
