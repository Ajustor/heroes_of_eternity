import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UsersCacheMemoryRepository } from '@/infra/framework/data/cache-memory/users-cache-memory.repository'
import { GetUserUseCase } from '@/use-cases/user/get-user/get-user'
import { UserEntity } from '@hoe/db'
import { beforeEach, describe, it, expect } from 'bun:test'

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase
  let usersRepository: UsersRepository
  const fakeUser: UserEntity = { email: 'email', password: 'pwd', username: 'username', authorizationKey: 'auth', id: 'userId' }

  beforeEach(() => {
    usersRepository = new UsersCacheMemoryRepository()
    getUserUseCase = new GetUserUseCase(usersRepository)
    usersRepository.create(fakeUser)
  })

  it('should be defined', () => {
    expect(getUserUseCase).toBeDefined()
  })

  it('should get users', async () => {
    const user = await getUserUseCase.execute(fakeUser.id)
    expect(user).toEqual(fakeUser)
  })
})