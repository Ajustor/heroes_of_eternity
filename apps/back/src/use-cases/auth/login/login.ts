import { Security } from '@/core/base/security'
import { UseCase } from '@/core/base/use-case'
import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { User } from '@hoe/db'

export class LoginUsecase implements UseCase<User | null> {

  constructor(private readonly userRepository: UsersRepository, private readonly securityService: Security) {

  }

  async execute({ username, password }: { username?: string, password: string }): Promise<User | null> {
    const retrievedUser = await this.userRepository.findOne({ email: username, username }, OPERATOR.OR)

    if (!retrievedUser) {
      return null
    }

    const isPasswordValid = await this.securityService.validatePassword(password, retrievedUser.password)
    if (!isPasswordValid) {
      return null
    }

    const { password: _, username: retrievedUsername, id, email } = retrievedUser
    return { username: retrievedUsername, id, email }
  }
}