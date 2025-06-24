import { UseCase } from "@/core/base/use-case"
import { StepRepository } from "@/core/domain/repositories/step.repository"
import { StepEntity } from "@hoe/db"

export class ListStepsUseCase implements UseCase<StepEntity[]> {
  constructor(private readonly stepRepository: StepRepository) { }

  async execute(): Promise<StepEntity[]> {
    return this.stepRepository.findAll()
  }
}
