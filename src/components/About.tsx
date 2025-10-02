import { Card, CardContent } from './ui/card';
import { GraduationCap, Atom, Brain, Database, Target } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Data Science Learner",
      description: "Currently exploring data science, machine learning, and AI to enhance scientific research",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Atom,
      title: "Chemistry Student", 
      description: "Strong foundation in chemistry enabling me to understand complex scientific problems",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "AI Enthusiast",
      description: "Passionate about artificial intelligence and how it can revolutionize research and applications",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Data Driven",
      description: "Focused on extracting meaningful insights from datasets and solving real-world problems",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 backdrop-blur-sm">
              ✨ About Me
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl mb-8 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Aspiring
            </span>
            <br />
            <span className="text-foreground/80">Scientist & Innovator</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I'm a chemistry student diving into the world of <span className="text-blue-400 font-medium">data science</span> 
            and <span className="text-purple-400 font-medium">machine learning</span>. I aim to combine the rigorous analytical skills from chemistry 
            with computational techniques to uncover insights, solve challenging problems, and innovate in scientific research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((highlight) => (
            <div key={highlight.title}>
              <Card className="h-full transition-all duration-500 border-0 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm hover:shadow-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div className={`p-4 bg-gradient-to-r ${highlight.color} rounded-2xl shadow-lg`}>
                      <highlight.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-lg font-semibold">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Card className="border-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10" />
            <CardContent className="p-10 relative z-10">
              <div className="mb-6 inline-block">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="mb-6 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                My Mission
              </h3>
              
              <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
                To <span className="text-blue-400 font-medium">bridge the gap</span> between chemistry and computational methods, 
                creating <span className="text-purple-400 font-medium">innovative solutions</span> that advance scientific knowledge 
                and provide practical insights through data science and machine learning.
              </p>
              
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full w-24" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
