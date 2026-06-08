'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const evasionData = Array.from({ length: 15 }, (_, i) => ({
  attempt: i + 1,
  evasionScore: 40 + Math.random() * 50,
  detectionRate: 95 - Math.random() * 30,
}));

export default function AdversarialLabPage() {
  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-2">Adversarial AI Lab</h1>
        <p className="text-slate-400">Attack simulation and defense evaluation</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Attack Scenarios', value: '847', color: 'red' },
          { label: 'Evasion Attempts', value: '156', color: 'pink' },
          { label: 'Robustness Score', value: '94.2%', color: 'purple' },
          { label: 'Defense Effectiveness', value: '98.7%', color: 'green' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Evasion Attack Success</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evasionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="attempt" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Line type="monotone" dataKey="evasionScore" stroke="#ef4444" strokeWidth={2} name="Evasion Score" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Defense Detection Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={evasionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="attempt" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Bar dataKey="detectionRate" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Attack Types & Defense Status</h2>
        <div className="space-y-3">
          {['Evasion Attacks', 'Poisoning Attacks', 'Model Extraction', 'Adversarial Samples'].map((attack, idx) => (
            <div key={attack} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
              <div className="font-medium text-slate-100">{attack}</div>
              <div className="text-green-400 font-bold">Protected</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
