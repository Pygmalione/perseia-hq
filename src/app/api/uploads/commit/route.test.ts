import { beforeEach, describe, expect, it, vi } from 'vitest'

const executeMock = vi.fn()

vi.mock('@/lib/db', () => ({
  getDb: () => ({ execute: executeMock }),
}))

describe('POST /api/uploads/commit', () => {
  beforeEach(() => {
    executeMock.mockReset()
  })

  it('persists accepted upload metadata into assets table', async () => {
    const { POST } = await import('./route')

    const request = new Request('http://localhost/api/uploads/commit', {
      method: 'POST',
      body: JSON.stringify({
        uploadKey: 'pending/abc-signal-aperture-01.jpg',
        title: 'Signal aperture 01',
        kind: 'image',
        mimeType: 'image/jpeg',
        size: 1024,
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.ok).toBe(true)
    expect(body.asset.title).toBe('Signal aperture 01')
    expect(executeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        sql: expect.stringContaining('INSERT INTO assets'),
      })
    )
  })

  it('rejects invalid payload', async () => {
    const { POST } = await import('./route')

    const request = new Request('http://localhost/api/uploads/commit', {
      method: 'POST',
      body: JSON.stringify({ uploadKey: '', title: '' }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ ok: false, error: 'invalid_payload' })
    expect(executeMock).not.toHaveBeenCalled()
  })
})
