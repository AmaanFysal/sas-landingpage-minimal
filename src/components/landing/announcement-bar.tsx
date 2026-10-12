"use client";

import { useState } from "react";
import { announcement } from "@/content/site";

/** Thin top banner (Fin G-01). Dismissible for the current visit. */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="bg-marble relative flex min-h-[34px] items-center justify-center px-10 py-1.5 text-center text-xs/snug text-off-black sm:text-sm/5">
      <a href={announcement.href} className="group inline-flex min-w-0 items-center gap-2">
        <span className="underline decoration-ink/30 underline-offset-[3px] group-hover:decoration-ink">
          {announcement.text}
        </span>
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute right-2 grid size-7 place-items-center rounded-[4px] hover:bg-ink/5"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
    </div>
  );
}
