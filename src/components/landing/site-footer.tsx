import Image from "next/image";
import { footer } from "@/content/site";
import { Container } from "./layout";
import { CrosshairFrame } from "./marks";

/** Closing CTA framed by crop marks (Fin S-12), then a quiet legal row. */
export function SiteFooter() {
  const words = footer.title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words.at(-1);

  return (
    <footer>
      <section aria-labelledby="closing-title" className="relative mx-2 sm:mx-4">
        <CrosshairFrame />
        <Container className="flex flex-col items-center py-20 text-center md:py-28">
          <h2 id="closing-title" className="display text-[clamp(3.25rem,9vw,8.5rem)]">
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
          <p className="mt-10 max-w-[34rem] text-lg/relaxed text-ink/70">{footer.body}</p>
          <a
            href={footer.cta.href}
            className="mt-8 inline-flex h-11 items-center rounded-[4px] bg-ink px-5 text-[15px] text-sheet transition-colors hover:bg-sky-ink"
          >
            {footer.cta.label}
          </a>
        </Container>
      </section>
      <Container className="border-t border-hairline py-6 sm:px-8">
        <p className="text-[13px] text-ink/55">{footer.legal}</p>
      </Container>
    </footer>
  );
}
