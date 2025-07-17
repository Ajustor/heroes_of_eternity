import { UseCase } from '@/core/base/use-case'
import { ItemEntity } from '@hoe/db'
import { ItemRepository } from '@/core/domain/repositories/item.repository'

export class ListItemsUseCase implements UseCase<ItemEntity[]> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<ItemEntity[]> {
    return this.itemRepository.findAll()
  }
}
