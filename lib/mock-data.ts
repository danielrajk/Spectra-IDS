// Centralized mock data for entire SOC platform

export interface Threat {
  id: string
  type: 'DDoS' | 'SQLInjection' | 'PortScan' | 'Malware' | 'MitM' | 'BruteForce' | 'ZeroDay'
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  sourceIp: string
  targetIp: string
  timestamp: Date
  confidence: number
  cdrScore: number
  spdScore: number
  ppeScore: number
  description: string
  status: 'Active' | 'Contained' | 'Resolved'
}

export interface Packet {
  id: string
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'DNS'
  sourceIp: string
  destIp: string
  port: number
  bytes: number
  isAttack: boolean
  classification: string
  timestamp: Date
}

export interface Alert {
  id: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  title: string
  description: string
  timestamp: Date
  status: 'New' | 'Assigned' | 'Investigating' | 'Resolved'
  analyst?: string
}

export interface Device {
  id: string
  name: string
  ip: string
  status: 'Online' | 'Offline' | 'Suspicious'
  lastSeen: Date
  threatsDetected: number
  macAddress: string
}

export interface Incident {
  id: string
  title: string
  description: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  startTime: Date
  status: 'Open' | 'In Progress' | 'Resolved'
  assignedTo?: string
  affectedSystems: string[]
}

// Generate mock threats
export function generateMockThreats(count: number = 50): Threat[] {
  const threatTypes: Array<'DDoS' | 'SQLInjection' | 'PortScan' | 'Malware' | 'MitM' | 'BruteForce' | 'ZeroDay'> = ['DDoS', 'SQLInjection', 'PortScan', 'Malware', 'MitM', 'BruteForce', 'ZeroDay']
  const threats: Threat[] = []

  for (let i = 0; i < count; i++) {
    const now = new Date()
    threats.push({
      id: `threat-${i}`,
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)] as any,
      sourceIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      targetIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
      timestamp: new Date(now.getTime() - Math.random() * 3600000),
      confidence: Math.random() * 0.4 + 0.6,
      cdrScore: Math.random() * 0.3 + 0.7,
      spdScore: Math.random() * 0.3 + 0.7,
      ppeScore: Math.random() * 0.3 + 0.65,
      description: `${threatTypes[Math.floor(Math.random() * threatTypes.length)]} attack detected on internal network`,
      status: Math.random() > 0.6 ? 'Active' : Math.random() > 0.5 ? 'Contained' : 'Resolved',
    })
  }

  return threats
}

// Generate mock packets
export function generateMockPackets(count: number = 100): Packet[] {
  const protocols: Array<'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'DNS'> = ['TCP', 'UDP', 'ICMP', 'HTTP', 'DNS']
  const packets: Packet[] = []

  for (let i = 0; i < count; i++) {
    const now = new Date()
    packets.push({
      id: `packet-${i}`,
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      sourceIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      destIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
      port: Math.floor(Math.random() * 65535),
      bytes: Math.floor(Math.random() * 10000),
      isAttack: Math.random() > 0.85,
      classification: Math.random() > 0.85 ? 'Attack' : 'Normal',
      timestamp: new Date(now.getTime() - Math.random() * 1800000),
    })
  }

  return packets
}

// Generate mock alerts
export function generateMockAlerts(count: number = 30): Alert[] {
  const alerts: Alert[] = []
  const titles = [
    'Suspicious Login Attempt',
    'High Volume Data Transfer',
    'Port Scan Detected',
    'SQL Injection Attempt',
    'DDoS Attack Detected',
    'Malware Signature Match',
    'Unusual Outbound Connection',
    'Failed Authentication Spike',
  ]

  for (let i = 0; i < count; i++) {
    const now = new Date()
    alerts.push({
      id: `alert-${i}`,
      severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)] as any,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: `Security alert #${i} - requires investigation and response`,
      timestamp: new Date(now.getTime() - Math.random() * 3600000),
      status: ['New', 'Assigned', 'Investigating', 'Resolved'][Math.floor(Math.random() * 4)] as any,
      analyst: Math.random() > 0.5 ? `analyst-${Math.floor(Math.random() * 5)}` : undefined,
    })
  }

  return alerts
}

// Generate mock devices
export function generateMockDevices(count: number = 20): Device[] {
  const devices: Device[] = []
  const deviceNames = ['Server-1', 'Server-2', 'Firewall', 'Gateway', 'Workstation-1', 'Workstation-2', 'Database-1', 'Web-Server', 'Mail-Server', 'DNS-Server']

  for (let i = 0; i < count; i++) {
    const now = new Date()
    devices.push({
      id: `device-${i}`,
      name: deviceNames[i % deviceNames.length] + (i > deviceNames.length ? `-${Math.floor(i / deviceNames.length)}` : ''),
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      status: Math.random() > 0.8 ? 'Offline' : Math.random() > 0.7 ? 'Suspicious' : 'Online',
      lastSeen: new Date(now.getTime() - Math.random() * 3600000),
      threatsDetected: Math.floor(Math.random() * 10),
      macAddress: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':'),
    })
  }

  return devices
}

// Calculate overall security score
export function calculateSecurityScore(threats: Threat[]): number {
  if (threats.length === 0) return 100

  const criticalCount = threats.filter(t => t.severity === 'Critical').length
  const highCount = threats.filter(t => t.severity === 'High').length
  const mediumCount = threats.filter(t => t.severity === 'Medium').length

  const score = Math.max(0, 100 - (criticalCount * 10 + highCount * 5 + mediumCount * 2))
  return Math.round(score)
}

// Get threat distribution
export function getThreatDistribution(threats: Threat[]) {
  const distribution = {
    DDoS: 0,
    SQLInjection: 0,
    PortScan: 0,
    Malware: 0,
    MitM: 0,
    BruteForce: 0,
    ZeroDay: 0,
  }

  threats.forEach(threat => {
    if (threat.type in distribution) {
      distribution[threat.type]++
    }
  })

  return distribution
}

// Get threat count by severity
export function getThreatSeverityCount(threats: Threat[]) {
  return {
    Critical: threats.filter(t => t.severity === 'Critical').length,
    High: threats.filter(t => t.severity === 'High').length,
    Medium: threats.filter(t => t.severity === 'Medium').length,
    Low: threats.filter(t => t.severity === 'Low').length,
  }
}

// Mock data instances
export const mockThreats = generateMockThreats(50)
export const mockPackets = generateMockPackets(100)
export const mockAlerts = generateMockAlerts(30)
export const mockDevices = generateMockDevices(20)
export const mockIncidents: Incident[] = [
  {
    id: 'incident-1',
    title: 'Large Scale DDoS Attack',
    description: 'Sustained DDoS attack detected on external-facing services',
    severity: 'Critical',
    startTime: new Date(Date.now() - 3600000),
    status: 'In Progress',
    assignedTo: 'analyst-1',
    affectedSystems: ['Web Server', 'API Gateway', 'Load Balancer'],
  },
  {
    id: 'incident-2',
    title: 'Unauthorized Database Access',
    description: 'Multiple failed login attempts followed by successful unauthorized access',
    severity: 'Critical',
    startTime: new Date(Date.now() - 7200000),
    status: 'In Progress',
    assignedTo: 'analyst-2',
    affectedSystems: ['Database Server', 'App Server'],
  },
]
