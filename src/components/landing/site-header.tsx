import Image from "next/image";
import { header } from "@/content/site";
import { AnnouncementBar } from "./announcement-bar";
import { Square } from "./marks";

export function SiteHeader() {
  return (
    <header>
      <AnnouncementBar />
      <div className="frame-x mx-auto flex w-full max-w-[1920px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 md:h-[74px] md:py-0">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/brand/sas-mark.png" alt="" width={249} height={233} className="h-8 w-auto" />
          <span className="text-base font-medium tracking-[-0.01em]">
            {header.logo.lead}
            <span className="text-sky-ink">{header.logo.accent}</span>
          </span>
        </a>
        <p className="t-label flex h-10 items-center gap-2.5 rounded-[4px] border border-off-black/15 px-3.5 text-off-black">
          <Square className="bg-rag-green" />
          {header.badge}
        </p>
      </div>
    </header>
  );
}
