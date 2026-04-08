import { randomUUID } from 'node:crypto'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'

import { NextResponse } from 'next/server'

function projectRoot() {
  return path.resolve(process.cwd())
}

function dbPath() {
  return path.join(projectRoot(), 'state', 'hq.sqlite')
}

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
    childProcess.execFileSync(
      'sqlite3',
      [
        dbPath(),
        `INSERT INTO feedback (id, asset_id, author, source_channel, sentiment, summary, raw_text) VALUES ('${feedbackId.replace(/'/g, "''")}', '${assetId.replace(/'/g, "''")}', '${author.replace(/'/g, "''")}', '${sourceChannel.replace(/'/g, "''")}', 'scored', '${summary.replace(/'/g, "''")}', '${note.replace(/'/g, "''")}');`,
      ],
      { cwd: projectRoot(), encoding: 'utf8' }
    )

    return NextResponse.json({ ok: true, feedbackId, rating })
  } catch {
    return NextResponse.json({ ok: false, error: 'feedback_write_failed' }, { status: 500 })
  }
}
