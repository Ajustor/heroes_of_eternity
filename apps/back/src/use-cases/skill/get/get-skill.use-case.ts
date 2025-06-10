import { UseCase } from "@/core/base/use-case"
import { SkillRepository } from "@/core/domain/repositories/skill.repository"
import { SkillEntity } from "@hoe/db"

export class GetSkillUseCase implements UseCase<SkillEntity> {
  constructor(private readonly skillRepository: SkillRepository) { }

  async execute(id: string): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOne({ id })
    if (!skill) {
      throw new Error('Skill not found')
    }
    return skill
  }
}
