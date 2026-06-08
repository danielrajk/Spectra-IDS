import { ReactNode } from 'react';
import ResearchSidebar from '@/components/research/research-sidebar';

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <ResearchSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
