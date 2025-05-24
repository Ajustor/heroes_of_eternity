import { UseCase } from '@/core/base/use-case'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { User } from '@hoe/db'

export class GetUsersUseCase implements UseCase<User[]> {

  constructor(private readonly userRepository: UsersRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }

}