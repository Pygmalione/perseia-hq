import * as childProcess from 'node:child_process'
import * as path from 'node:path'

export type DraftPreset = {
  id: string
  label: string
  person: string
}

export type DraftsSummary = {
  draftsTotal: number
  profilesTotal: number
  presets: DraftPreset[]
}

export const fallbackDraftsSummary: DraftsSummary = {
  draftsTotal: 0,
  profilesTotal: 0,
  presets: [
    { id: 'p1', label: 'Karol - ciepły, konkretny', person: 'Karol Dębkowski' },
    { id: 'p2', label: 'Jadzia - jasny kontekst', person: 'Jadzia Kim' },
    { id: 'p3', label: 'Klient - premium, profesjonalny', person: 'Klient zewnętrzny' },
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

export async function getDraftsSummary(): Promise<DraftsSummary> {
  try {
    const draftRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM drafts;")
    const profileRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM person_profiles;")
    const profilePresets = queryJson<{ id: string; name: string; role: string | null }>(`
      SELECT id, name, role
      FROM person_profiles
      ORDER BY updated_at DESC, id DESC
      LIMIT 3;
    `)

    if (profilePresets.length === 0) {
      return fallbackDraftsSummary
    }

    return {
      draftsTotal: draftRows[0]?.value ?? 0,
      profilesTotal: profileRows[0]?.value ?? 0,
      presets: profilePresets.map((profile) => ({
        id: profile.id,
        label: `${profile.name} - ${profile.role ?? 'profil kontaktu'}`,
        person: profile.name,
      })),
    }
  } catch {
    return fallbackDraftsSummary
  }
}
