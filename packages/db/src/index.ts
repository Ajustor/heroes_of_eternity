import { drizzle } from 'drizzle-orm/node-postgres'

export function getDB(dbUrl: string) {
  return drizzle(dbUrl)
}

export * from './schemas'
