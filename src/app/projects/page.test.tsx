import { render, screen } from '@testing-library/react'
import ProjectsPage from './page'

describe('Projects page', () => {
  it('renders the projects heading', () => {
    render(<ProjectsPage />)
    expect(screen.getByRole('heading', { name: /projekty/i })).toBeInTheDocument()
  })

  it('renders the epics label and count', () => {
    const { container } = render(<ProjectsPage />)
    const section = container.querySelector('#epics-grid')!
    const header = section.querySelector('.border-b')!
    expect(header.textContent).toContain('Epiki')
    expect(header.textContent).toContain('4 projektów')
  })

  describe('epic cards', () => {
    it('renders all epic titles', () => {
      render(<ProjectsPage />)
      expect(screen.getByText(/logotopia/i)).toBeInTheDocument()
      expect(screen.getByText(/perseia hq/i)).toBeInTheDocument()
      expect(screen.getByText(/galeria fotografii/i)).toBeInTheDocument()
      expect(screen.getByText(/design system/i)).toBeInTheDocument()
    })

    it('renders status badges', () => {
      render(<ProjectsPage />)
      const inProgress = screen.getAllByText(/w toku/i)
      expect(inProgress.length).toBe(2)
      const planned = screen.getAllByText(/planowany/i)
      expect(planned.length).toBe(2)
    })

    it('renders progress indicators', () => {
      render(<ProjectsPage />)
      expect(screen.getByText(/8\/12 tasków/)).toBeInTheDocument()
      expect(screen.getByText(/18\/25 tasków/)).toBeInTheDocument()
    })
  })

  it('renders main element', () => {
    render(<ProjectsPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
