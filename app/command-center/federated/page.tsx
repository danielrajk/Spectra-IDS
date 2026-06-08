'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const federatedRounds = Array.from({ length: 20 }, (_, i) => ({
  round: i + 1,
  accuracy: 85 + Math.random() * 10 + (i * 0.5),
  participatingNodes: Math.floor(2847 * (0.7 + Math.random() * 0.3)),
}));

export default function FederatedPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Federated Learning Hub</h1>
        <p className="text-slate-400">Distributed collaborative model training across edge nodes</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Training Rounds', value: '142', color: 'blue' },
          { label: 'Global Model Accuracy', value: '94.8%', color: 'green' },
          { label: 'Participating Nodes', value: '1,923', color: 'purple' },
          { label: 'Communication Rounds', value: '2,847', color: 'cyan' },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-slate-800/50 border border-${stat.color}-900/30 rounded-lg p-4 backdrop-blur-sm`}>
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Global Model Convergence</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={federatedRounds}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="round" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Participating Nodes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={federatedRounds}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="round" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Bar dataKey="participatingNodes" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Active Federated Clients</h2>
        <div className="space-y-3">
          {[
            { region: 'North America', nodes: 542, accuracy: 95.2, status: 'Active' },
            { region: 'Europe', nodes: 438, accuracy: 94.8, status: 'Active' },
            { region: 'Asia Pacific', nodes: 623, accuracy: 93.9, status: 'Active' },
            { region: 'Middle East', nodes: 234, accuracy: 92.1, status: 'Syncing' },
            { region: 'South America', nodes: 186, accuracy: 91.7, status: 'Active' },
          ].map((region, idx) => (
            <motion.div key={region.region} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
              <div>
                <div className="font-medium text-slate-100">{region.region}</div>
                <div className="text-xs text-slate-400">Nodes: {region.nodes}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-green-400">{region.accuracy}%</div>
                <div className={`px-2 py-1 rounded text-xs ${region.status === 'Active' ? 'bg-green-900/40 text-green-300' : 'bg-blue-900/40 text-blue-300'}`}>{region.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
