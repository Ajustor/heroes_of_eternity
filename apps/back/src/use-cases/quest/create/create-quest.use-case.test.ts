import { test, expect, beforeEach, describe } from 'bun:test'
import { CreateQuestUseCase } from './create-quest.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'
import { RewardCacheMemoryRepository } from '@/infra/framework/data/cache-memory/reward-cache-memory.repository'

const mockedRewards = [
  {
    itemId: 'anItemId',
    amount: 1
  }
]

const mockQuestData = {
  name: 'Test Quest',
  description: 'A test quest',
  level: 1,
  experience: 100,
  rewards: mockedRewards,
  requirements: ['level 1']
}

describe('CreateQuestUseCase', () => {
  let useCase: CreateQuestUseCase
  let repository: QuestCacheMemoryRepository
  let rewardRepository: RewardCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    rewardRepository = new RewardCacheMemoryRepository()
    useCase = new CreateQuestUseCase(repository, rewardRepository)
  })

  test('should create a quest with provided data', async () => {
    const result = await useCase.execute(
      mockQuestData.name,
      mockQuestData.description,
      mockedRewards
    )

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(mockQuestData.name)
    expect(result.description).toBe(mockQuestData.description)
    expect(result.rewards).toBeDefined()
    for (const reward of result.rewards ?? []) {
      expect(reward.questId).toBe(result.id)
      expect(reward.itemId).toBe(mockQuestData.rewards[0].itemId)
      expect(reward.amount).toBe(mockQuestData.rewards[0].amount)
    }
  })

  test('should create multiple quests with different data', async () => {
    const quest1 = await useCase.execute(
      'Quest 1',
      'Description 1',
      mockedRewards
    )

    const quest2 = await useCase.execute(
      'Quest 2',
      'Description 2',
      mockedRewards
    )

    expect(quest1.id).not.toBe(quest2.id)
    expect(quest1.name).not.toBe(quest2.name)
  })
})
