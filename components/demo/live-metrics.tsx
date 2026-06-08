"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SystemMetrics } from "@/lib/simulation-engine";

interface LiveMetricsProps {
  metrics: SystemMetrics | null;
}

export function LiveMetrics({ metrics }: LiveMetricsProps) {
  const defaultMetrics: SystemMetrics = {
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

  const m = metrics || defaultMetrics;

  const performanceMetrics = [
    { label: "Accuracy", value: m.accuracy * 100, color: "bg-green-500" },
    { label: "Precision", value: m.precision * 100, color: "bg-blue-500" },
    { label: "Recall", value: m.recall * 100, color: "bg-purple-500" },
    { label: "F1-Score", value: m.f1Score * 100, color: "bg-cyan-500" },
  ];

  const systemMetrics = [
    { label: "CPU Usage", value: m.cpuUsage, color: "bg-orange-500" },
    { label: "Memory", value: m.memoryUsage, color: "bg-yellow-500" },
    { label: "Energy", value: m.energyUsage, color: "bg-emerald-500" },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">System Performance</CardTitle>
        <CardDescription>Real-time detection metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Detection Metrics</h4>
          {performanceMetrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.label}</span>
                <span className="font-mono">{metric.value.toFixed(1)}%</span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* System Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">System Resources</h4>
          {systemMetrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.label}</span>
                <span className="font-mono">{metric.value.toFixed(0)}%</span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* False Alarm Rate */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm">False Alarm Rate</span>
            <span className="text-lg font-bold text-green-400">
              {(m.falseAlarmRate * 100).toFixed(2)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Industry-leading low false positive rate
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
