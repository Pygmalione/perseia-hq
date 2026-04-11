import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BrainAssetTable } from './brain-asset-table'

const assets = [
  {
    id: 'asset-1',
    title: 'Signal Aperture',
    kind: 'image',
    project: 'Logotopia',
    date: '2026-04-08',
    status: 'pending-ingest',
  },
]

describe('BrainAssetTable', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders status badge for asset rows', () => {
    render(<BrainAssetTable assets={assets} />)
    expect(screen.getByText(/pending-ingest/i)).toBeInTheDocument()
  })

  it('updates asset status from quick action', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, assetId: 'asset-1', status: 'approved' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<BrainAssetTable assets={assets} />)
    fireEvent.click(screen.getByRole('button', { name: /zatwierdź signal aperture/i }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/assets/asset-1',
        expect.objectContaining({ method: 'PATCH' })
      )
    })

    expect(await screen.findByText((content, element) => content === 'approved' && element?.tagName === 'SPAN')).toBeInTheDocument()
  })
})
