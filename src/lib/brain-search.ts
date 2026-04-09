import type { BrainAssetRow } from './brain-data'

export function filterBrainAssets(
  assets: BrainAssetRow[],
  query: string,
  facet: string
): BrainAssetRow[] {
  const normalizedQuery = query.trim().toLowerCase()
  const normalizedFacet = facet.trim().toLowerCase()

  return assets.filter((asset) => {
    const matchesQuery =
      !normalizedQuery ||
      [asset.title, asset.kind, asset.project, asset.date]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)

    const matchesFacet =
      !normalizedFacet ||
      normalizedFacet === 'all' ||
      (normalizedFacet === 'logotopia'
        ? asset.project.toLowerCase().includes('logotopia')
        : normalizedFacet === 'feedback'
          ? asset.kind.toLowerCase().includes('feedback')
          : asset.kind.toLowerCase() === normalizedFacet)

    return matchesQuery && matchesFacet
  })
}
