import { UseCase } from "@/core/base/use-case"
import { QuestStepRepository } from '@/core/domain/repositories/quest-step.repository'
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { RewardRepository } from '@/core/domain/repositories/reward.repository'
import { StepRepository } from '@/core/domain/repositories/step.repository'
import { QuestEntity, StepEntity } from "@hoe/db"

export class ListQuestsUseCase implements UseCase<QuestEntity[]> {
  constructor(private readonly questRepository: QuestRepository, private readonly rewardRepository: RewardRepository, private readonly questStepRepository: QuestStepRepository) {}

  async execute(): Promise<QuestEntity[]> {
    const quests = await this.questRepository.findAll()
    const rewards = await this.rewardRepository.findAll()
    const questSteps = await this.questStepRepository.findAll()
    return quests.map((quest) => {
      return {
        ...quest,
        rewards: rewards.filter((reward) => reward.questId === quest.id),
        steps: questSteps.filter((questStep) => questStep.questId === quest.id)
      }
    })
  }
}
