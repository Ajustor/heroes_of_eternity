import { Repository } from '@/core/base/repository'
import { UserCreation, UserEntity } from '@hoe/db'

export abstract class UsersRepository extends Repository<UserEntity, UserCreation> {
  abstract resetPassword({
    userId,
    password,
    authorizationKey,
  }: {
    userId: string
    password: string
    authorizationKey: string
  }): Promise<void>

  abstract changePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string
    oldPassword: string
    newPassword: string
  }): Promise<void>

  abstract exist(emailOrUsername: string): Promise<boolean>
}
