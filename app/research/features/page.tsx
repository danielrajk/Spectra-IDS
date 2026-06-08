'use client';

export default function FeaturesPage() {
  const features = [
    { name: 'Protocol Type', type: 'Categorical', importance: 0.92 },
    { name: 'Service', type: 'Categorical', importance: 0.88 },
    { name: 'Flag', type: 'Categorical', importance: 0.85 },
    { name: 'Src Bytes', type: 'Numerical', importance: 0.79 },
    { name: 'Dst Bytes', type: 'Numerical', importance: 0.81 },
    { name: 'Count', type: 'Numerical', importance: 0.76 },
    { name: 'Srv Count', type: 'Numerical', importance: 0.74 },
    { name: 'Dur', type: 'Numerical', importance: 0.68 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Feature Engineering</h1>
        <p className="text-muted-foreground">Feature importance analysis and selection</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Features</p>
          <p className="text-3xl font-bold">78</p>
          <p className="text-xs text-muted-foreground mt-2">After normalization & encoding</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Selected Features</p>
          <p className="text-3xl font-bold">42</p>
          <p className="text-xs text-muted-foreground mt-2">High importance threshold</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Dimensionality</p>
          <p className="text-3xl font-bold">46%</p>
          <p className="text-xs text-muted-foreground mt-2">Reduction from PCA</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Top Features by Importance</h2>
        <div className="space-y-4">
          {features.map((feature, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{feature.name}</p>
                  <p className="text-xs text-muted-foreground">{feature.type}</p>
                </div>
                <p className="font-bold">{(feature.importance * 100).toFixed(1)}%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${feature.importance * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium">
        Generate Feature Report
      </button>
    </div>
  );
}
