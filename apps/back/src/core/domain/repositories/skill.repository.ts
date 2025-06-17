import { SkillEntity, SkillCreation } from "@hoe/db"
import { Repository } from "@/core/base/repository"

export interface SkillRepository extends Repository<SkillEntity, SkillCreation> {
}
