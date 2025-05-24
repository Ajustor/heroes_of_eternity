import { integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'
import { usersTable } from './user'
import { createId } from '@paralleldrive/cuid2'
import { CHARACTERS_KEYS } from '@hoe/assets'
import { JOBS } from '@hoe/system/constants'

export const charactersSkinEnum = pgEnum('characters_skin', [CHARACTERS_KEYS.Claude, CHARACTERS_KEYS.Eric, CHARACTERS_KEYS.Jane, CHARACTERS_KEYS.Serge])
export const charactersJobEnum = pgEnum('characters_job', [JOBS.FREELANCE])

export const charactersTable = pgTable('characters_table', {
  id: text('id').primaryKey().$defaultFn(createId).notNull(),
  userId: text('userId').references(() => usersTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  name: text().notNull(),
  level: integer().notNull(),
  job: charactersJobEnum().default(JOBS.FREELANCE).notNull(),
  skin: charactersSkinEnum().default(CHARACTERS_KEYS.Claude).notNull(),
  maxMana: integer().notNull(),
  mana: integer().notNull(),
  maxLife: integer().notNull(),
  life: integer().notNull(),
  intelligence: integer().notNull(),
  strength: integer().notNull(),
  agility: integer().notNull(),
  dexterity: integer().notNull(),
  experience: integer().default(0),
})

export type CharacterEntity = typeof charactersTable.$inferSelect
export type CharacterCreation = typeof charactersTable.$inferInsert

export const createCharacter = createInsertSchema(charactersTable)
