'use client'

import { useEffect, useState } from 'react'
import { mockDevices, mockPackets, Device, Packet } from '@/lib/mock-data'
import { StatCard } from '@/components/soc/stat-card'
import { Network, Wifi, Server, AlertCircle } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function NetworkPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [packets, setPackets] = useState<Packet[]>([])

  useEffect(() => {
    setDevices(mockDevices)
    setPackets(mockPackets)
  }, [])

  const onlineDevices = devices.filter(d => d.status === 'Online').length
  const offlineDevices = devices.filter(d => d.status === 'Offline').length
  const suspiciousDevices = devices.filter(d => d.status === 'Suspicious').length

  // Protocol distribution
  const protocolCounts = packets.reduce((acc, p) => {
    acc[p.protocol] = (acc[p.protocol] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const protocolData = Object.entries(protocolCounts).map(([name, value]) => ({
    name,
    value,
  }))

  // Bandwidth over time
  const bandwidthData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    inbound: Math.floor(Math.random() * 1000),
    outbound: Math.floor(Math.random() * 800),
  }))

  // Device status distribution
  const deviceStatusData = [
    { name: 'Online', value: onlineDevices, fill: '#10B981' },
    { name: 'Offline', value: offlineDevices, fill: '#6B7280' },
    { name: 'Suspicious', value: suspiciousDevices, fill: '#EF4444' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Network Monitoring</h1>
        <p className="text-muted-foreground mt-1">Real-time network topology and traffic analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Devices"
          value={devices.length}
          icon={<Server className="w-6 h-6" />}
        />
        <StatCard
          label="Online Devices"
          value={onlineDevices}
          icon={<Wifi className="w-6 h-6" />}
          variant="success"
        />
        <StatCard
          label="Offline Devices"
          value={offlineDevices}
          icon={<Server className="w-6 h-6" />}
          variant="warning"
        />
        <StatCard
          label="Suspicious Devices"
          value={suspiciousDevices}
          icon={<AlertCircle className="w-6 h-6" />}
          variant="danger"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protocol Distribution */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Protocol Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={protocolData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Status */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Device Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bandwidth Usage */}
        <div className="bg-white rounded-lg border border-border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Bandwidth Usage (24h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bandwidthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inbound" stroke="#3B82F6" strokeWidth={2} name="Inbound (MB)" />
              <Line type="monotone" dataKey="outbound" stroke="#10B981" strokeWidth={2} name="Outbound (MB)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device Inventory */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Device Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Device Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">IP Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">MAC Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Seen</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Threats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{device.name}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{device.ip}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{device.macAddress}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      device.status === 'Online' ? 'bg-green-100 text-green-800' :
                      device.status === 'Offline' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(device.lastSeen).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      device.threatsDetected > 5 ? 'bg-red-100 text-red-800' :
                      device.threatsDetected > 2 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {device.threatsDetected}
                    </span>
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
