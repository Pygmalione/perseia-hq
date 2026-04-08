import { NextResponse } from 'next/server'

import { getBrainSummary } from '@/lib/brain-data'

export async function GET() {
  const summary = await getBrainSummary()
  return NextResponse.json(summary)
}
