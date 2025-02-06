import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-typebox'
import { usersTable } from './user'
import { createId } from '@paralleldrive/cuid2'
import { CHARACTERS_KEYS } from '@hoe/assets'
import { JOBS } from '@hoe/system'

export const charactersTable = sqliteTable('characters_table', {
  id: text('id').primaryKey().$defaultFn(createId).notNull(),
  userId: text('userId').references(() => usersTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  name: text().notNull(),
  level: int().notNull(),
  job: text({enum: [JOBS.FREELANCE]}).default(JOBS.FREELANCE).notNull(),
  skin: text({ enum: [CHARACTERS_KEYS.Claude, CHARACTERS_KEYS.Eric, CHARACTERS_KEYS.Jane, CHARACTERS_KEYS.Serge] }).default(CHARACTERS_KEYS.Claude).notNull(),
  maxMana: int().notNull(),
  mana: int().notNull(),
  maxLife: int().notNull(),
  life: int().notNull(),
  intelligence: int().notNull(),
  strength: int().notNull(),
  agility: int().notNull(),
  dexterity: int().notNull(),
  experience: int().default(0),
})

export type CharacterEntity = typeof charactersTable.$inferSelect
export type CharacterCreation = typeof charactersTable.$inferInsert

export const createCharacter = createInsertSchema(charactersTable)
