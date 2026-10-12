"use client";

import { useState } from "react";
import { announcement } from "@/content/site";

/**
 * Thin top banner, built like fin.ai's (Fin G-01). Dismissible for the visit.
 * - From 1024px: the detailed art pieces sit at the screen edges, their sharp
 *   edges facing the text, cropped from the outside as the screen narrows.
 * - 740–1023px: the soft, blurred art in boxes up to 195px, fading out over
 *   48px towards the text, on Fin's slightly darker grey.
 * - Below 740px: the soft art across the bar and the shortened text.
 * The × is a plain white cross on the art (owner request). The art is made
 * the way Fin makes theirs: crops of the 3D render (our hero ribbon), see
 * scripts/banner-art/crop.mjs. Class names are written out in full so
 * Tailwind generates them.
 */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const arrow = (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
  // Fin's underline: a thin background line that slides away on hover.
  const underline =
    "bg-linear-to-r from-current to-current bg-[length:100%_0.06em] bg-[position:0%_100%] bg-no-repeat transition-[background-size] duration-200 ease-out group-hover:bg-[length:0%_0.06em] group-hover:bg-[position:100%_100%]";

  return (
    <div
      data-announcement
      className="relative flex items-center justify-center overflow-hidden bg-banner text-center text-[14px]/[18px] tracking-[0.031rem] text-off-black"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-banner-low lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/2 max-w-[195px] bg-[url(/art/banner-art-mobile.webp)] bg-[length:auto_100%] bg-left bg-no-repeat min-[740px]:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/2 max-w-[195px] bg-[url(/art/banner-art-mobile.webp)] bg-[length:auto_100%] bg-right bg-no-repeat min-[740px]:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[740px]:flex">
        <div className="flex-[1_1_0px]">
          <div
            className="h-full w-full max-w-[195px] bg-[url(/art/banner-art-mobile.webp)] bg-[length:auto_100%] bg-left bg-no-repeat [mask-image:linear-gradient(to_left,transparent,black_48px)] lg:max-w-[372px] lg:bg-[url(/art/banner-art-left.webp)] lg:bg-right lg:[mask-image:none]"
          />
        </div>
        {/* Invisible copy of the text: holds the gap the art sits either side of. */}
        <div className="invisible flex items-center gap-2 whitespace-nowrap px-4">
          {announcement.text}
          {arrow}
        </div>
        <div className="flex flex-[1_1_40px] justify-end">
          <div
            className="h-full w-full max-w-[195px] bg-[url(/art/banner-art-mobile.webp)] bg-[length:auto_100%] bg-right bg-no-repeat [mask-image:linear-gradient(to_right,transparent,black_48px)] lg:max-w-[469px] lg:bg-[url(/art/banner-art-right.webp)] lg:bg-left lg:[mask-image:none]"
          />
        </div>
      </div>

      <a href={announcement.href} className="group relative w-full py-2">
        <span className="flex items-center justify-center gap-2 min-[740px]:hidden">
          <span className={underline}>{announcement.shortText}</span>
          {arrow}
        </span>
        <span className="hidden items-center justify-center gap-2 whitespace-nowrap min-[740px]:flex">
          <span className={underline}>{announcement.text}</span>
          {arrow}
        </span>
      </a>
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute right-[calc(var(--frame)-8px)] top-1/2 grid size-7 -translate-y-1/2 place-items-center text-white transition-opacity hover:opacity-70"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
    </div>
  );
}
