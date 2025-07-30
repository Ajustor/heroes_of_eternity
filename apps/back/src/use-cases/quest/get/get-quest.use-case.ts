import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { QuestEntity } from "@hoe/db"

export class GetQuestUseCase implements UseCase<QuestEntity> {
  constructor(private readonly questRepository: QuestRepository) { }

  async execute(id: string): Promise<QuestEntity> {
    const quest = await this.questRepository.findOne({ id })

    if (!quest) {
      throw new Error('Quest not found')
    }

    return quest
  }
}
