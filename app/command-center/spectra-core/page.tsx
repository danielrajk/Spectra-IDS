'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, Clock, Zap, Brain } from 'lucide-react';
import { useState } from 'react';

const pipelineStages = [
  { name: 'IoT Devices', description: 'Edge data collection', threats: 2847, color: 'blue' },
  { name: 'CDL', description: 'Behavioral fingerprinting', threats: 2156, color: 'cyan' },
  { name: 'SPD', description: 'Anomaly detection', threats: 1892, color: 'purple' },
  { name: 'PPE', description: 'Resource allocation', threats: 1543, color: 'yellow' },
  { name: 'Hybrid AI', description: 'CNN-BiLSTM-Attention', threats: 1205, color: 'green' },
  { name: 'Federated Learning', description: 'Distributed training', threats: 956, color: 'indigo' },
  { name: 'Post-Quantum', description: 'Secure communications', threats: 643, color: 'pink' },
  { name: 'XAI Layer', description: 'Explainability', threats: 321, color: 'orange' },
];

const throughputData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}h`,
  throughput: Math.floor(Math.random() * 50) + 40,
  latency: Math.floor(Math.random() * 10) + 2,
}));

export default function SpectraCoreNPage() {
  const [selectedStage, setSelectedStage] = useState<typeof pipelineStages[0] | null>(null);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">SPECTRA Core Pipeline</h1>
        <p className="text-slate-400">Quantum-Resilient Autonomous Threat Intelligence Framework</p>
      </motion.div>

      {/* Pipeline Visualization */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-8 backdrop-blur-sm overflow-x-auto">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Processing Pipeline</h2>
        
        <div className="flex gap-4 pb-4 min-w-full">
          {pipelineStages.map((stage, idx) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedStage(stage)}
              className={`flex-1 min-w-max bg-gradient-to-b from-slate-700/50 to-slate-800/50 border rounded-lg p-4 cursor-pointer transition-all hover:border-green-500/50 ${
                selectedStage?.name === stage.name ? 'border-green-500 ring-2 ring-green-500/30' : 'border-slate-600/30'
              }`}
            >
              <div className="text-sm font-bold text-slate-100 mb-1">{stage.name}</div>
              <div className="text-xs text-slate-400 mb-3">{stage.description}</div>
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-xs">{stage.threats} threats</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow arrows */}
        <div className="text-center text-slate-500 text-sm mt-4">↓ Data & Threat Information Flows Through Pipeline ↓</div>
      </motion.div>

      {/* Stage Details */}
      {selectedStage && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-green-600/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-400 mb-4">{selectedStage.name} Details</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700/30 rounded p-4">
              <div className="text-sm text-slate-400 mb-1">Threats Processed</div>
              <div className="text-2xl font-bold text-red-400">{selectedStage.threats}</div>
            </div>
            <div className="bg-slate-700/30 rounded p-4">
              <div className="text-sm text-slate-400 mb-1">Avg Latency</div>
              <div className="text-2xl font-bold text-blue-400">2.3ms</div>
            </div>
            <div className="bg-slate-700/30 rounded p-4">
              <div className="text-sm text-slate-400 mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-green-400">99.2%</div>
            </div>
          </div>
          <p className="text-slate-300">{selectedStage.description} - Processing threats through advanced machine learning and behavioral analysis.</p>
        </motion.div>
      )}

      {/* Throughput Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Pipeline Throughput
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="hour" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Bar dataKey="throughput" fill="#f59e0b" name="Packets/sec" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Detection Latency
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="hour" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} name="Latency (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Model Architecture */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Hybrid AI Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['CNN', 'BiLSTM', 'Attention', 'Ensemble'].map((model) => (
            <div key={model} className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-500/50 transition-colors">
              <div className="font-bold text-purple-400 mb-2">{model}</div>
              <div className="text-xs text-slate-400">Advanced deep learning component</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
