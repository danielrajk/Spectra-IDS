'use client';

import { useEffect, useState } from 'react';
import { useThreatStore } from '@/lib/threat-store';
import { simulationEngine } from '@/lib/simulation-engine';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Zap, Users, Activity, Cpu } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, unit, trend, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-slate-800/50 border border-${color}-900/30 rounded-lg p-4 backdrop-blur-sm hover:bg-slate-800/80 transition-all`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2 rounded-lg bg-${color}-900/20`}>
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div className="text-2xl font-bold text-slate-100 mb-1">
      {value}
      <span className="text-sm text-slate-400 ml-1">{unit}</span>
    </div>
    <div className="text-xs text-slate-400">{label}</div>
  </motion.div>
);

const attackData = [
  { name: 'AI Botnet', value: 2847, fill: '#ef4444' },
  { name: 'DDoS', value: 1923, fill: '#f97316' },
  { name: 'Zero-Day', value: 1205, fill: '#eab308' },
  { name: 'Ransomware', value: 856, fill: '#8b5cf6' },
  { name: 'Other', value: 1189, fill: '#6b7280' },
];

export default function DashboardPage() {
  const { metrics, threats, isSimulating, setSimulating } = useThreatStore();
  const [timelineData, setTimelineData] = useState<any[]>([]);

  useEffect(() => {
    simulationEngine.start();
    
    const timer = setInterval(() => {
      setTimelineData(prev => {
        const newData = [
          ...prev,
          {
            time: new Date(Date.now() - (prev.length * 5000)).toLocaleTimeString(),
            detected: Math.floor(Math.random() * 30) + 10,
            mitigated: Math.floor(Math.random() * 25) + 5,
          },
        ].slice(-30);
        return newData;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-slate-100">SPECTRA Command Center</h1>
          <button
            onClick={() => setSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isSimulating
                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-700/50'
                : 'bg-green-900/30 text-green-400 hover:bg-green-900/50 border border-green-700/50'
            }`}
          >
            {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
          </button>
        </div>
        <p className="text-slate-400">Real-time threat intelligence dashboard</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={AlertTriangle} label="Active Threats" value={metrics.activeThreats} unit="" trend={5.2} color="red" />
        <MetricCard icon={Shield} label="Detection Accuracy" value={metrics.detectionAccuracy.toFixed(1)} unit="%" trend={2.1} color="green" />
        <MetricCard icon={Zap} label="Latency" value={metrics.detectionLatency.toFixed(1)} unit="ms" trend={-1.3} color="blue" />
        <MetricCard icon={Activity} label="Threat Prediction" value={metrics.threatPredictionScore.toFixed(1)} unit="%" trend={3.4} color="yellow" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={Cpu} label="Energy Efficiency" value={metrics.energyEfficiency.toFixed(0)} unit="%" trend={1.8} color="cyan" />
        <MetricCard icon={Users} label="Protected Nodes" value={metrics.protectedEdgeNodes.toLocaleString()} unit="" trend={0.5} color="purple" />
        <MetricCard icon={Shield} label="Adversarial Robustness" value={metrics.adversarialRobustness.toFixed(1)} unit="%" trend={2.0} color="green" />
        <MetricCard icon={Activity} label="Security Health" value={metrics.securityHealthIndex.toFixed(0)} unit="%" trend={1.2} color="emerald" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Timeline Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Detection Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="detected" stroke="#4ade80" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="mitigated" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attack Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Attack Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={attackData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {attackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Live Threat Feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Live Threat Feed</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {threats.slice(0, 10).map((threat, idx) => (
            <motion.div key={threat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30 hover:bg-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${threat.severity === 'Critical' ? 'bg-red-500' : threat.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                <div>
                  <div className="font-medium text-slate-200">{threat.type}</div>
                  <div className="text-xs text-slate-400">{threat.sourceIP}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-200">{(threat.confidence * 100).toFixed(1)}%</div>
                <div className="text-xs text-slate-400">{threat.responseStatus}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
