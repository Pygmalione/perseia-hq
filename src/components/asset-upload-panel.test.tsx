import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { AssetUploadPanel } from './asset-upload-panel'

describe('AssetUploadPanel', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('submits selected files to upload intake API', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          files: [
            {
              name: 'signal-aperture-01.jpg',
              size: 5,
              mimeType: 'image/jpeg',
              kind: 'image',
              uploadKey: 'pending/abc-signal-aperture-01.jpg',
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          asset: {
            id: 'asset-1',
            title: 'signal-aperture-01.jpg',
            kind: 'image',
            path: 'pending/abc-signal-aperture-01.jpg',
            format: 'image/jpeg',
            size: 5,
            status: 'pending-ingest',
          },
        }),
      })
    vi.stubGlobal('fetch', fetchMock)

    render(<AssetUploadPanel />)

    const input = document.getElementById('asset-upload-input') as HTMLInputElement

    const file = new File(['hello'], 'signal-aperture-01.jpg', { type: 'image/jpeg' })
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        '/api/uploads/intake',
        expect.objectContaining({ method: 'POST' })
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        '/api/uploads/commit',
        expect.objectContaining({ method: 'POST' })
      )
    })

    expect(await screen.findByText(/zapisany w hq jako signal-aperture-01.jpg/i)).toBeInTheDocument()
    expect(screen.getByText(/image - 0 kb/i)).toBeInTheDocument()
  })

  it('shows validation message for oversized files', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'file_too_large' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<AssetUploadPanel />)

    const input = document.getElementById('asset-upload-input') as HTMLInputElement
    const file = new File(['x'], 'too-big.mov', { type: 'video/quicktime' })
    Object.defineProperty(file, 'size', { value: 15 * 1024 * 1024 })
    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/przekracza limit 10 mb/i)).toBeInTheDocument()
  })
})
