import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UserEntity, UserCreation, usersTable } from '@hoe/db'
import { and, eq, or } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { DatabaseConnection } from './database'

export class PostgresUserRepository implements UsersRepository {
  constructor(private readonly client: DatabaseConnection) { }

  async create(user: UserCreation): Promise<UserEntity> {
    const [createdUser] = await this.client
      .insert(usersTable)
      .values(user)
      .returning()

    return createdUser
  }

  async findOne(filter: Partial<UserEntity>, operator: OPERATOR = OPERATOR.OR): Promise<UserEntity | null> {
    const fieldsFilters = []

    if (filter.id) {
      fieldsFilters.push(eq(usersTable.id, filter.id))
    }

    if (filter.email) {
      fieldsFilters.push(eq(usersTable.email, filter.email))
    }

    if (filter.username) {
      fieldsFilters.push(eq(usersTable.username, filter.username))
    }

    if (!fieldsFilters.length) {
      return null
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    const [user] = await this.client
      .select()
      .from(usersTable)
      .where(whereRequest)

    return user || null
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.client
      .select()
      .from(usersTable)
  }

  async update(id: string, user: Partial<UserEntity>): Promise<UserEntity | null> {
    const [updatedUser] = await this.client
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning()

    return updatedUser || null
  }

  async delete(id: string): Promise<void> {
    await this.client
      .delete(usersTable)
      .where(eq(usersTable.id, id))
  }

  async remove(id: string): Promise<void> {
    await this.delete(id)
  }

  async resetPassword({ userId, password, authorizationKey }: { userId: string; password: string; authorizationKey: string; }): Promise<void> {
    await this.client
      .update(usersTable)
      .set({ password })
      .where(eq(usersTable.id, userId))
  }

  async changePassword({ userId, oldPassword, newPassword }: { userId: string; oldPassword: string; newPassword: string; }): Promise<void> {
    const [user] = await this.client
      .select({ password: usersTable.password })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1)

    if (!user || user.password !== oldPassword) {
      throw new Error('Invalid credentials')
    }

    await this.client
      .update(usersTable)
      .set({ password: newPassword })
      .where(eq(usersTable.id, userId))
  }

  async exist(email: string): Promise<boolean> {
    const [user] = await this.client
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)

    return !!user
  }
}
