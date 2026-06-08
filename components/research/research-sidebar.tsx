'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Database, Zap, Brain, BarChart2, Layers, BookOpen, MessageSquare, FileText, Settings, Home } from 'lucide-react';

const navItems = [
  { href: '/research/dashboard', label: 'Dashboard', icon: Home },
  { href: '/research/datasets', label: 'Datasets', icon: Database },
  { href: '/research/features', label: 'Features', icon: Zap },
  { href: '/research/training', label: 'Training', icon: Brain },
  { href: '/research/xai', label: 'XAI Analysis', icon: BarChart3 },
  { href: '/research/performance', label: 'Performance', icon: BarChart2 },
  { href: '/research/comparison', label: 'Comparison', icon: Layers },
  { href: '/research/assistant', label: 'Assistant', icon: MessageSquare },
  { href: '/research/reports', label: 'Reports', icon: FileText },
  { href: '/research/settings', label: 'Settings', icon: Settings },
];

export default function ResearchSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border overflow-y-auto">
      <div className="p-6 border-b border-border">
        <Link href="/research/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm">SPECTRA-IDS</h2>
            <p className="text-xs text-muted-foreground">Research</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
