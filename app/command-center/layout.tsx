'use client';

import { ReactNode } from 'react';
import { CommandCenterSidebar } from '@/components/command-center/sidebar';
import { motion } from 'framer-motion';

export default function CommandCenterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #00ff88 0%, transparent 50%), radial-gradient(circle at 80% 80%, #00ccff 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Sidebar */}
      <CommandCenterSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
