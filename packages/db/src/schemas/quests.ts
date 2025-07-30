import { integer, primaryKey, pgTable, text, pgEnum } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'
import { BACKGROUNDS_KEYS } from "@hoe/assets"
import { beastsTable } from './beast'
import { itemsTable } from './items'

export const zoneEnum = pgEnum('zone', [BACKGROUNDS_KEYS.Body, BACKGROUNDS_KEYS.Chaos, BACKGROUNDS_KEYS.Dark])

export const stepsTable = pgTable('steps_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  zone: zoneEnum(),
})

export const beastOnStepTable = pgTable('beast_on_step', {
  beastId: text('beast_id').references(() => beastsTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  stepId: text('step_id').references(() => stepsTable.id, { onDelete: 'cascade' }).notNull(),
  count: integer().notNull().default(1)
}, (table) => [primaryKey({ columns: [table.stepId, table.beastId] })])

export type BeastOnStepEntity = typeof beastOnStepTable.$inferSelect
export type BeastOnStepCreation = Required<typeof beastOnStepTable.$inferInsert>
export const createBeastOnStep = createInsertSchema(beastOnStepTable)

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

export type RewardEntity = typeof rewardTable.$inferSelect
export type RewardCreation = typeof rewardTable.$inferInsert

export const createReward = createInsertSchema(rewardTable)

export const questOnStepTable = pgTable('quest_steps', {
  questId: text('quest_id').references(() => questTable.id, { onDelete: 'cascade' }),
  stepId: text('step_id').references(() => stepsTable.id, { onDelete: 'cascade' }),
}, (table) => [primaryKey({ columns: [table.questId, table.stepId] })])


export type QuestStepsCreation = typeof questOnStepTable.$inferInsert
export type QuestStepsEntity = typeof questOnStepTable.$inferSelect
export const createQuestSteps = createInsertSchema(questOnStepTable)

export type QuestEntity = typeof questTable.$inferSelect & { rewards?: RewardEntity[] } & { steps?: StepEntity[] }
export type QuestCreation = typeof questTable.$inferInsert

export const createQuest = createInsertSchema(questTable)

export type StepEntity = typeof stepsTable.$inferSelect & { beasts?: Omit<BeastOnStepEntity, 'stepId'>[] }
export type StepCreation = typeof stepsTable.$inferInsert

export const createStep = createInsertSchema(stepsTable)
