import { ItemRepository } from '@/core/domain/repositories/item.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'
import { ItemEntity } from '@hoe/db'

export class ItemCacheMemoryRepository
  extends RepositoryCacheMemory<ItemEntity>
  implements ItemRepository {
}
