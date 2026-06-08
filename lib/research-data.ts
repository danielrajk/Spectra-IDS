export interface Dataset {
  id: string;
  name: string;
  type: 'NSL-KDD' | 'CICIDS2017' | 'UNSW-NB15' | 'CSE-CIC-IDS2018' | 'Custom';
  samples: number;
  features: number;
  anomalies: number;
  description: string;
}

export interface Experiment {
  id: string;
  name: string;
  dataset: string;
  models: string[];
  status: 'running' | 'completed' | 'failed';
  accuracy: number;
  f1Score: number;
  precision: number;
  recall: number;
  auc: number;
  createdAt: string;
  completedAt?: string;
}

export interface PerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  specificity: number;
  sensitivity: number;
}

export interface XAIExplanation {
  sampleId: string;
  prediction: string;
  confidence: number;
  features: { name: string; importance: number }[];
  shapValues: { feature: string; value: number }[];
}

export interface ModelComparison {
  model: string;
  accuracy: number;
  f1Score: number;
  trainingTime: number;
  inferenceTime: number;
  memoryUsage: number;
}

// Mock Datasets
export const mockDatasets: Dataset[] = [
  {
    id: 'ds1',
    name: 'NSL-KDD',
    type: 'NSL-KDD',
    samples: 125973,
    features: 41,
    anomalies: 25192,
    description: 'Enhanced version of KDD99 intrusion detection dataset with duplicate records removed',
  },
  {
    id: 'ds2',
    name: 'CICIDS2017',
    type: 'CICIDS2017',
    samples: 2830743,
    features: 78,
    anomalies: 557645,
    description: 'Realistic intrusion detection dataset with modern attack patterns',
  },
  {
    id: 'ds3',
    name: 'UNSW-NB15',
    type: 'UNSW-NB15',
    samples: 2540047,
    features: 42,
    anomalies: 371097,
    description: 'Recent network traffic dataset with diverse attack vectors',
  },
  {
    id: 'ds4',
    name: 'CSE-CIC-IDS2018',
    type: 'CSE-CIC-IDS2018',
    samples: 16420000,
    features: 75,
    anomalies: 2937000,
    description: 'Large-scale dataset with benign and malicious traffic',
  },
];

// Mock Experiments
export const mockExperiments: Experiment[] = [
  {
    id: 'exp1',
    name: 'CNN-BiLSTM on CICIDS2017',
    dataset: 'CICIDS2017',
    models: ['CNN-BiLSTM'],
    status: 'completed',
    accuracy: 0.992,
    f1Score: 0.987,
    precision: 0.989,
    recall: 0.985,
    auc: 0.998,
    createdAt: '2024-11-15T10:00:00Z',
    completedAt: '2024-11-15T14:30:00Z',
  },
  {
    id: 'exp2',
    name: 'Hybrid Ensemble on NSL-KDD',
    dataset: 'NSL-KDD',
    models: ['Random Forest', 'XGBoost', 'LSTM'],
    status: 'completed',
    accuracy: 0.988,
    f1Score: 0.984,
    precision: 0.986,
    recall: 0.982,
    auc: 0.996,
    createdAt: '2024-11-14T09:00:00Z',
    completedAt: '2024-11-14T16:45:00Z',
  },
  {
    id: 'exp3',
    name: 'Transformer on UNSW-NB15',
    dataset: 'UNSW-NB15',
    models: ['Transformer'],
    status: 'running',
    accuracy: 0.0,
    f1Score: 0.0,
    precision: 0.0,
    recall: 0.0,
    auc: 0.0,
    createdAt: '2024-11-16T11:00:00Z',
  },
];

export const mockModelComparisons: ModelComparison[] = [
  { model: 'Random Forest', accuracy: 0.945, f1Score: 0.938, trainingTime: 12, inferenceTime: 2.1, memoryUsage: 256 },
  { model: 'XGBoost', accuracy: 0.951, f1Score: 0.947, trainingTime: 18, inferenceTime: 1.8, memoryUsage: 512 },
  { model: 'CNN', accuracy: 0.968, f1Score: 0.965, trainingTime: 45, inferenceTime: 0.8, memoryUsage: 1024 },
  { model: 'LSTM', accuracy: 0.975, f1Score: 0.972, trainingTime: 60, inferenceTime: 1.2, memoryUsage: 1536 },
  { model: 'BiLSTM', accuracy: 0.980, f1Score: 0.978, trainingTime: 72, inferenceTime: 1.5, memoryUsage: 1792 },
  { model: 'CNN-BiLSTM', accuracy: 0.992, f1Score: 0.987, trainingTime: 120, inferenceTime: 1.1, memoryUsage: 2048 },
  { model: 'Transformer', accuracy: 0.985, f1Score: 0.982, trainingTime: 150, inferenceTime: 2.3, memoryUsage: 2560 },
  { model: 'SPECTRA-IDS', accuracy: 0.998, f1Score: 0.997, trainingTime: 180, inferenceTime: 0.5, memoryUsage: 1024 },
];
