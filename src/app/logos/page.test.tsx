import { render, screen, within } from '@testing-library/react'
import LogosPage from './page'
import { logoCollections } from '@/config/logos'

describe('Logos gallery page', () => {
  it('renders the page heading', () => {
    render(<LogosPage />)
    expect(screen.getByRole('heading', { name: /galeria logo/i })).toBeInTheDocument()
  })

  it('renders the eyebrow text', () => {
    render(<LogosPage />)
    expect(screen.getByText(/archiwum tożsamości visuany/i)).toBeInTheDocument()
  })

  it('renders the back link to homepage', () => {
    render(<LogosPage />)
    const backLink = screen.getByRole('link', { name: /wróć do strony głównej/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('renders all collection headings', () => {
    render(<LogosPage />)
    for (const collection of logoCollections) {
      expect(
        screen.getByRole('heading', { name: new RegExp(collection.title, 'i') })
      ).toBeInTheDocument()
    }
  })

  it('renders all collection descriptions', () => {
    render(<LogosPage />)
    for (const collection of logoCollections) {
      expect(screen.getByText(collection.description)).toBeInTheDocument()
    }
  })

  it('renders collection sections with correct ids', () => {
    render(<LogosPage />)
    for (const collection of logoCollections) {
      const section = document.getElementById(collection.id)
      expect(section).toBeInTheDocument()
    }
  })

  it('renders the correct total logo count in the subtitle', () => {
    render(<LogosPage />)
    const totalLogos = logoCollections.reduce((sum, c) => sum + c.items.length, 0)
    expect(screen.getByText(new RegExp(`${totalLogos} renderów`))).toBeInTheDocument()
  })

  it('renders a footer with gallery name', () => {
    render(<LogosPage />)
    expect(screen.getByText(/imperialska galeria persei/i)).toBeInTheDocument()
  })
})
