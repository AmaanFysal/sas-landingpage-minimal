import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { LegalRow } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { meta, waitlistPage } from "@/content/site";

export const metadata: Metadata = {
  title: `${waitlistPage.title} | ${meta.title.split(" | ")[0]}`,
};

/**
 * "Join the waitlist": the light counterpart, after Fin's demo form (design
 * library F-02): off-white page, centred heading, small caps labels, chalk
 * fields and a full-width black button.
 */
export default function WaitlistPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-page">
      <SiteHeader inner />
      <main className="flex flex-1 justify-center px-4 pb-24 pt-14 md:pt-24">
        <LeadForm kind="waitlist" copy={waitlistPage} variant="page" />
      </main>
      <LegalRow />
    </div>
  );
}
