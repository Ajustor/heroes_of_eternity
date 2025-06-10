import { UseCase } from "@/core/base/use-case"
import { StepRepository } from "@/core/domain/repositories/step.repository"
import { StepCreation } from "@hoe/db"

export class CreateStepUseCase implements UseCase<StepCreation> {
  constructor(private readonly stepRepository: StepRepository) { }

  async execute(step: StepCreation): Promise<StepCreation> {
    return this.stepRepository.create(step)
  }
}
