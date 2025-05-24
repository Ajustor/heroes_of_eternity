import { CharacterRepository } from '@/core/domain/repositories/character.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'
import { CharacterEntity } from '@hoe/db'

export class CharacterCacheMemoryRepository
  extends RepositoryCacheMemory<CharacterEntity>
  implements CharacterRepository {
}
