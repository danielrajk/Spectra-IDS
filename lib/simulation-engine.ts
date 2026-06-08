'use client';

import { useThreatStore, ThreatType } from './threat-store';

export class SimulationEngine {
  private isRunning = false;
  private interval: NodeJS.Timeout | null = null;

  private threatTypes: ThreatType[] = [
    'AI Botnet',
    'DDoS',
    'Port Scan',
    'Brute Force',
    'SQL Injection',
    'Malware Communication',
    'Ransomware Activity',
    'Adversarial Evasion',
    'Zero-Day Threat',
  ];

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.interval = setInterval(() => {
      const store = useThreatStore.getState();
      if (!store.isSimulating) return;

      // 30% chance of generating a threat
      if (Math.random() < 0.3) {
        const threatType = this.threatTypes[Math.floor(Math.random() * this.threatTypes.length)];
        store.launchAttack(threatType);
      }

      // Update metrics with slight variations
      const metrics = store.metrics;
      store.updateMetrics({
        detectionLatency: 2.3 + (Math.random() - 0.5) * 0.5,
        threatPredictionScore: Math.min(99.9, metrics.threatPredictionScore + (Math.random() - 0.5) * 2),
        securityHealthIndex: Math.max(50, Math.min(100, metrics.securityHealthIndex + (Math.random() - 0.5))),
      });
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
  }
}

export const simulationEngine = new SimulationEngine();
