import Image from 'next/image'
import Link from 'next/link'
import { logoCollections } from '@/config/logos'

export default function LogosPage() {
  const totalLogos = logoCollections.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-foreground/8 px-6 py-8 md:px-16 md:py-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Archiwum tożsamości Visuany
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Galeria logo
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
            {totalLogos} renderów w {logoCollections.length} kolekcjach. Każda iteracja, każdy kierunek,
            każdy ślepy zaułek i każdy błysk olśnienia w jednym miejscu. Trochę muzeum, trochę laboratorium, trochę kosmiczny strych skarbów.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; Wróć do strony głównej
            </Link>
          </div>
        </div>
      </header>

      {/* Collections */}
      {logoCollections.map((collection) => (
        <section
          key={collection.id}
          id={collection.id}
          className="border-b border-foreground/8 px-6 py-12 md:px-16 md:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-baseline justify-between">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                  {collection.title}
                </h2>
                <p className="mt-1 max-w-md font-sans text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {collection.items.length} renderów
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {collection.items.map((logo) => (
                <figure
                  key={logo.src}
                  className="group relative flex flex-col overflow-hidden rounded-sm border border-foreground/6 bg-card transition-all duration-200 hover:border-foreground/12 hover:shadow-lg"
                >
                  <div className="relative aspect-square bg-[var(--surface-elevated)] p-4">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <figcaption className="border-t border-foreground/4 px-3 py-2">
                    <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                      {logo.title}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="px-6 py-12 text-center md:px-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Imperialska Galeria Persei &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
