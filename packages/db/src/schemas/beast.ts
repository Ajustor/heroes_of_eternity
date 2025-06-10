import { integer, pgEnum, pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { createId } from '@paralleldrive/cuid2'
import { BEASTS_KEYS, BOSSES_KEYS } from '@hoe/assets'
import { relations } from 'drizzle-orm'
import { skillsTable } from './skills'

export const beastsSkinEnum = pgEnum('beast_skin', [BEASTS_KEYS.Bat, BEASTS_KEYS.Rat, BEASTS_KEYS.Skeleton, BEASTS_KEYS.Slime, BEASTS_KEYS.Snake, BEASTS_KEYS.Soldier, BEASTS_KEYS.Spider, BOSSES_KEYS.Chaos, BOSSES_KEYS.Troll, BOSSES_KEYS.DarkLord])

export const beastsTable = pgTable('beast_table', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text().notNull(),
  skin: beastsSkinEnum().notNull(),
  maxMana: integer().notNull(),
  maxLife: integer().notNull(),
  intelligence: integer().notNull(),
  strength: integer().notNull(),
  agility: integer().notNull(),
  dexterity: integer().notNull(),
  isBoss: boolean('is_boss').default(false).notNull(),
  experience: integer().default(1).notNull(),
})

export const beastSkillsRelations = relations(beastsTable, ({ many }) => ({
  skills: many(skillsTable),
}))

export type BeastEntity = typeof beastsTable.$inferSelect
export type BeastCreation = typeof beastsTable.$inferInsert

export const createBeast = createInsertSchema(beastsTable)
