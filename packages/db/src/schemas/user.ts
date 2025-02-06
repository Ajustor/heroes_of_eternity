import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2'
import { createInsertSchema } from "drizzle-typebox";

export const usersTable = sqliteTable("users_table", {
  id: text('id').primaryKey().$defaultFn(createId),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  authorizationKey: text('authorizationKey')
});

export type UserEntity = typeof usersTable.$inferSelect
export type User = Omit<UserEntity, 'password' | 'authorizationKey'>
export type UserCreation = typeof usersTable.$inferInsert

export const createUser = createInsertSchema(usersTable)
