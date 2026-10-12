import type { Metadata } from "next";
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
 * behind the form, a fixed layer blurs it (8px, a little more than Fin's 4px,
 * owner request), and the 620px form card is centred on top. The nav stays
 * sharp above the blur.
 * - The page is exactly one screen tall and doesn't scroll. Only the form
 *   layer scrolls, and only if the card is taller than a short screen.
 * - The page behind is dark (owner request). It reuses existing copy (hero
 *   subheading, taglines, buttons, outcome cards, legal line); the big hero
 *   heading and the render were taken out at the owner's request. It is
 *   decorative, so it is hidden from assistive tech and can't be focused.
 */
export default function ContactPage() {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-night text-white">
      <SiteHeader dark inner current="contact" />
      <div aria-hidden inert className="flex min-h-0 flex-1 flex-col select-none">
        <Backdrop />
      </div>
      <div className="fixed inset-0 z-40 flex overflow-y-auto px-4 pb-4 pt-20 backdrop-blur-[8px] md:pt-24">
        <LeadForm kind="contact" copy={contactPage} variant="modal" />
      </div>
    </div>
  );
}

/** The dark SAS page behind the form: hero text, outcome cards, legal line. */
function Backdrop() {
  return (
    <>
      <section className="grid grid-cols-12 gap-x-4 px-4 pt-10 md:px-0 md:pt-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <p className="max-w-[572px] text-[18px]/[1.4] text-white/70">{hero.subheading}</p>
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
          <ul className="mt-16 grid gap-4 md:grid-cols-3">
            {deliver.cards.map((card) => (
              <li key={card.title} className="border border-white/10 p-6">
                <p className="text-[24px]/[1.2] text-sky">{card.title}</p>
                <p className="mt-4 text-base/[1.5] text-white/60">{card.line}</p>
                <p className="mt-8 border-t border-white/10 pt-4 text-[14px]/[1.4] text-white/50">{card.fact}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="mt-auto">
        <LegalRow dark />
      </div>
    </>
  );
}
