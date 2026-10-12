import Image from "next/image";
import Link from "next/link";
import { footer, hero } from "@/content/site";
import { buttonClass } from "./cta-buttons";
import { LiquidRibbon } from "./liquid-ribbon";

/**
 * Hero container (white panel inset 16px like the sheet). One render, used
 * the way fin.ai uses theirs (placement rules: `.hero-art` in globals.css):
 * - From 1280px: the render is placed oversized from column 8 and runs off the
 *   panel's right edge, so the panel crops it into a larger close-up.
 * - Below 1280px: the same render drops under the text, shown whole but wider
 *   than the panel so its sides are trimmed, bleeding off the bottom edge.
 * The closing block shows this same render whole.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto grid w-full max-w-[1888px] grid-cols-12 gap-x-4 overflow-hidden bg-sheet md:w-[calc(100%-2rem)]"
    >
      <div className="relative z-10 col-span-12 px-4 pb-6 pt-14 md:col-span-10 md:col-start-2 md:px-0 md:pb-8 md:pt-20 xl:col-span-6 xl:col-start-2 xl:py-28">
        {/* Capped at 7em so it wraps over three lines like Fin's, even on wide screens. */}
        <h1 id="hero-title" className="t-display max-w-[7em] text-balance">
          {hero.heading}
        </h1>
        <p className="t-lead mt-8 max-w-[480px] text-pretty">
          {hero.subline.lead} <strong className="font-medium text-ink/80">{hero.subline.bold}</strong>
        </p>
        {/* Fin's hero button pair: 40px, 8px apart, 32px under the subline. */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={footer.cta.href} className={buttonClass("filled")}>
            {footer.cta.label}
          </Link>
          <a href={hero.howItWorks.href} className={buttonClass("outlined")}>
            {hero.howItWorks.label}
          </a>
        </div>
        <p className="t-caption mt-4 flex items-center gap-2 text-ink/70">
          <TickIcon />
          {hero.note}
        </p>
      </div>

      <div className="hero-art pointer-events-none col-span-12 select-none">
        <LiquidRibbon>
          <Image
            src="/art/air-ribbon-loop.webp"
            alt=""
            width={2300}
            height={2374}
            quality={90}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1280px) 80vw, 125vw"
            className="h-auto w-full"
          />
        </LiquidRibbon>
      </div>
    </section>
  );
}

/** Filled tick in a circle (black, like Fin's; white on dark pages), before the line under the buttons. */
export function TickIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 shrink-0">
      <circle cx="8" cy="8" r="8" className={dark ? "fill-white" : "fill-off-black"} />
      <path
        d="M4.75 8.25 7 10.5l4.25-4.75"
        fill="none"
        className={dark ? "stroke-night" : "stroke-white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
