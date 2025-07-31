import { QuestStepRepository } from '@/core/domain/repositories/quest-step.repository'
import { RepositoryCacheMemory } from '@/infra/framework/data/cache-memory/repository-cache-memory'
import { QuestStepsEntity } from '@hoe/db'

export class QuestStepCacheMemoryRepository extends RepositoryCacheMemory<QuestStepsEntity & { id?: string }> implements QuestStepRepository {
  deleteWithQuestId(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.questId === id)
    if (index === -1) {
      return Promise.resolve()
    }
    this.items.splice(index, 1)
    return Promise.resolve()
  }
}