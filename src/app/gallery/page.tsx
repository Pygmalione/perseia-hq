import { hqConfig } from '@/config/hq'

const galleryItems = [
  {
    id: 'logotopia-signal-aperture',
    title: 'Signal Aperture',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/signal-aperture-01.jpg',
    alt: 'Logo mark inspired by photographic aperture blades',
  },
  {
    id: 'logotopia-neural-topology',
    title: 'Neural Topology',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/neural-topology-01.jpg',
    alt: 'Logo mark inspired by neural network node diagram',
  },
  {
    id: 'logotopia-luxury-monogram',
    title: 'Luxury V Monogram',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/luxury-v-monogram-01.jpg',
    alt: 'Monogrammatic V with architectural precision',
  },
  {
    id: 'logotopia-crystal-fold',
    title: 'Crystal Fold',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/crystal-fold-01.jpg',
    alt: 'Crystalline faceted form suggesting depth',
  },
  {
    id: 'logotopia-fluid-ribbon',
    title: 'Fluid Ribbon',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/fluid-ribbon-01.jpg',
    alt: 'Single continuous ribbon forming a V shape',
  },
  {
    id: 'logotopia-sacred-grid',
    title: 'Sacred Grid',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/sacred-grid-01.jpg',
    alt: 'Geometric grid construction with golden ratio',
  },
  {
    id: 'logotopia-shadow-depth',
    title: 'Shadow Depth',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/shadow-depth-01.jpg',
    alt: 'Layered planes creating depth through shadow',
  },
  {
    id: 'logotopia-prism-split',
    title: 'Prism Split',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/gallery/prism-split-01.jpg',
    alt: 'Light prism splitting into spectrum suggestion',
  },
]

export default function GalleryPage() {
  const galleryModule = hqConfig.modules.find((m) => m.title === 'Galeria')

  return (
    <main className="grain">
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {hqConfig.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none tracking-[-0.04em] text-foreground sm:text-7xl">
            Galeria
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {galleryModule?.description ?? 'Ekspozycja finalnych kolekcji i kreacji.'}
          </p>
        </div>
      </section>

      <section id="gallery-grid" className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b border-border/70 pb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span>Logotopia - kandydaci</span>
            <span>{galleryItems.length} assetów</span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/80 shadow-[var(--shadow-panel)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
              >
                <div className="relative aspect-square overflow-hidden bg-background">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
