'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Zap,
  Network,
  Shield,
  Radio,
  Crosshair,
  Cpu,
  Share2,
  Lightbulb,
  Eye,
  Bomb,
  BarChart3,
  Settings,
  Lock,
} from 'lucide-react';

const modules = [
  { icon: LayoutDashboard, label: 'Overview', href: '/command-center/dashboard' },
  { icon: Zap, label: 'SPECTRA Core', href: '/command-center/spectra-core' },
  { icon: Zap, label: 'Live Detection Lab', href: '/command-center/detection' },
  { icon: Network, label: '6G IoT Edge Network', href: '/command-center/network' },
  { icon: Network, label: 'Digital Twin Environment', href: '/command-center/digital-twin' },
  { icon: Shield, label: 'Chameleon Drift Layer', href: '/command-center/cdl' },
  { icon: Radio, label: 'Seismic Pre-shock Detector', href: '/command-center/spd' },
  { icon: Crosshair, label: 'Predator Pursuit Engine', href: '/command-center/ppe' },
  { icon: Cpu, label: 'Hybrid AI Engine', href: '/command-center/ai' },
  { icon: Share2, label: 'Federated Learning Hub', href: '/command-center/federated' },
  { icon: Lock, label: 'Post-Quantum Security', href: '/command-center/quantum' },
  { icon: Lightbulb, label: 'Energy Intelligence', href: '/command-center/energy' },
  { icon: Eye, label: 'Adversarial AI Lab', href: '/command-center/adversarial' },
  { icon: Eye, label: 'Explainable AI', href: '/command-center/xai' },
  { icon: Bomb, label: 'Attack Simulator', href: '/command-center/simulator' },
  { icon: BarChart3, label: 'Model Evaluation', href: '/command-center/evaluation' },
  { icon: Settings, label: 'System Settings', href: '/command-center/settings' },
];

export function CommandCenterSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-950/95 border-r border-green-900/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-green-900/20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="text-sm font-bold text-green-400">SPECTRA-IDS</div>
            <div className="text-xs text-green-400/60">Command Center</div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {modules.map((module, idx) => {
          const Icon = module.icon;
          const isActive = pathname === module.href;

          return (
            <motion.div key={module.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
              <Link href={module.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-green-900/40 text-green-400 border border-green-700/50'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-green-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{module.label}</span>
                  {isActive && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full bg-green-400"
                      animate={{ boxShadow: ['0 0 8px rgba(74, 222, 128, 0.5)', '0 0 16px rgba(74, 222, 128, 0.8)', '0 0 8px rgba(74, 222, 128, 0.5)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-green-900/20 bg-slate-950/50">
        <div className="text-xs text-slate-400 space-y-1">
          <div>SPECTRA-IDS v1.0</div>
          <div className="text-green-400/60">Quantum-Resilient Deep Learning</div>
        </div>
      </div>
    </div>
  );
}
