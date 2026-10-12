import Image from "next/image";
import { hero } from "@/content/site";
import { PageGrid } from "./layout";
import { Square } from "./marks";

/** Editorial left hero with a 3D object bottom-right (Fin H-01). */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <PageGrid className="relative z-10 pb-12 pt-14 md:pb-28 md:pt-16 lg:min-h-[calc(100svh-108px)]">
        <div className="col-span-12 md:col-span-9 md:col-start-2 lg:col-span-7 lg:col-start-2">
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
      </PageGrid>
      <Image
        src="/art/air-ribbon-hero.webp"
        alt=""
        width={1380}
        height={1424}
        quality={90}
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1024px) 36vw, 80vw"
        className="pointer-events-none ml-auto mr-[-8%] w-[80%] max-w-[420px] select-none lg:absolute lg:bottom-[4%] lg:right-[var(--frame)] lg:mr-0 lg:w-[36vw] lg:max-w-[600px]"
      />
    </section>
  );
}
