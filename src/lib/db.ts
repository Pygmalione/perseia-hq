import { createClient, type Client } from '@libsql/client'

let _client: Client | null = null

function getDb(): Client {
  if (_client) return _client

  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (url && authToken) {
    _client = createClient({ url, authToken })
  } else {
    // Local fallback: direct sqlite file path
    _client = createClient({
      url: `file:${process.cwd()}/state/hq.sqlite`,
    })
  }

  return _client
}

export { getDb }
