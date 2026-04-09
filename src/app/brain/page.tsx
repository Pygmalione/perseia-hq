import { BrainSearchForm } from '@/components/brain-search-form'
import { hqConfig } from '@/config/hq'
import { getBrainSummary } from '@/lib/brain-data'
import { filterBrainAssets } from '@/lib/brain-search'

export default async function BrainPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; facet?: string }>
}) {
  const brainModule = hqConfig.modules.find((m) => m.title === 'Asset brain')
  const summary = await getBrainSummary()
  const params = (await searchParams) ?? {}
  const query = params.q ?? ''
  const facet = params.facet ?? 'all'
  const filteredAssets = filterBrainAssets(summary.recentAssets, query, facet)

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
          <BrainSearchForm initialQuery={query} initialFacet={facet} />
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
            <span>{filteredAssets.length} assetów</span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[38rem] text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <th className="pb-3 font-normal">Nazwa</th>
                  <th className="pb-3 font-normal">Typ</th>
                  <th className="pb-3 font-normal">Projekt</th>
                  <th className="pb-3 font-normal">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
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

          {filteredAssets.length === 0 ? (
            <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-card/60 p-6 text-sm text-muted-foreground shadow-[var(--shadow-panel)]">
              Brak wyników dla tego filtrowania. Spróbuj innego słowa albo wróć do widoku „Wszystko”.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
