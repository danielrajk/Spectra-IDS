'use client';

import { Download, FileText } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { id: 1, name: 'Full Research Report', type: 'PDF', date: '2024-11-16', size: '12.5 MB', status: 'Ready' },
    { id: 2, name: 'Performance Benchmarks', type: 'Excel', date: '2024-11-16', size: '2.3 MB', status: 'Ready' },
    { id: 3, name: 'Comparison Analysis', type: 'PDF', date: '2024-11-15', size: '8.7 MB', status: 'Ready' },
    { id: 4, name: 'XAI Summary', type: 'PDF', date: '2024-11-14', size: '5.2 MB', status: 'Ready' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">Generate and download research reports</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium">
          Generate Full Report
        </button>
        <button className="bg-secondary text-foreground py-3 rounded-lg hover:bg-secondary/90 transition font-medium border border-border">
          Schedule Report
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold">Generated Reports</h2>
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary/30 transition">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs bg-green-500/20 text-green-700 px-3 py-1 rounded">{report.status}</span>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <p className="font-bold text-blue-700">Report Templates Available</p>
        <ul className="text-sm text-blue-600 mt-3 space-y-1">
          <li>• IEEE Conference Format</li>
          <li>• Journal Publication Format</li>
          <li>• PhD Thesis Format</li>
          <li>• Executive Summary</li>
        </ul>
      </div>
    </div>
  );
}
