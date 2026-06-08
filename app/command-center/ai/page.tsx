'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const modelMetrics = [
  { name: 'CNN-LSTM', accuracy: 98.2, latency: 2.1, f1: 97.9 },
  { name: 'Transformer', accuracy: 99.1, latency: 2.8, f1: 98.7 },
  { name: 'Graph Neural Net', accuracy: 97.8, latency: 3.2, f1: 97.4 },
  { name: 'Ensemble', accuracy: 99.5, latency: 3.5, f1: 99.2 },
];

const ensemble = [
  { name: 'CNN', value: 25, fill: '#3b82f6' },
  { name: 'LSTM', value: 25, fill: '#8b5cf6' },
  { name: 'Transformer', value: 30, fill: '#ec4899' },
  { name: 'GNN', value: 20, fill: '#14b8a6' },
];

export default function AIPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Hybrid AI Engine</h1>
        <p className="text-slate-400">Multi-model ensemble for quantum-resilient threat detection</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Ensemble Accuracy', value: '99.5%', color: 'green' },
          { label: 'Inference Latency', value: '3.5ms', color: 'blue' },
          { label: 'False Alarm Rate', value: '0.19%', color: 'red' },
          { label: 'Models Active', value: '4', color: 'purple' },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-slate-800/50 border border-${stat.color}-900/30 rounded-lg p-4 backdrop-blur-sm`}>
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Model Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Bar dataKey="accuracy" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Ensemble Composition</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ensemble} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {ensemble.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Model Performance Details</h2>
        <div className="space-y-3">
          {modelMetrics.map((model, idx) => (
            <motion.div key={model.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="border border-slate-700/30 rounded p-4 bg-slate-700/20">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-slate-100">{model.name}</div>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">Acc: {model.accuracy}%</span>
                  <span className="text-blue-400">Lat: {model.latency}ms</span>
                  <span className="text-purple-400">F1: {model.f1}</span>
                </div>
              </div>
              <div className="w-full bg-slate-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full" style={{ width: `${model.accuracy}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
