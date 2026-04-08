import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('@/lib/projects-data', () => ({
  getProjectsSummary: vi.fn(async () => ({
    totalProjects: 4,
    projects: [
      { id: 'E1', title: 'Logotopia - pipeline generacji logo Visuana', status: 'in-progress', tasks: { done: 8, total: 12 }, updated: '2026-04-08' },
      { id: 'E2', title: 'Perseia HQ - headquarters piękna', status: 'in-progress', tasks: { done: 18, total: 25 }, updated: '2026-04-09' },
      { id: 'E3', title: 'Galeria fotografii AI Cesarza', status: 'planned', tasks: { done: 0, total: 8 }, updated: '2026-04-05' },
      { id: 'E4', title: 'Design system Imperium', status: 'planned', tasks: { done: 2, total: 15 }, updated: '2026-04-01' },
    ],
  })),
}))

import ProjectsPage from './page'

describe('Projects page', () => {
  it('renders the projects heading', async () => {
    render(await ProjectsPage())
    expect(screen.getByRole('heading', { name: /projekty/i })).toBeInTheDocument()
  })

  it('renders the epics label and count', async () => {
    const { container } = render(await ProjectsPage())
    const section = container.querySelector('#epics-grid')!
    const header = section.querySelector('.border-b')!
    expect(header.textContent).toContain('Epiki')
    expect(header.textContent).toContain('4 projektów')
  })

  describe('epic cards', () => {
    it('renders all epic titles', async () => {
      render(await ProjectsPage())
      expect(screen.getByText(/logotopia/i)).toBeInTheDocument()
      expect(screen.getByText(/perseia hq/i)).toBeInTheDocument()
      expect(screen.getByText(/galeria fotografii/i)).toBeInTheDocument()
      expect(screen.getByText(/design system/i)).toBeInTheDocument()
    })

    it('renders status badges', async () => {
      render(await ProjectsPage())
      const inProgress = screen.getAllByText(/w toku/i)
      expect(inProgress.length).toBe(2)
      const planned = screen.getAllByText(/planowany/i)
      expect(planned.length).toBe(2)
    })

    it('renders progress indicators', async () => {
      render(await ProjectsPage())
      expect(screen.getByText(/8\/12 tasków/)).toBeInTheDocument()
      expect(screen.getByText(/18\/25 tasków/)).toBeInTheDocument()
    })
  })

  it('renders main element', async () => {
    render(await ProjectsPage())
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
