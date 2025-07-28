import { UseCase } from "@/core/base/use-case"
import { SkillRepository } from "@/core/domain/repositories/skill.repository"
import { SkillEntity } from "@hoe/db"

export class ListSkillsUseCase implements UseCase<SkillEntity[]> {
  constructor(private readonly skillRepository: SkillRepository) { }

  async execute(): Promise<SkillEntity[]> {
    return this.skillRepository.findAll()
  }
}
