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

  async function updateStatus(id: string, status: (typeof quickStatuses)[number]) {
    setBusyId(id)

    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('asset_update_failed')

      setItems((current) =>
        current.map((asset) => (asset.id === id ? { ...asset, status } : asset))
      )
    } finally {
      setBusyId(null)
    }
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
              <td className="py-3 text-foreground">{asset.title}</td>
              <td className="py-3 text-muted-foreground">{asset.kind}</td>
              <td className="py-3 text-muted-foreground">{asset.project}</td>
              <td className="py-3">
                <span className="inline-flex rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground">
                  {asset.status}
                </span>
              </td>
              <td className="py-3 text-muted-foreground">{asset.date}</td>
              <td className="py-3">
                <div className="flex flex-wrap gap-2">
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
