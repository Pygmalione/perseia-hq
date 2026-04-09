'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HqSearchForm() {
  const [query, setQuery] = useState('')
  const [facet, setFacet] = useState('all')
  const router = useRouter()

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (facet !== 'all') params.set('facet', facet)
    const search = params.toString()
    router.push(search ? `/brain?${search}` : '/brain')
  }

  return (
    <>
      <form onSubmit={submit} className="rounded-[1.5rem] border border-border/80 bg-background/80 p-4 shadow-[var(--shadow-panel)]">
        <input
          aria-label="Search assets"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj po nazwie, tagu, projekcie lub typie"
          className="min-h-12 w-full rounded-xl border border-border/80 bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
        />
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
    </>
  )
}
