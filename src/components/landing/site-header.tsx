import Image from "next/image";
import { header } from "@/content/site";
import { AnnouncementBar } from "./announcement-bar";
import { Container } from "./layout";
import { Square } from "./marks";

export function SiteHeader() {
  return (
    <header>
      <AnnouncementBar />
      <Container className="flex flex-wrap sm:px-8 items-center justify-between gap-x-6 gap-y-3 py-4 md:h-[72px] md:py-0">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/brand/sas-mark.png" alt="" width={249} height={233} className="h-8 w-auto" />
          <span className="text-[17px] font-medium tracking-[-0.01em]">
            {header.logo.lead}
            <span className="text-sky-ink">{header.logo.accent}</span>
          </span>
        </a>
        <p className="label-mono flex h-9 items-center gap-2.5 rounded-[4px] border border-hairline px-3 text-ink/75">
          <Square className="bg-rag-green" />
          {header.badge}
        </p>
      </Container>
    </header>
  );
}
