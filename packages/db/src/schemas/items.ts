import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'

export const itemsTable = pgTable('item_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull().unique(),
  intelligence: integer(),
  strength: integer(),
  agility: integer(),
  dexterity: integer(),
  price: integer(),
})

export type ItemEntity = typeof itemsTable.$inferSelect
export type ItemCreation = typeof itemsTable.$inferInsert

export const createItem = createInsertSchema(itemsTable)
