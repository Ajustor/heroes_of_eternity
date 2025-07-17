import { UseCase } from '@/core/base/use-case'
import { ItemRepository } from '@/core/domain/repositories/item.repository'

export class DeleteItemUseCase implements UseCase<void> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: string): Promise<void> {
    return this.itemRepository.remove(id)
  }
}
