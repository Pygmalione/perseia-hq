import { describe, expect, it } from 'vitest'

import { fallbackProjectsSummary, getProjectsSummary } from './projects-data'

describe('getProjectsSummary', () => {
  it('returns a valid projects summary from sqlite or fallback', async () => {
    const summary = await getProjectsSummary()

    expect(summary.totalProjects).toBeGreaterThan(0)
    expect(summary.projects.length).toBeGreaterThan(0)
    expect(summary.projects.length).toBeLessThanOrEqual(4)
  })

  it('ships a fallback projects summary', () => {
    expect(fallbackProjectsSummary.projects[0].title).toMatch(/Logotopia/)
  })
})
