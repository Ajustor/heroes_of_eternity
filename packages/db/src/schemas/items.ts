import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'

export const itemsTable = pgTable('item_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull().unique(),
  description: text().notNull(),
  intelligence: integer().default(0),
  strength: integer().default(0),
  agility: integer().default(0),
  dexterity: integer().default(0),
  heal: integer().default(0),
  damage: integer().default(0),
  price: integer().default(0),
})

export type ItemEntity = typeof itemsTable.$inferSelect
export type ItemCreation = typeof itemsTable.$inferInsert

export const createItem = createInsertSchema(itemsTable)
