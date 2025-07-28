import { test, expect, beforeEach, describe } from 'bun:test'
import { CreateBeastUseCase } from './create-beast.use-case'
import { BeastCacheMemoryRepository } from '@/infra/framework/data/cache-memory/beast-cache-memory.repository'
import { BEASTS_KEYS } from '@hoe/assets'

const mockBeastData = {
  name: 'Test Beast',
  skin: BEASTS_KEYS.Spider,
  maxMana: 100,
  maxLife: 500,
  intelligence: 10,
  strength: 15,
  agility: 12,
  dexterity: 8,
  isBoss: false,
  experience: 0
}

describe('CreateBeastUseCase', () => {
  let useCase: CreateBeastUseCase
  let repository: BeastCacheMemoryRepository

  beforeEach(() => {
    repository = new BeastCacheMemoryRepository()
    useCase = new CreateBeastUseCase(repository)
  })

  test('should create a beast with provided data', async () => {
    const beast = await useCase.execute(mockBeastData)
    expect(beast).toBeDefined()
    expect(beast.id).toBeDefined()
    expect(beast.name).toBe(mockBeastData.name)
    expect(beast.skin).toBe(mockBeastData.skin)
    expect(beast.maxMana).toBe(mockBeastData.maxMana)
    expect(beast.maxLife).toBe(mockBeastData.maxLife)
    expect(beast.intelligence).toBe(mockBeastData.intelligence)
    expect(beast.strength).toBe(mockBeastData.strength)
    expect(beast.agility).toBe(mockBeastData.agility)
    expect(beast.dexterity).toBe(mockBeastData.dexterity)
    expect(beast.isBoss).toBe(mockBeastData.isBoss)
    expect(beast.experience).toBe(mockBeastData.experience)
  })

  test('should create multiple beasts with different data', async () => {
    const beast1 = await useCase.execute({
      ...mockBeastData,
      name: 'Beast 1',
      skin: BEASTS_KEYS.Rat,
      maxMana: 50,
      maxLife: 200,
      intelligence: 5,
      strength: 8,
      agility: 10,
      dexterity: 6
    })

    const beast2 = await useCase.execute({
      ...mockBeastData,
      name: 'Beast 2',
      skin: BEASTS_KEYS.Skeleton,
      maxMana: 75,
      maxLife: 300,
      intelligence: 7,
      strength: 12,
      agility: 15,
      dexterity: 9
    })

    expect(beast1.id).not.toBe(beast2.id)
    expect(beast1.name).toBe('Beast 1')
    expect(beast2.name).toBe('Beast 2')
    expect(beast1.skin).toBe(BEASTS_KEYS.Rat)
    expect(beast2.skin).toBe(BEASTS_KEYS.Skeleton)
    expect(beast1.isBoss).toBeFalsy()
    expect(beast2.isBoss).toBeFalsy()
    expect(beast1.experience).toBe(0)
    expect(beast2.experience).toBe(0)
  })

})
