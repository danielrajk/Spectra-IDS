'use client';

import { create } from 'zustand';

export type ThreatType = 'AI Botnet' | 'DDoS' | 'Port Scan' | 'Brute Force' | 'SQL Injection' | 'Malware Communication' | 'Ransomware Activity' | 'Adversarial Evasion' | 'Zero-Day Threat';

export type AttackStage = 'Reconnaissance' | 'Scanning' | 'Exploitation' | 'Persistence' | 'Lateral Movement' | 'Impact';

export interface Threat {
  id: string;
  type: ThreatType;
  confidence: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  detectionTime: number;
  energyCost: number;
  responseStatus: 'Detected' | 'Mitigating' | 'Contained' | 'Resolved';
  sourceIP: string;
  targetIP: string;
  timestamp: Date;
  stage: AttackStage;
  propagationNodes: string[];
  escalationLevel: number; // 0-100
  detectionDifficulty: number; // 0-100
  affectedNodes: number;
  createdAt: number;
  duration: number; // milliseconds
}

export interface NetworkNode {
  id: string;
  label: string;
  health: number;
  threatDensity: number;
  energyUsage: number;
  latency: number;
  bandwidth: number;
  position: { x: number; y: number };
  threatCount: number;
}

export interface Metric {
  activeThreats: number;
  detectionAccuracy: number;
  detectionLatency: number;
  energyEfficiency: number;
  threatPredictionScore: number;
  protectedEdgeNodes: number;
  adversarialRobustness: number;
  securityHealthIndex: number;
  totalThreatsDetected: number;
  avgConfidenceScore: number;
  totalEnergyUsed: number;
}

interface ThreatStore {
  threats: Threat[];
  metrics: Metric;
  networkNodes: NetworkNode[];
  isSimulating: boolean;
  attackHistory: Threat[];
  
  addThreat: (threat: Threat) => void;
  removeThreat: (id: string) => void;
  updateThreat: (id: string, updates: Partial<Threat>) => void;
  clearThreats: () => void;
  updateMetrics: (metrics: Partial<Metric>) => void;
  setNetworkNodes: (nodes: NetworkNode[]) => void;
  setSimulating: (simulating: boolean) => void;
  launchAttack: (type: ThreatType) => void;
  escalateThreat: (id: string) => void;
  propagateThreat: (id: string, newNodes: string[]) => void;
  getActiveThreatCount: () => number;
}

const ATTACK_STAGES: AttackStage[] = ['Reconnaissance', 'Scanning', 'Exploitation', 'Persistence', 'Lateral Movement', 'Impact'];

const ATTACK_DIFFICULTY: Record<ThreatType, number> = {
  'AI Botnet': 75,
  'DDoS': 60,
  'Port Scan': 40,
  'Brute Force': 55,
  'SQL Injection': 70,
  'Malware Communication': 80,
  'Ransomware Activity': 85,
  'Adversarial Evasion': 90,
  'Zero-Day Threat': 95,
};

export const useThreatStore = create<ThreatStore>((set, get) => ({
  threats: [],
  isSimulating: true,
  attackHistory: [],
  metrics: {
    activeThreats: 0,
    detectionAccuracy: 99.2,
    detectionLatency: 2.3,
    energyEfficiency: 43,
    threatPredictionScore: 94.8,
    protectedEdgeNodes: 2847,
    adversarialRobustness: 96.5,
    securityHealthIndex: 92,
    totalThreatsDetected: 0,
    avgConfidenceScore: 0,
    totalEnergyUsed: 0,
  },
  networkNodes: [],

  addThreat: (threat: Threat) => {
    set((state) => {
      const newThreats = [threat, ...state.threats].slice(0, 100);
      const totalConfidence = newThreats.reduce((sum, t) => sum + t.confidence, 0) / newThreats.length;
      const totalEnergy = state.metrics.totalEnergyUsed + threat.energyCost;
      
      return {
        threats: newThreats,
        attackHistory: [...state.attackHistory, threat],
        metrics: {
          ...state.metrics,
          activeThreats: newThreats.filter(t => t.responseStatus === 'Detected' || t.responseStatus === 'Mitigating').length,
          totalThreatsDetected: state.metrics.totalThreatsDetected + 1,
          avgConfidenceScore: totalConfidence,
          totalEnergyUsed: totalEnergy,
        },
      };
    });
  },

  removeThreat: (id: string) => {
    set((state) => ({
      threats: state.threats.filter(t => t.id !== id),
      metrics: {
        ...state.metrics,
        activeThreats: Math.max(0, state.metrics.activeThreats - 1),
      },
    }));
  },

  updateThreat: (id: string, updates: Partial<Threat>) => {
    set((state) => ({
      threats: state.threats.map(t => t.id === id ? { ...t, ...updates } : t),
    }));
  },

  clearThreats: () => {
    set({
      threats: [],
      metrics: { ...get().metrics, activeThreats: 0 },
    });
  },

  updateMetrics: (metrics: Partial<Metric>) => {
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    }));
  },

  setNetworkNodes: (nodes: NetworkNode[]) => {
    set({ networkNodes: nodes });
  },

  setSimulating: (simulating: boolean) => {
    set({ isSimulating: simulating });
  },

  escalateThreat: (id: string) => {
    const threat = get().threats.find(t => t.id === id);
    if (!threat) return;

    const currentStageIndex = ATTACK_STAGES.indexOf(threat.stage);
    if (currentStageIndex < ATTACK_STAGES.length - 1) {
      get().updateThreat(id, {
        stage: ATTACK_STAGES[currentStageIndex + 1],
        escalationLevel: Math.min(100, threat.escalationLevel + 20),
      });
    }
  },

  propagateThreat: (id: string, newNodes: string[]) => {
    const threat = get().threats.find(t => t.id === id);
    if (!threat) return;

    get().updateThreat(id, {
      propagationNodes: [...threat.propagationNodes, ...newNodes],
      affectedNodes: threat.affectedNodes + newNodes.length,
    });
  },

  launchAttack: (type: ThreatType) => {
    const threat: Threat = {
      id: `threat-${Date.now()}`,
      type,
      confidence: 85 + Math.random() * 15,
      severity: (['Critical', 'High', 'Medium', 'Low'] as const)[Math.floor(Math.random() * 4)],
      detectionTime: Date.now(),
      energyCost: 30 + Math.random() * 70,
      responseStatus: 'Detected',
      sourceIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      targetIP: `10.0.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      timestamp: new Date(),
      stage: 'Reconnaissance',
      propagationNodes: [],
      escalationLevel: Math.random() * 40,
      detectionDifficulty: ATTACK_DIFFICULTY[type],
      affectedNodes: Math.floor(Math.random() * 10) + 1,
      createdAt: Date.now(),
      duration: Math.random() * 3600000, // 0-60 minutes
    };
    get().addThreat(threat);
  },

  getActiveThreatCount: () => {
    return get().threats.filter(t => t.responseStatus === 'Detected' || t.responseStatus === 'Mitigating').length;
  },
}));
