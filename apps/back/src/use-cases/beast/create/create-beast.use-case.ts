import { UseCase } from "@/core/base/use-case"
import { BeastRepository } from "@/core/domain/repositories/beast.repository"
import { BeastCreation, BeastEntity } from "@hoe/db"
import { BEASTS_KEYS } from '@hoe/assets'
import { randomInt } from '@hoe/system'

export class CreateBeastUseCase implements UseCase<BeastEntity> {
  constructor(private readonly beastRepository: BeastRepository) { }

  async execute(newBeast: BeastCreation): Promise<BeastEntity> {
    return this.beastRepository.create(newBeast)
  }
}
