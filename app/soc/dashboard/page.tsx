'use client'

import { useEffect, useState } from 'react'
import { mockThreats, mockAlerts, calculateSecurityScore, getThreatSeverityCount, getThreatDistribution, Threat, Alert } from '@/lib/mock-data'
import { StatCard } from '@/components/soc/stat-card'
import { MetricCard } from '@/components/soc/metric-card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertTriangle, Shield, Activity, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [securityScore, setSecurityScore] = useState(92)

  useEffect(() => {
    setThreats(mockThreats)
    setAlerts(mockAlerts)
    setSecurityScore(calculateSecurityScore(mockThreats))
  }, [])

  const severityCount = getThreatSeverityCount(threats)
  const threatDistribution = getThreatDistribution(threats)

  // Prepare data for charts
  const severityData = [
    { name: 'Critical', value: severityCount.Critical, fill: '#EF4444' },
    { name: 'High', value: severityCount.High, fill: '#F97316' },
    { name: 'Medium', value: severityCount.Medium, fill: '#EAB308' },
    { name: 'Low', value: severityCount.Low, fill: '#6B7280' },
  ]

  const threatTypeData = Object.entries(threatDistribution).map(([name, value]) => ({
    name,
    value,
  }))

  const timeseriesData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    threats: Math.floor(Math.random() * 15),
    normal: Math.floor(Math.random() * 100),
  }))

  const recentAlerts = alerts.slice(0, 5)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Executive Security Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time security monitoring for SPECTRA-IDS</p>
      </div>

      {/* Security Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200 flex flex-col justify-center items-center">
          <div className="text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <div className="text-5xl font-bold text-primary mb-2">{securityScore}</div>
            <p className="text-sm text-muted-foreground">Overall Security Score</p>
          </div>
        </div>

        <StatCard
          label="Active Threats"
          value={threats.filter(t => t.status === 'Active').length}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
          trend={{ value: 12, direction: 'up' }}
        />

        <StatCard
          label="Critical Issues"
          value={severityCount.Critical}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
        />

        <StatCard
          label="Contained Threats"
          value={threats.filter(t => t.status === 'Contained').length}
          icon={<Activity className="w-6 h-6" />}
          variant="warning"
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Detection Accuracy"
          value="99.2%"
          severity={severityCount.Critical > 5 ? 'high' : 'normal'}
          sparkline={[92, 94, 96, 98, 99, 99.2, 99.1, 99.2]}
        />
        <MetricCard
          label="False Alarm Rate"
          value="0.31%"
          severity="normal"
          sparkline={[0.45, 0.42, 0.38, 0.35, 0.32, 0.31, 0.31, 0.31]}
        />
        <MetricCard
          label="Avg Response Time"
          value="2.3"
          unit="sec"
          severity="normal"
          sparkline={[3.1, 2.9, 2.7, 2.5, 2.4, 2.3, 2.3, 2.3]}
        />
        <MetricCard
          label="Incidents Resolved"
          value={threats.filter(t => t.status === 'Resolved').length}
          severity="normal"
          sparkline={[8, 12, 16, 20, 23, 25, 26, 28]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Severity Distribution */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Threat Severity Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Type Distribution */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Threat Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={threatTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attack Trends */}
        <div className="bg-white rounded-lg border border-border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Attack Trends (24h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeseriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="threats" stroke="#EF4444" strokeWidth={2} name="Threats Detected" />
              <Line type="monotone" dataKey="normal" stroke="#10B981" strokeWidth={2} name="Normal Traffic" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h2>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 rounded border border-border hover:bg-secondary transition-colors">
              <div>
                <p className="font-medium text-foreground">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-xs font-semibold ${
                  alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                  alert.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                  alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {alert.severity}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
