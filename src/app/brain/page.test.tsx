import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('@/lib/brain-data', () => ({
  getBrainSummary: vi.fn(async () => ({
    stats: [
      { label: 'Assetów total', value: '312' },
      { label: 'Obrazy', value: '299' },
      { label: 'Wideo', value: '8' },
      { label: 'PDF / doc', value: '5' },
    ],
    recentAssets: [
      { title: 'Arch Monogram', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
      { title: 'Constellation Weave', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
      { title: 'Orbital Ring', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
      { title: 'Folded Plane', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
      { title: 'Signal Aperture', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
      { title: 'Neural Topology', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
    ],
  })),
}))

import BrainPage from './page'

describe('Asset Brain page', () => {
  it('renders the brain heading', async () => {
    render(await BrainPage())
    expect(screen.getByRole('heading', { name: /asset brain/i })).toBeInTheDocument()
  })

  it('renders the search input', async () => {
    render(await BrainPage())
    expect(screen.getByPlaceholderText(/szukaj po nazwie, tagu, projekcie lub typie/i)).toBeInTheDocument()
  })

  it('renders facet chips including Logotopia', async () => {
    const { container } = render(await BrainPage())
    const searchSection = container.querySelector('#brain-search')!
    for (const facet of ['Obrazy', 'Wideo', 'PDF', 'Feedback', 'Logotopia']) {
      const found = Array.from(searchSection.querySelectorAll('*')).some((el) => el.textContent === facet)
      expect(found).toBe(true)
    }
  })

  describe('stats', () => {
    it('renders asset count stats', async () => {
      render(await BrainPage())
      expect(screen.getByText('312')).toBeInTheDocument()
      expect(screen.getByText('299')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders stat labels', async () => {
      render(await BrainPage())
      expect(screen.getByText(/assetów total/i)).toBeInTheDocument()
    })
  })

  describe('recent assets table', () => {
    it('renders table headers', async () => {
      render(await BrainPage())
      expect(screen.getByText('Nazwa')).toBeInTheDocument()
      expect(screen.getByText('Typ')).toBeInTheDocument()
      expect(screen.getByText('Projekt')).toBeInTheDocument()
      expect(screen.getByText('Data')).toBeInTheDocument()
    })

    it('renders recent asset rows', async () => {
      render(await BrainPage())
      expect(screen.getByText('Arch Monogram')).toBeInTheDocument()
      expect(screen.getByText('Constellation Weave')).toBeInTheDocument()
      expect(screen.getByText('Neural Topology')).toBeInTheDocument()
    })

    it('renders recently added count', async () => {
      render(await BrainPage())
      expect(screen.getByText(/6 assetów/i)).toBeInTheDocument()
    })
  })

  it('renders main element', async () => {
    render(await BrainPage())
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
