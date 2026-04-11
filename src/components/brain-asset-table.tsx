'use client'

import { useMemo, useState } from 'react'

import type { BrainAssetRow } from '@/lib/brain-data'

const quickStatuses = ['approved', 'reviewed', 'archived'] as const

type Props = {
  assets: BrainAssetRow[]
}

export function BrainAssetTable({ assets }: Props) {
  const [items, setItems] = useState(assets)
  const [busyId, setBusyId] = useState<string | null>(null)

  const hasItems = useMemo(() => items.length > 0, [items])

  async function updateAsset(id: string, payload: Record<string, string>) {
    setBusyId(id)

    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('asset_update_failed')

      setItems((current) =>
        current.map((asset) => (asset.id === id ? { ...asset, ...payload } : asset))
      )
    } finally {
      setBusyId(null)
    }
  }

  async function updateStatus(id: string, status: (typeof quickStatuses)[number]) {
    await updateAsset(id, { status })
  }

  async function saveMetadata(id: string, title: string, project: string) {
    await updateAsset(id, { title, projectId: project, project: project })
  }

  if (!hasItems) return null

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[56rem] text-sm">
        <thead>
          <tr className="border-b border-border/50 text-left text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <th className="pb-3 font-normal">Nazwa</th>
            <th className="pb-3 font-normal">Typ</th>
            <th className="pb-3 font-normal">Projekt</th>
            <th className="pb-3 font-normal">Status</th>
            <th className="pb-3 font-normal">Data</th>
            <th className="pb-3 font-normal">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {items.map((asset) => (
            <tr key={`${asset.id}-${asset.date}`} className="border-b border-border/30 align-top">
              <td className="py-3 text-foreground">
                <input
                  aria-label={`Edytuj tytuł ${asset.title}`}
                  value={asset.title}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((item) =>
                        item.id === asset.id ? { ...item, title: event.target.value } : item
                      )
                    )
                  }
                  className="min-h-10 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary/35"
                />
              </td>
              <td className="py-3 text-muted-foreground">{asset.kind}</td>
              <td className="py-3 text-muted-foreground">
                <input
                  aria-label={`Edytuj projekt ${asset.title}`}
                  value={asset.project}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((item) =>
                        item.id === asset.id ? { ...item, project: event.target.value } : item
                      )
                    )
                  }
                  className="min-h-10 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary/35"
                />
              </td>
              <td className="py-3">
                <span className="inline-flex rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground">
                  {asset.status}
                </span>
              </td>
              <td className="py-3 text-muted-foreground">{asset.date}</td>
              <td className="py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busyId === asset.id}
                    aria-label={`Zapisz metadata ${asset.title}`}
                    onClick={() => saveMetadata(asset.id, asset.title, asset.project)}
                    className="min-h-9 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs tracking-[0.01em] text-primary transition hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Zapisz metadata
                  </button>
                  {quickStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={busyId === asset.id || asset.status === status}
                      aria-label={`${status === 'approved' ? 'Zatwierdź' : status === 'reviewed' ? 'Oznacz jako sprawdzone' : 'Archiwizuj'} ${asset.title}`}
                      onClick={() => updateStatus(asset.id, status)}
                      className="min-h-9 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs tracking-[0.01em] text-foreground transition hover:border-foreground/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
