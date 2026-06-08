import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="font-bold">
              SPECTRA<span className="text-accent">-IDS</span>
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Citation
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Quantum-Resilient Deep Learning for 6G IoT Edge Security
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Evaluated on CIC-IoT-2023, UNSW-NB15, and NSL-KDD benchmark datasets
          </p>
        </div>
      </div>
    </footer>
  );
}
