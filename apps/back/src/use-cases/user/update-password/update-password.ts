import { UseCase } from '@/core/base/use-case'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { SecurityService } from '@/core/domain/secutiry.service'

export class UpdatePasswordUseCase implements UseCase<void> {

  constructor(private readonly userRepository: UsersRepository, private readonly securityService: SecurityService) {}

  async execute({ userId, oldPassword, newPassword }: { userId: string, oldPassword: string, newPassword: string }): Promise<void> {
    const retrievedUser = await this.userRepository.findOne({ id: userId })
    if (!retrievedUser) {
      throw new Error('User not found')
    }

    const isPasswordValid = await this.securityService.validatePassword(oldPassword, retrievedUser.password)

    if (!isPasswordValid) {
      throw new Error('Your password does not match')
    }
    const hashedNewPassword = await this.securityService.encodePassword(newPassword)
    const rawKey = `${retrievedUser.id}${hashedNewPassword}${retrievedUser.email}`
    const authorizationKey = this.securityService.generateAuthorisationKey(rawKey)
    this.userRepository.update(userId, { password: hashedNewPassword, authorizationKey })
  }

}