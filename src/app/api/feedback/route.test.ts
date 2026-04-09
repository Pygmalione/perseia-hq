import { beforeEach, describe, expect, it, vi } from 'vitest'

const executeMock = vi.fn()

vi.mock('@/lib/db', () => ({
  getDb: () => ({ execute: executeMock }),
}))

describe('POST /api/feedback', () => {
  beforeEach(() => {
    executeMock.mockReset()
  })

  it('persists scored feedback with summary and raw text', async () => {
    executeMock.mockResolvedValueOnce({ rowsAffected: 1 })

    const { POST } = await import('./route')

    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        assetId: 'asset-1',
        rating: 8,
        note: 'mocny kierunek',
        author: 'Karol',
        sourceChannel: 'telegram',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(executeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        sql: expect.stringContaining('INSERT INTO feedback'),
        args: expect.arrayContaining([
          'asset-1',
          'Karol',
          'telegram',
          'Ocena 8/10 - mocny kierunek',
          'mocny kierunek',
        ]),
      })
    )
  })

  it('rejects invalid rating payload', async () => {
    const { POST } = await import('./route')

    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ assetId: 'asset-1', rating: 11 }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toEqual({ ok: false, error: 'invalid_payload' })
    expect(executeMock).not.toHaveBeenCalled()
  })
})
