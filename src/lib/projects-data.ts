import { getDb } from './db'

export type ProjectCard = {
  id: string
  title: string
  status: string
  tasks: { done: number; total: number }
  updated: string
}

export type ProjectsSummary = {
  totalProjects: number
  projects: ProjectCard[]
}

export const fallbackProjectsSummary: ProjectsSummary = {
  totalProjects: 4,
  projects: [
    {
      id: 'E1',
      title: 'Logotopia - pipeline generacji logo Visuana',
      status: 'in-progress',
      tasks: { done: 8, total: 12 },
      updated: '2026-04-08',
    },
    {
      id: 'E2',
      title: 'Perseia HQ - headquarters piękna',
      status: 'in-progress',
      tasks: { done: 18, total: 25 },
      updated: '2026-04-09',
    },
    {
      id: 'E3',
      title: 'Galeria fotografii AI Cesarza',
      status: 'planned',
      tasks: { done: 0, total: 8 },
      updated: '2026-04-05',
    },
    {
      id: 'E4',
      title: 'Design system Imperium',
      status: 'planned',
      tasks: { done: 2, total: 15 },
      updated: '2026-04-01',
    },
  ],
}

export async function getProjectsSummary(): Promise<ProjectsSummary> {
  try {
    const db = getDb()

    const [totalResult, projectRows] = await Promise.all([
      db.execute("SELECT COUNT(*) AS value FROM projects;"),
      db.execute(`
        SELECT id, name, status, updated_at
        FROM projects
        ORDER BY updated_at DESC, id DESC
        LIMIT 4;
      `),
    ])

    if (projectRows.rows.length === 0) {
      return fallbackProjectsSummary
    }

    return {
      totalProjects: Number(totalResult.rows[0]?.value ?? projectRows.rows.length),
      projects: projectRows.rows.map((row) => ({
        id: String(row.id),
        title: String(row.name),
        status: String(row.status),
        tasks: { done: 0, total: 1 },
        updated: String(row.updated_at ?? '1970-01-01').slice(0, 10),
      })),
    }
  } catch {
    return fallbackProjectsSummary
  }
}
