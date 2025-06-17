import { test, expect, beforeEach, describe } from 'bun:test'
import { DeleteQuestUseCase } from './delete-quest.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'

const mockQuestData = {
  id: 'test-id',
  name: 'Test Quest',
  description: 'A test quest',
}

describe('DeleteQuestUseCase', () => {
  let deleteUseCase: DeleteQuestUseCase
  let repository: QuestCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    deleteUseCase = new DeleteQuestUseCase(repository)
  })

  test('should delete quest when it exists', async () => {
    repository.create(mockQuestData)


    await deleteUseCase.execute(mockQuestData.id)

    expect(repository.findOne({ id: mockQuestData.id })).resolves.toBeNull()
  })
})
