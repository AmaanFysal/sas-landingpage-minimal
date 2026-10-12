import type { ReactNode } from "react";
import { RollingNumber } from "./rolling-number";

// Fin homepage grid: 16px page inset, 12 columns, 16px gutters. Content sits
// in columns 2–11; section numbers, the logo and the footer start on the
// frame line (middle of column 1); see --frame in globals.css.

/**
 * Stacked blocks (card rows, stats, asides) keep this fixed width below 1280px
 * instead of stretching across a tablet, the way fin.ai holds its columns at a
 * fixed width. Phones are narrower than this, so it only applies on tablets.
 */
export const TABLET_MAX = "max-w-[720px] xl:max-w-none";

/** Page-width 12-column grid with the 16px page inset. */
export function PageGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto grid w-full max-w-[1920px] grid-cols-12 gap-x-4 px-4 ${className}`}>{children}</div>
  );
}

/** The single white sheet that holds every numbered section (Fin "22 reasons"). */
export function Sheet({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1888px] bg-sheet pt-8 md:w-[calc(100%-2rem)]">{children}</div>;
}

/**
 * One numbered section inside the sheet (Fin reason block). With `aside`, the
 * title and children take the left five columns and the aside the right five,
 * as in Fin's flywheel section, from 1280px (stacked below). `background` is an art layer drawn behind
 * the content (section 05's dark-band glow); give it a negative z-index and
 * the section `isolate`, so the content and the hung number stay put.
 */
export function Reason({
  id,
  number,
  title,
  className = "",
  children,
  aside,
  background,
}: {
  id: string;
  number: string;
  title: ReactNode;
  className?: string;
  children: ReactNode;
  aside?: ReactNode;
  background?: ReactNode;
}) {
  const titleId = `${id}-title`;
  const heading = (
    <h2 id={titleId} className="t-callout max-w-[552px]">
      <span aria-hidden className="mb-2 block md:num-hang md:mb-0">
        <RollingNumber value={number} />
      </span>
      {title}
    </h2>
  );
  return (
    <section id={id} aria-labelledby={titleId} className={`relative scroll-mt-6 grid grid-cols-12 gap-x-4 px-4 py-16 md:px-0 ${className}`}>
      {background}
      <div className="col-span-12 md:col-span-10 md:col-start-2">
        {aside ? (
          // Side by side (five columns each) from 1280px, the site's one layout mark.
          // Below it the aside stacks under the text at a fixed width (TABLET_MAX).
          <div className="grid gap-y-10 xl:grid-cols-10 xl:gap-x-4">
            <div className="flex flex-col xl:col-span-5">
              {heading}
              {children}
            </div>
            <div className={`${TABLET_MAX} xl:col-span-5 xl:col-start-6`}>{aside}</div>
          </div>
        ) : (
          <>
            {heading}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
