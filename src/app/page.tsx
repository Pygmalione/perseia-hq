import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { HqSearchForm } from '@/components/hq-search-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { hqConfig } from '@/config/hq'

const featuredSearchSuggestions = [
  'Neural Topology',
  'Signal Aperture',
  'Arch Monogram',
  'Logotopia',
  'Feedback',
]

export default function HqHome() {
  return (
    <main className="grain">
      <section className="frame-line relative overflow-hidden px-4 pb-12 pt-4 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-b border-border/70 pb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>{hqConfig.eyebrow}</span>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {hqConfig.nav.links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mx-auto max-w-7xl py-8 sm:py-10 lg:py-16">
          <div className="space-y-8">
            <div className="max-w-4xl space-y-5 sm:space-y-6">
              <h1 className="font-display text-balance text-[3.15rem] leading-none font-semibold tracking-[-0.04em] text-foreground sm:text-7xl lg:text-[7.5rem]">
                {hqConfig.name}
              </h1>

              <p className="max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-xl sm:leading-8">
                {hqConfig.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={hqConfig.nav.cta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-panel)] transition touch-manipulation hover:-translate-y-0.5 hover:bg-primary/92"
              >
                {hqConfig.nav.cta.label}
                <ArrowUpRight className="size-4" />
              </Link>

              <p className="max-w-md text-sm leading-6 text-muted-foreground sm:leading-7">
                {hqConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="px-4 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mt-0 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {hqConfig.modules.map((mod) => (
              <Link key={mod.title} href={mod.href}>
                <Card className="border border-border/80 bg-card/80 py-0 shadow-[var(--shadow-panel)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]">
                  <CardHeader className="px-6 pt-6">
                    <CardTitle className="font-display text-3xl tracking-[-0.035em] text-foreground">
                      {mod.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-7 text-muted-foreground">
                      {mod.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="rounded-2xl border border-border/70 bg-[linear-gradient(140deg,rgba(36,29,18,0.96),rgba(91,72,38,0.88),rgba(229,213,182,0.44))] p-5 text-primary-foreground">
                      <div className="flex items-end justify-between gap-6">
                        <div>
                          <p className="font-display text-4xl tracking-[-0.04em]">{mod.stat}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-primary-foreground/60">
                            {mod.statLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="search" className="px-4 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/80 bg-card/75 p-5 shadow-[var(--shadow-panel)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Asset Brain</p>
              <h2 className="font-display text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-6xl">
                Asset Brain Search
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:leading-8">
                Znajdź właściwy asset po nazwie, tagu, projekcie, typie, historii użycia albo feedbacku. Zero kopania po jaskiniach folderów.
              </p>
            </div>

            <div className="space-y-5">
              <HqSearchForm suggestions={featuredSearchSuggestions} />
            </div>
          </div>
        </div>
      </section>

      <section id="draft-studio" className="px-4 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/80 bg-card/75 p-5 shadow-[var(--shadow-panel)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Studio odpowiedzi</p>
              <h2 className="font-display text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-6xl">
                Draft Studio
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:leading-8">
                Szkice odpowiedzi, które pamiętają relację, ton i historię. Zero zimnych automatów. Same celne słowa.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Karol', 'Visuana', 'Premium tone', 'Feedback-aware'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/80 bg-background/70 px-4 py-2 text-sm text-foreground shadow-[var(--shadow-panel)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-border/80 bg-background/80 p-4 shadow-[var(--shadow-panel)]">
                <textarea
                  aria-label="Draft studio input"
                  placeholder="Napisz szkic odpowiedzi albo brief"
                  className="min-h-40 w-full resize-none rounded-xl border border-border/80 bg-background px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/35 sm:text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="min-h-11 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-panel)] touch-manipulation">
                  Generuj draft
                </button>
                <button className="min-h-11 rounded-full border border-border/80 bg-background/70 px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-panel)] touch-manipulation">
                  Zapisz jako notatkę
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="px-4 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-6xl">
            Zasady HQ
          </h2>
          <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-2">
            {hqConfig.principles.map((principle) => (
              <div key={principle} className="rounded-[1.75rem] border border-border/80 bg-background/70 p-6 shadow-[var(--shadow-panel)]">
                <p className="text-sm leading-7 text-foreground">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
