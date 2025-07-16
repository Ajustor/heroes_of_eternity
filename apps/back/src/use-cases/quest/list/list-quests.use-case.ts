import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { RewardRepository } from '@/core/domain/repositories/reward.repository'
import { QuestEntity } from "@hoe/db"

export class ListQuestsUseCase implements UseCase<QuestEntity[]> {
  constructor(private readonly questRepository: QuestRepository, private readonly rewardRepository: RewardRepository) {}

  async execute(): Promise<QuestEntity[]> {
    const quests = await this.questRepository.findAll()
    const rewards = await this.rewardRepository.findAll()
    return quests.map((quest) => {
      return {
        ...quest,
        rewards: rewards.filter((reward) => reward.questId === quest.id),
      }
    })
  }
}
