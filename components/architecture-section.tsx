import { Card, CardContent } from "@/components/ui/card";
import { Brain, Lock, Network, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "CNN-BiLSTM Hybrid Core",
    description: "Deep learning architecture combining convolutional and bidirectional LSTM layers for spatiotemporal pattern recognition.",
  },
  {
    icon: Network,
    title: "Silent Federated Learning",
    description: "Privacy-preserving cross-node model aggregation without exposing sensitive local data.",
  },
  {
    icon: Shield,
    title: "Adversarial Robustness Training",
    description: "Maintains 96.8% accuracy under adversarial conditions through hardened model training.",
  },
  {
    icon: Lock,
    title: "Post-Quantum Cryptography",
    description: "NIST-standardized post-quantum cryptographic primitives for future-proof security.",
  },
];

export function ArchitectureSection() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-accent font-medium mb-4 text-center">Technical Framework</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">
          Architecture & Components
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Beyond the core mechanisms, SPECTRA-IDS incorporates cutting-edge 
          technologies for comprehensive protection.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border hover:border-accent/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
