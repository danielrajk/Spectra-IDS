'use client'

import { useEffect, useState } from 'react'
import { mockAlerts, Alert } from '@/lib/mock-data'
import { StatCard } from '@/components/soc/stat-card'
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterSeverity, setFilterSeverity] = useState<string>('All')

  useEffect(() => {
    setAlerts(mockAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
  }, [])

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const statusMatch = filterStatus === 'All' || alert.status === filterStatus
    const severityMatch = filterSeverity === 'All' || alert.severity === filterSeverity
    return statusMatch && severityMatch
  })

  // Alert stats
  const newAlerts = alerts.filter(a => a.status === 'New').length
  const investigatingAlerts = alerts.filter(a => a.status === 'Investigating').length
  const resolvedAlerts = alerts.filter(a => a.status === 'Resolved').length

  // Alert timeline data
  const timelineData = Array.from({ length: 12 }, (_, i) => ({
    hour: `${i}:00`,
    new: Math.floor(Math.random() * 8),
    assigned: Math.floor(Math.random() * 6),
    investigating: Math.floor(Math.random() * 4),
    resolved: Math.floor(Math.random() * 10),
  }))

  // Severity distribution
  const severityData = [
    { name: 'Critical', value: alerts.filter(a => a.severity === 'Critical').length },
    { name: 'High', value: alerts.filter(a => a.severity === 'High').length },
    { name: 'Medium', value: alerts.filter(a => a.severity === 'Medium').length },
    { name: 'Low', value: alerts.filter(a => a.severity === 'Low').length },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
        <p className="text-muted-foreground mt-1">Monitor, manage, and respond to security alerts</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Alerts"
          value={alerts.length}
          icon={<Bell className="w-6 h-6" />}
          trend={{ value: 5, direction: 'up' }}
        />
        <StatCard
          label="New Alerts"
          value={newAlerts}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
        />
        <StatCard
          label="Investigating"
          value={investigatingAlerts}
          icon={<Clock className="w-6 h-6" />}
          variant="warning"
        />
        <StatCard
          label="Resolved"
          value={resolvedAlerts}
          icon={<CheckCircle className="w-6 h-6" />}
          variant="success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Timeline */}
        <div className="bg-white rounded-lg border border-border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Alert Timeline (12h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke="#EF4444" strokeWidth={2} name="New" />
              <Line type="monotone" dataKey="assigned" stroke="#F97316" strokeWidth={2} name="Assigned" />
              <Line type="monotone" dataKey="investigating" stroke="#EAB308" strokeWidth={2} name="Investigating" />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Alerts by Severity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Metrics */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Response Metrics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground font-medium">Avg Response Time</span>
                <span className="text-sm font-bold text-foreground">2.3 min</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground font-medium">Alert Resolution Rate</span>
                <span className="text-sm font-bold text-foreground">92%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground font-medium">False Positives</span>
                <span className="text-sm font-bold text-foreground">0.8%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Alert Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option>All</option>
              <option>New</option>
              <option>Assigned</option>
              <option>Investigating</option>
              <option>Resolved</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Filter by Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            All Alerts ({filteredAlerts.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Severity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{alert.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                    {alert.description}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      alert.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      alert.status === 'Assigned' ? 'bg-purple-100 text-purple-800' :
                      alert.status === 'Investigating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {alert.analyst ? `Analyst ${alert.analyst.split('-')[1]}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
