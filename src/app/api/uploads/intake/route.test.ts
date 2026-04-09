import { describe, expect, it } from 'vitest'

import { POST } from './route'

describe('/api/uploads/intake', () => {
  it('accepts valid upload intake payload', async () => {
    const request = new Request('https://example.com/api/uploads/intake', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        files: [
          {
            name: 'signal-aperture-01.jpg',
            size: 1_024_000,
            mimeType: 'image/jpeg',
            kind: 'image',
          },
        ],
      }),
    })

    const response = await POST(request)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json.ok).toBe(true)
    expect(json.status).toBe('accepted')
    expect(json.files[0].name).toBe('signal-aperture-01.jpg')
    expect(json.files[0].uploadKey).toMatch(/^pending\//)
  })

  it('rejects files above 10 MB', async () => {
    const request = new Request('https://example.com/api/uploads/intake', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        files: [
          {
            name: 'too-big.mov',
            size: 15 * 1024 * 1024,
            mimeType: 'video/quicktime',
            kind: 'video',
          },
        ],
      }),
    })

    const response = await POST(request)
    const json = await response.json()

    expect(response.status).toBe(400)
    expect(json.error).toBe('file_too_large')
    expect(json.file).toBe('too-big.mov')
  })
})
