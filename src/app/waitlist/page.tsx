import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { LegalRow } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { meta, waitlistPage } from "@/content/site";

export const metadata: Metadata = {
  title: `${waitlistPage.title} | ${meta.title.split(" | ")[0]}`,
};

/**
 * "Join the waitlist", built like fin.ai's /contact-sales form (the one that
 * asks for company size): plain white page and nav, content starting 112px under
 * the nav, a 472px column with the heading left-aligned on phones and centred
 * from tablet up.
 */
export default function WaitlistPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-sheet">
      <SiteHeader white inner current="waitlist" />
      <main className="flex flex-1 justify-center px-4 pb-24 pt-20 md:pt-28">
        <LeadForm kind="waitlist" copy={waitlistPage} variant="page" />
      </main>
      <LegalRow />
    </div>
  );
}
