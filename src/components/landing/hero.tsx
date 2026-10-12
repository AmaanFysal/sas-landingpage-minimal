import Image from "next/image";
import { hero } from "@/content/site";
import { Container, Indented } from "./layout";
import { Square } from "./marks";

/** Editorial left hero with a 3D object bottom-right (Fin H-01). */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="relative z-10 pb-10 pt-14 sm:px-8 md:pb-28 md:pt-24 lg:min-h-[calc(100svh-106px)]">
        <Indented className="max-w-[58rem]">
          <h1 id="hero-title" className="display text-[clamp(3rem,7.2vw,6.75rem)]">
            <span className="block text-balance">{hero.headingLines[0]}</span>{" "}
            <span className="block text-balance text-ink/40">{hero.headingLines[1]}</span>
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg/relaxed text-ink/75 md:mt-10">{hero.subheading}</p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {hero.taglines.map((t) => (
              <li key={t.text}>
                <a href={t.href} className="group inline-flex items-center gap-2.5 text-[15px]">
                  <Square />
                  <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-ink/40">
                    {t.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Indented>
      </Container>
      <Image
        src="/art/air-ribbon-hero.webp"
        alt=""
        width={1380}
        height={1424}
        fetchPriority="high"
        sizes="(min-width: 1024px) 38vw, 80vw"
        className="pointer-events-none ml-auto mr-[-8%] w-[80%] max-w-[420px] select-none lg:absolute lg:bottom-[2%] lg:right-[2%] lg:mr-0 lg:w-[38vw] lg:max-w-[600px]"
      />
    </section>
  );
}
