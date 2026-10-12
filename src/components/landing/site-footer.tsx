import Image from "next/image";
import { askAi, footer } from "@/content/site";
import { aiIcons } from "./ai-icons";
import { LiquidRibbon } from "./liquid-ribbon";
import { CtaButtons } from "./cta-buttons";
import { CrosshairFrame } from "./marks";

/** Closing block framed by crop marks (Fin S-12), then a quiet legal row. */
export function SiteFooter() {
  const [above, below] = footer.titleLines;

  return (
    <footer className="mt-4">
      <section aria-labelledby="closing-title" className="relative mx-4">
        <CrosshairFrame />
        <div className="flex flex-col items-center px-4 py-20 text-center md:py-28">
          <h2 id="closing-title" className="t-display">
            <span className="block text-balance">{above}</span>{" "}
            <LiquidRibbon className="pointer-events-none mx-auto my-[-0.2em] w-[200px] md:w-[340px] select-none">
              <Image
                src="/art/air-ribbon-loop.webp"
                alt=""
                width={2300}
                height={2374}
                sizes="(min-width: 768px) 340px, 200px"
                quality={90}
                className="h-auto w-full"
              />
            </LiquidRibbon>
            <span className="block text-balance">{below}</span>
          </h2>
          <p className="t-body-lg mt-10 max-w-[572px]">{footer.body}</p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </div>
      </section>
      <LegalRow />
    </footer>
  );
}

/**
 * Quiet last row on the frame line: the legal line, and on the right a small
 * "Ask an AI to summarise what we do." with one icon per assistant (owner
 * request). Also closes the contact and waitlist pages.
 */
export function LegalRow({ dark = false }: { dark?: boolean }) {
  return (
    <div className="frame-x relative mx-auto w-full max-w-[1920px]">
      <div className={`flex flex-col gap-4 border-t py-6 xl:flex-row xl:items-center xl:justify-between xl:gap-8 ${dark ? "border-white/10" : "border-ink/10"}`}>
        <p className={`t-caption ${dark ? "text-white/55" : "text-muted"}`}>{footer.legal}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className={`t-caption whitespace-nowrap ${dark ? "text-white/55" : "text-muted"}`}>{askAi.label}</p>
          <ul className="flex gap-1.5">
            {askAi.links.map((link) => {
              const icon = aiIcons[link.icon];
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask ${link.name}`}
                    title={link.name}
                    className={`grid size-7 place-items-center rounded-[6px] border transition-colors ${
                      dark
                        ? "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                        : "border-ink/10 bg-sheet text-ink/70 hover:border-ink/30 hover:text-ink"
                    }`}
                  >
                    <svg aria-hidden viewBox={icon.viewBox} className="size-3.5" fill="currentColor" fillRule={icon.evenodd ? "evenodd" : undefined}>
                      {icon.paths.map((d) => (
                        <path key={d.slice(0, 24)} d={d} />
                      ))}
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
