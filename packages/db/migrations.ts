import { migrate } from 'drizzle-orm/libsql/migrator'
import { getDB } from './src'
import { createClient } from '@libsql/client'

const url: string = JSON.parse(Bun.env.LOCAL ?? 'true')
  ? `file:./hoe.sqlite`
  : `${Bun.env.TURSO_URL}`

const sqliteClient = createClient({
  url,
  ...(Bun.env.TURSO_TOKEN && { authToken: Bun.env.TURSO_TOKEN }),
})


await migrate(getDB(sqliteClient), { migrationsFolder: './drizzle' })