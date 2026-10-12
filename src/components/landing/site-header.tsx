import Image from "next/image";
import Link from "next/link";
import { header } from "@/content/site";
import { AnnouncementBar } from "./announcement-bar";
import { Square } from "./marks";

/**
 * Site header (Fin G-02). The home page shows the announcement bar and links
 * the logo to the top; inner pages link it home and skip the bar, like Fin's.
 * `dark` is Fin's dark-page variant: white logo and text (official white mark).
 */
export function SiteHeader({ dark = false, inner = false }: { dark?: boolean; inner?: boolean }) {
  return (
    <header className="relative z-10">
      {!inner && <AnnouncementBar />}
      <div className="frame-x mx-auto flex w-full max-w-[1920px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 md:h-[74px] md:py-0">
        <Link href={inner ? "/" : "#top"} className="flex items-center gap-2.5">
          <Image src={dark ? "/brand/sas-mark-white.png" : "/brand/sas-mark.png"} alt="" width={249} height={233} className="h-8 w-auto" />
          <span className={`text-base font-medium tracking-[-0.01em] ${dark ? "text-white" : ""}`}>
            {header.logo.lead}
            <span className={dark ? "text-sky" : "text-sky-ink"}>{header.logo.accent}</span>
          </span>
        </Link>
        <p
          className={`t-label flex h-10 items-center gap-2.5 rounded-[4px] border px-3.5 ${
            dark ? "border-white/20 text-white" : "border-off-black/15 text-off-black"
          }`}
        >
          <Square className="bg-rag-green" />
          {header.badge}
        </p>
      </div>
    </header>
  );
}
