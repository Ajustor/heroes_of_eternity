import { QuestRepository } from '@/core/domain/repositories/quest.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'
import { QuestEntity } from '@hoe/db'

export class QuestCacheMemoryRepository
  extends RepositoryCacheMemory<QuestEntity>
  implements QuestRepository {
}
