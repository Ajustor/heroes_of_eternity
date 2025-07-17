import { RewardRepository } from '@/core/domain/repositories/reward.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'
import { RewardEntity } from '@hoe/db'
import { randomUUIDv7 } from 'bun'

export class RewardCacheMemoryRepository
  extends RepositoryCacheMemory<RewardEntity & { id?: string }>
  implements RewardRepository {

  async create(data: RewardEntity): Promise<RewardEntity> {
    const count = this.items.push(data)
    return this.items[count - 1]
  }

  deleteWithQuestId(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.questId === id)
    if (index === -1) {
      // TODO: handle the case of not finding the item to be deleted
    }
    this.items.splice(index, 1)
    return Promise.resolve()
  }
}
