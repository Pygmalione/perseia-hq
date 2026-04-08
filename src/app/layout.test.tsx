import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock next/font/google to avoid network requests and happy-dom incompatibilities
vi.mock('next/font/google', () => ({
  Cormorant_Garamond: () => ({ variable: '--font-display' }),
  Manrope: () => ({ variable: '--font-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}))

vi.mock('@/components/global-nav', () => ({
  GlobalNav: () => <div data-testid="global-nav">Global nav</div>,
}))

import RootLayout, { metadata } from './layout'

describe('RootLayout metadata', () => {
  it('has the correct page title', () => {
    expect(metadata.title).toBe('Imperialska Galeria Persei')
  })

  it('has the correct page description', () => {
    expect(metadata.description).toBe(
      'Ciepła, kuratorska galeria cyfrowa zbudowana według standardów kwietnia 2026.'
    )
  })
})

describe('RootLayout component', () => {
  it('renders children inside the layout', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">test child</div>
      </RootLayout>
    )
    expect(screen.getByTestId('global-nav')).toBeInTheDocument()
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('test child')).toBeInTheDocument()
  })

  it('applies correct attributes and classes to the html and body elements', () => {
    render(
      <RootLayout>
        <span />
      </RootLayout>
    )
    const html = document.documentElement
    const body = document.body
    expect(html).toHaveAttribute('lang', 'pl')
    expect(html.className).toContain('antialiased')
    expect(html.className).toContain('h-full')
    expect(html.className).toContain('--font-display')
    expect(html.className).toContain('--font-sans')
    expect(html.className).toContain('--font-geist-mono')
    expect(body.className).toContain('min-h-full')
    expect(body.className).toContain('flex')
    expect(body.className).toContain('flex-col')
  })

  it('renders multiple children correctly', () => {
    render(
      <RootLayout>
        <header data-testid="header">Header</header>
        <main data-testid="main">Main</main>
        <footer data-testid="footer">Footer</footer>
      </RootLayout>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('main')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})