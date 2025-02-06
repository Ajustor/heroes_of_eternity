import { UseCase } from '@/core/base/use-case'
import { UsersRepository } from '@/core/domain/repositories/users.repository'

export class ResetPasswordUseCase implements UseCase<void> {

  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    userId,
    password,
    authorizationKey,
  }: {
    userId: string
    password: string
    authorizationKey: string
  }): Promise<void> {
    await this.userRepository.resetPassword({ userId, password, authorizationKey })
  }

}