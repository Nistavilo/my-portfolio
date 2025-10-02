'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  color?: string;           // Tailwind tonuna uygun RGBA baz rengi
  minOpacity?: number;
  maxOpacity?: number;
  radius?: number;
  maxVelocity?: number;
  className?: string;
}

export function ParticleBackground({
  particleCount = 40,
  color = '59, 130, 246',     // rgb(59,130,246) => Tailwind 'blue-500'
  minOpacity = 0.15,
  maxOpacity = 0.45,
  radius = 1.8,
  maxVelocity = 0.25,
  className = 'fixed inset-0 pointer-events-none z-0 opacity-30'
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const initParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * sizeRef.current.w,
            y: Math.random() * sizeRef.current.h,
            vx: (Math.random() - 0.5) * maxVelocity,
            vy: (Math.random() - 0.5) * maxVelocity,
            opacity:
              Math.random() * (maxOpacity - minOpacity) + minOpacity
          });
      }
      particlesRef.current = particles;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current.w = w;
      sizeRef.current.h = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };

    // Debounce resize
    let resizeTimer: number | undefined;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        // Reset transform before resizing to avoid compounded scale
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        resize();
        initParticles();
      }, 120);
    };

    resize();
    initParticles();
    window.addEventListener('resize', handleResize, { passive: true });

    const step = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > w) {
          p.x = w;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > h) {
          p.y = h;
          p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(step);
    };

    step();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, color, minOpacity, maxOpacity, radius, maxVelocity]);

  return <canvas ref={canvasRef} className={className} />;
}