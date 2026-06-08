'use client';

import { create } from 'zustand';

export type ThreatType = 'AI Botnet' | 'DDoS' | 'Port Scan' | 'Brute Force' | 'SQL Injection' | 'Malware Communication' | 'Ransomware Activity' | 'Adversarial Evasion' | 'Zero-Day Threat';

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
}

interface ThreatStore {
  threats: Threat[];
  metrics: Metric;
  networkNodes: NetworkNode[];
  isSimulating: boolean;
  
  addThreat: (threat: Threat) => void;
  removeThreat: (id: string) => void;
  clearThreats: () => void;
  updateMetrics: (metrics: Partial<Metric>) => void;
  setNetworkNodes: (nodes: NetworkNode[]) => void;
  setSimulating: (simulating: boolean) => void;
  launchAttack: (type: ThreatType) => void;
}

export const useThreatStore = create<ThreatStore>((set, get) => ({
  threats: [],
  isSimulating: true,
  metrics: {
    activeThreats: 0,
    detectionAccuracy: 99.2,
    detectionLatency: 2.3,
    energyEfficiency: 43,
    threatPredictionScore: 94.8,
    protectedEdgeNodes: 2847,
    adversarialRobustness: 96.5,
    securityHealthIndex: 92,
  },
  networkNodes: [],

  addThreat: (threat: Threat) => {
    set((state) => {
      const newThreats = [threat, ...state.threats].slice(0, 100);
      return {
        threats: newThreats,
        metrics: {
          ...state.metrics,
          activeThreats: newThreats.filter(t => t.responseStatus !== 'Resolved').length,
        },
      };
    });
  },

  removeThreat: (id: string) => {
    set((state) => ({
      threats: state.threats.filter(t => t.id !== id),
      metrics: {
        ...state.metrics,
        activeThreats: state.metrics.activeThreats - 1,
      },
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

  launchAttack: (type: ThreatType) => {
    const threat: Threat = {
      id: `threat-${Date.now()}`,
      type,
      confidence: 85 + Math.random() * 15,
      severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)] as any,
      detectionTime: Date.now(),
      energyCost: Math.random() * 100,
      responseStatus: 'Detected',
      sourceIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      targetIP: `10.0.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      timestamp: new Date(),
    };
    get().addThreat(threat);
  },
}));
