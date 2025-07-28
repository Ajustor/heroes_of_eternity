import { test, expect, beforeEach, describe } from 'bun:test'
import { CreateItemUseCase } from './create-item.use-case'
import { ItemCacheMemoryRepository } from '@/infra/framework/data/cache-memory/item-cache-memory.repository'

const mockItemData = {
  name: 'Test Item',
  intelligence: 10,
  strength: 15,
  agility: 12,
  dexterity: 8,
  price: 100
}

describe('CreateItemUseCase', () => {
  let useCase: CreateItemUseCase
  let repository: ItemCacheMemoryRepository

  beforeEach(() => {
    repository = new ItemCacheMemoryRepository()
    useCase = new CreateItemUseCase(repository)
  })

  test('should create an item with provided data', async () => {
    const item = await useCase.execute(mockItemData)
    expect(item).toBeDefined()
    expect(item.id).toBeDefined()
    expect(item.name).toBe(mockItemData.name)
    expect(item.intelligence).toBe(mockItemData.intelligence)
    expect(item.strength).toBe(mockItemData.strength)
    expect(item.agility).toBe(mockItemData.agility)
    expect(item.dexterity).toBe(mockItemData.dexterity)
    expect(item.price).toBe(mockItemData.price)
  })

  test('should create multiple items with different data', async () => {
    const item1 = await useCase.execute({
      ...mockItemData,
      name: 'Item 1',
      intelligence: 5,
      strength: 8,
      agility: 10,
      dexterity: 6,
      price: 50
    })

    const item2 = await useCase.execute({
      ...mockItemData,
      name: 'Item 2',
      intelligence: 7,
      strength: 12,
      agility: 15,
      dexterity: 9,
      price: 75
    })

    expect(item1.id).not.toBe(item2.id)
    expect(item1.name).toBe('Item 1')
    expect(item2.name).toBe('Item 2')
  })
})
