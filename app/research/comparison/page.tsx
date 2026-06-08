'use client';

import { mockModelComparisons } from '@/lib/research-data';
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonPage() {
  const speedVsAccuracy = mockModelComparisons.map(m => ({
    name: m.model,
    inference: m.inferenceTime,
    accuracy: m.accuracy * 100,
  }));

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Comparative Analysis</h1>
        <p className="text-muted-foreground">Compare SPECTRA-IDS with state-of-the-art methods</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Model Accuracy Ranking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockModelComparisons} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0.9, 1]} />
              <YAxis dataKey="model" type="category" width={120} />
              <Tooltip formatter={(value) => (value * 100).toFixed(1)} />
              <Bar dataKey="accuracy" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Inference Speed vs Accuracy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="inference" name="Inference Time (ms)" />
              <YAxis dataKey="accuracy" name="Accuracy (%)" domain={[90, 100]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Models" data={speedVsAccuracy} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Detailed Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-bold">Model</th>
                <th className="text-right py-3 px-4 font-bold">Accuracy</th>
                <th className="text-right py-3 px-4 font-bold">F1-Score</th>
                <th className="text-right py-3 px-4 font-bold">Train (min)</th>
                <th className="text-right py-3 px-4 font-bold">Inference (ms)</th>
                <th className="text-right py-3 px-4 font-bold">Memory (MB)</th>
              </tr>
            </thead>
            <tbody>
              {mockModelComparisons.map((model, idx) => (
                <tr key={idx} className={`border-b border-border ${model.model === 'SPECTRA-IDS' ? 'bg-primary/10' : ''}`}>
                  <td className="py-3 px-4 font-medium">{model.model}</td>
                  <td className="text-right py-3 px-4">{(model.accuracy * 100).toFixed(2)}%</td>
                  <td className="text-right py-3 px-4">{(model.f1Score * 100).toFixed(2)}%</td>
                  <td className="text-right py-3 px-4">{model.trainingTime}</td>
                  <td className="text-right py-3 px-4">{model.inferenceTime.toFixed(1)}</td>
                  <td className="text-right py-3 px-4">{model.memoryUsage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
        <p className="font-bold text-green-700">SPECTRA-IDS Performance Advantage</p>
        <ul className="text-sm text-green-600 mt-3 space-y-2">
          <li>• Highest accuracy: 99.8% (+0.1% vs Transformer)</li>
          <li>• Fastest inference: 0.5ms (-79% vs Random Forest)</li>
          <li>• Optimal memory: 1GB (balanced footprint)</li>
          <li>• Best F1-score: 99.7% (excellent precision-recall balance)</li>
        </ul>
      </div>
    </div>
  );
}
