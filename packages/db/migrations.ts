import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { getDB } from './src'

const url: string = `postgresql://${Bun.env.DATABASE_USER}:${Bun.env.DATABASE_PASSWORD}@${Bun.env.DATABASE_HOST}:${Bun.env.DATABASE_PORT}/${Bun.env.DATABASE_NAME}`

await migrate(getDB(url), { migrationsFolder: './drizzle' })