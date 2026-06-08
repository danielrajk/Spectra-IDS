"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Shield, 
  Zap, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw,
  Network,
  Cpu,
  HardDrive,
  Gauge
} from "lucide-react";
import Link from "next/link";
import { NetworkTrafficChart } from "@/components/demo/network-traffic-chart";
import { MechanismVisualizer } from "@/components/demo/mechanism-visualizer";
import { ComparisonCharts } from "@/components/demo/comparison-charts";
import { LiveMetrics } from "@/components/demo/live-metrics";
import { PacketTable } from "@/components/demo/packet-table";
import { ThreatMap } from "@/components/demo/threat-map";
import {
  generatePacket,
  calculateMetrics,
  generateMechanismState,
  type NetworkPacket,
  type SystemMetrics,
  type MechanismState,
} from "@/lib/simulation-engine";

export default function DemoPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [packets, setPackets] = useState<NetworkPacket[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [mechanismState, setMechanismState] = useState<MechanismState | null>(null);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [attacksDetected, setAttacksDetected] = useState(0);
  const [threatHistory, setThreatHistory] = useState<{ time: string; threats: number; normal: number }[]>([]);

  const processPackets = useCallback(() => {
    const newPackets: NetworkPacket[] = [];
    const batchSize = Math.floor(Math.random() * 5) + 3; // 3-7 packets per tick
    
    for (let i = 0; i < batchSize; i++) {
      newPackets.push(generatePacket());
    }

    setPackets(prev => {
      const updated = [...prev, ...newPackets].slice(-100); // Keep last 100 packets
      return updated;
    });

    setTotalProcessed(prev => prev + batchSize);
    setAttacksDetected(prev => prev + newPackets.filter(p => p.isAnomaly).length);

    // Update threat history for chart
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setThreatHistory(prev => {
      const newEntry = {
        time: timeStr,
        threats: newPackets.filter(p => p.isAnomaly).length,
        normal: newPackets.filter(p => !p.isAnomaly).length,
      };
      return [...prev, newEntry].slice(-30); // Keep last 30 data points
    });

  }, []);

  // Update metrics and mechanism state
  useEffect(() => {
    if (packets.length > 0) {
      setMetrics(calculateMetrics(packets));
      setMechanismState(generateMechanismState(packets));
    }
  }, [packets]);

  // Simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(processPackets, 500); // Process every 500ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, processPackets]);

  const handleReset = () => {
    setIsRunning(false);
    setPackets([]);
    setMetrics(null);
    setMechanismState(null);
    setTotalProcessed(0);
    setAttacksDetected(0);
    setThreatHistory([]);
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default: return "bg-green-500/20 text-green-400 border-green-500/50";
    }
  };

  const recentAttacks = packets.filter(p => p.isAnomaly).slice(-5).reverse();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg">SPECTRA-IDS</span>
            </Link>
            <Badge variant="outline" className="text-accent border-accent">
              Live Demo
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isRunning ? "destructive" : "default"}
              onClick={() => setIsRunning(!isRunning)}
              className="gap-2"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? "Pause" : "Start"} Simulation
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Network className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Packets Processed</p>
                <p className="text-2xl font-bold">{totalProcessed.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attacks Detected</p>
                <p className="text-2xl font-bold text-red-400">{attacksDetected}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Gauge className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                <p className="text-2xl font-bold text-green-400">
                  {metrics ? `${(metrics.accuracy * 100).toFixed(1)}%` : "99.2%"}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Latency</p>
                <p className="text-2xl font-bold text-blue-400">
                  {metrics ? `${metrics.avgLatency.toFixed(1)}ms` : "0.0ms"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="dashboard" className="gap-2">
              <Activity className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="mechanisms" className="gap-2">
              <Cpu className="h-4 w-4" />
              CDL/SPD/PPE
            </TabsTrigger>
            <TabsTrigger value="comparison" className="gap-2">
              <HardDrive className="h-4 w-4" />
              Benchmarks
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Network Traffic Chart */}
              <div className="lg:col-span-2">
                <NetworkTrafficChart data={threatHistory} />
              </div>

              {/* Recent Threats */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    Recent Threats
                  </CardTitle>
                  <CardDescription>Last 5 detected attacks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAttacks.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      {isRunning ? "Monitoring for threats..." : "Start simulation to detect threats"}
                    </p>
                  ) : (
                    recentAttacks.map((attack) => (
                      <div
                        key={attack.id}
                        className="p-3 rounded-lg bg-secondary/50 border border-border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getThreatLevelColor(attack.threatLevel)}>
                            {attack.classification}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {attack.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Source: {attack.sourceIP}:{attack.sourcePort}</p>
                          <p>Confidence: {(attack.confidence * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Live Metrics and Packet Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LiveMetrics metrics={metrics} />
              <div className="lg:col-span-2">
                <PacketTable packets={packets.slice(-20).reverse()} />
              </div>
            </div>

            {/* Threat Map */}
            <ThreatMap packets={packets} />
          </TabsContent>

          {/* Mechanisms Tab */}
          <TabsContent value="mechanisms">
            <MechanismVisualizer state={mechanismState} packets={packets} />
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison">
            <ComparisonCharts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
