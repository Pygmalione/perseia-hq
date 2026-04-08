import { render, screen } from '@testing-library/react'
import GardenPage from './page'

describe('Garden page (ogród wiedzy)', () => {
  it('renders the garden heading', () => {
    render(<GardenPage />)
    expect(screen.getByRole('heading', { name: /ogród wiedzy/i })).toBeInTheDocument()
  })

  it('renders the eyebrow text', () => {
    render(<GardenPage />)
    expect(screen.getByText(/headquarters piękna/i)).toBeInTheDocument()
  })

  it('renders entries count', () => {
    render(<GardenPage />)
    expect(screen.getByText(/5 wpisów/i)).toBeInTheDocument()
  })

  it('renders the active entries label', () => {
    render(<GardenPage />)
    expect(screen.getByText(/aktywne wpisy/i)).toBeInTheDocument()
  })

  describe('knowledge entries', () => {
    it('renders all entry titles', () => {
      render(<GardenPage />)
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

    it('renders kind badges', () => {
      render(<GardenPage />)
      const preferences = screen.getAllByText('Preferencja')
      expect(preferences.length).toBe(2)
      expect(screen.getByText('Reguła')).toBeInTheDocument()
      const persons = screen.getAllByText('Osoba')
      expect(persons.length).toBe(2)
    })

    it('renders source labels', () => {
      render(<GardenPage />)
      expect(screen.getByText(/Źródło: SOUL\.md/)).toBeInTheDocument()
      const userMdSources = screen.getAllByText(/Źródło: USER\.md/)
      expect(userMdSources.length).toBe(2)
    })
  })

  it('renders main element', () => {
    render(<GardenPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
