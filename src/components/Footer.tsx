'use client';

import { motion } from 'framer-motion';
import { Heart, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>and</span>
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>by Nistavilo</span>
            </div>
            
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent"></div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 Nistavilo. All rights reserved.
            </p>
            
            <p className="text-xs text-muted-foreground/70">
              Bridging Chemistry and AI through Data
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}