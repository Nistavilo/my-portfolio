'use client';
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface Orb {
  size: number;
  x: number;
  y: number;
  hue: number;
  duration: number;
  delay: number;
  blur: number;
  scale: number;
}

interface Props {
  count?: number;
  className?: string;
}

export function FloatingOrbs({ count = 6, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const orb: Orb = {
        size: Math.random() * 260 + 140,
        x: Math.random() * 100,
        y: Math.random() * 100,
        hue: Math.floor(Math.random() * 360),
        duration: Math.random() * 40 + 30,
        delay: -Math.random() * 20,
        blur: Math.random() * 24 + 12,
        scale: Math.random() * 0.4 + 0.8
      };
      const div = document.createElement('div');
      div.className = 'floating-orb';
      div.style.setProperty('--x', `${orb.x}%`);
      div.style.setProperty('--y', `${orb.y}%`);
      div.style.setProperty('--hue', `${orb.hue}`);
      div.style.setProperty('--size', `${orb.size}px`);
      div.style.setProperty('--dur', `${orb.duration}s`);
      div.style.setProperty('--delay', `${orb.delay}s`);
      div.style.setProperty('--blur', `${orb.blur}px`);
      div.style.setProperty('--scale', `${orb.scale}`);
      containerRef.current.appendChild(div);
      nodes.push(div);
    }
    return () => {
      nodes.forEach(n => n.remove());
    };
  }, [count]);

  return <div ref={containerRef} className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)} />;
}