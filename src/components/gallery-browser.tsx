'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, MessageSquarePlus, X } from 'lucide-react'

export type GalleryItem = {
  id: string
  title: string
  family: string
  kind: 'image'
  src: string
  alt: string
  rank?: number
}

type Props = {
  items: GalleryItem[]
}

const ratingScale = Array.from({ length: 10 }, (_, index) => index + 1)

export function GalleryBrowser({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<string>('')
  const activeItem = activeIndex !== null ? items[activeIndex] : null

  const rankingBadge = useMemo(() => {
    if (!activeItem?.rank) return null
    return `Top ${activeItem.rank}`
  }, [activeItem])

  async function submitFeedback() {
    if (!activeItem || !selectedRating) return

    setStatus('Zapisywanie...')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetId: activeItem.id,
          assetTitle: activeItem.title,
          rating: selectedRating,
          note,
          author: 'Karol',
          sourceChannel: 'telegram',
        }),
      })

      if (!response.ok) {
        throw new Error('Feedback API failed')
      }

      setStatus(`Ocena ${selectedRating}/10 zapisana`)
      setNote('')
    } catch {
      setStatus('Nie udało się zapisać oceny')
    }
  }

  function closeLightbox() {
    setActiveIndex(null)
    setSelectedRating(null)
    setNote('')
    setStatus('')
  }

  function nextItem() {
    if (activeIndex === null) return
    setActiveIndex((activeIndex + 1) % items.length)
    setSelectedRating(null)
    setNote('')
    setStatus('')
  }

  function prevItem() {
    if (activeIndex === null) return
    setActiveIndex((activeIndex - 1 + items.length) % items.length)
    setSelectedRating(null)
    setNote('')
    setStatus('')
  }

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/80 shadow-[var(--shadow-panel)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full text-left"
            >
              <div className="relative aspect-square overflow-hidden bg-background">
                {item.rank && (
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                    Top {item.rank}
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-contain p-4 transition group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="px-5 pb-5 pt-4">
                <h3 className="font-display text-lg tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.family}
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-7xl items-center px-4 py-6 sm:px-8">
            <div className="grid w-full gap-6 rounded-[2rem] border border-border/70 bg-background shadow-[var(--shadow-gold)] lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-t-[2rem] bg-muted/20 p-6 lg:rounded-l-[2rem] lg:rounded-tr-none lg:p-10">
                <button
                  type="button"
                  aria-label="Poprzedni asset"
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border/70 bg-background/90 p-3 text-foreground transition hover:bg-background"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Następny asset"
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border/70 bg-background/90 p-3 text-foreground transition hover:bg-background"
                >
                  <ChevronRight className="size-5" />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {activeItem.family}
                    </p>
                    <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] text-foreground">
                      {activeItem.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    aria-label="Zamknij lightbox"
                    onClick={closeLightbox}
                    className="rounded-full border border-border/70 bg-background/70 p-3 text-foreground transition hover:bg-background"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {rankingBadge && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {rankingBadge}
                    </span>
                  )}
                  <span className="rounded-full border border-border/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Asset permanentny
                  </span>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-border/70 bg-card/60 p-5 shadow-[var(--shadow-panel)]">
                  <div className="flex items-center gap-2 text-foreground">
                    <MessageSquarePlus className="size-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Feedback 1-10</h3>
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
                    {ratingScale.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedRating(value)}
                        className={`min-h-11 rounded-xl border text-sm font-semibold transition ${
                          selectedRating === value
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border/70 bg-background hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>

                  <textarea
                    aria-label="Komentarz do feedbacku"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Co działa, co poprawić, co Cię boli?"
                    className="mt-4 min-h-28 w-full resize-none rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35"
                  />

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={submitFeedback}
                      disabled={!selectedRating}
                      className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-panel)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Zapisz ocenę
                    </button>
                    {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
