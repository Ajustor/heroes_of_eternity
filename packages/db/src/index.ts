import { drizzle } from 'drizzle-orm/postgres-js'

export function getDB(dbUrl: string) {
  return drizzle(dbUrl)
}

export * from './schemas'
