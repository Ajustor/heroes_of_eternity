import { getDB } from '@hoe/db'

export const databaseConnectionUrl = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`

export const db = getDB(databaseConnectionUrl)
export type DatabaseConnection = typeof db