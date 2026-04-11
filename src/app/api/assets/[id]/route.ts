import { NextResponse } from 'next/server'

import { getDb } from '@/lib/db'

const allowedStatuses = ['pending-ingest', 'approved', 'reviewed', 'archived'] as const

type AssetStatus = (typeof allowedStatuses)[number]

type PatchPayload = {
  status?: unknown
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = (await request.json()) as PatchPayload
    const status = String(body.status ?? '').trim() as AssetStatus

    if (!id || !allowedStatuses.includes(status)) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
    }

    const db = getDb()
    await db.execute({
      sql: 'UPDATE assets SET status = ? WHERE id = ?',
      args: [status, id],
    })

    return NextResponse.json({ ok: true, assetId: id, status })
  } catch (error) {
    console.error('Asset status patch failed:', error)
    return NextResponse.json({ ok: false, error: 'asset_update_failed' }, { status: 500 })
  }
}
