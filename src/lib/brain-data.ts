import * as childProcess from 'node:child_process'
import * as path from 'node:path'

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

function projectRoot() {
  return path.resolve(process.cwd())
}

function dbPath() {
  return path.join(projectRoot(), 'state', 'hq.sqlite')
}

function queryJson<T>(sql: string): T[] {
  const raw = childProcess.execFileSync('sqlite3', ['-json', dbPath(), sql], {
    cwd: projectRoot(),
    encoding: 'utf8',
  })

  return JSON.parse(raw || '[]') as T[]
}

export async function getBrainSummary(): Promise<BrainSummary> {
  try {
    const totalRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM assets;")
    const imageRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM assets WHERE kind = 'image';")
    const videoRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM assets WHERE kind = 'video';")
    const docRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM assets WHERE kind IN ('pdf', 'doc');")

    const recentAssets = queryJson<{
      title: string | null
      kind: string | null
      project: string | null
      date: string | null
    }>(`
      SELECT
        COALESCE(title, 'Untitled asset') AS title,
        COALESCE(kind, 'unknown') AS kind,
        COALESCE(project_id, 'Bez projektu') AS project,
        substr(COALESCE(created_at, '1970-01-01'), 1, 10) AS date
      FROM assets
      ORDER BY created_at DESC, id DESC
      LIMIT 6;
    `).map((row) => ({
      title: row.title ?? 'Untitled asset',
      kind: row.kind ?? 'unknown',
      project: row.project ?? 'Bez projektu',
      date: row.date ?? '1970-01-01',
    }))

    return {
      stats: [
        { label: 'Assetów total', value: String(totalRows[0]?.value ?? 0) },
        { label: 'Obrazy', value: String(imageRows[0]?.value ?? 0) },
        { label: 'Wideo', value: String(videoRows[0]?.value ?? 0) },
        { label: 'PDF / doc', value: String(docRows[0]?.value ?? 0) },
      ],
      recentAssets,
    }
  } catch {
    return fallbackSummary
  }
}

export { fallbackSummary }
