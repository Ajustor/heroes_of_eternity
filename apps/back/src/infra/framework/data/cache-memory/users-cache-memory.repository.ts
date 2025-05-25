import { UsersRepository } from '@/core/domain/repositories/users.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'
import { UserEntity } from '@hoe/db'

export class UsersCacheMemoryRepository
  extends RepositoryCacheMemory<UserEntity>
  implements UsersRepository {
  async changePassword({ userId, oldPassword, newPassword, }: { userId: string; oldPassword: string; newPassword: string }): Promise<void> {

  }
  async resetPassword({ userId, password, authorizationKey, }: { userId: string; password: string; authorizationKey: string }): Promise<void> {
    const user = await this.findOne({ id: userId })
    if (user?.authorizationKey === authorizationKey) {
      user.password = password
    }
  }

  async exist(emailOrUsername: string): Promise<boolean> {
    return !!this.items.find((user) => user.email === emailOrUsername || user.username === emailOrUsername)
  }
}
