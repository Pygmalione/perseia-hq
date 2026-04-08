import * as childProcess from 'node:child_process'
import * as path from 'node:path'

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

export async function getProjectsSummary(): Promise<ProjectsSummary> {
  try {
    const totalRows = queryJson<{ value: number }>("SELECT COUNT(*) AS value FROM projects;")
    const projectRows = queryJson<{ id: string; name: string; status: string; updated_at: string | null }>(`
      SELECT id, name, status, updated_at
      FROM projects
      ORDER BY updated_at DESC, id DESC
      LIMIT 4;
    `)

    if (projectRows.length === 0) {
      return fallbackProjectsSummary
    }

    return {
      totalProjects: totalRows[0]?.value ?? projectRows.length,
      projects: projectRows.map((project) => ({
        id: project.id,
        title: project.name,
        status: project.status,
        tasks: { done: 0, total: 1 },
        updated: (project.updated_at ?? '1970-01-01').slice(0, 10),
      })),
    }
  } catch {
    return fallbackProjectsSummary
  }
}
