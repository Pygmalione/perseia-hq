import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { ThemeToggle } from './theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    window.localStorage.clear()
  })

  it('starts in light mode by default', () => {
    render(<ThemeToggle />)

    expect(screen.getByRole('button', { name: /przełącz na tryb ciemny/i })).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggles dark mode and persists preference', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button', { name: /przełącz na tryb ciemny/i }))

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.localStorage.getItem('perseia-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: /przełącz na tryb jasny/i })).toBeInTheDocument()
  })
})
