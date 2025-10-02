import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Nistavilo/repos?sort=updated&per_page=6');
        const data = await response.json();
        setRepos(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400 backdrop-blur-sm">
              🚀 My Projects
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl mb-8 font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="text-foreground/80">Work</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore my latest work in <span className="text-purple-400 font-medium">data science</span>, 
            <span className="text-blue-400 font-medium"> machine learning</span>, and 
            <span className="text-indigo-400 font-medium"> computational chemistry</span>. 
            Each project represents a step forward in bridging traditional science with modern AI.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {repos.map((repo) => (
              <div key={repo.id}>
                <Card className="h-full transition-all duration-500 border-0 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate text-lg group-hover:text-blue-400 transition-colors duration-300">
                        {repo.name}
                      </span>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-yellow-400">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full">
                          <GitFork className="h-3 w-3 text-green-400" />
                          <span className="text-green-400">{repo.forks_count}</span>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 flex flex-col justify-between h-full relative z-10">
                    <div className="flex-grow">
                      <p className="text-muted-foreground/80 mb-6 line-clamp-3 leading-relaxed">
                        {repo.description || "No description available"}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {repo.language && (
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 text-blue-400">
                            {repo.language}
                          </Badge>
                        )}
                        {repo.topics.slice(0, 2).map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-500/30 hover:border-blue-500/50 bg-transparent hover:bg-blue-500/10 text-blue-400 hover:text-blue-300"
                        onClick={() => window.open(repo.html_url, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      {repo.homepage && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-purple-500/30 hover:border-purple-500/50 bg-transparent hover:bg-purple-500/10 text-purple-400 hover:text-purple-300"
                          onClick={() => window.open(repo.homepage, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com/Nistavilo', '_blank')}
            className="px-12 py-4 text-lg border-blue-500/40 hover:border-blue-500/60 bg-gradient-to-r from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10 backdrop-blur-sm text-blue-400 hover:text-blue-300 transition-all duration-300"
          >
            <Github className="mr-3 h-5 w-5" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}