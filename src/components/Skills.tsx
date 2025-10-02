'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Code2, 
  Database, 
  BarChart3, 
  Brain, 
  GitBranch, 
  Atom,
  PieChart,
  Terminal
} from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      icon: Code2,
      title: "Programming Languages",
      skills: ["Python", "SQL", "R", "JavaScript"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Deep Learning", "Neural Networks"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      skills: ["Seaborn", "Plotly", "Tableau", "Power BI"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: GitBranch,
      title: "Development Tools",
      skills: ["Git", "GitHub", "Jupyter", "VS Code"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Atom,
      title: "Chemistry Background",
      skills: ["Analytical Chemistry", "Computational Chemistry", "Molecular Modeling", "ChemDraw"],
      color: "from-teal-500 to-blue-500"
    }
  ];

  const additionalSkills = [
    "Statistical Analysis", "Data Mining", "Feature Engineering", "Model Optimization",
    "Time Series Analysis", "Natural Language Processing", "Computer Vision", 
    "API Development", "Cloud Computing", "Docker"
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit spanning data science, machine learning, and computational chemistry, 
            enabling me to tackle complex problems from multiple angles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-blue-500/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className={`p-3 bg-gradient-to-r ${category.color} rounded-full mr-4`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="flex-1">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs hover:scale-105 transition-transform cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-4">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                <h3>Additional Competencies</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {additionalSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Badge 
                      variant="outline" 
                      className="text-sm hover:scale-105 transition-transform cursor-default hover:border-blue-500/50"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <Terminal className="h-5 w-5" />
            <span>Always learning, always growing</span>
            <Terminal className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}