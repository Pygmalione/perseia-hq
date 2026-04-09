import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import { getDb } from '@/lib/db'

type CommitPayload = {
  uploadKey?: unknown
  title?: unknown
  kind?: unknown
  mimeType?: unknown
  size?: unknown
  projectId?: unknown
}

const allowedKinds = ['image', 'video', 'pdf'] as const

type AssetKind = (typeof allowedKinds)[number]

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CommitPayload
    const uploadKey = String(body.uploadKey ?? '').trim()
    const title = String(body.title ?? '').trim()
    const kind = String(body.kind ?? '').trim() as AssetKind
    const mimeType = String(body.mimeType ?? '').trim()
    const size = Number(body.size ?? 0)
    const projectId = String(body.projectId ?? '').trim() || null

    if (!uploadKey || !title || !mimeType || !size || !allowedKinds.includes(kind)) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
    }

    const assetId = randomUUID()
    const db = getDb()

    await db.execute({
      sql: `INSERT INTO assets (id, kind, path, title, status, format, project_id, created_at) VALUES (?, ?, ?, ?, 'pending-ingest', ?, ?, CURRENT_TIMESTAMP)`,
      args: [assetId, kind, uploadKey, title, mimeType, projectId],
    })

    return NextResponse.json({
      ok: true,
      assetId,
      asset: {
        id: assetId,
        title,
        kind,
        path: uploadKey,
        format: mimeType,
        size,
        status: 'pending-ingest',
      },
    })
  } catch (error) {
    console.error('Upload commit failed:', error)
    return NextResponse.json({ ok: false, error: 'upload_commit_failed' }, { status: 500 })
  }
}
