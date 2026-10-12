import Image from "next/image";
import { footer } from "@/content/site";
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
            <Image
              src="/art/air-ribbon-close.webp"
              alt=""
              width={1503}
              height={1010}
              sizes="(min-width: 768px) 360px, 60vw"
              quality={90}
              className="pointer-events-none mx-auto my-[-0.18em] w-[min(60vw,360px)] select-none"
            />
            <span className="block text-balance">{below}</span>
          </h2>
          <p className="t-body-lg mt-10 max-w-[572px]">{footer.body}</p>
          {/* Fin hero button pair: filled primary + outlined secondary, 8px apart. */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <a
              href={footer.cta.href}
              className="inline-flex h-10 items-center rounded-[4px] bg-off-black px-3.5 text-base text-sheet transition-colors hover:bg-sky-ink"
            >
              {footer.cta.label}
            </a>
            <a
              href={footer.waitlist.href}
              className="inline-flex h-10 items-center rounded-[4px] border border-off-black px-3.5 text-base text-off-black transition-colors hover:border-off-black/75 hover:text-off-black/75"
            >
              {footer.waitlist.label}
            </a>
          </div>
        </div>
      </section>
      <div className="frame-x mx-auto w-full max-w-[1920px]">
        <p className="t-caption border-t border-ink/10 py-6 text-muted">{footer.legal}</p>
      </div>
    </footer>
  );
}
