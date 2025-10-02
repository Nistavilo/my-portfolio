'use client';
import { Github, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 font-extrabold">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Nistavilo
          </span>
        </h1>
        
        <p className="text-xl md:text-3xl mb-6 bg-gradient-to-r from-blue-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent font-medium">
          Bridging Chemistry, Data Science & AI
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          20-year-old Chemistry student from <span className="text-blue-400 font-medium">Türkiye</span>, 
          diving into <span className="text-purple-400 font-medium">Data Science</span> and <span className="text-green-400 font-medium">Machine Learning</span> 
          to create <span className="text-blue-400 font-medium">innovative solutions</span> for real-world problems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-4 text-lg shadow-lg"
            onClick={() => window.open('https://github.com/Nistavilo', '_blank')}
          >
            <Github className="mr-3 h-5 w-5" />
            Check my GitHub
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-10 py-4 text-lg border-blue-500/30 hover:border-blue-500/60 text-blue-400 hover:text-blue-300"
            onClick={() => scrollToSection('about')}
          >
            Learn More
          </Button>
        </div>

        {/* Simple stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { number: "3+", label: "Years Coding" },
            { number: "20+", label: "Projects" },
            { number: "∞", label: "Curiosity" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground/70 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown className="h-6 w-6 text-blue-400" />
      </div>
    </section>
  );
}
