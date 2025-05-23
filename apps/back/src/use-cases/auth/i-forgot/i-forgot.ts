import { NotificationService } from '@/core/base/notificationService'
import { UseCase } from '@/core/base/use-case'
import { UsersRepository } from '@/core/domain/repositories/users.repository'
import IForgetEmailTemplate from 'src/emailTemplates/i-forget'

export class IForgotUsecase implements UseCase<void> {

  constructor(private readonly usersRepository: UsersRepository, private readonly notificationService: NotificationService) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      return
    }

    await this.notificationService.sendEmail(user.email, 'Mot de passe oublié', IForgetEmailTemplate({
      authorizationKey: user.authorizationKey ?? '',
      userId: user.id,
      username: user.username,
      frontUrl: process.env.frontUrl ?? ''
    }))
  }
}