'use client';

import { mockExperiments, mockModelComparisons } from '@/lib/research-data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ResearchDashboard() {
  const latestExp = mockExperiments[0];
  const expData = mockExperiments.map(e => ({
    name: e.name.split(' on ')[0].substring(0, 10),
    accuracy: (e.accuracy * 100).toFixed(1),
    f1: (e.f1Score * 100).toFixed(1),
  }));

  const modelData = mockModelComparisons.map(m => ({
    name: m.model,
    accuracy: m.accuracy * 100,
  }));

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Research Dashboard</h1>
        <p className="text-muted-foreground">Hybrid Deep Learning IDS Framework</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Latest Accuracy</p>
          <p className="text-3xl font-bold">{(latestExp.accuracy * 100).toFixed(1)}%</p>
          <p className="text-xs text-green-600 mt-2">+0.7% from previous</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">F1-Score</p>
          <p className="text-3xl font-bold">{(latestExp.f1Score * 100).toFixed(1)}%</p>
          <p className="text-xs text-green-600 mt-2">Excellent balance</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Experiments</p>
          <p className="text-3xl font-bold">{mockExperiments.length}</p>
          <p className="text-xs text-muted-foreground mt-2">3 completed, 1 running</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Models Compared</p>
          <p className="text-3xl font-bold">{mockModelComparisons.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Different architectures</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Experiment Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#3b82f6" />
              <Bar dataKey="f1" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Model Accuracy Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={modelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} height={80} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Recent Experiments</h2>
        <div className="space-y-3">
          {mockExperiments.map(exp => (
            <div key={exp.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded">
              <div>
                <p className="font-medium">{exp.name}</p>
                <p className="text-xs text-muted-foreground">{exp.dataset} • {exp.models.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{(exp.accuracy * 100).toFixed(1)}%</p>
                <p className={`text-xs ${exp.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {exp.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
