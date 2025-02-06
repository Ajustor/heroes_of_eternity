import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'

export const beastsTable = sqliteTable('beast_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull(),
  maxMana: int().notNull(),
  maxLife: int().notNull(),
  intelligence: int().notNull(),
  strength: int().notNull(),
  agility: int().notNull(),
  dexterity: int().notNull(),
  experience: int(),
})

export type BeastEntity = typeof beastsTable.$inferSelect
export type BeastCreation = typeof beastsTable.$inferInsert

export const createBeast = createInsertSchema(beastsTable)
