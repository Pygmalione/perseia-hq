'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const facets = ['all', 'image', 'video', 'pdf', 'feedback', 'logotopia'] as const

type Facet = (typeof facets)[number]

type Props = {
  initialQuery: string
  initialFacet: string
}

const facetLabels: Record<Facet, string> = {
  all: 'Wszystko',
  image: 'Obrazy',
  video: 'Wideo',
  pdf: 'PDF',
  feedback: 'Feedback',
  logotopia: 'Logotopia',
}

export function BrainSearchForm({ initialQuery, initialFacet }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)

  const activeFacet = useMemo<Facet>(() => {
    return facets.includes(initialFacet as Facet) ? (initialFacet as Facet) : 'all'
  }, [initialFacet])

  function updateParams(nextQuery: string, nextFacet: Facet) {
    const params = new URLSearchParams(searchParams.toString())

    if (nextQuery.trim()) {
      params.set('q', nextQuery.trim())
    } else {
      params.delete('q')
    }

    if (nextFacet !== 'all') {
      params.set('facet', nextFacet)
    } else {
      params.delete('facet')
    }

    const search = params.toString()
    router.push(search ? `${pathname}?${search}` : pathname)
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateParams(query, activeFacet)
  }

  return (
    <div className="rounded-[2rem] border border-border/80 bg-card/75 p-7 shadow-[var(--shadow-panel)] sm:p-10">
      <form onSubmit={submit}>
        <input
          aria-label="Search assets"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj po nazwie, tagu, projekcie lub typie"
          className="min-h-14 w-full rounded-xl border border-border/80 bg-background px-5 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
        />
      </form>
      <div className="mt-5 flex flex-wrap gap-3">
        {facets.map((facet) => {
          const active = facet === activeFacet
          return (
            <button
              key={facet}
              type="button"
              onClick={() => updateParams(query, facet)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm shadow-[var(--shadow-panel)] transition ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border/80 bg-background/70 text-foreground'
              }`}
            >
              {facetLabels[facet]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
