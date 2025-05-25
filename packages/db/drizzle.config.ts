import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/schemas/**/*.ts',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  verbose: true,
  strict: true,
})
