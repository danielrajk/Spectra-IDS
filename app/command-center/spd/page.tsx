'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const predictionData = Array.from({ length: 15 }, (_, i) => ({
  time: `${i}m`,
  confidence: 60 + Math.random() * 35,
  threat: Math.floor(Math.random() * 15),
}));

export default function SPDPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Seismic Pre-shock Detector (SPD)</h1>
        <p className="text-slate-400">Early warning system for imminent threats using predictive analytics</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-sm text-slate-400 mb-2">Prediction Confidence</h3>
          <div className="text-3xl font-bold text-blue-400">87.2%</div>
          <div className="text-xs text-slate-400 mt-2">Seismic activity detected</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-sm text-slate-400 mb-2">Early Warnings</h3>
          <div className="text-3xl font-bold text-yellow-400">12</div>
          <div className="text-xs text-slate-400 mt-2">In last 24 hours</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-sm text-slate-400 mb-2">Threat Horizon</h3>
          <div className="text-3xl font-bold text-green-400">4.2m</div>
          <div className="text-xs text-slate-400 mt-2">Average detection window</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Prediction Confidence</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Line type="monotone" dataKey="confidence" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Seismic Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Bar dataKey="threat" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Recent Predictions</h2>
        <div className="space-y-2">
          {[
            { type: 'DDoS Pre-shock', confidence: 92, time: '2m ago' },
            { type: 'Ransomware Pattern', confidence: 78, time: '5m ago' },
            { type: 'Anomalous Traffic', confidence: 85, time: '8m ago' },
            { type: 'Botnet Activity', confidence: 71, time: '12m ago' },
          ].map((pred, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
              <div>
                <div className="font-medium text-slate-100">{pred.type}</div>
                <div className="text-xs text-slate-400">{pred.time}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-400">{pred.confidence}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
