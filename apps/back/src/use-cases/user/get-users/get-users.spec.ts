import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UsersCacheMemoryRepository } from '@/infra/framework/data/cache-memory/users-cache-memory.repository'
import { GetUsersUseCase } from '@/use-cases/user/get-users/get-users'
import { beforeEach, describe, it, expect } from 'bun:test'

describe('GetUserUseCase', () => {
  let getUsersUseCase: GetUsersUseCase
  let usersRepository: UsersRepository

  beforeEach(() => {
    usersRepository = new UsersCacheMemoryRepository()
    getUsersUseCase = new GetUsersUseCase(usersRepository)
  })

  it('should be defined', () => {
    expect(getUsersUseCase).toBeDefined()
  })

  it('should get users', async () => {
    const users = await getUsersUseCase.execute()
    expect(users.length).toEqual(0)
  })
})