import { test, expect, beforeEach, describe } from 'bun:test'
import { DeleteItemUseCase } from './delete-item.use-case'
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

describe('DeleteItemUseCase', () => {
  let useCase: DeleteItemUseCase
  let createUseCase: CreateItemUseCase
  let repository: ItemCacheMemoryRepository

  beforeEach(() => {
    repository = new ItemCacheMemoryRepository()
    createUseCase = new CreateItemUseCase(repository)
    useCase = new DeleteItemUseCase(repository)
  })

  test('should delete an existing item', async () => {
    const item = await createUseCase.execute(mockItemData)
    await useCase.execute(item.id)
    const deletedItem = await repository.findOne({ id: item.id })
    expect(deletedItem).toBeNull()
  })

  test('should not fail when deleting a non-existing item', async () => {
    await useCase.execute('non-existing-id')
  })
})
