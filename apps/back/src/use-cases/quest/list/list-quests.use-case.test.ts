import { test, expect, beforeEach, describe } from 'bun:test'
import { ListQuestsUseCase } from './list-quests.use-case'
import { QuestCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-cache-memory.repository'
import { RewardCacheMemoryRepository } from '@/infra/framework/data/cache-memory/reward-cache-memory.repository'
import { QuestStepCacheMemoryRepository } from '@/infra/framework/data/cache-memory/quest-step-memory.repository'

const FIRST_QUEST_ID = 'first-quest-id'
const SECOND_QUEST_ID = 'second-quest-id'

describe('ListQuestsUseCase', () => {
  let listUseCase: ListQuestsUseCase
  let repository: QuestCacheMemoryRepository
  let rewardRepository: RewardCacheMemoryRepository
  let questStepRepository: QuestStepCacheMemoryRepository

  beforeEach(() => {
    repository = new QuestCacheMemoryRepository()
    rewardRepository = new RewardCacheMemoryRepository()
    questStepRepository = new QuestStepCacheMemoryRepository()
    listUseCase = new ListQuestsUseCase(repository, rewardRepository, questStepRepository)
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

    rewardRepository.create({ questId: FIRST_QUEST_ID, itemId: 'item-1', amount: 1 })

    repository.create({
      id: SECOND_QUEST_ID,
      name: 'Quest 2',
      description: 'Description 2',
    })

    questStepRepository.create({ questId: FIRST_QUEST_ID, stepId: 'step-1' })
    questStepRepository.create({ questId: SECOND_QUEST_ID, stepId: 'step-2' })

    rewardRepository.create({ questId: SECOND_QUEST_ID, itemId: 'item-2', amount: 2 })

    const result = await listUseCase.execute()

    expect(result).toBeDefined()
    expect(result.length).toBe(2)
    expect(result).toContainEqual(expect.objectContaining({ id: FIRST_QUEST_ID }))
    expect(result).toContainEqual(expect.objectContaining({ id: SECOND_QUEST_ID }))
    expect(result[0].rewards).toContainEqual(expect.objectContaining({ itemId: 'item-1', amount: 1 }))
    expect(result[1].rewards).toContainEqual(expect.objectContaining({ itemId: 'item-2', amount: 2 }))
    expect(result[0].steps).toContainEqual(expect.objectContaining({ stepId: 'step-1' }))
    expect(result[1].steps).toContainEqual(expect.objectContaining({ stepId: 'step-2' }))
  })
})
