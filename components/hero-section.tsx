import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Quantum-Resilient Security Framework</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
          <span className="text-foreground">SPECTRA</span>
          <span className="text-accent">-IDS</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
          Seismic Predictive Energy-aware Chameleon Threat Resilience Algorithm
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          A novel quantum-resilient deep learning framework for autonomous real-time 
          intrusion detection in 6G-enabled IoT edge networks.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demo">
            <Button size="lg" className="px-8 py-6 text-base bg-accent text-accent-foreground hover:bg-accent/90">
              Launch Live Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/paper">
            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-border hover:bg-secondary">
              Read the Paper
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
