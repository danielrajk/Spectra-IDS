'use client';

import { motion } from 'framer-motion';

export default function DigitalTwinPage() {
  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">Digital Twin Environment</h1>
        <p className="text-slate-400">Virtual Network Simulation & Attack Forecasting</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Simulation Environments', value: '5' },
          { label: 'Virtual Nodes', value: '10K+' },
          { label: 'Attack Scenarios', value: '847' },
          { label: 'Prediction Accuracy', value: '98.7%' },
        ].map((metric) => (
          <div key={metric.label} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
            <div className="text-2xl font-bold text-slate-100">{metric.value}</div>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Virtual Network Simulation</h2>
        <div className="text-slate-300 space-y-3">
          <p>Create full virtual replicas of production networks for attack simulation and forecasting.</p>
          <p>Supports multiple simulation modes: Smart City, Healthcare, Industrial IoT, Autonomous Vehicles, Critical Infrastructure.</p>
        </div>
      </motion.div>
    </div>
  );
}
