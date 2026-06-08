'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const features = [
  { name: 'Packet Size', importance: 95, color: 'red' },
  { name: 'Protocol Type', importance: 87, color: 'orange' },
  { name: 'Traffic Pattern', importance: 82, color: 'yellow' },
  { name: 'Source Port', importance: 76, color: 'blue' },
  { name: 'Destination IP', importance: 71, color: 'purple' },
  { name: 'Time Delta', importance: 68, color: 'cyan' },
];

const featureData = features.map(f => ({ name: f.name, importance: f.importance }));

export default function XAIPage() {
  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Explainable AI (XAI)</h1>
        <p className="text-slate-400">Interpretable decision-making and threat attribution</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Feature Importance (SHAP Values)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={featureData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
            <Bar dataKey="importance" fill="#a78bfa" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Why Was This Attack Detected?</h2>
        <div className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <div className="text-sm font-bold text-slate-100 mb-2">Decision Path for: DDoS Attack (AI Botnet)</div>
            <div className="space-y-2 text-sm text-slate-300">
              <div>✓ Flow Duration: 2.3s (anomalous, typical: 5-30s)</div>
              <div>✓ Packet Rate: 1,247 pps (high anomaly score)</div>
              <div>✓ SYN Count: 847 (flooding pattern detected)</div>
              <div>✓ Entropy Score: 8.9 (random payload)</div>
              <div>✓ Payload Variance: Low (repetitive pattern)</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">LIME Local Explanations</h3>
          <p className="text-slate-300 text-sm">Local interpretable model-agnostic explanations for individual predictions.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Global Feature Analysis</h3>
          <p className="text-slate-300 text-sm">Overall feature importance across all predictions and threat classes.</p>
        </div>
      </motion.div>
    </div>
  );
}
