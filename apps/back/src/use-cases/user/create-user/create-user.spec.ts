import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UsersCacheMemoryRepository } from '@/infra/framework/data/cache-memory/users-cache-memory.repository'
import { CreateUserUseCase } from './create-user'
import { beforeEach, describe, it, expect, mock } from 'bun:test'
import { UserCreation } from '@hoe/db'
import { Security } from '@/core/base/security'

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase
  let usersRepository: UsersRepository
  let securityService: Security

  beforeEach(() => {
    securityService = {
      encodePassword: mock((password: string) => Promise.resolve(password)),
      validatePassword: mock((password: string, verif: string) => Promise.resolve(password === verif)),
      generateAuthorisationKey: mock((key: string) => key)
    }
    usersRepository = new UsersCacheMemoryRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository, securityService)
  })

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined()
  })

  it('should create an user', async () => {
    const user: UserCreation = { username: 'username', email: 'email', password: 'password' }
    const createdUser = await createUserUseCase.execute(user)
    expect(createdUser.id).toBeDefined()
    expect(createdUser.email).toEqual(user.email)
    expect(createdUser.username).toEqual(user.username)
  })
})