import { UseCase } from "@/core/base/use-case"
import { BeastRepository } from "@/core/domain/repositories/beast.repository"
import { BeastCreation, BeastEntity } from "@hoe/db"

export class CreateBeastUseCase implements UseCase<BeastEntity> {
  constructor(private readonly beastRepository: BeastRepository) {}

  async execute(newBeast: BeastCreation): Promise<BeastEntity> {
    return this.beastRepository.create(newBeast)
  }
}
