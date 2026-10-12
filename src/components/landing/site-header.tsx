import Image from "next/image";
import Link from "next/link";
import { header } from "@/content/site";
import { AnnouncementBar } from "./announcement-bar";
import { CtaButtons } from "./cta-buttons";
import { Square } from "./marks";

/**
 * Site header (Fin G-02): the announcement bar and nav stick to the top while
 * scrolling, like Fin's. Right side: the status badge (from 1024px, where it
 * fits) and the Contact / Waitlist button pair. On phones the wordmark folds
 * to the mark so both buttons fit.
 * - The home page shows the bar and links the logo to the top; inner pages
 *   (`inner`) link it home, skip the bar and drop their own button (`current`).
 * - `dark` is Fin's dark-page variant: white logo, text and primary button.
 */
export function SiteHeader({
  dark = false,
  inner = false,
  current,
}: {
  dark?: boolean;
  inner?: boolean;
  current?: "contact" | "waitlist";
}) {
  return (
    <header className={`sticky top-0 z-50 ${dark ? "bg-night" : "bg-page"}`}>
      {!inner && <AnnouncementBar />}
      <div className="frame-x mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between gap-4 md:h-[74px]">
        <Link href={inner ? "/" : "#top"} aria-label={`${header.logo.lead}${header.logo.accent}`} className="flex shrink-0 items-center gap-2.5">
          <Image src={dark ? "/brand/sas-mark-white.png" : "/brand/sas-mark.png"} alt="" width={249} height={233} className="h-8 w-auto" />
          <span className={`hidden text-base font-medium tracking-[-0.01em] sm:inline ${dark ? "text-white" : ""}`}>
            {header.logo.lead}
            <span className={dark ? "text-sky" : "text-sky-ink"}>{header.logo.accent}</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <p
            className={`t-label hidden h-10 items-center gap-2.5 rounded-[4px] border px-3.5 lg:flex ${
              dark ? "border-white/20 text-white" : "border-off-black/15 text-off-black"
            }`}
          >
            <Square className="bg-rag-green" />
            {header.badge}
          </p>
          <CtaButtons nav dark={dark} hide={current} />
        </div>
      </div>
    </header>
  );
}
