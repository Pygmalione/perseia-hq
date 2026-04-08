import { describe, expect, it } from 'vitest'

import { fallbackDraftsSummary, getDraftsSummary } from './drafts-data'

describe('getDraftsSummary', () => {
  it('returns a valid drafts summary from sqlite or fallback', async () => {
    const summary = await getDraftsSummary()

    expect(summary.draftsTotal).toBeGreaterThanOrEqual(0)
    expect(summary.profilesTotal).toBeGreaterThanOrEqual(0)
    expect(summary.presets.length).toBeGreaterThan(0)
    expect(summary.presets.length).toBeLessThanOrEqual(3)
  })

  it('ships a fallback drafts summary', () => {
    expect(fallbackDraftsSummary.presets[0].person).toBe('Karol Dębkowski')
  })
})
