import { render, screen } from '@testing-library/react'
import HqHome from './page'
import { hqConfig } from '@/config/hq'

describe('Perseia HQ homepage', () => {
  it('renders the headquarters headline', () => {
    render(<HqHome />)
    expect(screen.getByRole('heading', { name: /perseia hq/i })).toBeInTheDocument()
  })

  it('renders the eyebrow', () => {
    render(<HqHome />)
    expect(screen.getByText(hqConfig.eyebrow)).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<HqHome />)
    expect(screen.getByText(hqConfig.description)).toBeInTheDocument()
  })

  it('renders the CTA link to gallery', () => {
    render(<HqHome />)
    const cta = screen.getByRole('link', { name: /wejdź do hq/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/gallery')
  })

  describe('navigation', () => {
    it('renders all navigation links', () => {
      render(<HqHome />)
      for (const link of hqConfig.nav.links) {
        const navLink = screen.getByRole('link', { name: link.label })
        expect(navLink).toBeInTheDocument()
        expect(navLink).toHaveAttribute('href', link.href)
      }
    })
  })

  describe('module cards', () => {
    it('renders all module titles', () => {
      const { container } = render(<HqHome />)
      const modulesSection = container.querySelector('#modules')!
      for (const mod of hqConfig.modules) {
        const els = modulesSection.querySelectorAll('*')
        const found = Array.from(els).some((el) => el.textContent === mod.title)
        expect(found).toBe(true)
      }
    })

    it('renders all module descriptions', () => {
      render(<HqHome />)
      for (const mod of hqConfig.modules) {
        expect(screen.getByText(mod.description)).toBeInTheDocument()
      }
    })

    it('renders module stats', () => {
      render(<HqHome />)
      for (const mod of hqConfig.modules) {
        const statElements = screen.getAllByText(mod.stat)
        expect(statElements.length).toBeGreaterThanOrEqual(1)
        const labelElements = screen.getAllByText(mod.statLabel)
        expect(labelElements.length).toBeGreaterThanOrEqual(1)
      }
    })
  })

  describe('principles section', () => {
    it('renders all principles', () => {
      render(<HqHome />)
      for (const principle of hqConfig.principles) {
        expect(screen.getByText(principle)).toBeInTheDocument()
      }
    })

    it('renders the principles heading', () => {
      render(<HqHome />)
      expect(screen.getByRole('heading', { name: /zasady hq/i })).toBeInTheDocument()
    })
  })

  describe('page structure', () => {
    it('renders a main element', () => {
      render(<HqHome />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('renders navigation', () => {
      render(<HqHome />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })
})
