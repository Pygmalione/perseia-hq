import { beforeEach, describe, expect, it, vi } from 'vitest'

const putMock = vi.fn()

vi.mock('@vercel/blob', () => ({
  put: putMock,
}))

describe('POST /api/uploads/blob', () => {
  beforeEach(() => {
    putMock.mockReset()
  })

  it('uploads base64 payload to vercel blob', async () => {
    putMock.mockResolvedValue({
      url: 'https://blob.vercel-storage.com/hq-uploads/signal-aperture-01.jpg',
      pathname: 'hq-uploads/signal-aperture-01.jpg',
    })

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/uploads/blob', {
      method: 'POST',
      body: JSON.stringify({
        name: 'signal-aperture-01.jpg',
        contentType: 'image/jpeg',
        dataBase64: Buffer.from('hello').toString('base64'),
        kind: 'image',
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.ok).toBe(true)
    expect(body.blob.pathname).toContain('hq-uploads/')
    expect(putMock).toHaveBeenCalled()
  })

  it('rejects invalid blob payload', async () => {
    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/uploads/blob', {
      method: 'POST',
      body: JSON.stringify({ name: '', dataBase64: '' }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ ok: false, error: 'invalid_payload' })
    expect(putMock).not.toHaveBeenCalled()
  })
})
