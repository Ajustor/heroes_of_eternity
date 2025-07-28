import { StepEntity, StepCreation } from "@hoe/db"
import { Repository } from "@/core/base/repository"
import { QuestEntity } from "@hoe/db"

export interface StepRepository extends Repository<StepEntity, StepCreation> {
  addQuestStep(questId: string, stepId: string): Promise<void>
  removeQuestStep(questId: string, stepId: string): Promise<void>
  getQuestSteps(questId: string): Promise<StepEntity[]>
  addBeastToStep(stepId: string, beastId: string, count: number): Promise<void>
  removeBeastFromStep(stepId: string, beastId: string): Promise<void>
  getBeastsForStep(stepId: string): Promise<{ beastId: string; count: number }[]>
}
