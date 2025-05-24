import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UsersCacheMemoryRepository } from '@/infra/framework/data/cache-memory/users-cache-memory.repository'
import { beforeEach, describe, it, expect, mock } from 'bun:test'
import { UserCreation, UserEntity } from '@hoe/db'
import { LoginUsecase } from '@/use-cases/auth/login/login'
import { Security } from '@/core/base/security'

describe('LoginUsecase', () => {
  let loginUsecase: LoginUsecase
  let usersRepository: UsersRepository
  let securityService: Security

  beforeEach(() => {
    usersRepository = new UsersCacheMemoryRepository()
    securityService = {
      encodePassword: mock((password: string) => Promise.resolve(password)),
      validatePassword: mock((password: string, verif: string) => Promise.resolve(password === verif)),
      generateAuthorisationKey: mock((key: string) => key)
    }
    loginUsecase = new LoginUsecase(usersRepository, securityService)
    const fakeUser: UserEntity = { email: 'email', password: 'pwd', username: 'username', authorizationKey: 'auth', id: 'userId' }
    usersRepository.create(fakeUser)
  })

  it('should be defined', () => {
    expect(loginUsecase).toBeDefined()
  })

  it('should find an user and return it using username', async () => {
    const foundUser = await loginUsecase.execute({ username: 'username', password: 'pwd' })
    expect(foundUser).not.toBeNull()
  })

  it('should find an user and return it using email', async () => {
    const foundUser = await loginUsecase.execute({ username: 'email', password: 'pwd' })
    expect(foundUser).not.toBeNull()
  })

  it('should not find an user', async () => {

    const user: UserCreation = { username: 'username', email: 'email', password: 'password' }
    const foundUser = await loginUsecase.execute(user)
    expect(foundUser).toBeNull()
  })
})