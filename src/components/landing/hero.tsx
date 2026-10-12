import Image from "next/image";
import { hero } from "@/content/site";
import { Square } from "./marks";

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
        <h1 id="hero-title" className="t-display">
          <span className="block text-balance">{hero.headingLines[0]}</span>{" "}
          <span className="block text-balance">{hero.headingLines[1]}</span>
        </h1>
        <p className="t-body-lg mt-8 max-w-[572px]">{hero.subheading}</p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {hero.taglines.map((t) => (
            <li key={t.text}>
              <a href={t.href} className="group inline-flex items-center gap-2.5 text-base">
                <Square />
                <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-ink/40">
                  {t.text}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-art pointer-events-none col-span-12 select-none">
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
      </div>
    </section>
  );
}
