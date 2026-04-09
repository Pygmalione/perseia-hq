import { describe, expect, it } from 'vitest'

import { filterBrainAssets } from './brain-search'

const assets = [
  { title: 'Signal Aperture', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
  { title: 'Neural Topology', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
  { title: 'Weekly PDF', kind: 'pdf', project: 'Ops', date: '2026-04-07' },
]

describe('filterBrainAssets', () => {
  it('filters by free-text query', () => {
    const result = filterBrainAssets(assets, 'signal', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Signal Aperture')
  })

  it('filters by facet', () => {
    const result = filterBrainAssets(assets, '', 'pdf')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Weekly PDF')
  })

  it('filters logotopia facet by project', () => {
    const result = filterBrainAssets(assets, '', 'logotopia')
    expect(result).toHaveLength(2)
  })
})
