import { UseCase } from "@/core/base/use-case"
import { StepRepository } from "@/core/domain/repositories/step.repository"
import { BeastOnStepCreation, StepCreation, StepEntity } from "@hoe/db"

export class CreateStepUseCase implements UseCase<StepEntity> {
  constructor(private readonly stepRepository: StepRepository) { }

  async execute(step: StepCreation, beastsToAdd: BeastOnStepCreation[]): Promise<StepEntity> {
    const createdStep = await this.stepRepository.create(step)

    for (const beast of beastsToAdd) {
      await this.stepRepository.addBeastToStep(createdStep.id, beast.beastId, beast.count)
    }

    const beasts = await this.stepRepository.getBeastsForStep(createdStep.id)

    return { ...createdStep, beasts }
  }
}
