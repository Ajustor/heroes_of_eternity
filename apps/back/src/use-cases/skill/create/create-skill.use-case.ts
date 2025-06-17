import { UseCase } from "@/core/base/use-case"
import { SkillRepository } from "@/core/domain/repositories/skill.repository"
import { SkillCreation } from "@hoe/db"

export class CreateSkillUseCase implements UseCase<SkillCreation> {
  constructor(private readonly skillRepository: SkillRepository) { }

  async execute(
    skill: SkillCreation
  ): Promise<SkillCreation> {
    return this.skillRepository.create(skill)
  }
}
