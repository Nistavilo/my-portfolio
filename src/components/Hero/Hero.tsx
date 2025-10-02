'use client';
import { Github, ChevronDown } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { useParticleField } from '../particles/useParticleField';
import { BASE_CONFIG } from '../particles/config';
import type { DensityMode } from '../particles/types';
import { ShimmerText } from './ShimmerText';
import { FloatingOrbs } from './FloatingOrbs';

export function Hero() {
  const [densityMode, setDensityMode] = useState<DensityMode>('normal');
  const [trail, setTrail] = useState(false);

  const wrapperRef = (globalThis as any).React?.useRef<HTMLElement | null>() ?? (require('react').useRef(null));
  const canvasRef = (globalThis as any).React?.useRef<HTMLCanvasElement | null>() ?? (require('react').useRef(null));

  useParticleField({
    canvasRef,
    wrapperRef,
    baseConfig: BASE_CONFIG,
    densityMode,
    enableTrail: trail
  });

  const cycleDensity = useCallback(() => {
    setDensityMode(m =>
      m === 'light' ? 'normal' : m === 'normal' ? 'high' : 'light'
    );
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={wrapperRef as any}
      className="hero-root min-h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden select-none"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.11]"
        style={{
          maskImage: 'radial-gradient(circle at center, white, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, white, transparent 70%)'
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(130,140,160,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(130,140,160,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <FloatingOrbs count={7} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/5 to-background pointer-events-none" />

      <div className="text-center max-w-5xl mx-auto relative z-20 hero-tilt-container">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 font-extrabold tracking-tight relative inline-block leading-[1.05]">
          <ShimmerText className="animate-gradient-move drop-shadow-[0_0_14px_rgba(99,102,241,0.25)]">
            Nistavilo
          </ShimmerText>
        </h1>

        <p className="text-xl md:text-3xl mb-6 text-transparent bg-clip-text bg-[linear-gradient(90deg,#60a5fa,#a855f7,#6366f1,#60a5fa)] bg-[length:300%_300%] animate-sheen font-medium">
          Bridging Chemistry, Data Science & AI
        </p>

        <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          20-year-old Chemistry student from <span className="text-blue-400 font-medium">Türkiye</span>,
          diving into <span className="text-purple-400 font-medium">Data Science</span> and <span className="text-green-400 font-medium">Machine Learning</span>{' '}
          to create <span className="text-blue-400 font-medium">innovative solutions</span> for real-world problems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="glow-pulse bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-4 text-lg shadow-lg shadow-indigo-800/25"
            onClick={() => window.open('https://github.com/Nistavilo', '_blank')}
          >
            <Github className="mr-3 h-5 w-5" />
            Check my GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-10 py-4 text-lg border-blue-500/40 hover:border-blue-500/70 text-blue-400 hover:text-blue-300 backdrop-blur-sm transition-transform hover:scale-[1.03]"
            onClick={() => scrollToSection('about')}
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto relative stats-grid">
            {[
              { number: '3+', label: 'Years Coding' },
              { number: '20+', label: 'Projects' },
              { number: '∞', label: 'Curiosity' }
            ].map(stat => (
              <div
                key={stat.label}
                className="stat-item text-center rounded-md relative p-2"
              >
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-shimmer-fast">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-xs text-muted-foreground/50">
          <p>Press "e" to cycle effect density (current: {densityMode})</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => cycleDensity()}
              className="px-3 py-1 rounded bg-background/40 border border-border/30 hover:border-border/60 transition-colors"
            >
              Cycle Density
            </button>
            <button
              onClick={() => setTrail(t => !t)}
              className="px-3 py-1 rounded bg-background/40 border border-border/30 hover:border-border/60 transition-colors"
            >
              Cursor Trail: {trail ? 'On' : 'Off'}
            </button>
          </div>
          <p className="opacity-40">Hold Shift to attract atoms</p>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce z-30"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown className="h-6 w-6 text-blue-400" />
      </div>
    </section>
  );
}