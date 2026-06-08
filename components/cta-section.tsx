import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Github } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-secondary/30 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Explore the Research
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access the full paper, methodology details, and implementation resources 
          for SPECTRA-IDS.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/paper">
            <Button size="lg" className="px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90">
              <FileText className="w-4 h-4 mr-2" />
              Read Full Paper
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-border hover:bg-secondary">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </a>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-2xl font-bold text-foreground">6G</p>
            <p className="text-sm text-muted-foreground">Ultra-Dense Edge Networks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">IoT</p>
            <p className="text-sm text-muted-foreground">Autonomous Device Security</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">PQC</p>
            <p className="text-sm text-muted-foreground">Post-Quantum Cryptography</p>
          </div>
        </div>
      </div>
    </section>
  );
}
