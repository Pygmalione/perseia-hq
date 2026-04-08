import { hqConfig } from '@/config/hq'
import { getGardenSummary } from '@/lib/garden-data'

const kindLabels: Record<string, string> = {
  preference: 'Preferencja',
  rule: 'Reguła',
  person: 'Osoba',
}

const kindColors: Record<string, string> = {
  preference: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  rule: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  person: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
}

export default async function GardenPage() {
  const gardenModule = hqConfig.modules.find((m) => m.title === 'Ogród wiedzy')
  const summary = await getGardenSummary()

  return (
    <main className="grain">
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {hqConfig.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none tracking-[-0.04em] text-foreground sm:text-7xl">
            Ogród wiedzy
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {gardenModule?.description ?? 'Preferencje, historia gustu, relacje i ton komunikacji.'}
          </p>
        </div>
      </section>

      <section id="knowledge-grid" className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b border-border/70 pb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span>Aktywne wpisy</span>
            <span>{summary.totalEntries} wpisów</span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {summary.entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-[1.75rem] border border-border/80 bg-card/80 p-6 shadow-[var(--shadow-panel)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg tracking-[-0.02em] text-foreground">
                    {entry.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${kindColors[entry.kind] ?? ''}`}
                  >
                    {kindLabels[entry.kind] ?? entry.kind}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {entry.description}
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  Źródło: {entry.source}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
