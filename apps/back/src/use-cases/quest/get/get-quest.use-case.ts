import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { RewardRepository } from '@/core/domain/repositories/reward.repository'
import { QuestEntity } from "@hoe/db"

export class GetQuestUseCase implements UseCase<QuestEntity> {
  constructor(private readonly questRepository: QuestRepository, private readonly rewardRepository: RewardRepository) {}

  async execute(id: string): Promise<QuestEntity> {
    const quest = await this.questRepository.findOne({ id })

    if (!quest) {
      throw new Error('Quest not found')
    }

    const rewards = await this.rewardRepository.findAll({ questId: id })
    return {
      ...quest,
      rewards,
    }
  }
}
