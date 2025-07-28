import { BeastEntity } from '@hoe/db'
import { BeastRepository } from '@/core/domain/repositories/beast.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'

export class BeastCacheMemoryRepository extends RepositoryCacheMemory<BeastEntity> implements BeastRepository {


}
