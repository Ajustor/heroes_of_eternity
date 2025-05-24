import { test, expect, beforeEach, describe } from 'bun:test'
import { GetCharacterUseCase } from './get-character.use-case'
import { CharacterCacheMemoryRepository } from '@/infra/framework/data/cache-memory/character-cache-memory.repository'
import { CharacterEntity } from '@hoe/db'
import { CHARACTERS_KEYS } from '@hoe/assets'

const mockUserId = 'user1'
const mockName = 'Test Character'

import { JOBS } from '@hoe/system'

const createTestCharacter = (name: string, userId: string) => ({
  id: '',
  name,
  userId,
  level: 1,
  job: JOBS.FREELANCE,
  skin: CHARACTERS_KEYS.Claude,
  maxLife: 150,
  life: 150,
  maxMana: 150,
  mana: 150,
  intelligence: 5,
  strength: 5,
  agility: 5,
  dexterity: 5,
  experience: 0,
})

describe('GetCharacterUseCase', () => {
  let useCase: GetCharacterUseCase
  let repository: CharacterCacheMemoryRepository
  let characterId: string
  let character: CharacterEntity

  beforeEach(() => {
    repository = new CharacterCacheMemoryRepository()
    useCase = new GetCharacterUseCase(repository)
    character = createTestCharacter(mockName, mockUserId)
    characterId = character.id = 'test-id'
    repository.create(character)
  })

  test('should get existing character', async () => {
    const result = await useCase.execute(characterId)
    
    expect(result).toBeDefined()
    expect(result?.id).toBe(characterId)
    expect(result?.userId).toBe(mockUserId)
    expect(result?.name).toBe(mockName)
    expect(result?.level).toBe(1)
    expect(result?.skin).toBe(CHARACTERS_KEYS.Claude)
    expect(result?.experience).toBe(0)
    expect(result?.maxLife).toBe(150)
    expect(result?.life).toBe(150)
    expect(result?.maxMana).toBe(150)
    expect(result?.mana).toBe(150)
    expect(result?.intelligence).toBe(5)
    expect(result?.strength).toBe(5)
    expect(result?.agility).toBe(5)
    expect(result?.dexterity).toBe(5)
  })

  test('should return null for non-existing character', async () => {
    const nonExistingId = 'non-existing-id'
    const result = await useCase.execute(nonExistingId)
    
    expect(result).toBeNull()
  })
})
