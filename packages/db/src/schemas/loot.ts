import { beastsTable } from './beast'
import { itemsTable } from './items'
import { pgTable, integer, text, primaryKey } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'

export const lootsTable = pgTable('loot_table', {
  beastId: text('beast_id').references(() => beastsTable.id, {
    onDelete: 'cascade',
  }),
  itemId: text('item_id').references(() => itemsTable.id, {
    onDelete: 'cascade',
  }),
  amount: integer().notNull().default(1),
  chances: integer().notNull().default(100)
}, (table) => [primaryKey({ columns: [table.beastId, table.itemId] })])

export type LootEntity = typeof lootsTable.$inferSelect
export type LootCreation = typeof lootsTable.$inferInsert

export const createLoot = createInsertSchema(lootsTable)