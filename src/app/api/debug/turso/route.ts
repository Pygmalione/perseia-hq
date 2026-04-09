import { NextResponse } from 'next/server'

import { getDb } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const db = getDb()
    const ping = await db.execute('SELECT 1 AS ok')
    const assetCount = await db.execute('SELECT COUNT(*) AS value FROM assets')
    const feedbackCount = await db.execute('SELECT COUNT(*) AS value FROM feedback')

    return NextResponse.json({
      ok: true,
      vercel: Boolean(process.env.VERCEL),
      hasUrl: Boolean(process.env.TURSO_DATABASE_URL),
      hasToken: Boolean(process.env.TURSO_AUTH_TOKEN),
      ping: Number(ping.rows[0]?.ok ?? 0),
      assetCount: Number(assetCount.rows[0]?.value ?? 0),
      feedbackCount: Number(feedbackCount.rows[0]?.value ?? 0),
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        vercel: Boolean(process.env.VERCEL),
        hasUrl: Boolean(process.env.TURSO_DATABASE_URL),
        hasToken: Boolean(process.env.TURSO_AUTH_TOKEN),
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
