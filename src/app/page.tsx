'use client';  // ← Bunu ekle

import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { useEffect } from "react";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

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

  return (    <div className="min-h-screen bg-background text-foreground">
      {/* Simple background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-indigo-900/5 pointer-events-none" />
            
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>

  );
}
