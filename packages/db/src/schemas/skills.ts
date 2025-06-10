import { pgTable, text, integer, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { createInsertSchema } from 'drizzle-typebox'
import { SKILLS_KEYS } from "@hoe/assets"

export const skillsSkinEnum = pgEnum('skills_skin', [SKILLS_KEYS.HEAL, SKILLS_KEYS.BLOW, SKILLS_KEYS.DARKNESS])

export const skillsTable = pgTable('skills_table', {
    id: text('id').primaryKey().$defaultFn(createId).notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    damages: integer().notNull(),
    cost: integer().notNull(),
    animation: skillsSkinEnum().notNull(),
    requiredLevel: integer('required_level').notNull(),
})

export type SkillEntity = typeof skillsTable.$inferSelect
export type SkillCreation = typeof skillsTable.$inferInsert

export const createSkill = createInsertSchema(skillsTable)