import { UseCase } from '@/core/base/use-case'
import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { User } from '@hoe/db'

export class GetUserUseCase implements UseCase<User> {

  constructor(private readonly userRepository: UsersRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId }, OPERATOR.OR)

    if (!user) {
      throw new Error('No user found')
    }

    return user
  }
}