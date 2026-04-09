import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { AssetUploadPanel } from './asset-upload-panel'

describe('AssetUploadPanel', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('uploads file to blob then commits to hq', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          blob: {
            url: 'https://blob.vercel-storage.com/hq-uploads/signal-aperture-01.jpg',
            pathname: 'hq-uploads/signal-aperture-01.jpg',
            contentType: 'image/jpeg',
            kind: 'image',
          },
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
            path: 'https://blob.vercel-storage.com/hq-uploads/signal-aperture-01.jpg',
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
        '/api/uploads/blob',
        expect.objectContaining({ method: 'POST' })
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        '/api/uploads/commit',
        expect.objectContaining({ method: 'POST' })
      )
    })

    expect(await screen.findByText(/zapisano w blob i hq jako signal-aperture-01.jpg/i)).toBeInTheDocument()
  })

  it('shows error when blob upload fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'blob_upload_failed' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<AssetUploadPanel />)

    const input = document.getElementById('asset-upload-input') as HTMLInputElement
    const file = new File(['x'], 'test.pdf', { type: 'application/pdf' })
    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/blob storage nie udał się/i)).toBeInTheDocument()
  })
})
