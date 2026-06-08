'use client';

import { motion } from 'framer-motion';

export default function EvaluationPage() {
  const datasets = [
    { name: 'CIC-IoT-2023', accuracy: 99.2, f1: 98.7, precision: 98.9, recall: 98.5 },
    { name: 'UNSW-NB15', accuracy: 98.8, f1: 98.1, precision: 98.4, recall: 97.8 },
    { name: 'NSL-KDD', accuracy: 99.5, f1: 99.2, precision: 99.3, recall: 99.1 },
  ];

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Model Evaluation</h1>
        <p className="text-slate-400">Comprehensive benchmark results across datasets</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Dataset Benchmarks</h2>
        <div className="space-y-4">
          {datasets.map((dataset, idx) => (
            <motion.div key={dataset.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="border border-slate-700/30 rounded p-4 bg-slate-700/20">
              <div className="font-medium text-slate-100 mb-3">{dataset.name}</div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-slate-400">Accuracy</div>
                  <div className="text-green-400 font-bold">{dataset.accuracy}%</div>
                </div>
                <div>
                  <div className="text-slate-400">F1 Score</div>
                  <div className="text-blue-400 font-bold">{dataset.f1}</div>
                </div>
                <div>
                  <div className="text-slate-400">Precision</div>
                  <div className="text-purple-400 font-bold">{dataset.precision}%</div>
                </div>
                <div>
                  <div className="text-slate-400">Recall</div>
                  <div className="text-yellow-400 font-bold">{dataset.recall}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
