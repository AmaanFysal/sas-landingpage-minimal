import {
  ecosystem,
  footer,
  header,
  hero,
  occupancy,
  proofOfConcept,
  standards,
} from "@/content/site";

const ragColour = {
  red: "bg-rag-red",
  amber: "bg-rag-amber",
  green: "bg-rag-green",
} as const;

// Unstyled content skeleton: every section from src/content/site.ts in source
// order. Replace with the real design; keep the order and the words.
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <header className="flex items-center justify-between py-6">
        <span className="font-semibold">
          {header.logo.lead}
          <span className="text-accent">{header.logo.accent}</span>
        </span>
        <span className="text-sm text-muted">{header.badge}</span>
      </header>

      <main className="flex flex-col gap-24 py-16">
        <section>
          <h1 className="text-4xl font-semibold tracking-tight">
            {hero.headingLines[0]}
            <br />
            {hero.headingLines[1]}
          </h1>
          <p className="mt-4 max-w-2xl text-muted">{hero.subheading}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {hero.taglines.map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">{ecosystem.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ecosystem.cards.map((card) => (
              <article key={card.id} className="rounded-xl border border-border p-6">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.body}</p>
                {"rag" in card && (
                  <ul className="mt-4 flex flex-col gap-1 text-sm">
                    {card.rag.map((r) => (
                      <li key={r.status} className="flex items-center gap-2">
                        <span className={`size-3 rounded-full ${ragColour[r.status]}`} />
                        {r.label}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">{proofOfConcept.title}</h2>
          <p className="mt-4 max-w-2xl text-muted">{proofOfConcept.intro}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {proofOfConcept.stats.map((s) => (
              <div key={s.title}>
                <h4 className="text-sm font-medium uppercase tracking-wide text-accent">
                  {s.title}
                </h4>
                <p className="mt-2 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">{standards.title}</h2>
          <p className="mt-4 max-w-2xl text-muted">{standards.body}</p>
          <ul className="mt-6 flex gap-3">
            {standards.badges.map((b) => (
              <li key={b} className="rounded-md border border-foreground px-4 py-2 text-sm font-semibold">
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold">{occupancy.title}</h3>
          <p className="mt-2 text-sm font-medium text-accent">{occupancy.eyebrow}</p>
          <p className="mt-2 max-w-2xl text-muted">{occupancy.body}</p>
        </section>
      </main>

      <footer className="border-t border-border py-16">
        <h2 className="text-xl font-semibold">{footer.title}</h2>
        <p className="mt-2 max-w-2xl text-muted">{footer.body}</p>
        <a
          href={footer.cta.href}
          className="mt-6 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          {footer.cta.label}
        </a>
        <p className="mt-12 text-xs text-muted">{footer.legal}</p>
      </footer>
    </div>
  );
}
