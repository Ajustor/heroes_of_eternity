import { UseCase } from "@/core/base/use-case"
import { StepRepository } from "@/core/domain/repositories/step.repository"
import { StepEntity } from "@hoe/db"

export class ListStepsUseCase implements UseCase<StepEntity[]> {
  constructor(private readonly stepRepository: StepRepository) {}

  async execute(): Promise<StepEntity[]> {
    const steps = await this.stepRepository.findAll()
    for (const step of steps) {
      const beasts = await this.stepRepository.getBeastsForStep(step.id)
      step.beasts = beasts
    }
    return steps
  }
}
