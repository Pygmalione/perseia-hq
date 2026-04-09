import { createClient, type Client } from '@libsql/client'

let _client: Client | null = null

function getDb(): Client {
  if (_client) return _client

  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  const onVercel = Boolean(process.env.VERCEL)

  if (url && authToken) {
    _client = createClient({ url, authToken })
    return _client
  }

  if (onVercel) {
    throw new Error(
      `Missing Turso env on Vercel - url:${url ? 'yes' : 'no'} token:${authToken ? 'yes' : 'no'}`
    )
  }

  // Local fallback: direct sqlite file path
  _client = createClient({
    url: `file:${process.cwd()}/state/hq.sqlite`,
  })

  return _client
}

export { getDb }
