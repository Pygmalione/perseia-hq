import { render, screen } from '@testing-library/react'
import DraftsPage from './page'

describe('Drafts page (Draft Studio)', () => {
  it('renders the draft studio heading', () => {
    render(<DraftsPage />)
    expect(screen.getByRole('heading', { name: /draft studio/i })).toBeInTheDocument()
  })

  it('renders the composer heading', () => {
    render(<DraftsPage />)
    expect(screen.getByRole('heading', { name: /nowy draft/i })).toBeInTheDocument()
  })

  it('renders person preset chips', () => {
    render(<DraftsPage />)
    expect(screen.getByText(/karol - ciepły/i)).toBeInTheDocument()
    expect(screen.getByText(/jadzia - jasny kontekst/i)).toBeInTheDocument()
    expect(screen.getByText(/klient - premium/i)).toBeInTheDocument()
  })

  it('renders the draft textarea', () => {
    render(<DraftsPage />)
    expect(screen.getByPlaceholderText(/wpisz brief lub kontekst odpowiedzi/i)).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<DraftsPage />)
    expect(screen.getByText(/generuj draft/i)).toBeInTheDocument()
    expect(screen.getByText(/zapisz jako notatk/i)).toBeInTheDocument()
  })

  it('renders preview section', () => {
    render(<DraftsPage />)
    expect(screen.getByRole('heading', { name: /podgląd/i })).toBeInTheDocument()
  })

  it('renders main element', () => {
    render(<DraftsPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
