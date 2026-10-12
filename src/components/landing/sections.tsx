import Image from "next/image";
import { airIntelligence, ecosystem, occupancy, proofOfConcept, standards } from "@/content/site";
import { WithAiName } from "./ai-name";
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
                  {card.rag.map((r, n) => (
                    <li key={r.status} className="t-caption flex items-center gap-3 text-ink/70">
                      {/* Blinks like a status LED, one after another (owner request). */}
                      <span
                        aria-hidden
                        className={`rag-blink size-2.5 ${ragColour[r.status]}`}
                        style={{ animationDelay: `${n * 600}ms` }}
                      />
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

/** 02 — soft sky band with frosted cards (Fin reason 03 + Apex cards). */
function ProofOfConcept() {
  return (
    <Reason id="proof-of-concept" number="02" title={proofOfConcept.title} className="bg-band-sky">
      <p className="t-body-lg mt-4 max-w-[572px]">{proofOfConcept.intro}</p>
      <div className="mt-10 grid grid-cols-10 gap-x-4">
        <div className="col-span-10 grid gap-4 lg:col-span-8 lg:col-start-2 lg:grid-cols-3 lg:gap-0">
          {proofOfConcept.stats.map((stat, i) => (
            <article
              key={stat.id}
              id={stat.id}
              className="relative flex scroll-mt-6 flex-col justify-between gap-12 bg-sheet/70 p-6 backdrop-blur-[24px] lg:min-h-[316px]"
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

/** 03 — text left, square chalk tiles right (Fin certification tiles, flywheel layout). */
function Standards() {
  const marks = [ResetMark, WellMark];
  const tiles = (
    <ul className="grid grid-cols-2 gap-4">
      {standards.badges.map((badge, i) => {
        const Mark = marks[i];
        return (
          <li key={badge}>
            <figure>
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-chalk">
                <CornerMarks />
                <Mark className="size-full" />
              </div>
              <figcaption className="t-label mt-4 normal-case">
                <span className="text-ink/40">3.{i + 1}</span>&ensp;{badge}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
  return (
    <Reason id="standards" number="03" title={standards.title} aside={tiles}>
      <p className="t-body-lg mt-4 max-w-[572px]">{standards.body}</p>
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

/** 05 — deeper sky band, text left, animated loop right (Fin flywheel). */
function AirIntelligence() {
  // Fin's dark two-tone title (T-01): the first sentence at 60% white, the payoff in full white.
  const [lead, ...rest] = airIntelligence.title.split(". ");
  return (
    <Reason
      id="air-intelligence"
      number="05"
      title={
        rest.length ? (
          <>
            <span className="text-white/60">{lead}.</span> <WithAiName text={rest.join(". ")} />
          </>
        ) : (
          <WithAiName text={airIntelligence.title} />
        )
      }
      className="band-dark isolate overflow-hidden"
      background={
        // Glow rising from the bottom, blurred from our own hero render (scripts/banner-art/glow.mjs).
        <Image
          src="/art/band-glow.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-10 select-none object-cover object-bottom"
        />
      }
      aside={<LoopDiagram />}
      // Diagram under the text on phones and tablets (owner request), beside it
      // from 1280px, where the hero also moves its render beside the text.
      asideFrom="xl"
    >
      <div className="mt-4 space-y-4">
        {airIntelligence.paragraphs.map((p) => (
          <p key={p} className="t-body-lg max-w-[572px]">
            {p}
          </p>
        ))}
      </div>
      {/* Reserved for a future partner quote. */}
      <hr className="mt-12 border-white/15 xl:mt-auto" />
    </Reason>
  );
}
