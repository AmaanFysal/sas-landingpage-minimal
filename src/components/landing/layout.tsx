import type { ReactNode } from "react";

/** Page-width wrapper shared by every section so columns line up. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1408px] px-4 ${className}`}>{children}</div>;
}

/** White sheet inset from the page edges (Fin S-01). */
export function Sheet({ id, children, labelledBy }: { id: string; children: ReactNode; labelledBy: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="mx-2 bg-sheet py-16 sm:mx-4 md:py-24">
      <Container>{children}</Container>
    </section>
  );
}

/** Splits "Lead: rest" so the lead can be set in grey (Fin two-tone, T-01). */
export function TwoTone({ text }: { text: string }) {
  const i = text.indexOf(":");
  if (i === -1) return <>{text}</>;
  return (
    <>
      <span className="text-ink/40">{text.slice(0, i + 1)}</span> {text.slice(i + 2)}
    </>
  );
}

/** Serif section number + title on Fin's 12-column grid (T-03). */
export function SectionHead({ number, id, children }: { number: string; id: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-4">
      <span aria-hidden className="display col-span-12 text-[1.75rem] text-ink/45 md:col-span-1 md:pt-2">
        {number}
      </span>
      <h2 id={id} className="display col-span-12 text-balance text-[clamp(2.25rem,4.4vw,3.75rem)] md:col-span-10">
        {children}
      </h2>
    </div>
  );
}

/** Content column that starts after the number column. */
export function Indented({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`md:ml-[calc((100%-11*1.5rem)/12+1.5rem)] ${className}`}>{children}</div>;
}
