// SPECTRA-IDS Simulation Engine
// Generates realistic network traffic data with various attack types

export type AttackType = 
  | "Normal"
  | "DDoS"
  | "SQL Injection"
  | "XSS"
  | "Brute Force"
  | "Man-in-the-Middle"
  | "Zero-Day"
  | "Ransomware"
  | "Botnet"
  | "Port Scan";

export type ThreatLevel = "low" | "medium" | "high" | "critical";

export interface NetworkPacket {
  id: string;
  timestamp: Date;
  sourceIP: string;
  destIP: string;
  sourcePort: number;
  destPort: number;
  protocol: "TCP" | "UDP" | "ICMP" | "HTTP" | "HTTPS";
  packetSize: number;
  flags: string;
  payload: string;
  classification: AttackType;
  confidence: number;
  threatLevel: ThreatLevel;
  cdlScore: number; // Chameleon Drift Layer adaptation score
  spdScore: number; // Seismic Pre-shock Detector prediction score  
  ppeScore: number; // Predator Pursuit Engine tracking score
  isAnomaly: boolean;
  detectionLatency: number; // in milliseconds
}

export interface SystemMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  falseAlarmRate: number;
  throughput: number; // packets per second
  avgLatency: number; // milliseconds
  energyUsage: number; // percentage
  memoryUsage: number;
  cpuUsage: number;
}

export interface MechanismState {
  cdl: {
    adaptationLevel: number;
    driftDetected: boolean;
    patternShift: number;
    activeLayers: number;
  };
  spd: {
    predictionConfidence: number;
    earlyWarnings: number;
    threatHorizon: number; // seconds ahead
    seismicActivity: number;
  };
  ppe: {
    trackedThreats: number;
    pursuitAccuracy: number;
    persistentThreats: string[];
    huntingMode: boolean;
  };
}

// Generate random IP address
function generateIP(): string {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Generate random port
function generatePort(): number {
  const commonPorts = [22, 80, 443, 3306, 5432, 8080, 8443, 21, 25, 53];
  return Math.random() > 0.7 
    ? commonPorts[Math.floor(Math.random() * commonPorts.length)]
    : Math.floor(Math.random() * 65535);
}

// Attack patterns with their characteristics
const attackPatterns: Record<AttackType, { probability: number; threatLevel: ThreatLevel; avgConfidence: number }> = {
  "Normal": { probability: 0.70, threatLevel: "low", avgConfidence: 0.98 },
  "DDoS": { probability: 0.06, threatLevel: "critical", avgConfidence: 0.95 },
  "SQL Injection": { probability: 0.04, threatLevel: "high", avgConfidence: 0.92 },
  "XSS": { probability: 0.04, threatLevel: "medium", avgConfidence: 0.89 },
  "Brute Force": { probability: 0.04, threatLevel: "high", avgConfidence: 0.94 },
  "Man-in-the-Middle": { probability: 0.03, threatLevel: "critical", avgConfidence: 0.88 },
  "Zero-Day": { probability: 0.02, threatLevel: "critical", avgConfidence: 0.75 },
  "Ransomware": { probability: 0.03, threatLevel: "critical", avgConfidence: 0.91 },
  "Botnet": { probability: 0.02, threatLevel: "high", avgConfidence: 0.87 },
  "Port Scan": { probability: 0.02, threatLevel: "medium", avgConfidence: 0.96 },
};

// Select attack type based on probabilities
function selectAttackType(): AttackType {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [type, pattern] of Object.entries(attackPatterns)) {
    cumulative += pattern.probability;
    if (rand <= cumulative) {
      return type as AttackType;
    }
  }
  return "Normal";
}

// Generate SPECTRA-IDS mechanism scores
function generateMechanismScores(attackType: AttackType): { cdl: number; spd: number; ppe: number } {
  const isAttack = attackType !== "Normal";
  const baseScore = isAttack ? 0.7 + Math.random() * 0.3 : 0.1 + Math.random() * 0.3;
  
  return {
    cdl: Math.min(1, baseScore + (Math.random() * 0.1 - 0.05)),
    spd: Math.min(1, baseScore + (Math.random() * 0.15 - 0.075)),
    ppe: Math.min(1, baseScore + (Math.random() * 0.1 - 0.05)),
  };
}

// Generate a single network packet
export function generatePacket(): NetworkPacket {
  const attackType = selectAttackType();
  const pattern = attackPatterns[attackType];
  const scores = generateMechanismScores(attackType);
  
  const protocols: NetworkPacket["protocol"][] = ["TCP", "UDP", "ICMP", "HTTP", "HTTPS"];
  
  return {
    id: `pkt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    sourceIP: generateIP(),
    destIP: generateIP(),
    sourcePort: generatePort(),
    destPort: generatePort(),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    packetSize: Math.floor(Math.random() * 1500) + 64,
    flags: attackType === "DDoS" ? "SYN" : attackType === "Port Scan" ? "SYN,ACK" : "ACK",
    payload: attackType !== "Normal" ? `[${attackType} signature detected]` : "[Normal traffic]",
    classification: attackType,
    confidence: pattern.avgConfidence + (Math.random() * 0.1 - 0.05),
    threatLevel: pattern.threatLevel,
    cdlScore: scores.cdl,
    spdScore: scores.spd,
    ppeScore: scores.ppe,
    isAnomaly: attackType !== "Normal",
    detectionLatency: Math.random() * 5 + 0.5, // 0.5-5.5ms
  };
}

// Generate system metrics based on recent packets
export function calculateMetrics(packets: NetworkPacket[]): SystemMetrics {
  if (packets.length === 0) {
    return {
      accuracy: 0.992,
      precision: 0.989,
      recall: 0.985,
      f1Score: 0.987,
      falseAlarmRate: 0.0031,
      throughput: 0,
      avgLatency: 0,
      energyUsage: 35,
      memoryUsage: 42,
      cpuUsage: 28,
    };
  }

  const attacks = packets.filter(p => p.isAnomaly);
  const normal = packets.filter(p => !p.isAnomaly);
  
  // Simulate realistic metrics with slight variance
  const baseAccuracy = 0.992;
  const variance = (Math.random() * 0.01 - 0.005);
  
  return {
    accuracy: Math.min(0.999, baseAccuracy + variance),
    precision: Math.min(0.999, 0.989 + variance),
    recall: Math.min(0.999, 0.985 + variance),
    f1Score: Math.min(0.999, 0.987 + variance),
    falseAlarmRate: Math.max(0.001, 0.0031 + (Math.random() * 0.002 - 0.001)),
    throughput: packets.length,
    avgLatency: packets.reduce((sum, p) => sum + p.detectionLatency, 0) / packets.length,
    energyUsage: 35 + Math.random() * 10,
    memoryUsage: 40 + Math.random() * 15,
    cpuUsage: 25 + Math.random() * 20,
  };
}

// Generate mechanism state
export function generateMechanismState(packets: NetworkPacket[]): MechanismState {
  const recentThreats = packets.filter(p => p.isAnomaly).slice(-10);
  const threatTypes = [...new Set(recentThreats.map(p => p.classification))];
  
  return {
    cdl: {
      adaptationLevel: 0.85 + Math.random() * 0.15,
      driftDetected: Math.random() > 0.7,
      patternShift: Math.random() * 0.3,
      activeLayers: Math.floor(Math.random() * 3) + 5,
    },
    spd: {
      predictionConfidence: 0.88 + Math.random() * 0.12,
      earlyWarnings: Math.floor(Math.random() * 5),
      threatHorizon: Math.random() * 30 + 5,
      seismicActivity: Math.random() * 0.8,
    },
    ppe: {
      trackedThreats: recentThreats.length,
      pursuitAccuracy: 0.92 + Math.random() * 0.08,
      persistentThreats: threatTypes.slice(0, 3) as string[],
      huntingMode: recentThreats.length > 3,
    },
  };
}

// Comparison data with other IDS methods
export const comparisonData = [
  { method: "SPECTRA-IDS", accuracy: 99.2, f1Score: 98.7, falseAlarm: 0.31, latency: 2.1, energy: 57 },
  { method: "Deep-IDS", accuracy: 96.8, f1Score: 95.2, falseAlarm: 1.2, latency: 4.5, energy: 78 },
  { method: "CNN-LSTM", accuracy: 95.4, f1Score: 94.1, falseAlarm: 1.8, latency: 5.2, energy: 82 },
  { method: "Random Forest", accuracy: 93.2, f1Score: 91.8, falseAlarm: 2.5, latency: 3.1, energy: 65 },
  { method: "SVM-IDS", accuracy: 89.5, f1Score: 87.3, falseAlarm: 3.8, latency: 2.8, energy: 60 },
  { method: "Traditional IDS", accuracy: 82.1, f1Score: 79.5, falseAlarm: 8.2, latency: 1.5, energy: 45 },
];

// Dataset benchmark results
export const datasetBenchmarks = [
  { dataset: "CIC-IoT-2023", accuracy: 99.2, f1Score: 98.7, precision: 98.9, recall: 98.5 },
  { dataset: "UNSW-NB15", accuracy: 98.8, f1Score: 98.1, precision: 98.4, recall: 97.8 },
  { dataset: "NSL-KDD", accuracy: 99.5, f1Score: 99.2, precision: 99.3, recall: 99.1 },
];

// Attack distribution for pie chart
export const attackDistribution = [
  { name: "Normal", value: 70, color: "#10b981" },
  { name: "DDoS", value: 8, color: "#ef4444" },
  { name: "SQL Injection", value: 5, color: "#f97316" },
  { name: "Brute Force", value: 5, color: "#eab308" },
  { name: "XSS", value: 4, color: "#8b5cf6" },
  { name: "Other", value: 8, color: "#6b7280" },
];
