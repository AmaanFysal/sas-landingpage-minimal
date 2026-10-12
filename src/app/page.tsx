import { Hero } from "@/components/landing/hero";
import { Ecosystem, Occupancy, ProofOfConcept, Standards } from "@/components/landing/sections";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

// Section order mirrors docs/reference/source.html exactly.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Ecosystem />
        <ProofOfConcept />
        <Standards />
        <Occupancy />
      </main>
      <SiteFooter />
    </>
  );
}
