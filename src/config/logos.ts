export interface LogoItem {
  src: string
  alt: string
  title: string
}

export interface LogoCollection {
  id: string
  title: string
  description: string
  items: LogoItem[]
}

export const logoCollections: LogoCollection[] = [
  {
    id: 'classic-iter',
    title: 'Klasyczne iteracje',
    description: 'Dziesięć koncepcji logo z pierwszego cyklu Visuany, od lineartu po awangardę. Mały spacer od grzeczności do szaleństwa.',
    items: [
      { src: '/logo-gallery/classic-iter/visuana-logo-iter01-lineart.png', alt: 'Lineart', title: '01 - Lineart' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter02-gradients.png', alt: 'Gradienty', title: '02 - Gradienty' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter03-geometric.png', alt: 'Geometryczne', title: '03 - Geometryczne' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter04-organic.png', alt: 'Organiczne', title: '04 - Organiczne' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter05-bold.png', alt: 'Odważne', title: '05 - Odważne' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter06-motion.png', alt: 'Ruch', title: '06 - Ruch' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter07-negativespace.png', alt: 'Negatywowa przestrzeń', title: '07 - Negatywowa przestrzeń' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter08-tech.png', alt: 'Tech', title: '08 - Tech' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter09-luxury.png', alt: 'Luksusowe', title: '09 - Luksusowe' },
      { src: '/logo-gallery/classic-iter/visuana-logo-iter10-avantgarde.png', alt: 'Awangarda', title: '10 - Awangarda' },
    ],
  },
  {
    id: 'vlogo2',
    title: 'Visuana odrodzona',
    description: 'Drugi cykl - od płynnej topologii do pełnego odrodzenia. Więcej ambicji, więcej pazura, mniej przypadkowych fikołków.',
    items: [
      { src: '/logo-gallery/vlogo2/vlogo2-01-fluid-topology.png', alt: 'Płynna topologia', title: '01 - Płynna topologia' },
      { src: '/logo-gallery/vlogo2/vlogo2-02-optical-tension.png', alt: 'Napięcie optyczne', title: '02 - Napięcie optyczne' },
      { src: '/logo-gallery/vlogo2/vlogo2-03-architectural.png', alt: 'Architektoniczne', title: '03 - Architektoniczne' },
      { src: '/logo-gallery/vlogo2/vlogo2-04-signal-noise.png', alt: 'Sygnał i szum', title: '04 - Sygnał i szum' },
      { src: '/logo-gallery/vlogo2/vlogo2-05-typo-deconstruct.png', alt: 'Dekonstrukcja typograficzna', title: '05 - Dekonstrukcja typograficzna' },
      { src: '/logo-gallery/vlogo2/vlogo2-06-sacred-geometry.png', alt: 'Święta geometria', title: '06 - Święta geometria' },
      { src: '/logo-gallery/vlogo2/vlogo2-07-living-systems.png', alt: 'Żywe systemy', title: '07 - Żywe systemy' },
      { src: '/logo-gallery/vlogo2/vlogo2-08-precision-craft.png', alt: 'Precyzyjne rzemiosło', title: '08 - Precyzyjne rzemiosło' },
      { src: '/logo-gallery/vlogo2/vlogo2-09-kinetic-equilibrium.png', alt: 'Kinetyczna równowaga', title: '09 - Kinetyczna równowaga' },
      { src: '/logo-gallery/vlogo2/vlogo2-10-visuana-reborn.png', alt: 'Visuana odrodzona', title: '10 - Visuana odrodzona' },
    ],
  },
  {
    id: 'v-monogram',
    title: 'Monogram V',
    description: 'Studia monogramu skupione wokół litery V jako osi konstrukcyjnej. Skromne, dumne, czasem z miną cesarskiego gołębia.',
    items: [
      { src: '/logo-gallery/v-monogram/VM-01.png', alt: 'Monogram V 01', title: 'VM-01' },
      { src: '/logo-gallery/v-monogram/VM-02.png', alt: 'Monogram V 02', title: 'VM-02' },
      { src: '/logo-gallery/v-monogram/VM-03.png', alt: 'Monogram V 03', title: 'VM-03' },
      { src: '/logo-gallery/v-monogram/VM-04.png', alt: 'Monogram V 04', title: 'VM-04' },
      { src: '/logo-gallery/v-monogram/VM-05.png', alt: 'Monogram V 05', title: 'VM-05' },
      { src: '/logo-gallery/v-monogram/VM-06.png', alt: 'Monogram V 06', title: 'VM-06' },
    ],
  },
  {
    id: 'agentic-sigil',
    title: 'Agentyczny sygnet',
    description: 'Symboliczne znaki badające autonomiczną tożsamość i samoodnoszące się systemy. Trochę magia, trochę matematyka, trochę kot w pelerynie.',
    items: [
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-01.png', alt: 'Agentyczny sygnet 01', title: 'AS-01' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-02.png', alt: 'Agentyczny sygnet 02', title: 'AS-02' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-03.png', alt: 'Agentyczny sygnet 03', title: 'AS-03' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-04.png', alt: 'Agentyczny sygnet 04', title: 'AS-04' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-05.png', alt: 'Agentyczny sygnet 05', title: 'AS-05' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-06.png', alt: 'Agentyczny sygnet 06', title: 'AS-06' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-07.png', alt: 'Agentyczny sygnet 07', title: 'AS-07' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-08.png', alt: 'Agentyczny sygnet 08', title: 'AS-08' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-09.png', alt: 'Agentyczny sygnet 09', title: 'AS-09' },
      { src: '/logo-gallery/factory/agentic-sigil/2026-04-05-agentic-sigil-10.png', alt: 'Agentyczny sygnet 10', title: 'AS-10' },
    ],
  },
  {
    id: 'convergence',
    title: 'Konwergencja',
    description: 'Kompozycje, w których wiele kierunków logo zapada się w jedną zdecydowaną formę. Elegancki chaos, ale nadal w lakierkach.',
    items: [
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-01.png', alt: 'Konwergencja 01', title: 'CV-01' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-02.png', alt: 'Konwergencja 02', title: 'CV-02' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-03.png', alt: 'Konwergencja 03', title: 'CV-03' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-04.png', alt: 'Konwergencja 04', title: 'CV-04' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-05.png', alt: 'Konwergencja 05', title: 'CV-05' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-06.png', alt: 'Konwergencja 06', title: 'CV-06' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-07.png', alt: 'Konwergencja 07', title: 'CV-07' },
      { src: '/logo-gallery/factory/convergence/2026-04-05-convergence-08.png', alt: 'Konwergencja 08', title: 'CV-08' },
    ],
  },
]
