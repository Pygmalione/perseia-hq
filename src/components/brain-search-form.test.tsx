import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/brain',
  useSearchParams: () => new URLSearchParams('facet=image'),
}))

import { BrainSearchForm } from './brain-search-form'

describe('BrainSearchForm', () => {
  it('renders suggestion chips', () => {
    render(
      <BrainSearchForm
        initialQuery=""
        initialFacet="image"
        suggestions={['Signal Aperture', 'Logotopia']}
      />
    )

    expect(screen.getByRole('button', { name: 'Signal Aperture' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Logotopia' }).length).toBeGreaterThanOrEqual(1)
  })

  it('preserves facet when clicking a suggestion chip', () => {
    render(
      <BrainSearchForm
        initialQuery=""
        initialFacet="image"
        suggestions={['Signal Aperture']}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Signal Aperture' }))
    expect(push).toHaveBeenCalledWith('/brain?facet=image&q=Signal+Aperture')
  })
})
