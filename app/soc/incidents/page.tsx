'use client'

import { useEffect, useState } from 'react'
import { mockIncidents, Incident } from '@/lib/mock-data'
import { StatCard } from '@/components/soc/stat-card'
import { AlertTriangle, Clock, CheckCircle, Users } from 'lucide-react'

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)

  useEffect(() => {
    setIncidents(mockIncidents)
  }, [])

  const openIncidents = incidents.filter(i => i.status === 'Open').length
  const inProgressIncidents = incidents.filter(i => i.status === 'In Progress').length
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length

  const criticalIncidents = incidents.filter(i => i.severity === 'Critical').length

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">SOC & Incident Management</h1>
        <p className="text-muted-foreground mt-1">Track, investigate, and resolve security incidents</p>
      </div>

      {/* Incident Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Incidents"
          value={incidents.length}
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <StatCard
          label="Open Incidents"
          value={openIncidents}
          icon={<Clock className="w-6 h-6" />}
          variant="danger"
        />
        <StatCard
          label="In Progress"
          value={inProgressIncidents}
          icon={<Users className="w-6 h-6" />}
          variant="warning"
        />
        <StatCard
          label="Resolved"
          value={resolvedIncidents}
          icon={<CheckCircle className="w-6 h-6" />}
          variant="success"
        />
      </div>

      {/* Critical Incidents Alert */}
      {criticalIncidents > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Active Critical Incidents</h3>
            <p className="text-sm text-red-800 mt-1">
              {criticalIncidents} critical incident{criticalIncidents !== 1 ? 's' : ''} require immediate attention. Review the list below and assign to analysts.
            </p>
          </div>
        </div>
      )}

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => setSelectedIncident(selectedIncident?.id === incident.id ? null : incident)}
            className="bg-white rounded-lg border border-border p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{incident.description}</p>
              </div>
              <div className="text-right ml-4">
                <span className={`px-3 py-1 rounded text-xs font-semibold inline-block ${
                  incident.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                  incident.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
              <div>
                <span className="font-medium text-foreground">Start Time:</span> {new Date(incident.startTime).toLocaleString()}
              </div>
              <div>
                <span className="font-medium text-foreground">Assigned To:</span> {incident.assignedTo || 'Unassigned'}
              </div>
              <div>
                <span className="font-medium text-foreground">Affected Systems:</span> {incident.affectedSystems.join(', ')}
              </div>
            </div>

            {/* Expanded Details */}
            {selectedIncident?.id === incident.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Incident ID</h4>
                    <p className="text-sm font-mono text-muted-foreground">{incident.id}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Duration</h4>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor((Date.now() - new Date(incident.startTime).getTime()) / 1000 / 60)} minutes
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Affected Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedSystems.map((system, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary rounded text-sm text-foreground">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Investigation Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Investigation Guidelines</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Gather evidence from network logs, system events, and SPECTRA-IDS alerts</li>
          <li>• Document all findings in the incident record</li>
          <li>• Escalate critical incidents to incident commander</li>
          <li>• Contain threats immediately upon confirmation</li>
          <li>• Preserve forensic evidence for post-incident review</li>
          <li>• Update incident status as investigation progresses</li>
        </ul>
      </div>
    </div>
  )
}
