'use client';  // ← Bunu ekle

import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Dark mode by default
    document.documentElement.classList.add('dark');

    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
    </div>
  );
}
