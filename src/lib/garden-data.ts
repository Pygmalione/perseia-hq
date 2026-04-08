import { getDb } from './db'

export type GardenEntry = {
  id: string
  kind: 'preference' | 'rule' | 'person'
  title: string
  scope: string
  description: string
  source: string
}

export type GardenSummary = {
  totalEntries: number
  totalPreferences: number
  totalFeedback: number
  entries: GardenEntry[]
}

const fallbackEntries: GardenEntry[] = [
  {
    id: 'pref-warm-tones',
    kind: 'preference',
    title: 'Ciepłe tony dominujące',
    scope: 'global',
    description: 'Cesarz preferuje ciepłą paletę: złoto, bursztyn, miedź. Zimne błękity tylko jako akcent kontrastowy.',
    source: 'Feedback z sesji Logotopii 2026-04',
  },
  {
    id: 'pref-no-ornament',
    kind: 'preference',
    title: 'Minimalizm bez ornamentów',
    scope: 'brand',
    description: 'Logo i znaki graficzne muszą być czyste geometrycznie. Zero herbów, tarcz, wstęg ani filigranów.',
    source: 'Dekret Cesarza 2026-03',
  },
  {
    id: 'pref-sentence-case',
    kind: 'rule',
    title: 'Sentence case obowiązkowy',
    scope: 'global',
    description: 'Wszystkie nagłówki i etykiety w sentence case. Wielka litera tylko na początku zdania i w nazwach własnych.',
    source: 'SOUL.md',
  },
  {
    id: 'rel-karol',
    kind: 'person',
    title: 'Karol Dębkowski (Cesarz)',
    scope: 'person',
    description: 'Właściciel Visuana, decydent końcowy. Ton: ciepły, konkretny, zero korpo-gadki. ADHD-friendly: krótkie akapity, pogrubienia, max 3 action items.',
    source: 'USER.md',
  },
  {
    id: 'rel-jadzia',
    kind: 'person',
    title: 'Jadzia Kim',
    scope: 'person',
    description: 'Content creator ~500k followers. Potrzebuje jasnego kontekstu, nadwrażliwość sensoryczna. Profesjonalny partnership aktywny.',
    source: 'USER.md',
  },
]

export const fallbackGardenSummary: GardenSummary = {
  totalEntries: fallbackEntries.length,
  totalPreferences: 2,
  totalFeedback: 0,
  entries: fallbackEntries,
}

export async function getGardenSummary(): Promise<GardenSummary> {
  try {
    const db = getDb()

    const [totalPrefResult, totalFeedbackResult] = await Promise.all([
      db.execute("SELECT COUNT(*) AS value FROM preference_rules;"),
      db.execute("SELECT COUNT(*) AS value FROM feedback;"),
    ])

    const entriesResult = await db.execute(`
      SELECT id, scope, name, rule_text, strength, status
      FROM preference_rules
      ORDER BY strength DESC, id DESC
      LIMIT 5;
    `)

    if (entriesResult.rows.length === 0) {
      return fallbackGardenSummary
    }

    const entries: GardenEntry[] = entriesResult.rows.map((row) => ({
      id: String(row.id),
      kind: String(row.scope) === 'person' ? 'person' : String(row.scope) === 'global' ? 'rule' : 'preference',
      title: String(row.name),
      scope: String(row.scope),
      description: String(row.rule_text),
      source: row.status ? `SQLite - ${row.status}` : 'SQLite',
    }))

    return {
      totalEntries: entries.length,
      totalPreferences: Number(totalPrefResult.rows[0]?.value ?? 0),
      totalFeedback: Number(totalFeedbackResult.rows[0]?.value ?? 0),
      entries,
    }
  } catch {
    return fallbackGardenSummary
  }
}
