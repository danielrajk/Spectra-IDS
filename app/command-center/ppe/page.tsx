'use client';

import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const trackingData = Array.from({ length: 12 }, (_, i) => ({
  threat: `Threat-${i + 1}`,
  accuracy: 70 + Math.random() * 25,
  persistence: Math.floor(Math.random() * 100),
}));

export default function PPEPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Predator Pursuit Engine (PPE)</h1>
        <p className="text-slate-400">Advanced threat tracking and persistent attack hunting</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-sm text-slate-400 mb-2">Tracked Threats</h3>
          <div className="text-3xl font-bold text-red-400">23</div>
          <div className="text-xs text-slate-400 mt-2">Active hunts in progress</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-sm text-slate-400 mb-2">Pursuit Accuracy</h3>
          <div className="text-3xl font-bold text-green-400">94.7%</div>
          <div className="text-xs text-slate-400 mt-2">Target attribution rate</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-sm text-slate-400 mb-2">Hunting Mode</h3>
          <div className="text-3xl font-bold text-blue-400">ACTIVE</div>
          <div className="text-xs text-slate-400 mt-2">Persistent threat mode enabled</div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Threat Pursuit Accuracy</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trackingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="threat" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
            <Bar dataKey="accuracy" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Active Hunts</h2>
        <div className="space-y-2">
          {[
            { name: 'APT-Group-Seven', status: 'Hunting', confidence: 96, tier: 'Critical' },
            { name: 'Ransomware-Cartel', status: 'Tracking', confidence: 88, tier: 'High' },
            { name: 'Botnet-Network', status: 'Hunting', confidence: 92, tier: 'Critical' },
            { name: 'Insider-Threat', status: 'Monitoring', confidence: 71, tier: 'Medium' },
          ].map((hunt, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
              <div>
                <div className="font-medium text-slate-100">{hunt.name}</div>
                <div className="flex gap-2 text-xs mt-1">
                  <span className={`px-2 py-0.5 rounded ${hunt.status === 'Hunting' ? 'bg-red-900/40 text-red-300' : hunt.status === 'Tracking' ? 'bg-yellow-900/40 text-yellow-300' : 'bg-blue-900/40 text-blue-300'}`}>{hunt.status}</span>
                  <span className={`px-2 py-0.5 rounded ${hunt.tier === 'Critical' ? 'bg-red-900/40 text-red-300' : hunt.tier === 'High' ? 'bg-orange-900/40 text-orange-300' : 'bg-yellow-900/40 text-yellow-300'}`}>{hunt.tier}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-400">{hunt.confidence}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
