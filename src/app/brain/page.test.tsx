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

vi.mock('@/components/brain-search-form', () => ({
  BrainSearchForm: ({
    initialQuery,
    initialFacet,
    suggestions,
  }: {
    initialQuery: string
    initialFacet: string
    suggestions?: string[]
  }) => <div data-testid="brain-search-form">{initialQuery}:{initialFacet}:{suggestions?.join('|')}</div>,
}))

vi.mock('@/components/asset-upload-panel', () => ({
  AssetUploadPanel: () => <div data-testid="asset-upload-panel">upload panel</div>,
}))

import BrainPage from './page'

describe('Asset Brain page', () => {
  it('renders the brain heading', async () => {
    render(await BrainPage({ searchParams: Promise.resolve({}) }))
    expect(screen.getByRole('heading', { name: /asset brain/i })).toBeInTheDocument()
  })

  it('renders the search form', async () => {
    render(await BrainPage({ searchParams: Promise.resolve({}) }))
    expect(screen.getByTestId('brain-search-form')).toBeInTheDocument()
  })

  it('passes query params into search form', async () => {
    render(await BrainPage({ searchParams: Promise.resolve({ q: 'signal', facet: 'image' }) }))
    expect(screen.getByText(/signal:image:/)).toBeInTheDocument()
  })

  it('passes suggestions into search form', async () => {
    render(await BrainPage({ searchParams: Promise.resolve({}) }))
    expect(screen.getByText(/Arch Monogram\|Logotopia\|image/i)).toBeInTheDocument()
  })

  it('renders the asset upload panel', async () => {
    render(await BrainPage({ searchParams: Promise.resolve({}) }))
    expect(screen.getByTestId('asset-upload-panel')).toBeInTheDocument()
  })

  describe('stats', () => {
    it('renders asset count stats', async () => {
      render(await BrainPage({ searchParams: Promise.resolve({}) }))
      expect(screen.getByText('312')).toBeInTheDocument()
      expect(screen.getByText('299')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders stat labels', async () => {
      render(await BrainPage({ searchParams: Promise.resolve({}) }))
      expect(screen.getByText(/assetów total/i)).toBeInTheDocument()
    })
  })

  describe('recent assets table', () => {
    it('renders table headers', async () => {
      render(await BrainPage({ searchParams: Promise.resolve({}) }))
      expect(screen.getByText('Nazwa')).toBeInTheDocument()
      expect(screen.getByText('Typ')).toBeInTheDocument()
      expect(screen.getByText('Projekt')).toBeInTheDocument()
      expect(screen.getByText('Data')).toBeInTheDocument()
    })

    it('renders filtered asset rows for query', async () => {
      render(await BrainPage({ searchParams: Promise.resolve({ q: 'signal' }) }))
      expect(screen.getByText('Signal Aperture')).toBeInTheDocument()
      expect(screen.queryByText('Arch Monogram')).not.toBeInTheDocument()
    })

    it('renders recently added count after filtering', async () => {
      render(await BrainPage({ searchParams: Promise.resolve({ q: 'signal' }) }))
      expect(screen.getByText(/1 assetów/i)).toBeInTheDocument()
    })

    it('renders empty state when no results match', async () => {
      render(await BrainPage({ searchParams: Promise.resolve({ q: 'zzzz' }) }))
      expect(screen.getByText(/brak wyników dla tego filtrowania/i)).toBeInTheDocument()
    })
  })

  it('renders main element', async () => {
    render(await BrainPage({ searchParams: Promise.resolve({}) }))
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
