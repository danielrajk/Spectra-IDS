'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { StatCard } from '@/components/soc/stat-card'
import { TrendingUp, Database, Zap, Target } from 'lucide-react'

export default function ResearchPage() {
  const [selectedMetric, setSelectedMetric] = useState('accuracy')

  // Training history
  const trainingData = Array.from({ length: 50 }, (_, i) => ({
    epoch: i + 1,
    loss: 0.5 * Math.exp(-i / 10) + 0.05,
    accuracy: 0.7 + 0.25 * (1 - Math.exp(-i / 10)),
    valLoss: 0.52 * Math.exp(-i / 10) + 0.07,
    valAccuracy: 0.68 + 0.27 * (1 - Math.exp(-i / 10)),
  }))

  // Dataset statistics
  const datasetStats = [
    { name: 'CIC-IoT-2023', samples: 16_000, attacks: 8_400, normal: 7_600 },
    { name: 'UNSW-NB15', samples: 2_540, attacks: 1_270, normal: 1_270 },
    { name: 'NSL-KDD', samples: 25_192, attacks: 13_449, normal: 11_743 },
  ]

  // Model comparison
  const modelComparison = [
    { model: 'SPECTRA-IDS', accuracy: 99.2, f1: 98.7, precision: 99.1, recall: 98.3 },
    { model: 'Deep-IDS', accuracy: 96.5, f1: 95.8, precision: 96.2, recall: 95.4 },
    { model: 'CNN-LSTM', accuracy: 95.8, f1: 95.1, precision: 95.6, recall: 94.6 },
    { model: 'Random Forest', accuracy: 92.3, f1: 91.5, precision: 92.1, recall: 90.9 },
    { model: 'SVM', accuracy: 88.9, f1: 87.2, precision: 89.3, recall: 85.1 },
  ]

  // Confusion matrix data
  const confusionMatrix = [
    { x: 0, y: 0, value: 9850, name: 'True Negatives' },
    { x: 1, y: 0, value: 45, name: 'False Positives' },
    { x: 0, y: 1, value: 25, name: 'False Negatives' },
    { x: 1, y: 1, value: 8080, name: 'True Positives' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Research & Analytics</h1>
        <p className="text-muted-foreground mt-1">Model training, evaluation, and benchmarking</p>
      </div>

      {/* Research Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Final Accuracy"
          value="99.2%"
          icon={<TrendingUp className="w-6 h-6" />}
          variant="success"
        />
        <StatCard
          label="Datasets Trained"
          value={datasetStats.length}
          icon={<Database className="w-6 h-6" />}
        />
        <StatCard
          label="Total Samples"
          value={datasetStats.reduce((sum, d) => sum + d.samples, 0).toLocaleString()}
          icon={<Zap className="w-6 h-6" />}
        />
        <StatCard
          label="F1-Score"
          value="98.7%"
          icon={<Target className="w-6 h-6" />}
        />
      </div>

      {/* Training History */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Training History (50 Epochs)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trainingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#EF4444" strokeWidth={2} name="Training Loss" />
            <Line yAxisId="left" type="monotone" dataKey="valLoss" stroke="#F97316" strokeWidth={2} name="Validation Loss" />
            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={2} name="Accuracy" />
            <Line yAxisId="right" type="monotone" dataKey="valAccuracy" stroke="#06B6D4" strokeWidth={2} name="Val Accuracy" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dataset Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {datasetStats.map((dataset) => (
          <div key={dataset.name} className="bg-white rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">{dataset.name}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">Total Samples</span>
                  <span className="text-sm font-bold">{dataset.samples.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">Attack Samples</span>
                  <span className="text-sm font-bold text-red-600">{dataset.attacks.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(dataset.attacks / dataset.samples) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">Normal Samples</span>
                  <span className="text-sm font-bold text-green-600">{dataset.normal.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(dataset.normal / dataset.samples) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Comparison */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Model Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Model</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Accuracy</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">F1-Score</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Precision</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Recall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {modelComparison.map((model, idx) => (
                <tr key={idx} className={`hover:bg-secondary/50 transition-colors ${idx === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{model.model}</td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-foreground">{model.accuracy}%</td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-foreground">{model.f1}%</td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-foreground">{model.precision}%</td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-foreground">{model.recall}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Confusion Matrix</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="Predicted" domain={[-0.5, 1.5]} />
            <YAxis type="number" dataKey="y" name="Actual" domain={[-0.5, 1.5]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Matrix" data={confusionMatrix} fill="#3B82F6">
              {confusionMatrix.map((entry, index) => (
                <Scatter
                  key={`scatter-${index}`}
                  name={entry.name}
                  data={[entry]}
                  fill={entry.value > 8000 ? '#10B981' : entry.value > 1000 ? '#F97316' : '#EF4444'}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <p className="font-semibold text-green-900">True Positives: 8,080</p>
            <p className="text-green-800">Correctly identified attacks</p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="font-semibold text-blue-900">True Negatives: 9,850</p>
            <p className="text-blue-800">Correctly identified normal traffic</p>
          </div>
          <div className="p-3 bg-orange-50 rounded border border-orange-200">
            <p className="font-semibold text-orange-900">False Positives: 45</p>
            <p className="text-orange-800">Benign traffic flagged as attack</p>
          </div>
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <p className="font-semibold text-red-900">False Negatives: 25</p>
            <p className="text-red-800">Attacks missed by model</p>
          </div>
        </div>
      </div>
    </div>
  )
}
