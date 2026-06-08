'use client';

import { useEffect, useState } from 'react';
import { useThreatStore } from '@/lib/threat-store';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function DetectionLabPage() {
  const { threats, launchAttack, isSimulating } = useThreatStore();
  const [activeTab, setActiveTab] = useState('stream');

  const attackTypes = [
    'AI Botnet',
    'DDoS',
    'Port Scan',
    'Brute Force',
    'SQL Injection',
    'Malware Communication',
    'Ransomware Activity',
    'Adversarial Evasion',
    'Zero-Day Threat',
  ] as const;

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Live Detection Lab</h1>
        <p className="text-slate-400">Generate and analyze attack scenarios in real-time</p>
      </motion.div>

      {/* Attack Launcher */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Attack Launcher</h2>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
          {attackTypes.map((type) => (
            <Button
              key={type}
              onClick={() => launchAttack(type)}
              disabled={!isSimulating}
              className="text-xs bg-red-900/30 hover:bg-red-900/60 text-red-400 border border-red-700/50"
            >
              Launch {type.split(' ')[0]}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-700/30">
        {['stream', 'timeline', 'heatmap'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 border-b-2 transition-colors ${activeTab === tab ? 'border-green-400 text-green-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        {activeTab === 'stream' && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {threats.slice(0, 20).map((threat) => (
              <motion.div key={threat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded border border-slate-600/30">
                <div className={`w-3 h-3 rounded-full ${threat.severity === 'Critical' ? 'bg-red-500 animate-pulse' : threat.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                <div className="flex-1">
                  <div className="font-medium text-slate-100">{threat.type}</div>
                  <div className="text-xs text-slate-400">{threat.sourceIP} → {threat.targetIP}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-100">{(threat.confidence * 100).toFixed(1)}%</div>
                  <div className="text-xs text-slate-400">{threat.severity}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && <div className="text-slate-400 text-center py-8">Attack timeline visualization - Coming soon</div>}

        {activeTab === 'heatmap' && <div className="text-slate-400 text-center py-8">Network heatmap - Coming soon</div>}
      </motion.div>
    </div>
  );
}
