import { fireEvent, render, screen } from '@testing-library/react'
import GalleryPage from './page'

describe('Gallery page', () => {
  it('renders the gallery heading', () => {
    render(<GalleryPage />)
    expect(screen.getByRole('heading', { name: /galeria/i })).toBeInTheDocument()
  })

  it('renders the eyebrow text', () => {
    render(<GalleryPage />)
    expect(screen.getByText(/headquarters piękna/i)).toBeInTheDocument()
  })

  it('renders gallery items count', () => {
    render(<GalleryPage />)
    expect(screen.getByText(/16 assetów/i)).toBeInTheDocument()
  })

  it('renders the logotopia section label', () => {
    render(<GalleryPage />)
    expect(screen.getByText(/logotopia - kandydaci/i)).toBeInTheDocument()
  })

  describe('gallery grid', () => {
    it('renders all gallery item titles', () => {
      render(<GalleryPage />)
      const titles = [
        'Neural Topology',
        'Hexagonal Prism',
        'Arch Monogram',
        'Signal Aperture',
        'Constellation Weave',
        'Luxury V Monogram',
        'Crystal Fold',
        'Fluid Ribbon',
      ]
      for (const title of titles) {
        expect(screen.getByText(title)).toBeInTheDocument()
      }
    })

    it('renders all gallery images with alt text', () => {
      render(<GalleryPage />)
      const images = screen.getAllByRole('img')
      expect(images.length).toBe(16)
      for (const img of images) {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).not.toBe('')
      }
    })

    it('renders family labels for each item', () => {
      render(<GalleryPage />)
      const familyLabels = screen.getAllByText('Logotopia')
      expect(familyLabels.length).toBe(16)
    })
  })

  it('opens a lightbox when a gallery card is clicked', () => {
    render(<GalleryPage />)

    fireEvent.click(screen.getByRole('button', { name: /neural topology/i }))

    expect(screen.getByRole('heading', { name: /neural topology/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/feedback 1-10/i)).toBeInTheDocument()
  })

  it('renders main element', () => {
    render(<GalleryPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
