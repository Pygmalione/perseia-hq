import { getDb } from './db'

export type BrainAssetRow = {
  title: string
  kind: string
  project: string
  date: string
}

export type BrainStat = {
  label: string
  value: string
}

export type BrainSummary = {
  stats: BrainStat[]
  recentAssets: BrainAssetRow[]
}

const fallbackSummary: BrainSummary = {
  stats: [
    { label: 'Assetów total', value: '312' },
    { label: 'Obrazy', value: '299' },
    { label: 'Wideo', value: '8' },
    { label: 'PDF / doc', value: '5' },
  ],
  recentAssets: [
    { title: 'Arch Monogram', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
    { title: 'Constellation Weave', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
    { title: 'Orbital Ring', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
    { title: 'Folded Plane', kind: 'image', project: 'Logotopia', date: '2026-04-09' },
    { title: 'Signal Aperture', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
    { title: 'Neural Topology', kind: 'image', project: 'Logotopia', date: '2026-04-08' },
  ],
}

export async function getBrainSummary(): Promise<BrainSummary> {
  try {
    const db = getDb()

    const [totalResult, imageResult, videoResult, docResult] = await Promise.all([
      db.execute("SELECT COUNT(*) AS value FROM assets;"),
      db.execute("SELECT COUNT(*) AS value FROM assets WHERE kind = 'image';"),
      db.execute("SELECT COUNT(*) AS value FROM assets WHERE kind = 'video';"),
      db.execute("SELECT COUNT(*) AS value FROM assets WHERE kind IN ('pdf', 'doc');"),
    ])

    const recentResult = await db.execute(`
      SELECT
        COALESCE(title, 'Untitled asset') AS title,
        COALESCE(kind, 'unknown') AS kind,
        COALESCE(project_id, 'Bez projektu') AS project,
        substr(COALESCE(created_at, '1970-01-01'), 1, 10) AS date
      FROM assets
      ORDER BY created_at DESC, id DESC
      LIMIT 6;
    `)

    const recentAssets: BrainAssetRow[] = recentResult.rows.map((row) => ({
      title: String(row.title ?? 'Untitled asset'),
      kind: String(row.kind ?? 'unknown'),
      project: String(row.project ?? 'Bez projektu'),
      date: String(row.date ?? '1970-01-01'),
    }))

    return {
      stats: [
        { label: 'Assetów total', value: String(totalResult.rows[0]?.value ?? 0) },
        { label: 'Obrazy', value: String(imageResult.rows[0]?.value ?? 0) },
        { label: 'Wideo', value: String(videoResult.rows[0]?.value ?? 0) },
        { label: 'PDF / doc', value: String(docResult.rows[0]?.value ?? 0) },
      ],
      recentAssets,
    }
  } catch {
    return fallbackSummary
  }
}

export { fallbackSummary }
