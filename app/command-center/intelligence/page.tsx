'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const threatIntel = [
  { actor: 'APT-28', attacks: 47, confidence: 98, lastSeen: '2h ago' },
  { actor: 'Lazarus Group', attacks: 34, confidence: 96, lastSeen: '5h ago' },
  { actor: 'Carbanak', attacks: 28, confidence: 94, lastSeen: '12h ago' },
  { actor: 'Fancy Bear', attacks: 23, confidence: 91, lastSeen: '1d ago' },
];

const threatData = threatIntel.map(t => ({ actor: t.actor, attacks: t.attacks }));

export default function IntelligencePage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Threat Intelligence Hub</h1>
        <p className="text-slate-400">Advanced adversary tracking and attribution</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Threat Actor Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={threatData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="actor" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
            <Bar dataKey="attacks" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Tracked Threat Actors</h2>
        <div className="space-y-3">
          {threatIntel.map((threat, idx) => (
            <motion.div key={threat.actor} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
              <div>
                <div className="font-medium text-slate-100">{threat.actor}</div>
                <div className="text-xs text-slate-400">{threat.lastSeen}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-red-400">{threat.attacks} attacks</div>
                  <div className="text-xs text-slate-400">Confidence: {threat.confidence}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
