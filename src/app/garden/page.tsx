import { hqConfig } from '@/config/hq'

const knowledgeEntries = [
  {
    id: 'pref-warm-tones',
    kind: 'preference' as const,
    title: 'Ciepłe tony dominujące',
    scope: 'global',
    description: 'Cesarz preferuje ciepłą paletę: złoto, bursztyn, miedź. Zimne błękity tylko jako akcent kontrastowy.',
    source: 'Feedback z sesji Logotopii 2026-04',
  },
  {
    id: 'pref-no-ornament',
    kind: 'preference' as const,
    title: 'Minimalizm bez ornamentów',
    scope: 'brand',
    description: 'Logo i znaki graficzne muszą być czyste geometrycznie. Zero herbów, tarcz, wstęg ani filigranów.',
    source: 'Dekret Cesarza 2026-03',
  },
  {
    id: 'pref-sentence-case',
    kind: 'rule' as const,
    title: 'Sentence case obowiązkowy',
    scope: 'global',
    description: 'Wszystkie nagłówki i etykiety w sentence case. Wielka litera tylko na początku zdania i w nazwach własnych.',
    source: 'SOUL.md',
  },
  {
    id: 'rel-karol',
    kind: 'person' as const,
    title: 'Karol Dębkowski (Cesarz)',
    scope: 'person',
    description: 'Właściciel Visuana, decydent końcowy. Ton: ciepły, konkretny, zero korpo-gadki. ADHD-friendly: krótkie akapity, pogrubienia, max 3 action items.',
    source: 'USER.md',
  },
  {
    id: 'rel-jadzia',
    kind: 'person' as const,
    title: 'Jadzia Kim',
    scope: 'person',
    description: 'Content creator ~500k followers. Potrzebuje jasnego kontekstu, nadwrażliwość sensoryczna. Profesjonalny partnership aktywny.',
    source: 'USER.md',
  },
]

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

export default function GardenPage() {
  const gardenModule = hqConfig.modules.find((m) => m.title === 'Ogród wiedzy')

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
            <span>{knowledgeEntries.length} wpisów</span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {knowledgeEntries.map((entry) => (
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
