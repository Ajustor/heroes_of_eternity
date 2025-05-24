import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { UsersCacheMemoryRepository } from '@/infra/framework/data/cache-memory/users-cache-memory.repository'
import { UpdatePasswordUseCase } from './update-password'
import { beforeEach, describe, it, expect, mock } from 'bun:test'
import { Security } from '@/core/base/security'

describe('UpdatePasswordUseCase', () => {
  let updatePasswordUseCase: UpdatePasswordUseCase
  let usersRepository: UsersRepository
  let securityService: Security

  beforeEach(() => {
    securityService = {
      encodePassword: mock((password: string) => Promise.resolve(password)),
      validatePassword: mock((password: string, verif: string) => Promise.resolve(password === verif)),
      generateAuthorisationKey: mock((key: string) => key)
    }
    usersRepository = new UsersCacheMemoryRepository()
    updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository, securityService)

    usersRepository.create({ 
      email: 'email', 
      password: 'pwd', 
      username: 'username', 
      authorizationKey: 'auth', 
      id: 'userId' 
    })
  })

  it('should be defined', () => {
    expect(updatePasswordUseCase).toBeDefined()
  })

  it('should update user password with correct current password', async () => {
    const currentPassword = 'pwd'
    const newPassword = 'new-password'
    await updatePasswordUseCase.execute({ userId: 'userId', oldPassword: currentPassword, newPassword })
    const user = await usersRepository.findOne({ id: 'userId' })

    expect(user?.password).toEqual(newPassword)
  })

  it('should throw error with incorrect current password', async () => {
    const currentPassword = 'wrong-pwd'
    const newPassword = 'new-password'
    await expect(updatePasswordUseCase.execute({ userId: 'userId', oldPassword: currentPassword, newPassword })).rejects.toThrow('Your password does not match')
  })

  it('should throw error for non-existing user', async () => {
    const currentPassword = 'pwd'
    const newPassword = 'new-password'
    await expect(updatePasswordUseCase.execute({ userId: 'non-existing-id', oldPassword: currentPassword, newPassword })).rejects.toThrow('User not found')
  })
})
