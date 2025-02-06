import { drizzle as tursoDrizzle } from 'drizzle-orm/libsql'
import { createClient, type Client } from '@libsql/client/sqlite3'


export function getClient({ url, authToken }: { url: string, authToken?: string }) {
  return createClient({
    url,
    ...(authToken && { authToken }),
  })
}

export function getDB(client: Client) {
  return tursoDrizzle(client)
}


export * from './schemas'
