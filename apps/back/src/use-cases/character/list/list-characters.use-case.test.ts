import { test, expect, beforeEach, describe } from 'bun:test'
import { ListCharactersUseCase } from './list-characters.use-case'
import { CharacterCacheMemoryRepository } from '@/infra/framework/data/cache-memory/character-cache-memory.repository'
import { CharacterEntity } from '@hoe/db'
import { CHARACTERS_KEYS } from '@hoe/assets'
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

describe('ListCharactersUseCase', () => {
  let useCase: ListCharactersUseCase
  let repository: CharacterCacheMemoryRepository

  beforeEach(() => {
    repository = new CharacterCacheMemoryRepository()
    useCase = new ListCharactersUseCase(repository)
  })

  test('should return empty array when no characters exist', async () => {
    const result = await useCase.execute()
    expect(result).toEqual([])
  })

  test('should return all characters when some exist', async () => {
    const character1 = createTestCharacter('Character 1', 'user1')
    const character2 = createTestCharacter('Character 2', 'user2')

    await repository.create(character1)
    await repository.create(character2)

    const result = await useCase.execute()
    expect(result).toHaveLength(2)
    expect(result).toEqual(expect.arrayContaining([character1, character2]))
  })

  test('should return characters in correct order', async () => {
    const character1 = createTestCharacter('A Character', 'user1')
    const character2 = createTestCharacter('B Character', 'user2')
    const character3 = createTestCharacter('C Character', 'user3')

    await repository.create(character1)
    await repository.create(character2)
    await repository.create(character3)

    const result = await useCase.execute()
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual(character1)
    expect(result[1]).toEqual(character2)
    expect(result[2]).toEqual(character3)
  })
})
