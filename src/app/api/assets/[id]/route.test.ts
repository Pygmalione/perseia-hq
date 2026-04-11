import { beforeEach, describe, expect, it, vi } from 'vitest'

const executeMock = vi.fn()

vi.mock('@/lib/db', () => ({
  getDb: () => ({ execute: executeMock }),
}))

describe('PATCH /api/assets/[id]', () => {
  beforeEach(() => {
    executeMock.mockReset()
  })

  it('updates asset status when payload is valid', async () => {
    executeMock.mockResolvedValueOnce({ rowsAffected: 1 })

    const { PATCH } = await import('./route')

    const request = new Request('http://localhost/api/assets/asset-1', {
      method: 'PATCH',
      body: JSON.stringify({ status: 'approved' }),
    })

    const response = await PATCH(request, { params: Promise.resolve({ id: 'asset-1' }) })
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ ok: true, assetId: 'asset-1', status: 'approved' })
    expect(executeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        sql: expect.stringContaining('UPDATE assets'),
        args: ['approved', 'asset-1'],
      })
    )
  })

  it('rejects invalid status payload', async () => {
    const { PATCH } = await import('./route')

    const request = new Request('http://localhost/api/assets/asset-1', {
      method: 'PATCH',
      body: JSON.stringify({ status: 'weird' }),
    })

    const response = await PATCH(request, { params: Promise.resolve({ id: 'asset-1' }) })
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ ok: false, error: 'invalid_payload' })
    expect(executeMock).not.toHaveBeenCalled()
  })
})
