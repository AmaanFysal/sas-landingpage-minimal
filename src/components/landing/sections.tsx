import { airIntelligence, ecosystem, occupancy, proofOfConcept, standards } from "@/content/site";
import { Reason, Sheet } from "./layout";
import { LoopDiagram } from "./loop-diagram";
import { CornerMarks, Square } from "./marks";
import { ResetMark, WellMark } from "./seals";

const ragColour = {
  red: "bg-rag-red",
  amber: "bg-rag-amber",
  green: "bg-rag-green",
} as const;

/** Sections 01–05 share one white sheet, as on the Fin homepage. */
export function NumberedSections() {
  return (
    <Sheet>
      <Ecosystem />
      <ProofOfConcept />
      <Standards />
      <Occupancy />
      <AirIntelligence />
    </Sheet>
  );
}

/** 01 — chalk frame holding three white cards (Fin media frame + role tabs). */
function Ecosystem() {
  return (
    <Reason id="solution-ecosystem" number="01" title={ecosystem.title}>
      <div className="relative mt-10 bg-chalk p-4">
        <CornerMarks />
        <div className="grid gap-4 md:grid-cols-3">
          {ecosystem.cards.map((card, i) => (
            <article key={card.id} id={card.id} className="scroll-mt-6 bg-sheet p-6">
              <p className="t-label text-ink/60">1.{i + 1}</p>
              <h3 className="t-title-sm mt-8 flex items-center gap-3">
                <Square />
                {card.title}
              </h3>
              <p className="t-body mt-3">{card.body}</p>
              {"rag" in card && (
                <ul className="mt-6 space-y-2.5">
                  {card.rag.map((r) => (
                    <li key={r.status} className="t-caption flex items-center gap-3 text-ink/70">
                      <span aria-hidden className={`size-2.5 ${ragColour[r.status]}`} />
                      {r.label}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </Reason>
  );
}

/** 02 — warm watercolour band with frosted cards (Fin reason 03 + Apex cards). */
function ProofOfConcept() {
  return (
    <Reason id="proof-of-concept" number="02" title={proofOfConcept.title} className="bg-band-cream">
      <p className="t-body-lg mt-4 max-w-[572px]">{proofOfConcept.intro}</p>
      <div className="mt-10 grid grid-cols-10 gap-x-4">
        <div className="col-span-10 grid md:col-span-8 md:col-start-2 md:grid-cols-3">
          {proofOfConcept.stats.map((stat, i) => (
            <article
              key={stat.id}
              id={stat.id}
              className="relative flex scroll-mt-6 flex-col justify-between gap-12 bg-sheet/70 p-6 backdrop-blur-[24px] md:min-h-[316px]"
            >
              <CornerMarks className="bg-ink/20" />
              <div>
                <p className="t-label text-sky-ink">2.{i + 1}</p>
                <h3 className="t-card mt-5">{stat.title}</h3>
              </div>
              <p className="t-caption text-ink/90">{stat.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Reason>
  );
}

/** 03 — square chalk tiles with captions beneath (Fin certification row). */
function Standards() {
  const marks = [ResetMark, WellMark];
  return (
    <Reason id="standards" number="03" title={standards.title}>
      <p className="t-body-lg mt-4 max-w-[572px]">{standards.body}</p>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {standards.badges.map((badge, i) => {
          const Mark = marks[i];
          return (
            <li key={badge}>
              <figure>
                <div className="relative grid aspect-square place-items-center bg-chalk">
                  <CornerMarks />
                  <Mark className="w-[46%] text-ink/40" />
                </div>
                <figcaption className="t-label mt-3 normal-case">
                  <span className="text-ink/40">3.{i + 1}</span>&ensp;{badge}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Reason>
  );
}

/** 04 — quote panel with a highlighted phrase (Fin C-13, T-08). */
function Occupancy() {
  const [before, after] = occupancy.body.split(occupancy.highlight);
  return (
    <Reason id="occupancy" number="04" title={occupancy.title}>
      <div className="bg-quote relative mt-10 grid grid-cols-10 gap-x-4 px-6 py-10 md:px-0 md:py-12">
        <CornerMarks />
        <p className="t-label col-span-10 flex items-center gap-2.5 text-sky-ink md:col-start-2">
          <Square />
          {occupancy.eyebrow}
        </p>
        <p className="t-quote col-span-10 mt-10 md:col-span-5 md:col-start-3">
          {before}
          <mark className="mark-sky">{occupancy.highlight}</mark>
          {after}
        </p>
      </div>
    </Reason>
  );
}

/** 05 — text left, animated loop right (Fin flywheel). */
function AirIntelligence() {
  return (
    <Reason id="air-intelligence" number="05" title={airIntelligence.title} aside={<LoopDiagram />}>
      <div className="mt-4 space-y-4">
        {airIntelligence.paragraphs.map((p) => (
          <p key={p} className="t-body-lg max-w-[572px]">
            {p}
          </p>
        ))}
      </div>
      {/* Reserved for a future partner quote. */}
      <hr className="mt-12 border-ink/10 md:mt-auto" />
    </Reason>
  );
}
