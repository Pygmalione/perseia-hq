import { hqConfig } from '@/config/hq'

const epics = [
  {
    id: 'E1',
    title: 'Logotopia - pipeline generacji logo Visuana',
    status: 'in-progress',
    tasks: { done: 8, total: 12 },
    updated: '2026-04-08',
  },
  {
    id: 'E2',
    title: 'Perseia HQ - headquarters piękna',
    status: 'in-progress',
    tasks: { done: 18, total: 25 },
    updated: '2026-04-09',
  },
  {
    id: 'E3',
    title: 'Galeria fotografii AI Cesarza',
    status: 'planned',
    tasks: { done: 0, total: 8 },
    updated: '2026-04-05',
  },
  {
    id: 'E4',
    title: 'Design system Imperium',
    status: 'planned',
    tasks: { done: 2, total: 15 },
    updated: '2026-04-01',
  },
]

const statusLabels: Record<string, string> = {
  'in-progress': 'W toku',
  planned: 'Planowany',
  done: 'Gotowy',
}

const statusColors: Record<string, string> = {
  'in-progress': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  planned: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  done: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
}

export default function ProjectsPage() {
  const projModule = hqConfig.modules.find((m) => m.title === 'Projekty')

  return (
    <main className="grain">
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {hqConfig.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none tracking-[-0.04em] text-foreground sm:text-7xl">
            Projekty
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {projModule?.description ?? 'Specy, epiki, taski i checkpointy kreatywnych przedsięwzięć.'}
          </p>
        </div>
      </section>

      <section id="epics-grid" className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b border-border/70 pb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span>Epiki</span>
            <span>{epics.length} projektów</span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {epics.map((epic) => {
              const progress = epic.tasks.total > 0 ? Math.round((epic.tasks.done / epic.tasks.total) * 100) : 0
              return (
                <article
                  key={epic.id}
                  className="rounded-[1.75rem] border border-border/80 bg-card/80 p-6 shadow-[var(--shadow-panel)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg tracking-[-0.02em] text-foreground">
                      {epic.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${statusColors[epic.status] ?? ''}`}
                    >
                      {statusLabels[epic.status] ?? epic.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border/50">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {epic.tasks.done}/{epic.tasks.total} tasków - {progress}%
                    </p>
                  </div>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    Ostatnia aktualizacja: {epic.updated}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
