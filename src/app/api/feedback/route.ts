import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import { getDb } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const feedbackId = randomUUID()
    const assetId = String(body.assetId ?? '')
    const rating = Number(body.rating ?? 0)
    const note = String(body.note ?? '')
    const author = String(body.author ?? 'unknown')
    const sourceChannel = String(body.sourceChannel ?? 'web')

    if (!assetId || rating < 1 || rating > 10) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
    }

    const summary = note ? `Ocena ${rating}/10 - ${note}` : `Ocena ${rating}/10`

    const db = getDb()
    await db.execute({
      sql: `INSERT INTO feedback (id, asset_id, author, source_channel, sentiment, summary, raw_text) VALUES (?, ?, ?, ?, 'scored', ?, ?)`,
      args: [feedbackId, assetId, author, sourceChannel, summary, note],
    })

    return NextResponse.json({ ok: true, feedbackId, rating })
  } catch (error) {
    console.error('Feedback write failed:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      vercel: Boolean(process.env.VERCEL),
      hasUrl: Boolean(process.env.TURSO_DATABASE_URL),
      hasToken: Boolean(process.env.TURSO_AUTH_TOKEN),
    })
    return NextResponse.json({ ok: false, error: 'feedback_write_failed' }, { status: 500 })
  }
}
