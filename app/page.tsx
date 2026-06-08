import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MetricsSection } from "@/components/metrics-section";
import { ProblemSection } from "@/components/problem-section";
import { MechanismsSection } from "@/components/mechanisms-section";
import { ArchitectureSection } from "@/components/architecture-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <section id="overview">
        <ProblemSection />
      </section>
      <section id="results">
        <MetricsSection />
      </section>
      <section id="mechanisms">
        <MechanismsSection />
      </section>
      <section id="datasets">
        <ArchitectureSection />
      </section>
      <CTASection />
      <Footer />
    </main>
  );
}
