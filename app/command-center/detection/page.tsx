'use client';

import { useEffect, useState } from 'react';
import { useThreatStore, AttackStage } from '@/lib/threat-store';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { AlertTriangle, Clock, Zap } from 'lucide-react';

const ATTACK_STAGES: AttackStage[] = ['Reconnaissance', 'Scanning', 'Exploitation', 'Persistence', 'Lateral Movement', 'Impact'];

const stageColors = {
  'Reconnaissance': '#3b82f6',
  'Scanning': '#8b5cf6',
  'Exploitation': '#ec4899',
  'Persistence': '#f97316',
  'Lateral Movement': '#ef4444',
  'Impact': '#7c3aed',
};

export default function DetectionLabPage() {
  const { threats, launchAttack, isSimulating } = useThreatStore();
  const [activeTab, setActiveTab] = useState('stream');

  const attackTypes = [
    'AI Botnet',
    'DDoS',
    'Port Scan',
    'Brute Force',
    'SQL Injection',
    'Malware Communication',
    'Ransomware Activity',
    'Adversarial Evasion',
    'Zero-Day Threat',
  ] as const;

  // Generate lifecycle data
  const lifecycleData = ATTACK_STAGES.map((stage) => ({
    stage,
    threats: threats.filter(t => t.stage === stage).length,
    avgConfidence: threats.filter(t => t.stage === stage).length > 0
      ? threats.filter(t => t.stage === stage).reduce((sum, t) => sum + t.confidence, 0) / threats.filter(t => t.stage === stage).length
      : 0,
  }));

  // Generate heatmap data (network nodes and threat density)
  const heatmapData = Array.from({ length: 15 }, (_, x) =>
    Array.from({ length: 15 }, (_, y) => ({
      x,
      y,
      threats: Math.floor(Math.random() * 5),
    }))
  ).flat();

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">Live Detection Lab</h1>
        <p className="text-slate-400">Real-time threat simulation and attack lifecycle analysis</p>
      </motion.div>

      {/* Attack Launcher */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-red-900/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Launch Attack Simulation</h2>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
          {attackTypes.map((type) => (
            <motion.button
              key={type}
              onClick={() => launchAttack(type)}
              disabled={!isSimulating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs bg-red-900/40 hover:bg-red-900/70 text-red-400 border border-red-700/50 rounded px-3 py-2 transition-colors disabled:opacity-50"
            >
              {type.split(' ')[0]}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-700/30">
        {['stream', 'lifecycle', 'heatmap', 'propagation'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab ? 'border-green-400 text-green-400' : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Live Threat Feed */}
      {activeTab === 'stream' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {threats.slice(0, 20).map((threat, idx) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30 hover:border-slate-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-2 h-2 rounded-full ${threat.severity === 'Critical' ? 'bg-red-500 animate-pulse' : threat.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-100">{threat.type}</div>
                    <div className="text-xs text-slate-400">{threat.sourceIP} → {threat.targetIP}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">{threat.confidence.toFixed(1) * 100}%</div>
                    <div className="text-xs text-slate-400" style={{ color: stageColors[threat.stage] }}>{threat.stage}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Attack Lifecycle Visualization */}
      {activeTab === 'lifecycle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lifecycle Chart */}
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Attack Lifecycle Stages
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lifecycleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="stage" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0f766e' }} />
                <Bar dataKey="threats" fill="#ef4444" name="Active Threats" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stage Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lifecycleData.map((data) => (
              <motion.div
                key={data.stage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/50 border rounded-lg p-4 backdrop-blur-sm"
                style={{ borderColor: stageColors[data.stage] + '50' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stageColors[data.stage] }} />
                  <div className="font-bold text-slate-100">{data.stage}</div>
                </div>
                <div className="text-2xl font-bold text-red-400 mb-1">{data.threats}</div>
                <div className="text-xs text-slate-400">Active Threats</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Network Heatmap */}
      {activeTab === 'heatmap' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Network Threat Density Heatmap
          </h2>
          <div className="grid grid-cols-15 gap-1 bg-slate-900/50 p-4 rounded">
            {heatmapData.slice(0, 225).map((cell, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded transition-all hover:scale-110"
                style={{
                  backgroundColor:
                    cell.threats === 0
                      ? 'rgba(15, 118, 110, 0.2)'
                      : cell.threats === 1
                      ? 'rgba(34, 197, 94, 0.4)'
                      : cell.threats === 2
                      ? 'rgba(234, 179, 8, 0.6)'
                      : cell.threats === 3
                      ? 'rgba(249, 115, 22, 0.8)'
                      : 'rgba(239, 68, 68, 1)',
                }}
                title={`Threats: ${cell.threats}`}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm text-slate-400">
            <div>Green: Low | Yellow: Medium | Orange: High | Red: Critical</div>
          </div>
        </motion.div>
      )}

      {/* Attack Propagation */}
      {activeTab === 'propagation' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Attack Propagation Analysis
          </h2>
          <div className="space-y-4">
            {threats.slice(0, 10).map((threat) => (
              <div key={threat.id} className="bg-slate-700/30 rounded p-4 border border-slate-600/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-slate-100">{threat.type}</div>
                  <div className="text-sm text-slate-400">Affected Nodes: {threat.affectedNodes}</div>
                </div>
                <div className="w-full bg-slate-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${threat.escalationLevel}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>Escalation: {threat.escalationLevel.toFixed(1)}%</span>
                  <span>Propagation Nodes: {threat.propagationNodes.length}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
