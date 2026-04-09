import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}))

import { HqSearchForm } from './hq-search-form'

describe('HqSearchForm', () => {
  it('renders mobile-friendly facet controls', () => {
    render(<HqSearchForm suggestions={['Signal Aperture']} />)

    const allButton = screen.getByRole('button', { name: 'Wszystko' })
    const imageButton = screen.getByRole('button', { name: 'Obrazy' })

    expect(allButton.className).toContain('min-h-11')
    expect(allButton.className).toContain('justify-center')
    expect(imageButton.className).toContain('min-h-11')
  })

  it('keeps suggestion chips touch-friendly and navigates on tap', () => {
    render(<HqSearchForm suggestions={['Signal Aperture']} />)

    const suggestion = screen.getByRole('button', { name: 'Signal Aperture' })
    expect(suggestion.className).toContain('min-h-11')

    fireEvent.click(suggestion)
    expect(push).toHaveBeenCalledWith('/brain?q=Signal+Aperture')
  })
})
