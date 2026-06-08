'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const encryptionStatus = [
  { algorithm: 'Kyber-768', status: 'Protected', confidence: 98, overhead: 2.1 },
  { algorithm: 'Dilithium-3', status: 'Protected', confidence: 97, overhead: 1.8 },
  { algorithm: 'SPHINCS+', status: 'Protected', confidence: 96, overhead: 3.2 },
  { algorithm: 'ML-KEM', status: 'Protected', confidence: 99, overhead: 1.5 },
];

const quantumResistance = Array.from({ length: 15 }, (_, i) => ({
  month: `M${i + 1}`,
  resistance: 75 + Math.random() * 20,
  threats: Math.floor(Math.random() * 8),
}));

export default function QuantumPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Post-Quantum Security Layer</h1>
        <p className="text-slate-400">Quantum-resistant cryptographic protection for future-proof security</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Quantum Resistance', value: '99.2%', color: 'green' },
          { label: 'PQC Algorithms', value: '4', color: 'blue' },
          { label: 'Protected Keys', value: '2,847', color: 'purple' },
          { label: 'Cryptographic Overhead', value: '2.1%', color: 'cyan' },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-slate-800/50 border border-${stat.color}-900/30 rounded-lg p-4 backdrop-blur-sm`}>
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Quantum Resistance Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quantumResistance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Line type="monotone" dataKey="resistance" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Quantum Threat Detection</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quantumResistance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
              <Bar dataKey="threats" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Post-Quantum Cryptography Algorithms</h2>
        <div className="space-y-3">
          {encryptionStatus.map((algo, idx) => (
            <motion.div key={algo.algorithm} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="border border-slate-700/30 rounded p-4 bg-slate-700/20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium text-slate-100">{algo.algorithm}</div>
                  <div className="text-xs text-slate-400 mt-1">Type: KEM / Signature</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-green-400">Confidence: {algo.confidence}%</div>
                    <div className="text-xs text-slate-400">Overhead: {algo.overhead}%</div>
                  </div>
                  <div className="px-3 py-1 rounded bg-green-900/40 text-green-300 text-xs font-medium">{algo.status}</div>
                </div>
              </div>
              <div className="w-full bg-slate-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full" style={{ width: `${algo.confidence}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
