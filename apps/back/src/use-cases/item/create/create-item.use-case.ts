import { UseCase } from '@/core/base/use-case'
import { ItemCreation, ItemEntity } from '@hoe/db'
import { ItemRepository } from '@/core/domain/repositories/item.repository'

export class CreateItemUseCase implements UseCase<ItemEntity> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(newItem: ItemCreation): Promise<ItemEntity> {
    return this.itemRepository.create(newItem)
  }
}
