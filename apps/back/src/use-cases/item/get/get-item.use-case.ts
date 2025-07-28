import { UseCase } from '@/core/base/use-case'
import { ItemRepository } from '@/core/domain/repositories/item.repository'
import { ItemEntity } from '@hoe/db'

export class GetItemUseCase implements UseCase<ItemEntity | null> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: string): Promise<ItemEntity | null> {
    return this.itemRepository.findOne({ id })
  }
}
