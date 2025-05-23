import { integer, primaryKey, pgTable, text, pgEnum } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'
import { BACKGROUNDS_KEYS } from "@hoe/assets"
import { relations } from 'drizzle-orm'
import { beastsTable } from './beast'
import { itemsTable } from './items'

export const zoneEnum = pgEnum('zone', [BACKGROUNDS_KEYS.Body, BACKGROUNDS_KEYS.Chaos, BACKGROUNDS_KEYS.Dark])

export const stepsTable = pgTable('steps_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  zone: zoneEnum(),
})

export const stepsRelations = pgTable('beast_on_step', {
  beastId: text('beast_id').references(() => beastsTable.id, {
    onDelete: 'cascade',
  }),
  stepId: text('step_id').references(() => stepsTable.id, { onDelete: 'cascade' }),
  count: integer().default(1)
}, (table) => [primaryKey({ columns: [table.stepId, table.beastId] })])

export const questTable = pgTable('quest_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull(),
  description: text().notNull(),
})

export const rewardTable = pgTable('reward_table', {
  questId: text('quest_id').references(() => questTable.id, { onDelete: 'cascade' }),
  itemId: text('item_id').references(() => itemsTable.id, { onDelete: 'cascade' }),
  amount: integer().default(0)
}, (table) => [primaryKey({ columns: [table.questId, table.itemId] })])

export const createReward = createInsertSchema(rewardTable)

export const questRelations = relations(questTable, ({ many }) => ({
  steps: many(stepsTable),
}))

export type QuestEntity = typeof questTable.$inferSelect
export type QuestCreation = typeof questTable.$inferInsert

export const createQuest = createInsertSchema(questTable)

export type StepEntity = typeof stepsTable.$inferSelect
export type StepCreation = typeof stepsTable.$inferInsert

export const createStep = createInsertSchema(stepsTable)
