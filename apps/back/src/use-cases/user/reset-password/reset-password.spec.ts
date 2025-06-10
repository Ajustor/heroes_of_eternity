import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UsersCacheMemoryRepository } from '@/infra/framework/data/cache-memory/users-cache-memory.repository'
import { ResetPasswordUseCase } from './reset-password'
import { beforeEach, describe, it, expect } from 'bun:test'

describe('ResetPasswordUseCase', () => {
  let resetPasswordUseCase: ResetPasswordUseCase
  let usersRepository: UsersRepository

  beforeEach(() => {
    usersRepository = new UsersCacheMemoryRepository()
    resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

    usersRepository.create({ email: 'email', password: 'pwd', username: 'username', authorizationKey: 'auth', id: 'userId' })
  })

  it('should be defined', () => {
    expect(resetPasswordUseCase).toBeDefined()
  })

  it('should change user password', async () => {
    const password = 'password'
    const authorizationKey = 'auth'
    await resetPasswordUseCase.execute({ userId: 'userId', password, authorizationKey })
    const user = await usersRepository.findOne({ id: 'userId' })

    expect(user?.password).toEqual(password)
  })

  it('should not change user password', async () => {
    const password = 'password'
    const authorizationKey = 'false-auth'
    await resetPasswordUseCase.execute({ userId: 'userId', password, authorizationKey })
    const user = await usersRepository.findOne({ id: 'userId' })

    expect(user?.password).toEqual('pwd')
  })
})