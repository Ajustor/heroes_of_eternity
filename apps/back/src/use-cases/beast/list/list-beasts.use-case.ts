import { BeastRepository } from '../../../core/domain/repositories/beast.repository'
import { BeastEntity } from '@hoe/db'
import { UseCase } from '@/core/base/use-case'

export class ListBeastsUseCase implements UseCase<BeastEntity[]> {
  constructor(private readonly beastRepository: BeastRepository) {}

  async execute(): Promise<BeastEntity[]> {
    return this.beastRepository.findAll()
  }
}
