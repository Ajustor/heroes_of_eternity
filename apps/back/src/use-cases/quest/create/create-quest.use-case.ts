import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { RewardRepository } from '@/core/domain/repositories/reward.repository'
import { QuestCreation, RewardCreation } from "@hoe/db"

export class CreateQuestUseCase implements UseCase<QuestCreation> {
  constructor(private readonly questRepository: QuestRepository, private readonly rewardRepository: RewardRepository) {}

  async execute(
    name: string,
    description: string,
    rewards: RewardCreation[]
  ): Promise<QuestCreation> {
    const quest: QuestCreation = {
      name,
      description,
    }
    const createdQuest = await this.questRepository.create(quest)

    for (const reward of rewards) {
      await this.rewardRepository.create({
        questId: createdQuest.id,
        itemId: reward.itemId,
        amount: reward.amount,
      })
    }

    return createdQuest
  }
}
