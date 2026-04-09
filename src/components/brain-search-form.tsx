'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const facets = ['all', 'image', 'video', 'pdf', 'feedback', 'logotopia'] as const

type Facet = (typeof facets)[number]

type Props = {
  initialQuery: string
  initialFacet: string
  suggestions?: string[]
}

const facetLabels: Record<Facet, string> = {
  all: 'Wszystko',
  image: 'Obrazy',
  video: 'Wideo',
  pdf: 'PDF',
  feedback: 'Feedback',
  logotopia: 'Logotopia',
}

export function BrainSearchForm({ initialQuery, initialFacet, suggestions = [] }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)

  const activeFacet = useMemo<Facet>(() => {
    return facets.includes(initialFacet as Facet) ? (initialFacet as Facet) : 'all'
  }, [initialFacet])

  const uniqueSuggestions = useMemo(
    () => Array.from(new Set(suggestions.map((item) => item.trim()).filter(Boolean))).slice(0, 8),
    [suggestions]
  )

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
          list="brain-search-suggestions"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj po nazwie, tagu, projekcie lub typie"
          className="min-h-14 w-full rounded-xl border border-border/80 bg-background px-5 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
        />
        <datalist id="brain-search-suggestions">
          {uniqueSuggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
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

      {uniqueSuggestions.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {uniqueSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => updateParams(suggestion, activeFacet)}
              className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs tracking-[0.01em] text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
