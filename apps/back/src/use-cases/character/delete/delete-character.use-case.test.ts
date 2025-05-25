import { test, expect, beforeEach, describe } from 'bun:test'
import { DeleteCharacterUseCase } from './delete-character.use-case'
import { CharacterCacheMemoryRepository } from '@/infra/framework/data/cache-memory/character-cache-memory.repository'
import { CharacterEntity } from '@hoe/db'
import { CHARACTERS_KEYS } from '@hoe/assets'
import { JOBS } from '@hoe/system'

const mockUserId = 'user1'
const mockName = 'Test Character'

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

describe('DeleteCharacterUseCase', () => {
  let useCase: DeleteCharacterUseCase
  let repository: CharacterCacheMemoryRepository
  let characterId: string
  let character: CharacterEntity

  beforeEach(() => {
    repository = new CharacterCacheMemoryRepository()
    useCase = new DeleteCharacterUseCase(repository)
    character = createTestCharacter(mockName, mockUserId)
    characterId = character.id = 'test-id'
    repository.create(character)
  })

  test('should delete existing character', async () => {
    await useCase.execute(characterId)
    const result = await repository.findOne({ id: characterId })
    expect(result).toBeNull()
  })

  test('should not fail when deleting non-existing character', async () => {
    const nonExistingId = 'non-existing-id'
    await useCase.execute(nonExistingId)
  })

  test('should delete character and not affect other characters', async () => {
    // Create two characters
    const character1 = createTestCharacter('Character 1', mockUserId)
    character1.id = 'test-id-1'
    await repository.create(character1)

    const character2 = createTestCharacter('Character 2', mockUserId)
    character2.id = 'test-id-2'
    await repository.create(character2)

    // Delete the first character
    await useCase.execute(character1.id)

    // Verify the first character is deleted
    const result1 = await repository.findOne({ id: character1.id })
    expect(result1).toBeNull()

    // Verify the second character still exists
    const result2 = await repository.findOne({ id: character2.id })
    expect(result2).toBeDefined()
    expect(result2?.id).toBe(character2.id)
    expect(result2?.name).toBe('Character 2')
  })
})
