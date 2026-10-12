import { ecosystem, occupancy, proofOfConcept, standards } from "@/content/site";
import { Container, Indented, SectionHead, Sheet, TwoTone } from "./layout";
import { CornerMarks, Square } from "./marks";
import { ResetMark, WellMark } from "./seals";

const ragColour = {
  red: "bg-rag-red",
  amber: "bg-rag-amber",
  green: "bg-rag-green",
} as const;

/** 01 — three feature columns separated by hairlines (Fin C-01). */
export function Ecosystem() {
  return (
    <Sheet id="solution-ecosystem" labelledBy="ecosystem-title">
      <SectionHead number="01" id="ecosystem-title">
        {ecosystem.title}
      </SectionHead>
      <Indented className="mt-12 grid border-t border-hairline md:mt-16 md:grid-cols-3">
        {ecosystem.cards.map((card, i) => (
          <article
            key={card.id}
            id={card.id}
            className="scroll-mt-6 border-b border-hairline py-8 last:border-b-0 md:border-b-0 md:py-10 md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8"
          >
            <p className="label-mono text-ink/40">1.{i + 1}</p>
            <h3 className="mt-8 flex items-center gap-3 text-xl font-medium tracking-[-0.015em]">
              <Square />
              {card.title}
            </h3>
            <p className="mt-4 text-[15px]/relaxed text-ink/65">{card.body}</p>
            {"rag" in card && (
              <ul className="mt-6 space-y-2.5">
                {card.rag.map((r) => (
                  <li key={r.status} className="flex items-center gap-3 text-[13px] text-ink/75">
                    <span aria-hidden className={`size-2.5 ${ragColour[r.status]}`} />
                    {r.label}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </Indented>
    </Sheet>
  );
}

/** 02 — tinted band with three framed cards (Fin S-03 + C-06). */
export function ProofOfConcept() {
  return (
    <section
      id="proof-of-concept"
      aria-labelledby="poc-title"
      className="bg-band mx-2 mt-2 scroll-mt-6 py-16 sm:mx-4 sm:mt-4 md:py-24"
    >
      <Container>
        <SectionHead number="02" id="poc-title">
          <TwoTone text={proofOfConcept.title} />
        </SectionHead>
        <Indented>
          <p className="mt-8 max-w-[38rem] text-lg/relaxed text-ink/75">{proofOfConcept.intro}</p>
          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {proofOfConcept.stats.map((stat, i) => (
              <article
                key={stat.id}
                id={stat.id}
                className="relative flex scroll-mt-6 flex-col justify-between gap-12 border border-hairline bg-sheet/75 p-6 md:min-h-[17rem]"
              >
                <CornerMarks />
                <div>
                  <p className="label-mono text-ink/40">2.{i + 1}</p>
                  <h3 className="label-mono mt-5 text-xs text-sky-ink">{stat.title}</h3>
                </div>
                <p className="text-[15px]/relaxed text-ink/80">{stat.body}</p>
              </article>
            ))}
          </div>
        </Indented>
      </Container>
    </section>
  );
}

/** 03 — square certification tiles with mono captions (Fin C-07). */
export function Standards() {
  const marks = [ResetMark, WellMark];
  return (
    <div className="mt-2 sm:mt-4">
      <Sheet id="standards" labelledBy="standards-title">
        <SectionHead number="03" id="standards-title">
          {standards.title}
        </SectionHead>
        <Indented className="mt-8 grid gap-12 md:mt-10 lg:grid-cols-2 lg:gap-16">
          <p className="max-w-[30rem] text-lg/relaxed text-ink/75">{standards.body}</p>
          <ul className="grid max-w-[30rem] grid-cols-2 gap-4 lg:ml-auto lg:w-full">
            {standards.badges.map((badge, i) => {
              const Mark = marks[i];
              return (
                <li key={badge}>
                  <figure>
                    <div className="relative grid aspect-square place-items-center bg-chalk">
                      <CornerMarks className="bg-ink/25" />
                      <Mark className="w-[46%] text-ink/45" />
                    </div>
                    <figcaption className="label-mono mt-3 normal-case text-ink/75">
                      <span className="text-ink/40">3.{i + 1}</span>&ensp;{badge}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </Indented>
      </Sheet>
    </div>
  );
}

/** 04 — quote-style callout with corner squares and a highlighted phrase (Fin C-13, T-08). */
export function Occupancy() {
  const [before, after] = occupancy.body.split(occupancy.highlight);
  return (
    <section id="occupancy" aria-labelledby="occupancy-title" className="mx-2 py-10 sm:mx-4 md:py-16">
      <Container>
        <div className="relative py-12 md:py-16">
          <CornerMarks />
          <SectionHead number="04" id="occupancy-title">
            <TwoTone text={occupancy.title} />
          </SectionHead>
          <Indented className="mt-8 md:mt-10">
            <p className="label-mono flex items-center gap-2.5 text-sky-ink">
              <Square />
              {occupancy.eyebrow}
            </p>
            <p className="mt-6 max-w-[54rem] text-[clamp(1.375rem,2.4vw,2rem)]/[1.3] tracking-[-0.015em]">
              {before}
              <mark className="mark-sky">{occupancy.highlight}</mark>
              {after}
            </p>
          </Indented>
        </div>
      </Container>
    </section>
  );
}
