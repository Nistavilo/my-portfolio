import { Navigation } from '@/components/Navigation';
import './globals.css'
import React from 'react';

export const metadata = {
  title: 'Ereosys',
  description: 'Ereosys — Next-generation SaaS product company',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-background text-foreground font-sans flex flex-col min-h-screen">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-indigo-900/5 pointer-events-none" />
        
        <Navigation /> 

        <main className="relative z-10 flex-grow">
          {children}
        </main>
      </body>
    </html>
  )
}
