'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, BarChart3, Network, Zap, BookOpen, Lightbulb, AlertCircle, Bell, Users, FileText, Bot, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/soc/dashboard', label: 'Dashboard', icon: Home },
  { href: '/soc/threats', label: 'Threats', icon: Zap },
  { href: '/soc/network', label: 'Network', icon: Network },
  { href: '/soc/xai', label: 'XAI', icon: BarChart3 },
  { href: '/soc/research', label: 'Research', icon: BookOpen },
  { href: '/soc/intelligence', label: 'Intelligence', icon: Lightbulb },
  { href: '/soc/incidents', label: 'Incidents', icon: AlertCircle },
  { href: '/soc/alerts', label: 'Alerts', icon: Bell },
  { href: '/soc/admin', label: 'Admin', icon: Users },
  { href: '/soc/reports', label: 'Reports', icon: FileText },
  { href: '/soc/copilot', label: 'Copilot', icon: Bot },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <Link href="/soc/dashboard" className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-bold text-lg text-primary">SPECTRA SOC</span>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-secondary'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-2">
          <div className="font-semibold">SPECTRA-IDS v1.0</div>
          <div>Enterprise SOC Platform</div>
        </div>
      </div>
    </aside>
  )
}
