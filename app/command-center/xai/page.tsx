'use client';

import { motion } from 'framer-motion';

export default function XAIPage() {
  const features = [
    { name: 'Packet Size', importance: 95, color: 'red' },
    { name: 'Protocol Type', importance: 87, color: 'orange' },
    { name: 'Traffic Pattern', importance: 82, color: 'yellow' },
    { name: 'Source Port', importance: 76, color: 'blue' },
    { name: 'Destination IP', importance: 71, color: 'purple' },
    { name: 'Time Delta', importance: 68, color: 'cyan' },
  ];

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Explainable AI (XAI)</h1>
        <p className="text-slate-400">Interpretable decision-making for threat classification</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Feature Importance (SHAP)</h2>
        <div className="space-y-4">
          {features.map((feature, idx) => (
            <motion.div key={feature.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-slate-100">{feature.name}</span>
                <span className={`text-${feature.color}-400 font-bold`}>{feature.importance}%</span>
              </div>
              <div className="w-full bg-slate-900/50 rounded-full h-3 overflow-hidden">
                <div className={`bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-400 h-full`} style={{ width: `${feature.importance}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
