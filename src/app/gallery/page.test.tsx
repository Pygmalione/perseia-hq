import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText(/8 assetów/i)).toBeInTheDocument()
  })

  it('renders the logotopia section label', () => {
    render(<GalleryPage />)
    expect(screen.getByText(/logotopia - kandydaci/i)).toBeInTheDocument()
  })

  describe('gallery grid', () => {
    it('renders all gallery item titles', () => {
      render(<GalleryPage />)
      const titles = [
        'Signal Aperture',
        'Neural Topology',
        'Luxury V Monogram',
        'Crystal Fold',
        'Fluid Ribbon',
        'Sacred Grid',
        'Shadow Depth',
        'Prism Split',
      ]
      for (const title of titles) {
        expect(screen.getByText(title)).toBeInTheDocument()
      }
    })

    it('renders all gallery images with alt text', () => {
      render(<GalleryPage />)
      const images = screen.getAllByRole('img')
      expect(images.length).toBe(8)
      for (const img of images) {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).not.toBe('')
      }
    })

    it('renders family labels for each item', () => {
      render(<GalleryPage />)
      const familyLabels = screen.getAllByText('Logotopia')
      expect(familyLabels.length).toBe(8)
    })
  })

  it('renders main element', () => {
    render(<GalleryPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
