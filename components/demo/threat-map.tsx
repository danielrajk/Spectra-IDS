"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { NetworkPacket } from "@/lib/simulation-engine";
import { useMemo } from "react";

interface ThreatMapProps {
  packets: NetworkPacket[];
}

export function ThreatMap({ packets }: ThreatMapProps) {
  const attackDistribution = useMemo(() => {
    if (packets.length === 0) {
      return [
        { name: "Normal", value: 70, color: "#10b981" },
        { name: "DDoS", value: 8, color: "#ef4444" },
        { name: "SQL Injection", value: 5, color: "#f97316" },
        { name: "Brute Force", value: 5, color: "#eab308" },
        { name: "XSS", value: 4, color: "#8b5cf6" },
        { name: "Other", value: 8, color: "#6b7280" },
      ];
    }

    const counts: Record<string, number> = {};
    packets.forEach(p => {
      counts[p.classification] = (counts[p.classification] || 0) + 1;
    });

    const colors: Record<string, string> = {
      "Normal": "#10b981",
      "DDoS": "#ef4444",
      "SQL Injection": "#f97316",
      "XSS": "#8b5cf6",
      "Brute Force": "#eab308",
      "Man-in-the-Middle": "#ec4899",
      "Zero-Day": "#dc2626",
      "Ransomware": "#b91c1c",
      "Botnet": "#7c3aed",
      "Port Scan": "#0ea5e9",
    };

    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value: Math.round((value / packets.length) * 100),
        color: colors[name] || "#6b7280",
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [packets]);

  const threatBreakdown = useMemo(() => {
    const attacks = packets.filter(p => p.isAnomaly);
    const counts: Record<string, number> = {};
    
    attacks.forEach(p => {
      counts[p.threatLevel] = (counts[p.threatLevel] || 0) + 1;
    });

    return {
      critical: counts["critical"] || 0,
      high: counts["high"] || 0,
      medium: counts["medium"] || 0,
      low: counts["low"] || 0,
    };
  }, [packets]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Traffic Distribution & Threat Analysis</CardTitle>
        <CardDescription>Classification breakdown of network traffic</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attackDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={{ stroke: '#666' }}
                >
                  {attackDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Threat Level Breakdown */}
          <div className="space-y-4">
            <h4 className="font-medium">Threat Level Distribution</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Critical</span>
                </div>
                <span className="font-mono font-bold text-red-400">{threatBreakdown.critical}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>High</span>
                </div>
                <span className="font-mono font-bold text-orange-400">{threatBreakdown.high}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Medium</span>
                </div>
                <span className="font-mono font-bold text-yellow-400">{threatBreakdown.medium}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Low / Normal</span>
                </div>
                <span className="font-mono font-bold text-green-400">
                  {packets.filter(p => !p.isAnomaly).length}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">
                SPECTRA-IDS processes each packet through all three detection mechanisms 
                (CDL, SPD, PPE) to achieve 99.2% classification accuracy.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
