import { test, expect, beforeEach, describe } from 'bun:test'
import { GetQuestUseCase } from './get-quest.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'
import { RewardCacheMemoryRepository } from '@/infra/framework/data/cache-memory/reward-cache-memory.repository'

const mockRewardData = {
  questId: 'test-id',
  itemId: 'test-item-id',
  amount: 1
}

const mockQuestData = {
  id: 'test-id',
  name: 'Test Quest',
  description: 'A test quest',
  rewards: []
}

describe('GetQuestUseCase', () => {
  let getUseCase: GetQuestUseCase
  let repository: QuestCacheMemoryRepository
  let rewardRepository: RewardCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    rewardRepository = new RewardCacheMemoryRepository()
    getUseCase = new GetQuestUseCase(repository, rewardRepository)
  })

  test('should throw error when quest does not exist', async () => {
    expect(() => getUseCase.execute('non-existent-id')).toThrow('Quest not found')
  })

  test('should return quest when it exists', async () => {
    repository.create(mockQuestData)
    rewardRepository.create(mockRewardData)

    const result = await getUseCase.execute(mockQuestData.id)

    expect(result).toBeDefined()
    expect(result.id).toBe(mockQuestData.id)
    expect(result.name).toBe(mockQuestData.name)
    expect(result.description).toBe(mockQuestData.description)
    expect(result.rewards).toContainEqual(mockRewardData)
  })
})
