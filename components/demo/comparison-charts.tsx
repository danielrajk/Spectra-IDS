"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";
import { comparisonData, datasetBenchmarks } from "@/lib/simulation-engine";
import { Award, TrendingUp, Zap, Target, Shield } from "lucide-react";

export function ComparisonCharts() {
  // Colors for different methods
  const methodColors: Record<string, string> = {
    "SPECTRA-IDS": "#22d3ee",
    "Deep-IDS": "#a855f7",
    "CNN-LSTM": "#f97316",
    "Random Forest": "#22c55e",
    "SVM-IDS": "#eab308",
    "Traditional IDS": "#6b7280",
  };

  // Prepare data for accuracy comparison
  const accuracyData = comparisonData.map(d => ({
    method: d.method,
    accuracy: d.accuracy,
    f1Score: d.f1Score,
    fill: methodColors[d.method],
  }));

  // Prepare data for false alarm comparison
  const falseAlarmData = comparisonData.map(d => ({
    method: d.method,
    falseAlarm: d.falseAlarm,
    fill: methodColors[d.method],
  }));

  // Prepare data for efficiency comparison
  const efficiencyData = comparisonData.map(d => ({
    method: d.method,
    latency: d.latency,
    energy: d.energy,
  }));

  // Multi-metric radar data for SPECTRA-IDS
  const radarComparisonData = [
    { metric: "Accuracy", "SPECTRA-IDS": 99.2, "Deep-IDS": 96.8, "CNN-LSTM": 95.4 },
    { metric: "F1-Score", "SPECTRA-IDS": 98.7, "Deep-IDS": 95.2, "CNN-LSTM": 94.1 },
    { metric: "Speed", "SPECTRA-IDS": 95, "Deep-IDS": 78, "CNN-LSTM": 70 },
    { metric: "Efficiency", "SPECTRA-IDS": 92, "Deep-IDS": 72, "CNN-LSTM": 68 },
    { metric: "Robustness", "SPECTRA-IDS": 96, "Deep-IDS": 82, "CNN-LSTM": 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Award className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Accuracy</p>
              <p className="text-2xl font-bold text-green-400">99.2%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <Target className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lowest False Alarm</p>
              <p className="text-2xl font-bold text-cyan-400">0.31%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Energy Savings</p>
              <p className="text-2xl font-bold text-purple-400">43%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <TrendingUp className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">vs. State-of-Art</p>
              <p className="text-2xl font-bold text-orange-400">+2.4%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Detection Accuracy Comparison</CardTitle>
            <CardDescription>SPECTRA-IDS vs. existing IDS methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    type="number" 
                    domain={[80, 100]} 
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 10 }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="method" 
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 11 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar 
                    dataKey="accuracy" 
                    name="Accuracy"
                    radius={[0, 4, 4, 0]}
                  >
                    {accuracyData.map((entry, index) => (
                      <rect key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* False Alarm Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">False Alarm Rate Comparison</CardTitle>
            <CardDescription>Lower is better - SPECTRA-IDS achieves 0.31%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={falseAlarmData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    type="number" 
                    domain={[0, 10]} 
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 10 }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="method" 
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 11 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar 
                    dataKey="falseAlarm" 
                    name="False Alarm Rate"
                    radius={[0, 4, 4, 0]}
                  >
                    {falseAlarmData.map((entry, index) => (
                      <rect 
                        key={`cell-${index}`} 
                        fill={entry.method === "SPECTRA-IDS" ? "#22d3ee" : "#ef4444"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Radar and Efficiency Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-metric Radar */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Multi-Metric Comparison</CardTitle>
            <CardDescription>SPECTRA-IDS vs. Deep-IDS vs. CNN-LSTM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarComparisonData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: '#888', fontSize: 11 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#666', fontSize: 9 }}
                  />
                  <Radar
                    name="SPECTRA-IDS"
                    dataKey="SPECTRA-IDS"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Deep-IDS"
                    dataKey="Deep-IDS"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="CNN-LSTM"
                    dataKey="CNN-LSTM"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.1}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Energy & Latency */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Efficiency Metrics</CardTitle>
            <CardDescription>Latency (ms) and Energy Consumption (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="method" 
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 9 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
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
                  <Legend />
                  <Bar 
                    dataKey="latency" 
                    name="Latency (ms)"
                    fill="#22d3ee"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="energy" 
                    name="Energy (%)"
                    fill="#a855f7"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dataset Benchmarks */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Dataset Benchmark Results
          </CardTitle>
          <CardDescription>
            SPECTRA-IDS performance across standard cybersecurity datasets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datasetBenchmarks.map((benchmark) => (
              <div 
                key={benchmark.dataset}
                className="p-6 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{benchmark.dataset}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Validated
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-accent">{benchmark.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-purple-400">{benchmark.f1Score}%</p>
                    <p className="text-xs text-muted-foreground">F1-Score</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-blue-400">{benchmark.precision}%</p>
                    <p className="text-xs text-muted-foreground">Precision</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-orange-400">{benchmark.recall}%</p>
                    <p className="text-xs text-muted-foreground">Recall</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dataset Links */}
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground mb-3">Dataset References:</p>
            <div className="flex flex-wrap gap-2">
              <a 
                href="https://www.unb.ca/cic/datasets/iotdataset-2023.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                CIC-IoT-2023
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="https://research.unsw.edu.au/projects/unsw-nb15-dataset" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                UNSW-NB15
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="https://www.unb.ca/cic/datasets/nsl.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                NSL-KDD
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
