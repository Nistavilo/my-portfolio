'use client';

import { useEffect, useRef } from 'react';
import { About } from '@/components/About';
import { Hero } from '@/components/Hero/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
// Eğer global ParticleBackground kullanıyorsan (kaldırmak istersen bu satırı sil)
// import { ParticleBackground } from '@/components/ParticleBackground';

export default function Home() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let visible = false;
    const show = () => { visible = true; el.style.opacity = '1'; };
    const hide = () => { visible = false; el.style.opacity = '0'; };

    const move = (e: MouseEvent) => {
      if (!visible) show();
      el.animate(
        { transform: `translate3d(${e.clientX}px, ${e.clientY}px,0)` },
        { duration: 230, fill: 'forwards', easing: 'cubic-bezier(.22,.68,.36,1)' }
      );
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', hide);
    window.addEventListener('mouseenter', show);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', hide);
      window.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Global particle istersen */}
      {/* <ParticleBackground particleCount={40} /> */}

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />

      {/* Glow Cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(56,189,248,0.45), rgba(56,189,248,0) 70%)',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}