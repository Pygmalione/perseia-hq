import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

import { GlobalNav } from './global-nav'

describe('GlobalNav', () => {
  it('renders the theme toggle', () => {
    render(<GlobalNav />)
    expect(screen.getByRole('button', { name: /przełącz na tryb ciemny/i })).toBeInTheDocument()
  })
})
