import { describe, expect, it } from 'vitest'

import { getBrainSummary } from './brain-data'

describe('getBrainSummary', () => {
  it('returns stats and recent assets from the real sqlite database', async () => {
    const summary = await getBrainSummary()

    expect(summary.stats).toHaveLength(4)
    expect(summary.stats[0].label).toBe('Assetów total')
    expect(Number(summary.stats[0].value)).toBeGreaterThan(0)

    expect(summary.stats[1].label).toBe('Obrazy')
    expect(Number(summary.stats[1].value)).toBeGreaterThan(0)

    expect(summary.stats[2].label).toBe('Wideo')
    expect(Number(summary.stats[2].value)).toBeGreaterThanOrEqual(0)

    expect(summary.stats[3].label).toBe('PDF / doc')
    expect(Number(summary.stats[3].value)).toBeGreaterThanOrEqual(0)

    expect(summary.recentAssets.length).toBeGreaterThan(0)
    expect(summary.recentAssets.length).toBeLessThanOrEqual(6)

    for (const asset of summary.recentAssets) {
      expect(asset.title.length).toBeGreaterThan(0)
      expect(asset.kind.length).toBeGreaterThan(0)
      expect(asset.project.length).toBeGreaterThan(0)
      expect(asset.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})
