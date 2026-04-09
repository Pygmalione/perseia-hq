'use client'

import { useMemo, useState } from 'react'

type PendingFile = {
  name: string
  size: number
  mimeType: string
  kind: 'image' | 'video' | 'pdf'
}

type IntakeResponse = {
  ok: boolean
  error?: string
  message?: string
  files?: Array<PendingFile & { uploadKey: string }>
}

function detectKind(file: File): PendingFile['kind'] {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  return 'pdf'
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function AssetUploadPanel() {
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'accepted' | 'error'>('idle')
  const [message, setMessage] = useState(
    'Wybierz pliki, a HQ wyśle intake do upload pipeline.'
  )

  const pendingFiles = useMemo<PendingFile[]>(
    () =>
      files.map((file) => ({
        name: file.name,
        size: file.size,
        mimeType: file.type || 'application/octet-stream',
        kind: detectKind(file),
      })),
    [files]
  )

  async function submitIntake(nextFiles: File[]) {
    const payloadFiles = nextFiles.map((file) => ({
      name: file.name,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      kind: detectKind(file),
    }))

    setStatus('sending')
    setMessage('Wysyłam intake do upload pipeline...')

    try {
      const response = await fetch('/api/uploads/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ files: payloadFiles }),
      })

      const data = (await response.json()) as IntakeResponse

      if (!response.ok || !data.ok) {
        setStatus('error')
        setMessage(
          data.error === 'file_too_large'
            ? 'Jeden z plików przekracza limit 10 MB.'
            : 'Intake uploadu nie przeszedł walidacji.'
        )
        return
      }

      setStatus('accepted')
      setMessage(data.message ?? 'Upload intake przyjęty.')
    } catch {
      setStatus('error')
      setMessage('Nie udało się połączyć z upload intake API.')
    }
  }

  function handleFiles(nextFiles: FileList | null) {
    if (!nextFiles || nextFiles.length === 0) return
    const fileArray = Array.from(nextFiles)
    setFiles(fileArray)
    void submitIntake(fileArray)
  }

  return (
    <section
      aria-labelledby="asset-upload-heading"
      className="rounded-[2rem] border border-dashed border-border/80 bg-card/70 p-6 shadow-[var(--shadow-panel)] sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Upload assetów</p>
          <h2
            id="asset-upload-heading"
            className="font-display text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Wrzuć nowe pliki do HQ
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Dropzone przyjmuje obrazy, wideo i PDF-y, a teraz wysyła też prawdziwy intake do pipeline uploadu.
          </p>
          <div className="flex flex-wrap gap-2">
            {['PNG / JPG / WEBP', 'MP4 / MOV', 'PDF do 10 MB'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/70 bg-background/65 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="asset-upload-input"
            className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-border/80 bg-background/80 px-6 py-8 text-center shadow-[var(--shadow-panel)] transition hover:border-foreground/20"
          >
            <span className="font-display text-2xl tracking-[-0.03em] text-foreground">
              Przeciągnij pliki tutaj
            </span>
            <span className="mt-2 text-sm leading-7 text-muted-foreground">
              Albo kliknij i wybierz asset do dalszej ingestii.
            </span>
            <span className="mt-4 rounded-full border border-border/70 bg-card px-4 py-2 text-xs tracking-[0.08em] text-foreground">
              Wybierz plik
            </span>
          </label>

          <input
            id="asset-upload-input"
            name="asset-upload"
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            className="sr-only"
            onChange={(event) => handleFiles(event.target.files)}
          />

          <div
            aria-live="polite"
            className={`rounded-[1.25rem] border p-4 text-sm leading-7 shadow-[var(--shadow-panel)] ${
              status === 'accepted'
                ? 'border-emerald-300/70 bg-emerald-50/80 text-emerald-950'
                : status === 'error'
                  ? 'border-red-300/70 bg-red-50/80 text-red-950'
                  : 'border-border/70 bg-background/70 text-foreground'
            }`}
          >
            {message}
          </div>

          {pendingFiles.length > 0 ? (
            <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Ostatni intake
              </p>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                {pendingFiles.map((file) => (
                  <li key={`${file.name}-${file.size}`} className="flex flex-wrap items-center justify-between gap-3">
                    <span>{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {file.kind} - {formatSize(file.size)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Walidacja</p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                Typ pliku, rozmiar i podstawowe metadane są już sprawdzane przez intake API.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Status</p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                Kolejny krok to blob storage i finalny ingest assetu do HQ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
