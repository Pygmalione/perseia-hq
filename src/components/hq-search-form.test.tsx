import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}))

import { HqSearchForm } from './hq-search-form'

describe('HqSearchForm', () => {
  it('renders suggestion chips', () => {
    render(<HqSearchForm suggestions={['Signal Aperture', 'Neural Topology']} />)
    expect(screen.getByRole('button', { name: 'Signal Aperture' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Neural Topology' })).toBeInTheDocument()
  })

  it('navigates to brain search after clicking a suggestion chip', () => {
    render(<HqSearchForm suggestions={['Signal Aperture']} />)
    fireEvent.click(screen.getByRole('button', { name: 'Signal Aperture' }))
    expect(push).toHaveBeenCalledWith('/brain?q=Signal+Aperture')
  })
})
