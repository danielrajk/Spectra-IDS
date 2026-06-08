'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const networkData = [
  { layer: 'Cloud Core', health: 98, threats: 0, energy: 45, latency: 5 },
  { layer: 'Regional Edge', health: 95, threats: 2, energy: 62, latency: 12 },
  { layer: 'Micro Edge', health: 87, threats: 8, energy: 78, latency: 25 },
  { layer: 'IoT Devices', health: 82, threats: 15, energy: 85, latency: 45 },
  { layer: 'Autonomous Systems', health: 79, threats: 12, energy: 92, latency: 38 },
];

const latencyData = Array.from({ length: 30 }, (_, i) => ({
  time: `${i}s`,
  latency: 20 + Math.sin(i / 5) * 15 + Math.random() * 10,
}));

export default function NetworkPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">6G IoT Edge Network Simulator</h1>
        <p className="text-slate-400">Real-time network topology and hierarchical monitoring</p>
      </motion.div>

      {/* Network Hierarchy Visualization */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Network Hierarchy</h2>
        <div className="space-y-4">
          {networkData.map((node, idx) => (
            <motion.div key={node.layer} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="border border-slate-700/30 rounded-lg p-4 bg-slate-700/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-slate-100">{node.layer}</h3>
                  <div className="flex gap-4 text-xs text-slate-400 mt-1">
                    <span>Health: {node.health}%</span>
                    <span>Threats: {node.threats}</span>
                    <span>Energy: {node.energy}%</span>
                    <span>Latency: {node.latency}ms</span>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${node.threats > 10 ? 'bg-red-500 animate-pulse' : node.threats > 5 ? 'bg-yellow-500' : 'bg-green-500'}`} />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Health</div>
                  <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-full" style={{ width: `${node.health}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Threat Level</div>
                  <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-orange-400 h-full" style={{ width: `${Math.min(100, node.threats * 10)}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Energy Usage</div>
                  <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-400 h-full" style={{ width: `${node.energy}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Network Health Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Network Health by Layer</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={networkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="layer" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e', borderRadius: '8px' }} />
              <Bar dataKey="health" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Latency Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="latency" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Network Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Nodes', value: '2,847', color: 'green' },
          { label: 'Active Threats', value: '37', color: 'red' },
          { label: 'Avg Latency', value: '25.2ms', color: 'blue' },
          { label: 'Network Health', value: '88.2%', color: 'emerald' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-slate-800/50 border border-${stat.color}-900/30 rounded-lg p-4 backdrop-blur-sm`}>
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
