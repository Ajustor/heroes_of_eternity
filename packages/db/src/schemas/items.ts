import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'

export const itemsTable = sqliteTable('item_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull().unique(),
  intelligence: int(),
  strength: int(),
  agility: int(),
  dexterity: int(),
  price: int(),
})

export type ItemEntity = typeof itemsTable.$inferSelect
export type ItemCreation = typeof itemsTable.$inferInsert

export const createItem = createInsertSchema(itemsTable)
