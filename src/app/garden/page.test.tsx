import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('@/lib/garden-data', () => ({
  getGardenSummary: vi.fn(async () => ({
    totalEntries: 5,
    totalPreferences: 2,
    totalFeedback: 0,
    entries: [
      {
        id: 'pref-warm-tones',
        kind: 'preference',
        title: 'Ciepłe tony dominujące',
        scope: 'global',
        description: 'Cesarz preferuje ciepłą paletę: złoto, bursztyn, miedź. Zimne błękity tylko jako akcent kontrastowy.',
        source: 'Feedback z sesji Logotopii 2026-04',
      },
      {
        id: 'pref-no-ornament',
        kind: 'preference',
        title: 'Minimalizm bez ornamentów',
        scope: 'brand',
        description: 'Logo i znaki graficzne muszą być czyste geometrycznie. Zero herbów, tarcz, wstęg ani filigranów.',
        source: 'Dekret Cesarza 2026-03',
      },
      {
        id: 'pref-sentence-case',
        kind: 'rule',
        title: 'Sentence case obowiązkowy',
        scope: 'global',
        description: 'Wszystkie nagłówki i etykiety w sentence case. Wielka litera tylko na początku zdania i w nazwach własnych.',
        source: 'SOUL.md',
      },
      {
        id: 'rel-karol',
        kind: 'person',
        title: 'Karol Dębkowski (Cesarz)',
        scope: 'person',
        description: 'Właściciel Visuana, decydent końcowy. Ton: ciepły, konkretny, zero korpo-gadki. ADHD-friendly: krótkie akapity, pogrubienia, max 3 action items.',
        source: 'USER.md',
      },
      {
        id: 'rel-jadzia',
        kind: 'person',
        title: 'Jadzia Kim',
        scope: 'person',
        description: 'Content creator ~500k followers. Potrzebuje jasnego kontekstu, nadwrażliwość sensoryczna. Profesjonalny partnership aktywny.',
        source: 'USER.md',
      },
    ],
  })),
}))

import GardenPage from './page'

describe('Garden page (ogród wiedzy)', () => {
  it('renders the garden heading', async () => {
    render(await GardenPage())
    expect(screen.getByRole('heading', { name: /ogród wiedzy/i })).toBeInTheDocument()
  })

  it('renders the eyebrow text', async () => {
    render(await GardenPage())
    expect(screen.getByText(/headquarters piękna/i)).toBeInTheDocument()
  })

  it('renders entries count', async () => {
    render(await GardenPage())
    expect(screen.getByText(/5 wpisów/i)).toBeInTheDocument()
  })

  it('renders the active entries label', async () => {
    render(await GardenPage())
    expect(screen.getByText(/aktywne wpisy/i)).toBeInTheDocument()
  })

  describe('knowledge entries', () => {
    it('renders all entry titles', async () => {
      render(await GardenPage())
      const titles = [
        'Ciepłe tony dominujące',
        'Minimalizm bez ornamentów',
        'Sentence case obowiązkowy',
        'Karol Dębkowski (Cesarz)',
        'Jadzia Kim',
      ]
      for (const title of titles) {
        expect(screen.getByText(title)).toBeInTheDocument()
      }
    })

    it('renders kind badges', async () => {
      render(await GardenPage())
      const preferences = screen.getAllByText('Preferencja')
      expect(preferences.length).toBe(2)
      expect(screen.getByText('Reguła')).toBeInTheDocument()
      const persons = screen.getAllByText('Osoba')
      expect(persons.length).toBe(2)
    })

    it('renders source labels', async () => {
      render(await GardenPage())
      expect(screen.getByText(/Źródło: SOUL\.md/)).toBeInTheDocument()
      const userMdSources = screen.getAllByText(/Źródło: USER\.md/)
      expect(userMdSources.length).toBe(2)
    })
  })

  it('renders main element', async () => {
    render(await GardenPage())
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
