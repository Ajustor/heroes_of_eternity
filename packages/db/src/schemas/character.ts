
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2'
import { createInsertSchema } from "drizzle-typebox";
import { usersTable } from "./user";

export const charactersTable = sqliteTable("characters_table", {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('userId').references(() => usersTable.id),
  stats: {
    maxMana: int().notNull(),
    maxLife: int().notNull(),
  }

});

export type CharacterEntity = typeof charactersTable.$inferSelect
export type CharacterCreation = typeof charactersTable.$inferInsert

export const createCharacter = createInsertSchema(charactersTable)
