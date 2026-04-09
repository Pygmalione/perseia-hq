import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

import { allowedUploadKinds, type UploadKind } from '@/lib/upload-kind'

type BlobPayload = {
  name?: unknown
  contentType?: unknown
  dataBase64?: unknown
  kind?: unknown
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BlobPayload
    const name = String(body.name ?? '').trim()
    const contentType = String(body.contentType ?? '').trim()
    const dataBase64 = String(body.dataBase64 ?? '').trim()
    const kind = String(body.kind ?? '').trim() as UploadKind

    if (!name || !contentType || !dataBase64 || !allowedUploadKinds.includes(kind)) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
    }

    const bytes = Buffer.from(dataBase64, 'base64')
    const blob = await put(`hq-uploads/${Date.now()}-${name}`, bytes, {
      access: 'public',
      contentType,
      addRandomSuffix: true,
    })

    return NextResponse.json({
      ok: true,
      blob: {
        url: blob.url,
        pathname: blob.pathname,
        contentType,
        kind,
      },
    })
  } catch (error) {
    console.error('Blob upload failed:', error)
    return NextResponse.json({ ok: false, error: 'blob_upload_failed' }, { status: 500 })
  }
}
