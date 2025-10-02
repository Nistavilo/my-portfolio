'use client';
import { useEffect, useRef } from 'react';
import { Atom, Bond, Burst, DensityMode, ParticleConfig, PointerState, Pulse } from './types';
import { weightedPick, lerp, clamp, distSq } from './math';
import { DENSITY_SCALE } from './config';

interface Options {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperRef: React.RefObject<HTMLElement>;
  baseConfig: ParticleConfig;
  densityMode: DensityMode;
  enableTrail?: boolean;
}

export function useParticleField({ canvasRef, wrapperRef, baseConfig, densityMode, enableTrail }: Options) {
  const atomsRef = useRef<Atom[]>([]);
  const bondsRef = useRef<Bond[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const pointerRef = useRef<PointerState>({
    x: 0, y: 0, inertX: 0, inertY: 0, active: false, attract: false
  });

  const lastPulseRef = useRef(0);
  const frameRef = useRef<number>();
  const startTimeRef = useRef(performance.now());
  const fpsStateRef = useRef({ lastCheck: performance.now(), frames: 0, currentFps: 60, drops: 0 });
  const reducedMotionRef = useRef(false);
  const resizeTimeoutRef = useRef<number | null>(null);

  // Cursor trail (simple ring buffer)
  const trailRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const trailPoolSize = 32;
  const trailIndexRef = useRef(0);

  // Derived config mutated adaptively (never mutate baseConfig)
  const liveConfigRef = useRef<ParticleConfig>({ ...baseConfig });

  const initAtoms = (cfg: ParticleConfig) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.innerWidth < 768;
    const countBase = isMobile ? cfg.mobileNodeCount : cfg.baseNodeCount;
    const densityFactor = DENSITY_SCALE[densityMode];
    const count = Math.round(countBase * densityFactor);
    atomsRef.current = [];
    for (let i = 0; i < count; i++) {
      const t = weightedPick(cfg.atomTypes);
      const z = lerp(cfg.depthZMin, cfg.depthZMax, Math.random());
      const a: Atom = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * cfg.maxVelocity * (0.7 + 0.3 * z),
        vy: (Math.random() - 0.5) * cfg.maxVelocity * (0.7 + 0.3 * z),
        baseRadius: t.radius,
        color: t.color,
        z
      };
      if (Math.random() < cfg.electronChance * (densityMode === 'light' ? 0.6 : densityMode === 'high' ? 1.15 : 1)) {
        const range = cfg.electronCountRange;
        const cnt = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        a.electrons = Array.from({ length: cnt }).map(() => ({
          orbitR: Math.random() * (cfg.electronOrbitRadiusRange[1] - cfg.electronOrbitRadiusRange[0]) + cfg.electronOrbitRadiusRange[0],
            phase: Math.random() * Math.PI * 2,
            speed: cfg.electronSpeedBase * (0.6 + Math.random() * 0.9)
        }));
      }
      atomsRef.current.push(a);
    }
  };

  // Color cycle
  const getCycleColor = (t: number) => {
    const cfg = liveConfigRef.current;
    const stops = cfg.colorStops;
    const pos = (t * cfg.colorCycleSpeed) % 1;
    const seg = 1 / stops.length;
    const idx = Math.floor(pos / seg);
    const next = (idx + 1) % stops.length;
    const localT = (pos - idx * seg) / seg;
    const c1 = stops[idx];
    const c2 = stops[next];
    return [
      Math.round(lerp(c1[0], c2[0], localT)),
      Math.round(lerp(c1[1], c2[1], localT)),
      Math.round(lerp(c1[2], c2[2], localT))
    ];
  };

  const adaptiveDegrade = () => {
    const cfg = liveConfigRef.current;
    // reduce link distance & electron chance slightly if repeated drops
    cfg.linkDistance = Math.max(120, cfg.linkDistance * 0.93);
    cfg.electronChance = Math.max(0.15, cfg.electronChance * 0.9);
  };

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!wrapper || !canvas) return;
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      // Yeniden boyutlanınca atomları hafifçe yeniden dağıt
      initAtoms(liveConfigRef.current);
    };
    resize();
    const debouncedResize = () => {
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(resize, 150);
    };
    window.addEventListener('resize', debouncedResize);

    initAtoms(liveConfigRef.current);

    let lastTime = performance.now();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      fpsStateRef.current.frames++;
      const now = performance.now();
      let dt = now - lastTime;
      lastTime = now;
      // clamp dt to avoid huge jumps
      dt = clamp(dt, 0, 66);
      const cfg = liveConfigRef.current;

      // FPS check
      if (now - fpsStateRef.current.lastCheck > cfg.fpsCheckInterval) {
        const fps = (fpsStateRef.current.frames * 1000) / (now - fpsStateRef.current.lastCheck);
        fpsStateRef.current.currentFps = fps;
        if (fps < cfg.minFps) {
          fpsStateRef.current.drops++;
          if (fpsStateRef.current.drops >= 2) {
            adaptiveDegrade();
            fpsStateRef.current.drops = 0;
          }
        } else {
          fpsStateRef.current.drops = 0;
        }
        fpsStateRef.current.frames = 0;
        fpsStateRef.current.lastCheck = now;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY || window.pageYOffset;
      const parallaxOffset = scrollY * cfg.parallaxFactor;

      // Pointer inertia
      pointerRef.current.inertX = lerp(pointerRef.current.inertX, pointerRef.current.x, cfg.inertiaLerp);
      pointerRef.current.inertY = lerp(pointerRef.current.inertY, pointerRef.current.y, cfg.inertiaLerp);

      const atoms = atomsRef.current;
      const maxVel = cfg.maxVelocity;

      // Trail capture
      if (enableTrail && pointerRef.current.active) {
        trailRef.current[trailIndexRef.current] = { x: pointerRef.current.x, y: pointerRef.current.y, t: now };
        trailIndexRef.current = (trailIndexRef.current + 1) % trailPoolSize;
      }

      const pointerActive = pointerRef.current.active;
      const attract = pointerRef.current.attract;

      const pr = cfg.repelRadius;
      const prSq = pr * pr;

      // Update atoms
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];

        // micro jitter scaled by dt
        const jitterScale = (dt / 16.6);
        a.vx += (Math.random() - 0.5) * cfg.microJitter * jitterScale;
        a.vy += (Math.random() - 0.5) * cfg.microJitter * jitterScale;

        if (pointerActive) {
          const dsq = distSq(a.x, a.y, pointerRef.current.inertX, pointerRef.current.inertY);
            if (dsq < prSq) {
            const d = Math.sqrt(dsq) || 1;
            let strength = (1 - d / pr) * 0.04;
            if (attract) strength *= -1;
            a.vx += ((a.x - pointerRef.current.inertX) / d) * strength;
            a.vy += ((a.y - pointerRef.current.inertY) / d) * strength;
          }
        }

        a.x += a.vx * (dt * 0.06);
        a.y += a.vy * (dt * 0.06);

        // boundary reflect
        if (a.x < 0) { a.x = 0; a.vx *= -0.9; }
        else if (a.x > canvas.width) { a.x = canvas.width; a.vx *= -0.9; }
        if (a.y < 0) { a.y = 0; a.vy *= -0.9; }
        else if (a.y > canvas.height) { a.y = canvas.height; a.vy *= -0.9; }

        // friction
        a.vx *= 0.995;
        a.vy *= 0.995;

        // clamp vel
        if (a.vx > maxVel) a.vx = maxVel;
        if (a.vx < -maxVel) a.vx = -maxVel;
        if (a.vy > maxVel) a.vy = maxVel;
        if (a.vy < -maxVel) a.vy = -maxVel;

        if (a.electrons) {
          for (const e of a.electrons) {
            e.phase += e.speed * (dt * 0.9);
          }
        }
      }

      // Bonds
      const newBonds: Bond[] = [];
      const linkDist = cfg.linkDistance;
      const linkDistSq = linkDist * linkDist;

      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];
        for (let j = i + 1; j < atoms.length; j++) {
          const b = atoms[j];
          const dsq = distSq(a.x, a.y, b.x, b.y);
          if (dsq < linkDistSq) {
            const existing = bondsRef.current.find(bd => (bd.a === i && bd.b === j) || (bd.a === j && bd.b === i));
            let curved = existing?.curved;
            if (curved === undefined) {
              if (Math.sqrt(dsq) < cfg.maxCurvedBondDistance && Math.random() < cfg.curvedBondProbability) {
                curved = true;
              } else {
                curved = false;
              }
            }
            newBonds.push(existing || {
              a: i,
              b: j,
              created: now,
              curved,
              ctrlOffsetX: (Math.random() - 0.5) * 30,
              ctrlOffsetY: (Math.random() - 0.5) * 30
            });
          }
        }
      }

      bondsRef.current = newBonds.filter(b => now - b.created < cfg.bondStabilityMs);

      const cycleRGB = getCycleColor(now - startTimeRef.current);
      const linkColor = `${cycleRGB[0]},${cycleRGB[1]},${cycleRGB[2]}`;

      // Draw bonds
      ctx.lineWidth = 1;
      for (const bond of bondsRef.current) {
        const a = atoms[bond.a];
        const b = atoms[bond.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = (1 - dist / linkDist) * cfg.lineOpacityBase;
        ctx.strokeStyle = `rgba(${linkColor},${alpha})`;
        ctx.beginPath();
        if (bond.curved) {
          const cx = (a.x + b.x) / 2 + bond.ctrlOffsetX;
          const cy = (a.y + b.y) / 2 + bond.ctrlOffsetY;
          ctx.moveTo(a.x, a.y + parallaxOffset * (1 - a.z));
          ctx.quadraticCurveTo(cx, cy + parallaxOffset * 0.5, b.x, b.y + parallaxOffset * (1 - b.z));
        } else {
          ctx.moveTo(a.x, a.y + parallaxOffset * (1 - a.z));
          ctx.lineTo(b.x, b.y + parallaxOffset * (1 - b.z));
        }
        ctx.stroke();
      }

      // Pulses
      if (now - lastPulseRef.current > cfg.pulseEveryMs) {
        lastPulseRef.current = now;
        const rand = atoms[Math.floor(Math.random() * atoms.length)];
        if (rand) {
          pulsesRef.current.push({ x: rand.x, y: rand.y, start: now, life: cfg.pulseLife });
        }
      }
      pulsesRef.current = pulsesRef.current.filter(p => now - p.start < p.life);
      for (const p of pulsesRef.current) {
        const t = (now - p.start) / p.life;
        const scale = 0.2 + t * cfg.pulseScale;
        const alpha = 0.37 * (1 - t);
        ctx.beginPath();
        ctx.arc(p.x, p.y + parallaxOffset * 0.3, scale * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${linkColor},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Bursts
      if (Math.random() < cfg.energyBurstChancePerFrame) {
        const candidate = atoms[Math.floor(Math.random() * atoms.length)];
        if (candidate) burstsRef.current.push({ x: candidate.x, y: candidate.y, start: now, life: cfg.energyBurstLife });
      }
      burstsRef.current = burstsRef.current.filter(b => now - b.start < b.life);
      for (const b of burstsRef.current) {
        const t = (now - b.start) / b.life;
        const scale = 0.4 + t * cfg.energyBurstScale;
        const alpha = 0.28 * (1 - t);
        ctx.beginPath();
        ctx.arc(b.x, b.y + parallaxOffset * 0.25, scale * 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${linkColor},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Atoms
      for (const a of atoms) {
        const depthAlpha = 0.28 + a.z * 0.55;
        const r = a.baseRadius * (0.6 + a.z * 0.9) * cfg.nodeRadiusBase;
        ctx.beginPath();
        ctx.arc(a.x, a.y + parallaxOffset * (1 - a.z), r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${a.color[0]},${a.color[1]},${a.color[2]},${depthAlpha})`;
        ctx.fill();

        if (a.electrons) {
          for (const e of a.electrons) {
            const ex = a.x + Math.cos(e.phase) * e.orbitR;
            const ey = a.y + Math.sin(e.phase) * e.orbitR;
            ctx.beginPath();
            ctx.arc(ex, ey + parallaxOffset * (1 - a.z), 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${linkColor},0.68)`;
            ctx.fill();
          }
        }
      }

      // Cursor trail
      if (enableTrail && trailRef.current.length) {
        ctx.lineWidth = 2;
        for (let k = 0; k < trailRef.current.length; k++) {
          const node = trailRef.current[k];
          if (!node) continue;
          const age = now - node.t;
          if (age > 600) continue;
          const alpha = 1 - age / 600;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${linkColor},${alpha * 0.5})`;
          ctx.fill();
        }
      }
    };

    animate();

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };
    const onPointerEnter = () => { pointerRef.current.active = true; };
    const onPointerLeave = () => { pointerRef.current.active = false; };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Shift') pointerRef.current.attract = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') pointerRef.current.attract = false;
    };

    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerenter', onPointerEnter);
    wrapper.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      wrapper.removeEventListener('pointermove', onPointerMove);
      wrapper.removeEventListener('pointerenter', onPointerEnter);
      wrapper.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKeyUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [densityMode, enableTrail, baseConfig]);

  // Public API (ileride ek fonk gerekirse döndürülebilir)
  return {};
}