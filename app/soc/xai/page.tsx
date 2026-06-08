'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Treemap, Cell } from 'recharts'
import { StatCard } from '@/components/soc/stat-card'
import { BookOpen, TrendingUp, Zap } from 'lucide-react'

export default function XAIPage() {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null)

  // SHAP values for feature importance
  const shapData = [
    { feature: 'Packet Size', impact: 0.45, color: '#EF4444' },
    { feature: 'Protocol Type', impact: 0.38, color: '#F97316' },
    { feature: 'Source Port', impact: 0.35, color: '#EAB308' },
    { feature: 'Destination Port', impact: 0.28, color: '#3B82F6' },
    { feature: 'Inter-arrival Time', impact: 0.22, color: '#10B981' },
    { feature: 'Flow Duration', impact: 0.18, color: '#06B6D4' },
  ]

  // Model performance metrics
  const performanceData = [
    { metric: 'Precision', value: 98, category: 'A' },
    { metric: 'Recall', value: 99, category: 'A' },
    { metric: 'F1-Score', value: 99, category: 'A' },
    { metric: 'Specificity', value: 97, category: 'A' },
    { metric: 'Sensitivity', value: 99, category: 'A' },
    { metric: 'AUC-ROC', value: 99, category: 'A' },
  ]

  // Threat confidence distribution
  const confidenceData = Array.from({ length: 11 }, (_, i) => ({
    confidence: `${i * 10}%`,
    count: Math.floor(Math.random() * 50) + 10,
  }))

  // Feature contribution for selected threat
  const threatExplanation = {
    'DDoS': [
      { name: 'High packet volume', contribution: 0.42 },
      { name: 'Repeated source IPs', contribution: 0.28 },
      { name: 'Protocol flooding', contribution: 0.18 },
      { name: 'Timing patterns', contribution: 0.12 },
    ],
    'SQLInjection': [
      { name: 'SQL keywords detected', contribution: 0.55 },
      { name: 'Quote escaping attempts', contribution: 0.25 },
      { name: 'Payload anomalies', contribution: 0.15 },
      { name: 'Error message patterns', contribution: 0.05 },
    ],
    'PortScan': [
      { name: 'Sequential ports', contribution: 0.48 },
      { name: 'SYN flags', contribution: 0.28 },
      { name: 'Timing regularity', contribution: 0.16 },
      { name: 'Response patterns', contribution: 0.08 },
    ],
  } as Record<string, Array<{ name: string; contribution: number }>>

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Explainable AI (XAI) Module</h1>
        <p className="text-muted-foreground mt-1">Understand why SPECTRA-IDS made its threat predictions</p>
      </div>

      {/* XAI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Model Interpretability"
          value="94%"
          icon={<BookOpen className="w-6 h-6" />}
        />
        <StatCard
          label="Decision Transparency"
          value="97%"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatCard
          label="Avg Explanation Quality"
          value="9.2/10"
          icon={<Zap className="w-6 h-6" />}
        />
      </div>

      {/* Feature Importance (SHAP) */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Feature Importance (SHAP Values)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={shapData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="feature" width={190} />
            <Tooltip />
            <Bar dataKey="impact" fill="#3B82F6" radius={[0, 8, 8, 0]}>
              {shapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-4">
          SHAP (SHapley Additive exPlanations) values show each feature's contribution to threat predictions.
        </p>
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="SPECTRA-IDS" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Confidence Distribution */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Prediction Confidence Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="confidence" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Threat Explanation Selector */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Why Did SPECTRA-IDS Detect This Threat?</h2>
        <p className="text-sm text-muted-foreground mb-4">Select a threat type to see the explanation</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {Object.keys(threatExplanation).map((threat) => (
            <button
              key={threat}
              onClick={() => setSelectedThreat(selectedThreat === threat ? null : threat)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedThreat === threat
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/70'
              }`}
            >
              {threat === 'DDoS' ? 'DDoS Attack' : threat === 'SQLInjection' ? 'SQL Injection' : 'Port Scan'}
            </button>
          ))}
        </div>

        {selectedThreat && threatExplanation[selectedThreat] && (
          <div className="space-y-3">
            {threatExplanation[selectedThreat].map((item, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <span className="text-sm font-bold text-primary">{Math.round(item.contribution * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.contribution * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-4">
              The model identified this threat by analyzing these key features. Each percentage shows how much that feature contributed to the threat classification decision.
            </p>
          </div>
        )}
      </div>

      {/* Model Decisions */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Threat Decisions</h2>
        <div className="space-y-3">
          {[
            { id: '1', threat: 'DDoS', confidence: 0.996, decision: 'THREAT DETECTED' },
            { id: '2', threat: 'SQL Injection', confidence: 0.987, decision: 'THREAT DETECTED' },
            { id: '3', threat: 'Normal Traffic', confidence: 0.999, decision: 'BENIGN' },
            { id: '4', threat: 'Port Scan', confidence: 0.978, decision: 'THREAT DETECTED' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded border border-border hover:bg-secondary/50 transition-colors">
              <div>
                <p className="font-medium text-foreground">{item.threat}</p>
                <p className="text-xs text-muted-foreground">Confidence: {(item.confidence * 100).toFixed(1)}%</p>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-semibold ${
                item.decision === 'THREAT DETECTED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {item.decision}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
