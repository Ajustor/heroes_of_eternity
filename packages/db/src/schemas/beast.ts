import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'

export const beastsTable = pgTable('beast_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull(),
  maxMana: integer().notNull(),
  maxLife: integer().notNull(),
  intelligence: integer().notNull(),
  strength: integer().notNull(),
  agility: integer().notNull(),
  dexterity: integer().notNull(),
  experience: integer(),
})

export type BeastEntity = typeof beastsTable.$inferSelect
export type BeastCreation = typeof beastsTable.$inferInsert

export const createBeast = createInsertSchema(beastsTable)
