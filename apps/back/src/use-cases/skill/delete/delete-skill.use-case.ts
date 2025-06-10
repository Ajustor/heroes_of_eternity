import { UseCase } from "@/core/base/use-case"
import { SkillRepository } from "@/core/domain/repositories/skill.repository"

export class DeleteSkillUseCase implements UseCase<void> {
  constructor(private readonly skillRepository: SkillRepository) { }

  async execute(id: string): Promise<void> {
    await this.skillRepository.remove(id)
  }
}
