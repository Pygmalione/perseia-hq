import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/brain-data', () => ({
  getBrainSearchRows: vi.fn(async () => [
    { title: 'Signal Aperture', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
    { title: 'Weekly PDF', kind: 'pdf', project: 'Ops', date: '2026-04-07' },
  ]),
}))

import { GET } from './route'

describe('/api/search', () => {
  it('returns filtered results by query and facet', async () => {
    const request = new Request('https://example.com/api/search?q=signal&facet=image')
    const response = await GET(request)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json.total).toBe(1)
    expect(json.results[0].title).toBe('Signal Aperture')
  })
})
