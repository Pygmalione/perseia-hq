import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { AssetUploadPanel } from './asset-upload-panel'

describe('AssetUploadPanel', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('submits selected files to upload intake API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Upload intake przyjęty.' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<AssetUploadPanel />)

    const input = document.getElementById('asset-upload-input') as HTMLInputElement

    const file = new File(['hello'], 'signal-aperture-01.jpg', { type: 'image/jpeg' })
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/uploads/intake',
        expect.objectContaining({ method: 'POST' })
      )
    })

    expect(await screen.findByText(/upload intake przyjęty/i)).toBeInTheDocument()
    expect(screen.getByText(/signal-aperture-01.jpg/i)).toBeInTheDocument()
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
