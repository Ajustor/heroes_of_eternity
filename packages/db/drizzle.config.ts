import { defineConfig } from 'drizzle-kit'

console.log(`postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)

export default defineConfig({
  schema: './src/schemas/**/*.ts',
  out: './drizzle',
  dbCredentials: {
    url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
  },
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  verbose: true,
  strict: true,
})
