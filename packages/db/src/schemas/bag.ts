import { charactersTable } from './character'
import { itemsTable } from './items'
import { sqliteTable, int, text, primaryKey, index } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-typebox'

export const bagsTable = sqliteTable('bag_table', {
  characterId: text('character_id').references(() => charactersTable.id, {
    onDelete: 'cascade',
  }),
  itemId: text('item_id').references(() => itemsTable.id, {
    onDelete: 'cascade',
  }),
  amount: int().notNull().default(0)
}, (table) => [primaryKey({ columns: [table.characterId, table.itemId] })])

export type BagEntity = typeof bagsTable.$inferSelect
export type BagCreation = typeof bagsTable.$inferInsert

export const createBag = createInsertSchema(bagsTable)