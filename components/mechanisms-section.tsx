import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fingerprint, Activity, Zap } from "lucide-react";

const mechanisms = [
  {
    icon: Fingerprint,
    title: "Chameleon Drift Layer (CDL)",
    description:
      "Builds per-device behavioral fingerprints to detect deviations from individualized baselines, adapting to each IoT device&apos;s unique patterns.",
    features: ["Per-device profiling", "Behavioral fingerprinting", "Adaptive baseline learning"],
  },
  {
    icon: Activity,
    title: "Seismic Pre-shock Detector (SPD)",
    description:
      "Accumulates micro-deviation energy across a recency-weighted sliding window to anticipate attacks before full manifestation.",
    features: ["Early threat prediction", "Micro-deviation analysis", "Sliding window mechanism"],
  },
  {
    icon: Zap,
    title: "Predator Pursuit Engine (PPE)",
    description:
      "Dynamically reallocates energy and bandwidth budgets toward suspect traffic flows under strict resource constraints.",
    features: ["Dynamic resource allocation", "Energy-aware processing", "Priority-based targeting"],
  },
];

export function MechanismsSection() {
  return (
    <section id="mechanisms" className="py-20 px-6 bg-secondary/30 border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-accent font-medium mb-4 text-center">Core Innovation</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">
          Three Original Mechanisms
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          SPECTRA-IDS integrates three novel components that work together to provide 
          comprehensive, adaptive threat detection.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mechanisms.map((mechanism) => (
            <Card key={mechanism.title} className="bg-card border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <mechanism.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{mechanism.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mechanism.description}</p>
                <ul className="space-y-2">
                  {mechanism.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
