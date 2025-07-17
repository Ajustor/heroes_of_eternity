import { test, expect, beforeEach, describe } from 'bun:test'
import { DeleteQuestUseCase } from './delete-quest.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'
import { RewardCacheMemoryRepository } from '@/infra/framework/data/cache-memory/reward-cache-memory.repository'

const mockQuestData = {
  id: 'test-id',
  name: 'Test Quest',
  description: 'A test quest',
  rewards: []
}

describe('DeleteQuestUseCase', () => {
  let deleteUseCase: DeleteQuestUseCase
  let repository: QuestCacheMemoryRepository
  let rewardRepository: RewardCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    rewardRepository = new RewardCacheMemoryRepository()
    deleteUseCase = new DeleteQuestUseCase(repository, rewardRepository)
  })

  test('should delete quest when it exists', async () => {
    repository.create(mockQuestData)
    rewardRepository.create({ questId: mockQuestData.id, itemId: 'test-item-id', amount: 1 })

    await deleteUseCase.execute(mockQuestData.id)

    expect(repository.findOne({ id: mockQuestData.id })).resolves.toBeNull()
    expect(rewardRepository.findOne({ questId: mockQuestData.id })).resolves.toBeNull()
  })
})
