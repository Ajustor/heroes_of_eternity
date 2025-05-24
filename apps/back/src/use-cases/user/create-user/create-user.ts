import { Security } from '@/core/base/security'
import { UseCase } from '@/core/base/use-case'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { User, UserCreation } from '@hoe/db'

export class CreateUserUseCase implements UseCase<User> {

  constructor(private readonly userRepository: UsersRepository, private readonly securityService: Security) {}

  async execute({ password, ...userToCreate }: UserCreation): Promise<User> {
    const createdUser = await this.userRepository.create({ ...userToCreate, password: await this.securityService.encodePassword(password) })
    const rawKey = `${createdUser.id}${createdUser.password}${createdUser.email}`
    const authorizationKey = this.securityService.generateAuthorisationKey(rawKey)
    this.userRepository.update(createdUser.id, { authorizationKey })
    return createdUser
  }

}