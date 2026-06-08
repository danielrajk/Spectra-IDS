'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { StatCard } from '@/components/soc/stat-card'
import { AlertTriangle, TrendingDown, Shield } from 'lucide-react'

export default function IntelligencePage() {
  const ipReputationData = [
    { ip: '192.168.1.45', reputation: 85, lastSeen: '2 min ago', threats: 5, status: 'Known Threat' },
    { ip: '10.0.0.128', reputation: 42, lastSeen: '15 min ago', threats: 12, status: 'High Risk' },
    { ip: '172.16.0.200', reputation: 15, lastSeen: '1 hour ago', threats: 8, status: 'Suspicious' },
  ]

  const cveData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    critical: Math.floor(Math.random() * 15),
    high: Math.floor(Math.random() * 25),
  }))

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Threat Intelligence</h1>
        <p className="text-muted-foreground mt-1">IP reputation, CVE tracking, and threat data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Known Threat IPs"
          value="45"
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
        />
        <StatCard
          label="CVE Vulnerabilities"
          value="128"
          icon={<Shield className="w-6 h-6" />}
        />
        <StatCard
          label="Threat Intelligence Updates"
          value="Daily"
          icon={<TrendingDown className="w-6 h-6" />}
        />
      </div>

      {/* IP Reputation */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">IP Reputation Database</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">IP Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Reputation Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Threats</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ipReputationData.map((item, idx) => (
                <tr key={idx} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm font-mono">{item.ip}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${item.reputation}%` }} />
                      </div>
                      <span className="text-sm font-bold">{item.reputation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.threats}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === 'Known Threat' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CVE Timeline */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">CVE Vulnerabilities by Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cveData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="critical" fill="#EF4444" name="Critical" radius={[8, 8, 0, 0]} />
            <Bar dataKey="high" fill="#F97316" name="High" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* MITRE ATT&CK */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">MITRE ATT&CK Framework Mapping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { tactic: 'Reconnaissance', techniques: 'Scanning, Enumeration' },
            { tactic: 'Initial Access', techniques: 'Exploit Public-Facing Application' },
            { tactic: 'Execution', techniques: 'Command Execution, Scripting' },
            { tactic: 'Persistence', techniques: 'Create Account, Modify Registry' },
            { tactic: 'Privilege Escalation', techniques: 'Exploit for Privilege' },
            { tactic: 'Defense Evasion', techniques: 'Obfuscated Files, Code Signing' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded border border-border hover:bg-secondary/50 transition-colors">
              <h3 className="font-semibold text-foreground mb-1">{item.tactic}</h3>
              <p className="text-sm text-muted-foreground">{item.techniques}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
