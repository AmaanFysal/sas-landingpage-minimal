import Image from "next/image";
import Link from "next/link";
import { header } from "@/content/site";
import { AnnouncementBar } from "./announcement-bar";
import { CtaButtons } from "./cta-buttons";
import { Square } from "./marks";

/**
 * Site header (Fin G-02): the announcement bar and nav stick to the top while
 * scrolling, like Fin's. Left: the full SAS logo (mark, name and "Biosecurity -
 * Breathe Better"; owner request). Right side: the status badge (from 1024px,
 * where it fits) and the Contact / Waitlist button pair; below 440px only the
 * primary button fits next to the full logo.
 * - The home page shows the bar and links the logo to the top; inner pages
 *   (`inner`) link it home, skip the bar and drop their own button (`current`).
 * - `dark` is Fin's dark-page variant: white logo, text and primary button.
 * - `white` gives the light variant a pure white bar (Fin's form pages).
 */
export function SiteHeader({
  dark = false,
  white = false,
  inner = false,
  current,
}: {
  dark?: boolean;
  white?: boolean;
  inner?: boolean;
  current?: "contact" | "waitlist";
}) {
  return (
    <header className={`sticky top-0 z-50 ${dark ? "bg-night" : white ? "bg-sheet" : "bg-page"}`}>
      {!inner && <AnnouncementBar />}
      <div className="frame-x mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between gap-4 md:h-[74px]">
        <Link href={inner ? "/" : "#top"} className="shrink-0">
          <Image
            src={dark ? "/brand/sas-logo-white.png" : "/brand/sas-logo.png"}
            alt={`${header.logo.lead}${header.logo.accent}`}
            width={631}
            height={144}
            loading="eager"
            className="h-8 w-auto md:h-10"
          />
        </Link>
        <div className="flex items-center gap-4">
          <p
            className={`t-label mr-2 hidden h-10 items-center gap-2.5 lg:flex ${dark ? "text-white" : "text-off-black"}`}
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
