import { describe, expect, it } from 'vitest'

import { fallbackGardenSummary, getGardenSummary } from './garden-data'

describe('getGardenSummary', () => {
  it('returns a valid garden summary from sqlite or fallback', async () => {
    const summary = await getGardenSummary()

    expect(summary.totalEntries).toBeGreaterThan(0)
    expect(summary.totalEntries).toBe(summary.entries.length)
    expect(summary.totalPreferences).toBeGreaterThanOrEqual(0)
    expect(summary.totalFeedback).toBeGreaterThanOrEqual(0)

    for (const entry of summary.entries) {
      expect(entry.id.length).toBeGreaterThan(0)
      expect(entry.title.length).toBeGreaterThan(0)
      expect(entry.description.length).toBeGreaterThan(0)
      expect(['preference', 'rule', 'person']).toContain(entry.kind)
    }
  })

  it('ships a meaningful fallback summary', () => {
    expect(fallbackGardenSummary.totalEntries).toBe(5)
    expect(fallbackGardenSummary.entries[0].title).toBe('Ciepłe tony dominujące')
  })
})
