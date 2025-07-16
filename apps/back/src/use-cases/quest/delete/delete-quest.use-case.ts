import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { RewardRepository } from '@/core/domain/repositories/reward.repository'

export class DeleteQuestUseCase implements UseCase<void> {
  constructor(private readonly questRepository: QuestRepository, private readonly rewardRepository: RewardRepository) {}

  async execute(id: string): Promise<void> {
    await this.questRepository.remove(id)
    await this.rewardRepository.remove(id)
  }
}
