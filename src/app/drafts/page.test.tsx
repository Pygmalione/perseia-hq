import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('@/lib/drafts-data', () => ({
  getDraftsSummary: vi.fn(async () => ({
    draftsTotal: 0,
    profilesTotal: 0,
    presets: [
      { id: 'p1', label: 'Karol - ciepły, konkretny', person: 'Karol Dębkowski' },
      { id: 'p2', label: 'Jadzia - jasny kontekst', person: 'Jadzia Kim' },
      { id: 'p3', label: 'Klient - premium, profesjonalny', person: 'Klient zewnętrzny' },
    ],
  })),
}))

import DraftsPage from './page'

describe('Drafts page (Draft Studio)', () => {
  it('renders the draft studio heading', async () => {
    render(await DraftsPage())
    expect(screen.getByRole('heading', { name: /draft studio/i })).toBeInTheDocument()
  })

  it('renders the composer heading', async () => {
    render(await DraftsPage())
    expect(screen.getByRole('heading', { name: /nowy draft/i })).toBeInTheDocument()
  })

  it('renders person preset chips', async () => {
    render(await DraftsPage())
    expect(screen.getByText(/karol - ciepły/i)).toBeInTheDocument()
    expect(screen.getByText(/jadzia - jasny kontekst/i)).toBeInTheDocument()
    expect(screen.getByText(/klient - premium/i)).toBeInTheDocument()
  })

  it('renders the draft textarea', async () => {
    render(await DraftsPage())
    expect(screen.getByPlaceholderText(/wpisz brief lub kontekst odpowiedzi/i)).toBeInTheDocument()
  })

  it('renders action buttons', async () => {
    render(await DraftsPage())
    expect(screen.getByText(/generuj draft/i)).toBeInTheDocument()
    expect(screen.getByText(/zapisz jako notatk/i)).toBeInTheDocument()
  })

  it('renders preview section', async () => {
    render(await DraftsPage())
    expect(screen.getByRole('heading', { name: /podgląd/i })).toBeInTheDocument()
  })

  it('renders main element', async () => {
    render(await DraftsPage())
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
