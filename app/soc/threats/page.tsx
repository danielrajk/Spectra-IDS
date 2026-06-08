'use client'

import { useEffect, useState } from 'react'
import { mockThreats, Threat } from '@/lib/mock-data'
import { StatCard } from '@/components/soc/stat-card'
import { MetricCard } from '@/components/soc/metric-card'
import { AlertTriangle, Zap, TrendingUp, Shield } from 'lucide-react'

export default function ThreatsPage() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)

  useEffect(() => {
    setThreats(mockThreats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
  }, [])

  const criticalThreats = threats.filter(t => t.severity === 'Critical')
  const activeThreats = threats.filter(t => t.status === 'Active')

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Threat Detection Center</h1>
        <p className="text-muted-foreground mt-1">Real-time threat analysis powered by SPECTRA-IDS</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Threats Detected"
          value={threats.length}
          icon={<Zap className="w-6 h-6" />}
          trend={{ value: 8, direction: 'up' }}
        />
        <StatCard
          label="Active Threats"
          value={activeThreats.length}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
          trend={{ value: 3, direction: 'up' }}
        />
        <StatCard
          label="Critical Threats"
          value={criticalThreats.length}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
        />
        <StatCard
          label="Avg Confidence"
          value={`${Math.round(threats.reduce((sum, t) => sum + t.confidence, 0) / threats.length * 100)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* SPECTRA Mechanism Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Chameleon Drift Layer (CDL)"
          value={`${Math.round(threats.reduce((sum, t) => sum + t.cdrScore, 0) / threats.length * 100)}%`}
          severity={threats.reduce((sum, t) => sum + t.cdrScore, 0) / threats.length > 0.8 ? 'normal' : 'medium'}
          sparkline={[70, 72, 74, 76, 78, 80, 82, 84]}
        />
        <MetricCard
          label="Seismic Pre-shock Detector (SPD)"
          value={`${Math.round(threats.reduce((sum, t) => sum + t.spdScore, 0) / threats.length * 100)}%`}
          severity={threats.reduce((sum, t) => sum + t.spdScore, 0) / threats.length > 0.8 ? 'normal' : 'medium'}
          sparkline={[75, 76, 77, 78, 79, 80, 81, 82]}
        />
        <MetricCard
          label="Predator Pursuit Engine (PPE)"
          value={`${Math.round(threats.reduce((sum, t) => sum + t.ppeScore, 0) / threats.length * 100)}%`}
          severity={threats.reduce((sum, t) => sum + t.ppeScore, 0) / threats.length > 0.75 ? 'normal' : 'medium'}
          sparkline={[72, 73, 74, 75, 76, 77, 78, 79]}
        />
      </div>

      {/* Threat List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Active Threats</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Source IP</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Target IP</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Severity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Confidence</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">CDL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">SPD</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">PPE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {threats.slice(0, 10).map((threat) => (
                <tr
                  key={threat.id}
                  className="hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedThreat(threat)}
                >
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(threat.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{threat.type}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{threat.sourceIp}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{threat.targetIp}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      threat.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      threat.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      threat.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${threat.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-foreground font-medium">{Math.round(threat.confidence * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      threat.status === 'Active' ? 'bg-red-100 text-red-800' :
                      threat.status === 'Contained' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{(threat.cdrScore * 100).toFixed(0)}%</td>
                  <td className="px-6 py-4 text-sm font-medium">{(threat.spdScore * 100).toFixed(0)}%</td>
                  <td className="px-6 py-4 text-sm font-medium">{(threat.ppeScore * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threat Details */}
      {selectedThreat && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{selectedThreat.type} Attack Analysis</h3>
              <p className="text-foreground mb-4">{selectedThreat.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Source IP</p>
                  <p className="font-mono font-medium text-foreground">{selectedThreat.sourceIp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target IP</p>
                  <p className="font-mono font-medium text-foreground">{selectedThreat.targetIp}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedThreat(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
