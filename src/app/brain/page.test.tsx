import { render, screen } from '@testing-library/react'
import BrainPage from './page'

describe('Asset Brain page', () => {
  it('renders the brain heading', () => {
    render(<BrainPage />)
    expect(screen.getByRole('heading', { name: /asset brain/i })).toBeInTheDocument()
  })

  it('renders the search input', () => {
    render(<BrainPage />)
    expect(screen.getByPlaceholderText(/szukaj po nazwie, tagu, projekcie lub typie/i)).toBeInTheDocument()
  })

  it('renders facet chips including Logotopia', () => {
    const { container } = render(<BrainPage />)
    const searchSection = container.querySelector('#brain-search')!
    for (const facet of ['Obrazy', 'Wideo', 'PDF', 'Feedback', 'Logotopia']) {
      const found = Array.from(searchSection.querySelectorAll('*')).some((el) => el.textContent === facet)
      expect(found).toBe(true)
    }
  })

  describe('stats', () => {
    it('renders asset count stats', () => {
      render(<BrainPage />)
      expect(screen.getByText('308')).toBeInTheDocument()
      expect(screen.getByText('295')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders stat labels', () => {
      render(<BrainPage />)
      expect(screen.getByText(/assetów total/i)).toBeInTheDocument()
    })
  })

  describe('recent assets table', () => {
    it('renders table headers', () => {
      render(<BrainPage />)
      expect(screen.getByText('Nazwa')).toBeInTheDocument()
      expect(screen.getByText('Typ')).toBeInTheDocument()
      expect(screen.getByText('Projekt')).toBeInTheDocument()
      expect(screen.getByText('Data')).toBeInTheDocument()
    })

    it('renders recent asset rows', () => {
      render(<BrainPage />)
      expect(screen.getByText('Signal Aperture')).toBeInTheDocument()
      expect(screen.getByText('Neural Topology')).toBeInTheDocument()
      expect(screen.getByText('Crystal Fold')).toBeInTheDocument()
    })

    it('renders recently added count', () => {
      render(<BrainPage />)
      expect(screen.getByText(/6 assetów/i)).toBeInTheDocument()
    })
  })

  it('renders main element', () => {
    render(<BrainPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
