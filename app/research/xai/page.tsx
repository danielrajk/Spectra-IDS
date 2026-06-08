'use client';

import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function XAIPage() {
  const shapData = [
    { feature: 'Protocol', value: 0.92 },
    { feature: 'Service', value: 0.88 },
    { feature: 'Flag', value: 0.85 },
    { feature: 'Src Bytes', value: 0.79 },
    { feature: 'Dst Bytes', value: 0.81 },
  ];

  const modelExplainability = [
    { model: 'RF', explainability: 95, accuracy: 94, latency: 78 },
    { model: 'XGB', explainability: 92, accuracy: 95, latency: 82 },
    { model: 'CNN-BiLSTM', explainability: 76, accuracy: 99, latency: 88 },
    { model: 'Transformer', explainability: 72, accuracy: 98, latency: 65 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Explainable AI Analysis</h1>
        <p className="text-muted-foreground">SHAP values and model interpretability</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Samples Explained</p>
          <p className="text-3xl font-bold">1,250</p>
          <p className="text-xs text-muted-foreground mt-2">SHAP analysis complete</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Top Feature</p>
          <p className="text-3xl font-bold">Protocol</p>
          <p className="text-xs text-muted-foreground mt-2">92% importance</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Model Clarity</p>
          <p className="text-3xl font-bold">89%</p>
          <p className="text-xs text-muted-foreground mt-2">High interpretability</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">SHAP Feature Importance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shapData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="feature" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Model Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={modelExplainability}>
              <PolarGrid />
              <PolarAngleAxis dataKey="model" />
              <PolarRadiusAxis />
              <Radar name="Explainability" dataKey="explainability" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Accuracy" dataKey="accuracy" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Sample Explanation</h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
            <p className="font-medium text-green-700">Prediction: Benign</p>
            <p className="text-xs text-green-600 mt-2">Confidence: 98.5%</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-sm">Contributing Features:</p>
            {shapData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span>{item.feature}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-secondary rounded h-2">
                    <div className="bg-blue-500 h-2 rounded" style={{ width: `${item.value * 100}%` }} />
                  </div>
                  <span className="w-12 text-right font-mono">{(item.value * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
