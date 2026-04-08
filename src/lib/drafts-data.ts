import { getDb } from './db'

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

export async function getDraftsSummary(): Promise<DraftsSummary> {
  try {
    const db = getDb()

    const [draftResult, profileResult] = await Promise.all([
      db.execute("SELECT COUNT(*) AS value FROM drafts;"),
      db.execute("SELECT COUNT(*) AS value FROM person_profiles;"),
    ])

    const presetsResult = await db.execute(`
      SELECT id, name, role
      FROM person_profiles
      ORDER BY updated_at DESC, id DESC
      LIMIT 3;
    `)

    if (presetsResult.rows.length === 0) {
      return fallbackDraftsSummary
    }

    return {
      draftsTotal: Number(draftResult.rows[0]?.value ?? 0),
      profilesTotal: Number(profileResult.rows[0]?.value ?? 0),
      presets: presetsResult.rows.map((row) => ({
        id: String(row.id),
        label: `${row.name} - ${row.role ?? 'profil kontaktu'}`,
        person: String(row.name),
      })),
    }
  } catch {
    return fallbackDraftsSummary
  }
}
