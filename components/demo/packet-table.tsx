"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NetworkPacket } from "@/lib/simulation-engine";

interface PacketTableProps {
  packets: NetworkPacket[];
}

export function PacketTable({ packets }: PacketTableProps) {
  const getThreatBadgeStyle = (threatLevel: string, isAnomaly: boolean) => {
    if (!isAnomaly) return "bg-green-500/20 text-green-400 border-green-500/50";
    
    switch (threatLevel) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default: return "bg-green-500/20 text-green-400 border-green-500/50";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Live Packet Stream</CardTitle>
        <CardDescription>Recent network packets analyzed by SPECTRA-IDS</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-muted-foreground">Source</TableHead>
                <TableHead className="text-muted-foreground">Protocol</TableHead>
                <TableHead className="text-muted-foreground">Classification</TableHead>
                <TableHead className="text-muted-foreground">Confidence</TableHead>
                <TableHead className="text-muted-foreground">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No packets yet. Start the simulation to see live data.
                  </TableCell>
                </TableRow>
              ) : (
                packets.map((packet) => (
                  <TableRow 
                    key={packet.id} 
                    className={`border-border ${packet.isAnomaly ? 'bg-red-500/5' : ''}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {packet.timestamp.toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {packet.sourceIP}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {packet.protocol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getThreatBadgeStyle(packet.threatLevel, packet.isAnomaly)}>
                        {packet.classification}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {(packet.confidence * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {packet.detectionLatency.toFixed(2)}ms
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
