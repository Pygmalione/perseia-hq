'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type HqSearchFormProps = {
  suggestions?: string[]
}

export function HqSearchForm({ suggestions = [] }: HqSearchFormProps) {
  const [query, setQuery] = useState('')
  const [facet, setFacet] = useState('all')
  const router = useRouter()

  const uniqueSuggestions = useMemo(
    () => Array.from(new Set(suggestions.map((item) => item.trim()).filter(Boolean))).slice(0, 6),
    [suggestions]
  )

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (facet !== 'all') params.set('facet', facet)
    const search = params.toString()
    router.push(search ? `/brain?${search}` : '/brain')
  }

  function pickSuggestion(value: string) {
    setQuery(value)
    const params = new URLSearchParams()
    params.set('q', value)
    if (facet !== 'all') params.set('facet', facet)
    router.push(`/brain?${params.toString()}`)
  }

  return (
    <>
      <form onSubmit={submit} className="rounded-[1.5rem] border border-border/80 bg-background/80 p-4 shadow-[var(--shadow-panel)]">
        <input
          aria-label="Search assets"
          list="hq-search-suggestions"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj po nazwie, tagu, projekcie lub typie"
          className="min-h-12 w-full rounded-xl border border-border/80 bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
        />
        <datalist id="hq-search-suggestions">
          {uniqueSuggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      </form>

      <div className="flex flex-wrap gap-3">
        {[
          ['all', 'Wszystko'],
          ['image', 'Obrazy'],
          ['video', 'Wideo'],
          ['pdf', 'PDF'],
          ['feedback', 'Feedback'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFacet(value)}
            aria-pressed={facet === value}
            className={`rounded-full border px-4 py-2 text-sm shadow-[var(--shadow-panel)] transition ${
              facet === value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border/80 bg-background/70 text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {uniqueSuggestions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {uniqueSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => pickSuggestion(suggestion)}
              className="rounded-full border border-border/70 bg-background/65 px-3 py-1.5 text-xs tracking-[0.01em] text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}
