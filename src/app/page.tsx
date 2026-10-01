import { CommanderBackdrop } from "@/components/three/commander-canvas";
import { Hero } from "@/components/home/hero";
import { MarketMoment } from "@/components/home/market-moment";
import { ThickAgents } from "@/components/home/thick-agents";
import { FullStackFirst } from "@/components/home/full-stack-first";
import { CapabilityMap } from "@/components/home/capability-map";
import { SaasOverpay } from "@/components/home/saas-overpay";
import { DomainsGrid } from "@/components/home/domains-grid";
import { Industries } from "@/components/home/industries";
import { TechStack } from "@/components/home/tech-stack";
import { CommanderArchitecture } from "@/components/home/commander-architecture";
import { SelectedWork } from "@/components/home/selected-work";
import { Testimonials } from "@/components/home/testimonials";
import { ProvenResults } from "@/components/home/proven-results";
import { Founders } from "@/components/home/founders";
import { CtaSection } from "@/components/home/cta";

/**
 * Homepage — section order preserved from the production site, with two
 * new showcase layers (product gallery slider + client-impact slider):
 * Hero → Market Moment → Thick Agents → Full Stack First → Capability Map →
 * Why SaaS Overpays → 9 Domains → Industries → Tech Stack → Commander
 * Architecture (flagship) → Selected Work (gallery) → Client Impact →
 * Proven Results → Founders → CTA.
 */
export default function HomePage() {
  return (
    <>
      <CommanderBackdrop />
      <div className="relative z-10">
        <Hero />
        <MarketMoment />
        <ThickAgents />
        <FullStackFirst />
        <CapabilityMap />
        <SaasOverpay />
        <DomainsGrid />
        <Industries />
        <TechStack />
        <CommanderArchitecture />
        <SelectedWork />
        <Testimonials />
        <ProvenResults />
        <Founders />
        <CtaSection />
      </div>
    </>
  );
}
