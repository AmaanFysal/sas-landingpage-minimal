import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/forms/lead-form";
import { CtaButtons } from "@/components/landing/cta-buttons";
import { Square } from "@/components/landing/marks";
import { LegalRow } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { contactPage, deliver, hero, meta } from "@/content/site";

export const metadata: Metadata = {
  title: `${contactPage.title} | ${meta.title.split(" | ")[0]}`,
};

/**
 * "Contact our team", built like fin.ai's /view-demos: a real page sits
 * behind the form and a fixed layer blurs it by 4px (Fin's `backdrop-blur-xs`),
 * with the 620px form card centred on top. The nav stays sharp above the
 * blur. The page behind is the dark variant (owner request) and only reuses
 * existing copy; it is decorative, so it is hidden from assistive tech and
 * can't be focused.
 */
export default function ContactPage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-night text-white">
      <SiteHeader dark inner current="contact" />
      <div aria-hidden inert className="flex flex-1 flex-col select-none">
        <Backdrop />
      </div>
      <div className="fixed inset-0 z-40 flex overflow-y-auto px-4 pb-4 pt-20 backdrop-blur-[4px] md:pt-24">
        <LeadForm kind="contact" copy={contactPage} variant="modal" />
      </div>
    </div>
  );
}

/** The dark SAS page behind the form (hero, outcomes, legal line). */
function Backdrop() {
  return (
    <>
      <section className="grid grid-cols-12 gap-x-4 px-4 md:px-0">
        <div className="col-span-12 pt-14 md:col-span-10 md:col-start-2 md:pt-20 xl:col-span-6 xl:col-start-2 xl:py-24">
          <p className="t-display">
            <span className="block">{hero.headingLines[0]}</span>
            <span className="block">{hero.headingLines[1]}</span>
          </p>
          <p className="mt-8 max-w-[572px] text-[18px]/[1.4] text-white/70">{hero.subheading}</p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base">
            {hero.taglines.map((t) => (
              <li key={t.text} className="flex items-center gap-2.5">
                <Square />
                {t.text}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CtaButtons dark />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-center py-10 xl:col-span-5 xl:col-start-8">
          <Image src="/art/air-ribbon-loop.webp" alt="" width={2300} height={2374} sizes="(min-width: 1280px) 40vw, 80vw" quality={75} className="h-auto w-full max-w-[560px]" />
        </div>
      </section>
      <section className="grid grid-cols-12 gap-x-4 px-4 pb-20 md:px-0">
        <ul className="col-span-12 grid gap-4 md:col-span-10 md:col-start-2 md:grid-cols-3">
          {deliver.cards.map((card) => (
            <li key={card.title} className="border border-white/10 p-6">
              <p className="text-[24px]/[1.2] text-sky">{card.title}</p>
              <p className="mt-4 text-base/[1.5] text-white/60">{card.line}</p>
              <p className="mt-8 border-t border-white/10 pt-4 text-[14px]/[1.4] text-white/50">{card.fact}</p>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-auto">
        <LegalRow dark />
      </div>
    </>
  );
}
