import { UseCase } from "@/core/base/use-case"
import { StepRepository } from "@/core/domain/repositories/step.repository"

export class DeleteStepUseCase implements UseCase<void> {
  constructor(private readonly stepRepository: StepRepository) { }

  async execute(id: string): Promise<void> {
    await this.stepRepository.remove(id)
  }
}
