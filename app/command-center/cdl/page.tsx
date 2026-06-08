'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const driftData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}s`,
  baseline: 50 + Math.random() * 10,
  current: 50 + Math.sin(i / 3) * 20 + Math.random() * 15,
}));

export default function CDLPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Chameleon Drift Layer (CDL)</h1>
        <p className="text-slate-400">Behavioral fingerprinting and anomaly detection through adaptive drift monitoring</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Behavioral Drift Detection</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={driftData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Line type="monotone" dataKey="baseline" stroke="#4ade80" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="current" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Drift Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Adaptation Level', value: 85.3, color: 'green' },
              { label: 'Drift Detected', value: 12, unit: 'events', color: 'yellow' },
              { label: 'Pattern Shift', value: 23.1, unit: '%', color: 'blue' },
              { label: 'Active Layers', value: 7, color: 'cyan' },
            ].map((metric) => (
              <div key={metric.label} className="border border-slate-700/30 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">{metric.label}</span>
                  <span className={`text-lg font-bold text-${metric.color}-400`}>{metric.value}{metric.unit ? metric.unit : '%'}</span>
                </div>
                <div className="bg-slate-900/50 rounded-full h-2">
                  <div className={`bg-${metric.color}-500 h-full rounded-full`} style={{ width: `${Math.min(100, metric.value)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Anomaly Score Timeline</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={driftData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
            <Area type="monotone" dataKey="current" fill="#f97316" stroke="#ea580c" opacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
