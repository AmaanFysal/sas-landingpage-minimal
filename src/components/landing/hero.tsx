import Image from "next/image";
import { hero } from "@/content/site";
import { Square } from "./marks";

/**
 * Hero as a container (Fin H-04 style): a white panel inset 16px like the
 * sheet below. From 1280px, text sits on the content grid (columns 2–7) and
 * the right five columns are filled edge to edge by a close-up of the same
 * 3D ribbon that appears whole in the closing block. Narrower screens stack
 * the text above a full-width band of the close-up.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto grid w-full max-w-[1888px] grid-cols-12 gap-x-4 overflow-hidden bg-sheet md:w-[calc(100%-2rem)]"
    >
      <div className="col-span-12 px-4 pb-10 pt-14 md:col-span-10 md:col-start-2 md:px-0 md:pb-14 md:pt-20 xl:col-span-6 xl:py-28">
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

      <div className="relative col-span-12 aspect-[4/3] md:aspect-[16/9] xl:col-span-5 xl:col-start-8 xl:aspect-auto">
        <Image
          src="/art/air-ribbon-hero-crop.webp"
          alt=""
          fill
          quality={90}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1280px) 40vw, 100vw"
          className="pointer-events-none select-none object-cover object-left"
        />
      </div>
    </section>
  );
}
