import { deliver } from "@/content/site";
import { PageGrid, TABLET_MAX } from "./layout";
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
            borders). Each leads with the result (title), then the number that
            proves it and its caption, a rule, and the line explaining how (owner
            request). Columns share rows (subgrid) so numbers, rules and lines
            align across the row. Stacked, with space between, below 1280px.
          */}
          <ul className={`mt-12 grid gap-y-14 xl:grid-cols-3 xl:grid-rows-[auto_auto_auto_auto] xl:gap-y-0 ${TABLET_MAX}`}>
            {deliver.cards.map((card) => (
              <li
                key={card.title}
                className="flex flex-col xl:row-span-4 xl:grid xl:grid-rows-subgrid xl:border-l xl:border-ink/10 xl:px-8 xl:first:border-l-0 xl:first:pl-0 xl:last:pr-0"
              >
                <h3 className="t-card text-sky-ink">{card.title}</h3>
                <p className="t-stat mt-6">
                  <CountUp value={card.stat.value} />
                </p>
                <p className="t-caption mt-3 max-w-[280px] text-pretty text-muted">
                  {card.stat.caption}
                  {"note" in card.stat && <sup>{card.stat.note}</sup>}
                </p>
                <p className="t-body mt-8 border-t border-ink/10 pt-6">{card.line}</p>
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
