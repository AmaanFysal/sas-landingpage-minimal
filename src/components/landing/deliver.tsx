import { deliver } from "@/content/site";
import { PageGrid } from "./layout";
import { CountUp } from "./count-up";
import { Square } from "./marks";

/** Un-numbered band between the hero and 01: three outcome stats and their footnotes. */
export function Deliver() {
  return (
    <section id="what-we-deliver" aria-labelledby="deliver-title" className="py-16 md:py-24">
      <PageGrid>
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <p className="t-label flex items-center gap-2.5 text-sky-ink">
            <Square />
            {deliver.label}
          </p>
          <h2 id="deliver-title" className="t-callout mt-6 max-w-[552px] text-balance">
            {deliver.title}
          </h2>
          <p className="t-body-lg mt-4 max-w-[572px]">{deliver.subline}</p>

          {/*
            Fin's stat blocks: three columns split by thin vertical lines (no card
            borders). Columns share rows (subgrid) so captions, rules and titles
            line up across the row. Stacked, with space between, below 1024px.
          */}
          <ul className="mt-12 grid gap-y-14 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto] lg:gap-y-0">
            {deliver.cards.map((card) => (
              <li
                key={card.title}
                className="flex flex-col lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:border-l lg:border-ink/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="t-stat">
                  <CountUp value={card.stat.value} />
                </p>
                <p className="t-caption mt-3 max-w-[280px] text-pretty text-muted">
                  {card.stat.caption}
                  {"note" in card.stat && <sup>{card.stat.note}</sup>}
                </p>
                <h3 className="t-card mt-8 border-t border-ink/10 pt-6 text-sky-ink">{card.title}</h3>
                <p className="t-body mt-4">{card.line}</p>
              </li>
            ))}
          </ul>

          <div className="t-caption mt-12 space-y-1 text-muted">
            {deliver.footnotes.map((note, i) => (
              <p key={note}>
                <sup>{i + 1}</sup> {note}
              </p>
            ))}
          </div>
        </div>
      </PageGrid>

    </section>
  );
}
