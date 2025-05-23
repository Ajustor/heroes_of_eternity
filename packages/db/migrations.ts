import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { getDB } from './src'

const url: string = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/`

console.log('the url', url)

await migrate(getDB(url), { migrationsFolder: './drizzle' })