'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';

export function Contact() {
  const contactMethods = [
    {
      icon: Github,
      label: "GitHub",
      value: "@Nistavilo",
      href: "https://github.com/Nistavilo",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://linkedin.com/in/nistavilo",
      color: "hover:text-blue-400"
    },
    {
      icon: Mail,
      label: "Email",
      value: "nistavilo@example.com",
      href: "mailto:nistavilo@example.com",
      color: "hover:text-green-400"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always excited to discuss new opportunities, collaborate on interesting projects, 
            or simply chat about the fascinating intersection of chemistry and AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-blue-500/50 cursor-pointer group">
                <CardContent 
                  className="p-6 text-center"
                  onClick={() => window.open(method.href, '_blank')}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full group-hover:scale-110 transition-transform">
                      <method.icon className={`h-8 w-8 text-muted-foreground transition-colors ${method.color}`} />
                    </div>
                  </div>
                  <h3 className="mb-2">{method.label}</h3>
                  <p className="text-sm text-muted-foreground">{method.value}</p>
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
          className="text-center"
        >
          <Card className="border-border/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-muted-foreground">Based in Türkiye</span>
                </div>
              </div>
              
              <h3 className="mb-4">Ready to collaborate?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you have a project in mind, want to discuss research opportunities, 
                or just want to connect with someone passionate about data science and chemistry, 
                I'd love to hear from you!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
                  onClick={() => window.open('mailto:nistavilo@example.com', '_blank')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send me an email
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3"
                  onClick={() => window.open('https://github.com/Nistavilo', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start a conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}