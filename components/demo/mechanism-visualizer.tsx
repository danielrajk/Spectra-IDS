"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Layers, 
  Radio, 
  Target, 
  Activity, 
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { MechanismState, NetworkPacket } from "@/lib/simulation-engine";
import { useMemo } from "react";

interface MechanismVisualizerProps {
  state: MechanismState | null;
  packets: NetworkPacket[];
}

export function MechanismVisualizer({ state, packets }: MechanismVisualizerProps) {
  const defaultState: MechanismState = {
    cdl: {
      adaptationLevel: 0.92,
      driftDetected: false,
      patternShift: 0.15,
      activeLayers: 6,
    },
    spd: {
      predictionConfidence: 0.94,
      earlyWarnings: 2,
      threatHorizon: 15,
      seismicActivity: 0.3,
    },
    ppe: {
      trackedThreats: 0,
      pursuitAccuracy: 0.96,
      persistentThreats: [],
      huntingMode: false,
    },
  };

  const s = state || defaultState;

  // Calculate mechanism scores over time
  const mechanismHistory = useMemo(() => {
    if (packets.length === 0) return [];
    
    const recentPackets = packets.slice(-20);
    return recentPackets.map((p, i) => ({
      index: i + 1,
      cdl: p.cdlScore * 100,
      spd: p.spdScore * 100,
      ppe: p.ppeScore * 100,
    }));
  }, [packets]);

  // Radar chart data
  const radarData = [
    { metric: "Adaptation", value: s.cdl.adaptationLevel * 100 },
    { metric: "Prediction", value: s.spd.predictionConfidence * 100 },
    { metric: "Pursuit", value: s.ppe.pursuitAccuracy * 100 },
    { metric: "Coverage", value: 95 },
    { metric: "Resilience", value: 92 },
    { metric: "Efficiency", value: 88 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CDL Card */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Layers className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Chameleon Drift Layer</CardTitle>
                  <CardDescription>Adaptive Pattern Recognition</CardDescription>
                </div>
              </div>
              {s.cdl.driftDetected && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                  Drift Detected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Adaptation Level</span>
                <span className="font-mono">{(s.cdl.adaptationLevel * 100).toFixed(1)}%</span>
              </div>
              <Progress value={s.cdl.adaptationLevel * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{s.cdl.activeLayers}</p>
                <p className="text-xs text-muted-foreground">Active Layers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{(s.cdl.patternShift * 100).toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">Pattern Shift</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-xs text-muted-foreground">
                CDL continuously adapts to evolving attack patterns, maintaining high detection rates 
                even as adversaries modify their techniques.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SPD Card */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Radio className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Seismic Pre-shock Detector</CardTitle>
                  <CardDescription>Predictive Threat Analysis</CardDescription>
                </div>
              </div>
              {s.spd.earlyWarnings > 0 && (
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                  {s.spd.earlyWarnings} Warnings
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prediction Confidence</span>
                <span className="font-mono">{(s.spd.predictionConfidence * 100).toFixed(1)}%</span>
              </div>
              <Progress value={s.spd.predictionConfidence * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">{s.spd.threatHorizon.toFixed(0)}s</p>
                <p className="text-xs text-muted-foreground">Threat Horizon</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">{(s.spd.seismicActivity * 100).toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">Activity Level</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <p className="text-xs text-muted-foreground">
                SPD analyzes network behavior patterns to predict attacks before they fully materialize, 
                providing early warning for proactive defense.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PPE Card */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Target className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Predator Pursuit Engine</CardTitle>
                  <CardDescription>Threat Tracking System</CardDescription>
                </div>
              </div>
              {s.ppe.huntingMode && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse">
                  Hunting
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pursuit Accuracy</span>
                <span className="font-mono">{(s.ppe.pursuitAccuracy * 100).toFixed(1)}%</span>
              </div>
              <Progress value={s.ppe.pursuitAccuracy * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">{s.ppe.trackedThreats}</p>
                <p className="text-xs text-muted-foreground">Tracked Threats</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">
                  {s.ppe.huntingMode ? "ON" : "OFF"}
                </p>
                <p className="text-xs text-muted-foreground">Hunting Mode</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-xs text-muted-foreground">
                PPE actively tracks and pursues persistent threats across the network, 
                ensuring comprehensive threat neutralization.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mechanism Interaction Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              SPECTRA-IDS Capability Matrix
            </CardTitle>
            <CardDescription>Overall system performance across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: '#888', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#666', fontSize: 10 }}
                  />
                  <Radar
                    name="SPECTRA-IDS"
                    dataKey="value"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mechanism Scores Over Time */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Mechanism Activity Timeline
            </CardTitle>
            <CardDescription>Real-time mechanism scores per packet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {mechanismHistory.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Start simulation to see mechanism activity
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mechanismHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="index" 
                      stroke="#666"
                      tick={{ fill: '#888', fontSize: 10 }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="#666"
                      tick={{ fill: '#888', fontSize: 10 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cdl" 
                      name="CDL Score"
                      stroke="#a855f7" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spd" 
                      name="SPD Score"
                      stroke="#22d3ee" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ppe" 
                      name="PPE Score"
                      stroke="#f97316" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mechanism Integration Flow */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5 text-accent" />
            Detection Pipeline Flow
          </CardTitle>
          <CardDescription>How SPECTRA-IDS mechanisms work together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6">
            {/* Step 1 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center mb-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Network Traffic</h4>
              <p className="text-xs text-muted-foreground">
                Raw packets ingested from 6G IoT network
              </p>
            </div>

            <div className="hidden md:block text-2xl text-muted-foreground">→</div>

            {/* Step 2 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">CDL Analysis</h4>
              <p className="text-xs text-muted-foreground">
                Adaptive feature extraction and drift detection
              </p>
            </div>

            <div className="hidden md:block text-2xl text-muted-foreground">→</div>

            {/* Step 3 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">SPD Prediction</h4>
              <p className="text-xs text-muted-foreground">
                Early threat detection and pattern forecasting
              </p>
            </div>

            <div className="hidden md:block text-2xl text-muted-foreground">→</div>

            {/* Step 4 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">PPE Tracking</h4>
              <p className="text-xs text-muted-foreground">
                Persistent threat pursuit and classification
              </p>
            </div>

            <div className="hidden md:block text-2xl text-muted-foreground">→</div>

            {/* Step 5 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Classification</h4>
              <p className="text-xs text-muted-foreground">
                Final verdict with 99.2% accuracy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
