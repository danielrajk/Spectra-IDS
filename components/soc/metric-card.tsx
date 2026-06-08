'use client'

import { AlertCircle, TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface MetricProps {
  label: string
  value: number | string
  unit?: string
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'normal'
  sparkline?: number[]
}

const severityColors = {
  critical: 'text-red-600 bg-red-50',
  high: 'text-orange-600 bg-orange-50',
  medium: 'text-yellow-600 bg-yellow-50',
  low: 'text-blue-600 bg-blue-50',
  normal: 'text-green-600 bg-green-50',
}

export function MetricCard({ label, value, unit, severity = 'normal', sparkline }: MetricProps) {
  const SeverityIcon = severity === 'critical' || severity === 'high' ? AlertCircle : Zap

  return (
    <div className="bg-white border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">{label}</h3>
        <div className={`p-2 rounded ${severityColors[severity]}`}>
          <SeverityIcon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>

      {sparkline && sparkline.length > 0 && (
        <div className="mt-4 flex items-end gap-1 h-12">
          {sparkline.map((v, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/30 rounded-sm"
              style={{ height: `${(v / Math.max(...sparkline)) * 100}%` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
