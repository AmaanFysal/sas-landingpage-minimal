import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/forms/lead-form";
import { LegalRow } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { contactPage, meta } from "@/content/site";

export const metadata: Metadata = {
  title: `${contactPage.title} | ${meta.title.split(" | ")[0]}`,
};

/**
 * "Contact our team": Fin's /view-demos (design library F-03 on the dark
 * family). A navy page with the white step-form card in the middle; behind
 * it, a soft blurred glow of the ribbon stands in for Fin's blurred page.
 */
export default function ContactPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/art/air-ribbon-loop.webp"
          alt=""
          width={2300}
          height={2374}
          sizes="60vw"
          quality={75}
          className="absolute -right-[12%] top-[6%] w-[70vw] max-w-[1100px] opacity-40 blur-[70px]"
        />
        <Image
          src="/art/air-ribbon-loop.webp"
          alt=""
          width={2300}
          height={2374}
          sizes="40vw"
          quality={75}
          className="absolute -bottom-[30%] -left-[14%] w-[48vw] max-w-[760px] rotate-180 opacity-25 blur-[80px]"
        />
      </div>
      <SiteHeader dark inner />
      <main className="relative flex flex-1 items-center justify-center px-4 py-12 md:py-20">
        <LeadForm kind="contact" copy={contactPage} variant="modal" />
      </main>
      <LegalRow dark />
    </div>
  );
}
