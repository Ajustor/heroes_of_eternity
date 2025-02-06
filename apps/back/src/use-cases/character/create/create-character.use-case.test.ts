import { test, expect, beforeEach, describe } from 'bun:test'
import { CreateCharacterUseCase } from './create-character.use-case'
import { CharacterCacheMemoryRepository } from '@/infra/framework/data/cache-memory/character-cache-memory.repository'
import { CHARACTERS_KEYS } from '@hoe/assets'

const mockUserId = 'user1'
const mockName = 'Test Character'

describe('CreateCharacterUseCase', () => {
  let useCase: CreateCharacterUseCase
  let repository: CharacterCacheMemoryRepository

  beforeEach(() => {
    repository = new CharacterCacheMemoryRepository()
    useCase = new CreateCharacterUseCase(repository)
  })

  test('should create a character with random stats', async () => {
    const result = await useCase.execute(mockName, mockUserId)
    
    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.userId).toBe(mockUserId)
    expect(result.name).toBe(mockName)
    expect(result.level).toBe(1)
    expect(result.skin).toBe(CHARACTERS_KEYS.Claude)
    expect(result.experience).toBe(0)
    expect(result.maxLife).toBeGreaterThanOrEqual(100)
    expect(result.maxLife).toBeLessThanOrEqual(200)
    expect(result.life).toBe(result.maxLife)
    expect(result.maxMana).toBeGreaterThanOrEqual(100)
    expect(result.maxMana).toBeLessThanOrEqual(200)
    expect(result.mana).toBe(result.maxMana)
    expect(result.intelligence).toBeGreaterThanOrEqual(1)
    expect(result.intelligence).toBeLessThanOrEqual(10)
    expect(result.strength).toBeGreaterThanOrEqual(1)
    expect(result.strength).toBeLessThanOrEqual(10)
    expect(result.agility).toBeGreaterThanOrEqual(1)
    expect(result.agility).toBeLessThanOrEqual(10)
    expect(result.dexterity).toBeGreaterThanOrEqual(1)
    expect(result.dexterity).toBeLessThanOrEqual(10)
  })

  test('should create multiple characters with different stats', async () => {
    const character1 = await useCase.execute('Character 1', mockUserId)
    const character2 = await useCase.execute('Character 2', mockUserId)

    expect(character1.id).not.toBe(character2.id)
    expect(character1.name).not.toBe(character2.name)
  })
})
