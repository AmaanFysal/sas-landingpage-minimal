import Image from "next/image";
import { footer } from "@/content/site";
import { CrosshairFrame } from "./marks";

/** Closing block framed by crop marks (Fin S-12), then a quiet legal row. */
export function SiteFooter() {
  const words = footer.title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words.at(-1);

  return (
    <footer className="mt-4">
      <section aria-labelledby="closing-title" className="relative mx-4">
        <CrosshairFrame />
        <div className="flex flex-col items-center px-4 py-20 text-center md:py-28">
          <h2 id="closing-title" className="t-display">
            <span className="block">{lead}</span>{" "}
            <Image
              src="/art/air-ribbon-close.webp"
              alt=""
              width={1503}
              height={1010}
              sizes="(min-width: 768px) 360px, 60vw"
              className="pointer-events-none mx-auto my-[-0.18em] w-[min(60vw,360px)] select-none"
            />
            <span className="block">{last}</span>
          </h2>
          <p className="t-body-lg mt-10 max-w-[572px]">{footer.body}</p>
          <a
            href={footer.cta.href}
            className="mt-8 inline-flex h-10 items-center rounded-[4px] bg-off-black px-3.5 text-base text-sheet transition-colors hover:bg-sky-ink"
          >
            {footer.cta.label}
          </a>
        </div>
      </section>
      <div className="frame-x mx-auto w-full max-w-[1920px]">
        <p className="t-caption border-t border-ink/10 py-6 text-muted">{footer.legal}</p>
      </div>
    </footer>
  );
}
