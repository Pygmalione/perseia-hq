export const hqConfig = {
  name: 'Perseia HQ',
  eyebrow: 'Headquarters piękna',
  tagline: 'Wiedza, kreacja i pamięć gustu w jednym miejscu.',
  description:
    'Centrum operacyjne Phantasii. Galeria, ogród wiedzy, asset brain, studio draftów i projekty pod jednym dachem.',
  nav: {
    links: [
      { label: 'Galeria', href: '/gallery' },
      { label: 'Ogród wiedzy', href: '/garden' },
      { label: 'Asset brain', href: '/brain' },
      { label: 'Drafty', href: '/drafts' },
      { label: 'Projekty', href: '/projects' },
      { label: 'Logo', href: '/logos' },
    ],
    cta: { label: 'Wejdź do HQ', href: '/gallery' },
  },
  modules: [
    {
      title: 'Galeria',
      description: 'Ekspozycja finalnych kolekcji i kreacji.',
      href: '/gallery',
      stat: '81',
      statLabel: 'assetów',
    },
    {
      title: 'Ogród wiedzy',
      description: 'Preferencje, historia gustu, relacje i ton komunikacji.',
      href: '/garden',
      stat: '3',
      statLabel: 'reguły aktywne',
    },
    {
      title: 'Asset brain',
      description: 'Wyszukiwarka każdego obrazu, wideo i dokumentu.',
      href: '/brain',
      stat: '81',
      statLabel: 'zindeksowanych',
    },
    {
      title: 'Draft studio',
      description: 'Perfekcyjne drafty odpowiedzi dopasowane do osoby i kontekstu.',
      href: '/drafts',
      stat: '0',
      statLabel: 'draftów',
    },
    {
      title: 'Projekty',
      description: 'Specy, epiki, taski i checkpointy kreatywnych przedsięwzięć.',
      href: '/projects',
      stat: '7',
      statLabel: 'epik',
    },
  ],
  principles: [
    'Każdy feedback staje się trwałą regułą, nie jednorazową notatką.',
    'Znajdź ziarnko ryżu w 10000 assetów w mniej niż 2 sekundy.',
    'Drafty odpowiedzi odzwierciedlają osobę, relację i historię.',
    'Projekty mają stan, nie obietnice.',
  ],
}

export type HqConfig = typeof hqConfig
