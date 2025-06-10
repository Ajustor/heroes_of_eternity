import { test, expect, beforeEach, describe } from 'bun:test'
import { CreateQuestUseCase } from './create-quest.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'

const mockQuestData = {
  name: 'Test Quest',
  description: 'A test quest',
  level: 1,
  experience: 100,
  rewards: ['gold', 'xp'],
  requirements: ['level 1']
}

describe('CreateQuestUseCase', () => {
  let useCase: CreateQuestUseCase
  let repository: QuestCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    useCase = new CreateQuestUseCase(repository)
  })

  test('should create a quest with provided data', async () => {
    const result = await useCase.execute(
      mockQuestData.name,
      mockQuestData.description,
    )

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(mockQuestData.name)
    expect(result.description).toBe(mockQuestData.description)
  })

  test('should create multiple quests with different data', async () => {
    const quest1 = await useCase.execute(
      'Quest 1',
      'Description 1',
    )

    const quest2 = await useCase.execute(
      'Quest 2',
      'Description 2',
    )

    expect(quest1.id).not.toBe(quest2.id)
    expect(quest1.name).not.toBe(quest2.name)
  })
})
