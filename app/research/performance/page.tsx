'use client';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PerformancePage() {
  const confusionMatrix = [
    { category: 'True Neg', value: 45230, fill: '#10b981' },
    { category: 'False Pos', value: 145, fill: '#ef4444' },
    { category: 'False Neg', value: 98, fill: '#f59e0b' },
    { category: 'True Pos', value: 48920, fill: '#3b82f6' },
  ];

  const perfData = [
    { metric: 'Accuracy', value: 99.2 },
    { metric: 'Precision', value: 99.8 },
    { metric: 'Recall', value: 98.7 },
    { metric: 'F1-Score', value: 99.2 },
    { metric: 'AUC-ROC', value: 99.8 },
    { metric: 'Specificity', value: 99.7 },
  ];

  const rateData = [
    { name: 'False Positive', value: 0.31 },
    { name: 'False Negative', value: 1.27 },
    { name: 'Correct Detection', value: 98.42 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Performance Evaluation</h1>
        <p className="text-muted-foreground">Comprehensive model performance metrics</p>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {perfData.map((item, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">{item.metric}</p>
            <p className="text-2xl font-bold">{item.value}%</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Confusion Matrix</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={confusionMatrix} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                {confusionMatrix.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Performance Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={perfData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" angle={-45} height={80} />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Detection Rate Analysis</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={rateData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
              {rateData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={idx === 0 ? '#ef4444' : idx === 1 ? '#f59e0b' : '#10b981'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium">
        Export Performance Report
      </button>
    </div>
  );
}
