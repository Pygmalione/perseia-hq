import { hqConfig } from '@/config/hq'
import { getBrainSummary } from '@/lib/brain-data'

export default async function BrainPage() {
  const brainModule = hqConfig.modules.find((m) => m.title === 'Asset brain')
  const summary = await getBrainSummary()

  return (
    <main className="grain">
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {hqConfig.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none tracking-[-0.04em] text-foreground sm:text-7xl">
            Asset Brain
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {brainModule?.description ?? 'Wyszukiwarka każdego obrazu, wideo i dokumentu.'}
          </p>
        </div>
      </section>

      <section id="brain-search" className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-border/80 bg-card/75 p-7 shadow-[var(--shadow-panel)] sm:p-10">
            <input
              aria-label="Search assets"
              placeholder="Szukaj po nazwie, tagu, projekcie lub typie"
              className="min-h-14 w-full rounded-xl border border-border/80 bg-background px-5 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              {['Obrazy', 'Wideo', 'PDF', 'Feedback', 'Logotopia'].map((facet) => (
                <span
                  key={facet}
                  className="rounded-full border border-border/80 bg-background/70 px-4 py-2 text-sm text-foreground shadow-[var(--shadow-panel)]"
                >
                  {facet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="brain-stats" className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summary.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[1.75rem] border border-border/80 bg-card/80 p-6 shadow-[var(--shadow-panel)]"
              >
                <p className="font-display text-4xl tracking-[-0.04em] text-foreground">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brain-recent" className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b border-border/70 pb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span>Ostatnio dodane</span>
            <span>{summary.recentAssets.length} assetów</span>
          </div>

          <div className="mt-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <th className="pb-3 font-normal">Nazwa</th>
                  <th className="pb-3 font-normal">Typ</th>
                  <th className="pb-3 font-normal">Projekt</th>
                  <th className="pb-3 font-normal">Data</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentAssets.map((asset) => (
                  <tr key={`${asset.title}-${asset.date}`} className="border-b border-border/30">
                    <td className="py-3 text-foreground">{asset.title}</td>
                    <td className="py-3 text-muted-foreground">{asset.kind}</td>
                    <td className="py-3 text-muted-foreground">{asset.project}</td>
                    <td className="py-3 text-muted-foreground">{asset.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
