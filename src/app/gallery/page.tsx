import { GalleryBrowser } from '@/components/gallery-browser'
import { hqConfig } from '@/config/hq'

const galleryItems = [
  {
    id: 'logotopia-neural-topology',
    title: 'Neural Topology',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/neural-topology-01.jpg',
    alt: 'Logo mark inspired by neural network node diagram',
    rank: 1,
  },
  {
    id: 'logotopia-hexagonal-prism',
    title: 'Hexagonal Prism',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/hexagonal-prism-01.jpg',
    alt: 'Hexagonal prism with subtle V through internal line work',
    rank: 2,
  },
  {
    id: 'logotopia-arch-monogram',
    title: 'Arch Monogram',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/arch-monogram-01.jpg',
    alt: 'Architectural arch merged with a sharp V monogram',
    rank: 3,
  },
  {
    id: 'logotopia-signal-aperture',
    title: 'Signal Aperture',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/signal-aperture-01.jpg',
    alt: 'Logo mark inspired by photographic aperture blades',
    rank: 4,
  },
  {
    id: 'logotopia-constellation-weave',
    title: 'Constellation Weave',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/constellation-weave-01.jpg',
    alt: 'Constellation-inspired geometry with precise stars',
    rank: 5,
  },
  {
    id: 'logotopia-luxury-monogram',
    title: 'Luxury V Monogram',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/luxury-v-monogram-01.jpg',
    alt: 'Monogrammatic V with architectural precision',
  },
  {
    id: 'logotopia-crystal-fold',
    title: 'Crystal Fold',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/crystal-fold-01.jpg',
    alt: 'Crystalline faceted form suggesting depth',
  },
  {
    id: 'logotopia-fluid-ribbon',
    title: 'Fluid Ribbon',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/fluid-ribbon-01.jpg',
    alt: 'Single continuous ribbon forming a V shape',
  },
  {
    id: 'logotopia-sacred-grid',
    title: 'Sacred Grid',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/sacred-grid-01.jpg',
    alt: 'Geometric grid construction with golden ratio',
  },
  {
    id: 'logotopia-shadow-depth',
    title: 'Shadow Depth',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/shadow-depth-01.jpg',
    alt: 'Layered planes creating depth through shadow',
  },
  {
    id: 'logotopia-prism-split',
    title: 'Prism Split',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/prism-split-01.jpg',
    alt: 'Light prism splitting into spectrum suggestion',
  },
  {
    id: 'logotopia-orbital-ring',
    title: 'Orbital Ring',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/orbital-ring-01.jpg',
    alt: 'Orbital ring intersecting a precise V structure',
  },
  {
    id: 'logotopia-folded-plane',
    title: 'Folded Plane',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/folded-plane-01.jpg',
    alt: 'Folded paper plane silhouette abstracted into V',
  },
  {
    id: 'logotopia-razor-vertex',
    title: 'Razor Vertex',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/razor-vertex-01.jpg',
    alt: 'Two razor-sharp lines meeting at a precise vertex',
  },
  {
    id: 'logotopia-ascending-bars',
    title: 'Ascending Bars',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/ascending-bars-01.jpg',
    alt: 'Three ascending vertical bars suggesting V in negative space',
  },
  {
    id: 'logotopia-mobius-loop',
    title: 'Mobius Loop',
    family: 'Logotopia',
    kind: 'image' as const,
    src: '/assets/logotopia/mobius-loop-01.jpg',
    alt: 'Mobius strip simplified to an elegant loop with V twist',
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

          <GalleryBrowser items={galleryItems} />
        </div>
      </section>
    </main>
  )
}
