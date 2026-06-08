'use client'

import { StatCard } from '@/components/soc/stat-card'
import { FileText, Calendar, Download, BarChart3 } from 'lucide-react'

export default function ReportsPage() {
  const reportTemplates = [
    { name: 'Executive Summary', type: 'Executive', created: '2 days ago', format: 'PDF' },
    { name: 'Threat Intelligence Report', type: 'Intelligence', created: '1 week ago', format: 'PDF' },
    { name: 'Incident Analysis', type: 'Incident', created: '3 days ago', format: 'PDF' },
    { name: 'Compliance Report (SOC 2)', type: 'Compliance', created: '2 weeks ago', format: 'PDF' },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reporting Center</h1>
        <p className="text-muted-foreground mt-1">Generate and manage security reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Reports Generated"
          value="24"
          icon={<FileText className="w-6 h-6" />}
        />
        <StatCard
          label="Scheduled Reports"
          value="8"
          icon={<Calendar className="w-6 h-6" />}
        />
        <StatCard
          label="Avg Generation Time"
          value="2.1 min"
          icon={<BarChart3 className="w-6 h-6" />}
        />
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Available Report Templates</h2>
        </div>
        <div className="divide-y divide-border">
          {reportTemplates.map((report, idx) => (
            <div key={idx} className="p-6 hover:bg-secondary/50 transition-colors flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{report.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Type: {report.type} • Created: {report.created}</p>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Generate {report.format}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Schedule Automated Reports</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-background">
              <option>Executive Summary</option>
              <option>Threat Intelligence</option>
              <option>Incident Analysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Frequency</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-background">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  )
}
