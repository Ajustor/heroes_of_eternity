import { test, expect, beforeEach, describe } from 'bun:test'
import { GetItemUseCase } from './get-item.use-case'
import { CreateItemUseCase } from '../create/create-item.use-case'
import { ItemCacheMemoryRepository } from '@/infra/framework/data/cache-memory/item-cache-memory.repository'

const mockItemData = {
  name: 'Test Item',
  intelligence: 10,
  strength: 15,
  agility: 12,
  dexterity: 8,
  price: 100
}

describe('GetItemUseCase', () => {
  let useCase: GetItemUseCase
  let createUseCase: CreateItemUseCase
  let repository: ItemCacheMemoryRepository

  beforeEach(() => {
    repository = new ItemCacheMemoryRepository()
    createUseCase = new CreateItemUseCase(repository)
    useCase = new GetItemUseCase(repository)
  })

  test('should return an existing item', async () => {
    const item = await createUseCase.execute(mockItemData)
    const retrievedItem = await useCase.execute(item.id)
    expect(retrievedItem).toBeDefined()
    expect(retrievedItem?.id).toBe(item.id)
    expect(retrievedItem?.name).toBe(mockItemData.name)
    expect(retrievedItem?.intelligence).toBe(mockItemData.intelligence)
    expect(retrievedItem?.strength).toBe(mockItemData.strength)
    expect(retrievedItem?.agility).toBe(mockItemData.agility)
    expect(retrievedItem?.dexterity).toBe(mockItemData.dexterity)
    expect(retrievedItem?.price).toBe(mockItemData.price)
  })

  test('should return null for non-existing item', async () => {
    const item = await useCase.execute('non-existing-id')
    expect(item).toBeNull()
  })
})
