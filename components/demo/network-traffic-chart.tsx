"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface NetworkTrafficChartProps {
  data: { time: string; threats: number; normal: number }[];
}

export function NetworkTrafficChart({ data }: NetworkTrafficChartProps) {
  // Compute colors in JavaScript since CSS variables don't work directly in Recharts
  const normalColor = "#10b981"; // green
  const threatColor = "#ef4444"; // red

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg">Real-Time Network Traffic</CardTitle>
        <CardDescription>Live packet classification over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Start simulation to see live traffic data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={normalColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={normalColor} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={threatColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={threatColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fill: '#888', fontSize: 12 }}
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
                <Area
                  type="monotone"
                  dataKey="normal"
                  name="Normal Traffic"
                  stroke={normalColor}
                  fill="url(#normalGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="threats"
                  name="Threats Detected"
                  stroke={threatColor}
                  fill="url(#threatGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
