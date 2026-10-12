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
  return <div className="mx-auto w-full max-w-[1888px] bg-sheet py-8 md:w-[calc(100%-2rem)]">{children}</div>;
}

/**
 * One numbered section inside the sheet (Fin reason block). With `aside`, the
 * title and children take the left five columns and the aside the right five,
 * as in Fin's flywheel section.
 */
export function Reason({
  id,
  number,
  title,
  className = "",
  children,
  aside,
}: {
  id: string;
  number: string;
  title: ReactNode;
  className?: string;
  children: ReactNode;
  aside?: ReactNode;
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
      <div className="col-span-12 md:col-span-10 md:col-start-2">
        {aside ? (
          <div className="grid gap-y-10 md:grid-cols-10 md:gap-x-4">
            <div className="flex flex-col md:col-span-5">
              {heading}
              {children}
            </div>
            <div className="md:col-span-5 md:col-start-6">{aside}</div>
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
