import { test, expect, beforeEach, describe } from 'bun:test'
import { ListItemsUseCase } from './list-items.use-case'
import { CreateItemUseCase } from '../create/create-item.use-case'
import { ItemCacheMemoryRepository } from '@/infra/framework/data/cache-memory/item-cache-memory.repository'

const mockItemData1 = {
  name: 'Item 1',
  intelligence: 10,
  strength: 15,
  agility: 12,
  dexterity: 8,
  price: 100
}

const mockItemData2 = {
  name: 'Item 2',
  intelligence: 15,
  strength: 20,
  agility: 10,
  dexterity: 12,
  price: 150
}

describe('ListItemsUseCase', () => {
  let useCase: ListItemsUseCase
  let createUseCase: CreateItemUseCase
  let repository: ItemCacheMemoryRepository

  beforeEach(() => {
    repository = new ItemCacheMemoryRepository()
    createUseCase = new CreateItemUseCase(repository)
    useCase = new ListItemsUseCase(repository)
  })

  test('should return empty array when no items exist', async () => {
    const items = await useCase.execute()
    expect(items).toHaveLength(0)
  })

  test('should return all items when some exist', async () => {
    const item1 = await createUseCase.execute(mockItemData1)
    const item2 = await createUseCase.execute(mockItemData2)

    const items = await useCase.execute()
    expect(items).toHaveLength(2)
    expect(items[0].id).toBe(item1.id)
    expect(items[1].id).toBe(item2.id)
  })
})
