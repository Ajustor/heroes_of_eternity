import { User, UserCreation, UserEntity, usersTable } from '@hoe/db'
import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { and, count, eq, or } from 'drizzle-orm'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { OPERATOR } from '@/core/domain/repositories/base.repository'


export class SqliteUsersRepository implements UsersRepository {
  constructor(private readonly client: LibSQLDatabase) {}

  public async findAll(filters: Partial<UserEntity>, operator = OPERATOR.OR): Promise<UserEntity[]> {
    return await this.client.select().from(usersTable)
  }

  async create(user: UserCreation) {
    const [createdUser] = await this.client
      .insert(usersTable)
      .values(user)
      .returning()
    await this.addAuthorizationKey(createdUser.id)
    return createdUser
  }

  async findOne({ id, email, username }: Partial<UserEntity>, operator = OPERATOR.OR): Promise<UserEntity | null> {
    const fieldsFilters = []

    if (id) {
      fieldsFilters.push(eq(usersTable.id, id))
    }

    if (email) {
      fieldsFilters.push(eq(usersTable.email, email))
    }

    if (username) {
      fieldsFilters.push(eq(usersTable.username, username))
    }

    if (!fieldsFilters.length) {
      return null
    }

    let whereRequest = or(...fieldsFilters)

    switch (operator) {
      case OPERATOR.AND:
        whereRequest = and(...fieldsFilters)
        break
    }


    const [user] = await this.client
      .select()
      .from(usersTable)
      .where(
        whereRequest,
      )

    return user
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null> {

    if (!data.authorizationKey) {
      throw new Error('An authorization key is required to update')
    }

    await this.client
      .update(usersTable)
      .set(data)
      .where(
        and(
          eq(usersTable.id, id),
          eq(usersTable.authorizationKey, data.authorizationKey),
        ),
      )

    return this.findOne({ id })
  }

  async remove(id: string): Promise<void> {
    await this.client.delete(usersTable).where(eq(usersTable.id, id))
  }


  async resetPassword({
    userId,
    password,
    authorizationKey,
  }: {
    userId: string
    password: string
    authorizationKey: string
  }) {
    const newPassword = await Bun.password.hash(password)
    const [foundUser] = await this.client
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(
        and(
          eq(usersTable.id, userId),
          eq(usersTable.authorizationKey, authorizationKey),
        ),
      )

    if (!foundUser) {
      throw new Error('No user found with this informations')
    }

    await this.client
      .update(usersTable)
      .set({ password: newPassword })
      .where(
        and(
          eq(usersTable.id, userId),
          eq(usersTable.authorizationKey, authorizationKey),
        ),
      )

    await this.addAuthorizationKey(userId)
  }

  async addAuthorizationKey(userId: string) {
    const [user] = await this.client
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))

    const hasher = new Bun.CryptoHasher('blake2b256')

    const rawKey = `${user.id}${user.password}${user.email}`
    const authorizationKey = hasher.update(rawKey, 'base64')
    await this.client
      .update(usersTable)
      .set({
        authorizationKey: authorizationKey.digest('hex'),
      })
      .where(eq(usersTable.id, user.id))
  }

  async exist(emailOrUsername: string): Promise<boolean> {
    const [{ value }] = await this.client
      .select({ value: count(usersTable.id) })
      .from(usersTable)
      .where(
        or(
          eq(usersTable.username, emailOrUsername),
          eq(usersTable.email, emailOrUsername),
        ),
      )

    return value !== 0
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string
    oldPassword: string
    newPassword: string
  }) {
    const [retrievedUser] = await this.client
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))

    if (!retrievedUser) {
      return
    }

    const isPasswordValid = await Bun.password.verify(
      oldPassword,
      retrievedUser.password,
    )
    if (!isPasswordValid) {
      throw new Error('Your password does not match')
    }

    await this.client
      .update(usersTable)
      .set({ password: newPassword })
      .where(eq(usersTable.id, userId))

    await this.addAuthorizationKey(userId)
  }
}
