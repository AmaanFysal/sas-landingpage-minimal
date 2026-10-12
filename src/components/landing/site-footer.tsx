import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/site";
import { LiquidRibbon } from "./liquid-ribbon";
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
            <LiquidRibbon className="pointer-events-none mx-auto my-[-0.2em] w-[min(56vw,340px)] select-none">
              <Image
                src="/art/air-ribbon-loop.webp"
                alt=""
                width={2300}
                height={2374}
                sizes="(min-width: 768px) 340px, 56vw"
                quality={90}
                className="h-auto w-full"
              />
            </LiquidRibbon>
            <span className="block text-balance">{below}</span>
          </h2>
          <p className="t-body-lg mt-10 max-w-[572px]">{footer.body}</p>
          {/* Fin hero button pair: filled primary + outlined secondary, 8px apart. */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              href={footer.cta.href}
              className="inline-flex h-10 items-center rounded-[4px] bg-off-black px-3.5 text-base text-sheet transition-colors hover:bg-sky-ink"
            >
              {footer.cta.label}
            </Link>
            <Link
              href={footer.waitlist.href}
              className="inline-flex h-10 items-center rounded-[4px] border border-off-black px-3.5 text-base text-off-black transition-colors hover:border-off-black/75 hover:text-off-black/75"
            >
              {footer.waitlist.label}
            </Link>
          </div>
        </div>
      </section>
      <LegalRow />
    </footer>
  );
}

/** Quiet legal line on the frame line; also closes the contact and waitlist pages. */
export function LegalRow({ dark = false }: { dark?: boolean }) {
  return (
    <div className="frame-x relative mx-auto w-full max-w-[1920px]">
      <p className={`t-caption border-t py-6 ${dark ? "border-white/10 text-white/55" : "border-ink/10 text-muted"}`}>{footer.legal}</p>
    </div>
  );
}
