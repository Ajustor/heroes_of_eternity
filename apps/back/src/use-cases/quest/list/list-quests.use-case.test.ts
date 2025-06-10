import { test, expect, beforeEach, describe } from 'bun:test'
import { ListQuestsUseCase } from './list-quests.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'

const mockQuestData = {
  name: 'Test Quest',
  description: 'A test quest',
}

const FIRST_QUEST_ID = 'first-quest-id'
const SECOND_QUEST_ID = 'second-quest-id'

describe('ListQuestsUseCase', () => {
  let listUseCase: ListQuestsUseCase
  let repository: QuestCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    listUseCase = new ListQuestsUseCase(repository)
  })

  test('should return empty array when no quests exist', async () => {
    const result = await listUseCase.execute()
    expect(result).toBeDefined()
    expect(result).toEqual([])
  })

  test('should return all quests when some exist', async () => {
    repository.create({
      id: FIRST_QUEST_ID,
      name: 'Quest 1',
      description: 'Description 1',
    })

    repository.create({
      id: SECOND_QUEST_ID,
      name: 'Quest 2',
      description: 'Description 2',
    })

    const result = await listUseCase.execute()

    expect(result).toBeDefined()
    expect(result.length).toBe(2)
    expect(result).toContainEqual(expect.objectContaining({ id: FIRST_QUEST_ID }))
    expect(result).toContainEqual(expect.objectContaining({ id: SECOND_QUEST_ID }))
  })
})
