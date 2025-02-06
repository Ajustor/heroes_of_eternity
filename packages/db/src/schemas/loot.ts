import { beastsTable } from './beast'
import { itemsTable } from './items'
import { sqliteTable, int, text, primaryKey, } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-typebox'

export const lootsTable = sqliteTable('loot_table', {
  beastId: text('beast_id').references(() => beastsTable.id, {
    onDelete: 'cascade',
  }),
  itemId: text('item_id').references(() => itemsTable.id, {
    onDelete: 'cascade',
  }),
  amount: int().notNull().default(1),
  chances: int().notNull().default(100)
}, (table) => [primaryKey({ columns: [table.beastId, table.itemId] })])

export type LootEntity = typeof lootsTable.$inferSelect
export type LootCreation = typeof lootsTable.$inferInsert

export const createLoot = createInsertSchema(lootsTable)