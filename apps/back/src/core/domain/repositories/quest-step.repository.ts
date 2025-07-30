import { QuestStepsEntity, QuestStepsCreation } from "@hoe/db"
import { Repository } from '@/core/base/repository'

export interface QuestStepRepository extends Repository<QuestStepsEntity, QuestStepsCreation> {
  deleteWithQuestId(id: string): Promise<void>
}
