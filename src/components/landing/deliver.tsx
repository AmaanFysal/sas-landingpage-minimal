import { deliver } from "@/content/site";
import { PageGrid } from "./layout";
import { CornerMarks, Square } from "./marks";

/** Un-numbered band between the hero and 01: three outcomes and a footnote. */
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

          {/* Cards share rows (subgrid) so titles, lines and fact rules align across the row. */}
          <ul className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_1fr_auto] md:gap-y-0">
            {deliver.cards.map((card) => (
              <li key={card.title} className="relative flex flex-col bg-sheet p-6 md:row-span-3 md:grid md:grid-rows-subgrid">
                <CornerMarks />
                <h3 className="t-card text-sky-ink">{card.title}</h3>
                <p className="t-body mt-4 md:pb-16">{card.line}</p>
                <p className="t-caption mt-8 border-t border-ink/10 pt-4 text-muted md:mt-0">{card.fact}</p>
              </li>
            ))}
          </ul>

          <p className="t-caption mt-6 text-muted">{deliver.footnote}</p>
        </div>
      </PageGrid>

    </section>
  );
}
