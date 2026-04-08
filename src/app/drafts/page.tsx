import { hqConfig } from '@/config/hq'

const draftPresets = [
  { id: 'p1', label: 'Karol - ciepły, konkretny', person: 'Karol Dębkowski' },
  { id: 'p2', label: 'Jadzia - jasny kontekst', person: 'Jadzia Kim' },
  { id: 'p3', label: 'Klient - premium, profesjonalny', person: 'Klient zewnętrzny' },
]

export default function DraftsPage() {
  const draftsModule = hqConfig.modules.find((m) => m.title === 'Draft studio')

  return (
    <main className="grain">
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {hqConfig.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none tracking-[-0.04em] text-foreground sm:text-7xl">
            Draft Studio
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {draftsModule?.description ?? 'Perfekcyjne drafty odpowiedzi dopasowane do osoby i kontekstu.'}
          </p>
        </div>
      </section>

      <section id="draft-composer" className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/80 bg-card/75 p-7 shadow-[var(--shadow-panel)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <h2 className="font-display text-3xl tracking-[-0.035em] text-foreground">
                Nowy draft
              </h2>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Preset osoby
                </label>
                <div className="flex flex-wrap gap-3">
                  {draftPresets.map((preset) => (
                    <span
                      key={preset.id}
                      className="rounded-full border border-border/80 bg-background/70 px-4 py-2 text-sm text-foreground shadow-[var(--shadow-panel)]"
                    >
                      {preset.label}
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                aria-label="Draft input"
                placeholder="Wpisz brief lub kontekst odpowiedzi"
                className="min-h-40 w-full resize-none rounded-xl border border-border/80 bg-background px-4 py-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
              />
              <div className="flex gap-3">
                <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-panel)]">
                  Generuj draft
                </button>
                <button className="rounded-full border border-border/80 bg-background/70 px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-panel)]">
                  Zapisz jako notatk&#281;
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-3xl tracking-[-0.035em] text-foreground">
                Podgląd
              </h2>
              <div className="min-h-60 rounded-[1.5rem] border border-border/80 bg-background/80 p-6 shadow-[var(--shadow-panel)]">
                <p className="text-sm leading-7 text-muted-foreground/60 italic">
                  Tu pojawi się wygenerowany draft...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
