import { UseCase } from "@/core/base/use-case"
import { StepRepository } from "@/core/domain/repositories/step.repository"
import { StepEntity } from "@hoe/db"

export class GetStepUseCase implements UseCase<StepEntity> {
  constructor(private readonly stepRepository: StepRepository) { }

  async execute(id: string): Promise<StepEntity> {
    const step = await this.stepRepository.findOne({ id })
    if (!step) {
      throw new Error('Step not found')
    }
    return step
  }
}
