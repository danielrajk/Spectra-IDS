'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TrainingPage() {
  const trainingData = [
    { epoch: 1, loss: 0.8234, val_loss: 0.7856 },
    { epoch: 2, loss: 0.6124, val_loss: 0.5934 },
    { epoch: 3, loss: 0.4532, val_loss: 0.4234 },
    { epoch: 4, loss: 0.3124, val_loss: 0.2984 },
    { epoch: 5, loss: 0.1823, val_loss: 0.1756 },
  ];

  const modelMetrics = [
    { model: 'RF', training: 45, inference: 2.1, memory: 256 },
    { model: 'XGB', training: 65, inference: 1.8, memory: 512 },
    { model: 'CNN', training: 120, inference: 0.8, memory: 1024 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Model Training</h1>
        <p className="text-muted-foreground">Monitor training progress and model optimization</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Training Status</p>
          <p className="text-2xl font-bold">95%</p>
          <p className="text-xs text-green-600 mt-2">Epoch 5 of 5 completed</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Current Loss</p>
          <p className="text-2xl font-bold">0.1823</p>
          <p className="text-xs text-green-600 mt-2">Converging well</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Validation Acc.</p>
          <p className="text-2xl font-bold">98.2%</p>
          <p className="text-xs text-green-600 mt-2">No overfitting detected</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Training Loss Curve</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="val_loss" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Model Training Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="training" fill="#3b82f6" />
              <Bar dataKey="inference" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium">
        Start New Training
      </button>
    </div>
  );
}
