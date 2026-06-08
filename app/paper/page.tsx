import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

export default function PaperPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Paper Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance leading-tight">
            SPECTRA-IDS: A Quantum-Resilient Deep Learning Framework for Autonomous Real-Time Intrusion Detection in 6G-Enabled IoT Edge Networks
          </h1>
          <p className="text-muted-foreground">
            Research Paper | Cybersecurity | Deep Learning | 6G Networks
          </p>
        </div>

        {/* Abstract */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Abstract</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The rapid expansion of autonomous Internet of Things (IoT) devices across sixth-generation (6G) ultra-dense edge networks has introduced a new generation of sophisticated cyber threats, including AI-orchestrated botnets, adversarial evasion attacks, and zero-day exploits, that existing intrusion detection systems are fundamentally unable to address. Conventional approaches suffer from static threat models, centralized architectures, and excessive resource consumption, rendering them unsuitable for dynamic, resource-constrained 6G edge environments that are increasingly vulnerable to quantum-enabled cryptographic attacks.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To overcome these limitations, this research proposes <strong className="text-foreground">SPECTRA-IDS (Seismic Predictive Energy-aware Chameleon Threat Resilience Algorithm)</strong>, a novel quantum-resilient deep learning framework for autonomous real-time intrusion detection in 6G-enabled IoT edge networks.
            </p>
          </div>
        </section>

        {/* Core Mechanisms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-accent">Core Mechanisms</h2>
          
          <div className="space-y-8">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">1. Chameleon Drift Layer (CDL)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Builds per-device behavioral fingerprints to detect deviations from individualized baselines. This adaptive layer continuously learns and updates device-specific patterns, enabling the system to distinguish between legitimate behavioral changes and malicious activities with high precision.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">2. Seismic Pre-shock Detector (SPD)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accumulates micro-deviation energy across a recency-weighted sliding window to anticipate attacks before full manifestation. By analyzing subtle anomalies that precede major security incidents, SPD provides early warning capabilities that enable proactive defense measures.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">3. Predator Pursuit Engine (PPE)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dynamically reallocates energy and bandwidth budgets toward suspect traffic flows under strict resource constraints. This intelligent resource management ensures optimal detection performance while maintaining the energy efficiency critical for IoT edge deployments.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-accent">Technical Architecture</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">CNN-BiLSTM Hybrid Core</h3>
              <p className="text-sm text-muted-foreground">
                Combines convolutional neural networks for spatial feature extraction with bidirectional LSTM for temporal pattern recognition in network traffic.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">Silent Federated Learning</h3>
              <p className="text-sm text-muted-foreground">
                Privacy-preserving cross-node model aggregation protocol that enables collaborative learning without exposing sensitive device data.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">Adversarial Robustness Training</h3>
              <p className="text-sm text-muted-foreground">
                Hardened against evasion attacks through specialized training procedures that expose the model to adversarial examples.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">Post-Quantum Cryptography</h3>
              <p className="text-sm text-muted-foreground">
                NIST-standardized post-quantum cryptographic primitives ensure security against future quantum computing threats.
              </p>
            </div>
          </div>
        </section>

        {/* Expected Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-accent">Expected Results</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Experimental evaluation on benchmark datasets including CIC-IoT-2023, UNSW-NB15, and NSL-KDD is expected to demonstrate the following performance metrics:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5 text-center">
              <p className="text-3xl font-bold text-accent">99.2%</p>
              <p className="text-sm text-muted-foreground">Detection Accuracy</p>
            </div>
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5 text-center">
              <p className="text-3xl font-bold text-accent">98.7%</p>
              <p className="text-sm text-muted-foreground">F1-Score</p>
            </div>
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5 text-center">
              <p className="text-3xl font-bold text-accent">0.31%</p>
              <p className="text-sm text-muted-foreground">False Alarm Rate</p>
            </div>
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5 text-center">
              <p className="text-3xl font-bold text-accent">43%</p>
              <p className="text-sm text-muted-foreground">Energy Reduction</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-6">
            The framework is also anticipated to maintain <strong className="text-foreground">96.8% accuracy under adversarial conditions</strong>, highlighting its effectiveness, efficiency, and suitability for securing next-generation autonomous IoT edge environments.
          </p>
        </section>

        {/* Datasets */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-accent">Benchmark Datasets</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <h3 className="font-semibold">CIC-IoT-2023</h3>
                <p className="text-sm text-muted-foreground">Canadian Institute for Cybersecurity IoT Dataset</p>
              </div>
              <a href="https://www.unb.ca/cic/datasets/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <h3 className="font-semibold">UNSW-NB15</h3>
                <p className="text-sm text-muted-foreground">University of New South Wales Network Dataset</p>
              </div>
              <a href="https://research.unsw.edu.au/projects/unsw-nb15-dataset" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <h3 className="font-semibold">NSL-KDD</h3>
                <p className="text-sm text-muted-foreground">Improved KDD Cup 99 Dataset</p>
              </div>
              <a href="https://www.unb.ca/cic/datasets/nsl.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Conclusion</h2>
          <p className="text-muted-foreground leading-relaxed">
            SPECTRA-IDS represents a significant advancement in intrusion detection systems, specifically designed to address the unique challenges of 6G-enabled IoT edge networks. By combining adaptive behavioral analysis, predictive threat detection, and intelligent resource management within a quantum-resilient framework, SPECTRA-IDS provides a comprehensive solution for securing next-generation autonomous IoT environments against both current and emerging cyber threats.
          </p>
        </section>

        {/* Back to Home */}
        <div className="pt-8 border-t border-border text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </article>
    </main>
  );
}
