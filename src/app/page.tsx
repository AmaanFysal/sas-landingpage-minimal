import { Deliver } from "@/components/landing/deliver";
import { Hero } from "@/components/landing/hero";
import { NumberedSections } from "@/components/landing/sections";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

// Section order mirrors docs/reference/source.html exactly.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Deliver />
        <NumberedSections />
      </main>
      <SiteFooter />
    </>
  );
}
