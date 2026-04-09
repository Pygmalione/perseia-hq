import { NextResponse } from 'next/server'

import { getBrainSearchRows } from '@/lib/brain-data'
import { filterBrainAssets } from '@/lib/brain-search'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') ?? ''
  const facet = searchParams.get('facet') ?? 'all'
  const limitParam = Number(searchParams.get('limit') ?? '20')
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 20

  const rows = await getBrainSearchRows(limit)
  const results = filterBrainAssets(rows, query, facet)

  return NextResponse.json({
    query,
    facet,
    total: results.length,
    results,
  })
}
