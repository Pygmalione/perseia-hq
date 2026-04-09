import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

const allowedKinds = ['image', 'video', 'pdf'] as const

type UploadKind = (typeof allowedKinds)[number]

type UploadItem = {
  name: string
  size: number
  mimeType: string
  kind: UploadKind
}

type UploadPayloadItem = {
  name?: unknown
  size?: unknown
  mimeType?: unknown
  kind?: unknown
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const files = Array.isArray(body.files) ? body.files : []

    if (files.length === 0) {
      return NextResponse.json({ ok: false, error: 'missing_files' }, { status: 400 })
    }

    const normalized = files.map((file: UploadPayloadItem): UploadItem | null => {
      const name = String(file?.name ?? '').trim()
      const size = Number(file?.size ?? 0)
      const mimeType = String(file?.mimeType ?? '').trim()
      const kind = String(file?.kind ?? '').trim() as UploadKind

      if (!name || !size || !mimeType || !allowedKinds.includes(kind)) {
        return null
      }

      return { name, size, mimeType, kind }
    })

    if (normalized.some((item: UploadItem | null) => item === null)) {
      return NextResponse.json({ ok: false, error: 'invalid_file_payload' }, { status: 400 })
    }

    const accepted = normalized as UploadItem[]
    const oversized = accepted.find((file: UploadItem) => file.size > 10 * 1024 * 1024)

    if (oversized) {
      return NextResponse.json(
        { ok: false, error: 'file_too_large', file: oversized.name },
        { status: 400 }
      )
    }

    return NextResponse.json({
      ok: true,
      intakeId: randomUUID(),
      status: 'accepted',
      files: accepted.map((file: UploadItem) => ({
        ...file,
        uploadKey: `pending/${randomUUID()}-${file.name}`,
      })),
      message: 'Upload intake przyjety. Kolejny krok: blob/storage write + ingest assetu.',
    })
  } catch (error) {
    console.error('Upload intake failed:', error)
    return NextResponse.json({ ok: false, error: 'upload_intake_failed' }, { status: 500 })
  }
}
