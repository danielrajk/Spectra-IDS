'use client';

import { mockDatasets } from '@/lib/research-data';

export default function DatasetsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Datasets</h1>
        <p className="text-muted-foreground">Benchmark datasets for intrusion detection evaluation</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {mockDatasets.map(dataset => (
          <div key={dataset.id} className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{dataset.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Samples</p>
                <p className="font-bold">{(dataset.samples / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Features</p>
                <p className="font-bold">{dataset.features}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Anomalies</p>
                <p className="font-bold">{(dataset.anomalies / 1000).toFixed(0)}K</p>
              </div>
            </div>

            <div className="w-full bg-secondary rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${(dataset.anomalies / dataset.samples) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {((dataset.anomalies / dataset.samples) * 100).toFixed(1)}% anomaly rate
            </p>

            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition">
              Load Dataset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
