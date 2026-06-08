import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Bot, Server, Cpu } from "lucide-react";

const challenges = [
  {
    icon: Bot,
    title: "AI-Orchestrated Botnets",
    description: "Sophisticated threats powered by artificial intelligence that adapt and evolve in real-time.",
  },
  {
    icon: AlertTriangle,
    title: "Adversarial Evasion",
    description: "Advanced attacks designed to bypass traditional detection mechanisms through manipulation.",
  },
  {
    icon: Server,
    title: "Zero-Day Exploits",
    description: "Previously unknown vulnerabilities that existing systems are fundamentally unable to detect.",
  },
  {
    icon: Cpu,
    title: "Resource Constraints",
    description: "Edge devices with limited computational power and energy budgets requiring efficient solutions.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-accent font-medium mb-4">The Challenge</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Why Current Solutions Fall Short
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The rapid expansion of autonomous IoT devices across 6G ultra-dense edge networks 
              has introduced a new generation of sophisticated cyber threats that existing 
              intrusion detection systems are fundamentally unable to address.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Conventional approaches suffer from static threat models, centralized architectures, 
              and excessive resource consumption, rendering them unsuitable for dynamic, 
              resource-constrained 6G edge environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.title} className="bg-card border-border hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <challenge.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-base font-semibold text-foreground mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
