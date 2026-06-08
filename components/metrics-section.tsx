import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    value: "99.2%",
    label: "Detection Accuracy",
    description: "Achieved on benchmark datasets",
  },
  {
    value: "98.7%",
    label: "F1-Score",
    description: "Balanced precision and recall",
  },
  {
    value: "0.31%",
    label: "False Alarm Rate",
    description: "Minimal false positives",
  },
  {
    value: "43%",
    label: "Energy Reduction",
    description: "Compared to baseline methods",
  },
];

export function MetricsSection() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-accent font-medium mb-4 text-center">Performance Metrics</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">
          Benchmark Results
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Experimental evaluation on CIC-IoT-2023, UNSW-NB15, and NSL-KDD datasets demonstrates 
          state-of-the-art performance.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.label} className="bg-card border-border hover:border-accent/50 transition-colors">
              <CardContent className="pt-6">
                <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">{metric.value}</p>
                <p className="text-base font-medium text-foreground mb-1">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
