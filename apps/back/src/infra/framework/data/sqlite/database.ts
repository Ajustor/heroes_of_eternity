import { getClient, getDB } from '@hoe/db'

const url: string = JSON.parse(Bun.env.LOCAL ?? 'true')
  ? `file:hoe.sqlite`
  : `${Bun.env.TURSO_URL}`

export const db = getDB(getClient({ url, ...(Bun.env.TURSO_TOKEN && { authToken: Bun.env.TURSO_TOKEN }) }))