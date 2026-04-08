export const siteConfig = {
  name: 'Imperialska Galeria Persei',
  eyebrow: 'Cyfrowy dom kolekcjonerski',
  tagline: 'Muzealna uroda cyfrowa dla epoki, która zapomniała, jak patrzeć powoli.',
  description:
    'Kuratorem wybrane cyfrowe relikwie, żywe systemy i imperialnej klasy światy wizualne. Premium front-end galerii zbudowany według standardów kwietnia 2026.',
  nav: {
    links: [
      { label: 'Kolekcje', href: '#collections' },
      { label: 'Manifest', href: '#manifest' },
      { label: 'Zasady', href: '#principles' },
      { label: 'Logo', href: '/logos' },
    ],
    cta: { label: 'Wejdź do galerii', href: '#collections' },
  },
  heroStats: [
    { value: '07', label: 'światów wybranych' },
    { value: '03', label: 'aktywne kolekcje' },
    { value: 'AA', label: 'cel kontrastowy' },
  ],
  collections: [
    {
      title: 'Imperialne relikwie',
      meta: 'Kuratorem wybrane symbole',
      description: 'Komnata znaków, pieczęci i precyzyjnych form wyróżnionych poza zmęczeniem logo-szablonów.',
    },
    {
      title: 'Żywe systemy',
      meta: 'Organiczna kalkulacja',
      description: 'Miękko kinetyczne kompozycje, gdzie struktura, biologia i cyfrowy rytuał nachodzą na siebie jak kury na wybiegu.',
    },
    {
      title: 'Kinematograficzne przesłony',
      meta: 'Światło i kadrowanie',
      description: 'Architektoniczne kompozycje zbudowane na napięciu, ostrości, ciszy i kontrolowanej poświacie. Uroczo i trochę groźnie.',
    },
  ],
  principles: [
    'Typografia przemawia, zanim dekoracja zdąży otworzyć usta.',
    'Luksus bierze się z powściągliwości, nie z brokatu.',
    'Każda sekcja musi zmienić rytm strony. Nikt nie lubi monotonii nawet w muzeum.',
    'Mobile to nie fallback. To pierwszoligowa scena. Punkt.',
  ],
}

export type SiteConfig = typeof siteConfig
