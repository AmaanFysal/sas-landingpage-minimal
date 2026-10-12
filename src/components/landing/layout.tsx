import type { ReactNode } from "react";
import { RollingNumber } from "./rolling-number";

// Fin homepage grid: 16px page inset, 12 columns, 16px gutters. Content sits
// in columns 2–11; section numbers, the logo and the footer start on the
// frame line (middle of column 1); see --frame in globals.css.

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

// Text and aside side by side (five columns each), from md or from xl.
const split = {
  md: { grid: "md:grid-cols-10 md:gap-x-4", text: "md:col-span-5", aside: "md:col-span-5 md:col-start-6" },
  xl: { grid: "xl:grid-cols-10 xl:gap-x-4", text: "xl:col-span-5", aside: "xl:col-span-5 xl:col-start-6" },
} as const;

/**
 * One numbered section inside the sheet (Fin reason block). With `aside`, the
 * title and children take the left five columns and the aside the right five,
 * as in Fin's flywheel section. `background` is an art layer drawn behind
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
  asideFrom = "md",
  background,
}: {
  id: string;
  number: string;
  title: ReactNode;
  className?: string;
  children: ReactNode;
  aside?: ReactNode;
  /** Width from which the aside sits beside the text; below it, it drops under the text. */
  asideFrom?: "md" | "xl";
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
          <div className={`grid gap-y-10 ${split[asideFrom].grid}`}>
            <div className={`flex flex-col ${split[asideFrom].text}`}>
              {heading}
              {children}
            </div>
            <div className={split[asideFrom].aside}>{aside}</div>
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
