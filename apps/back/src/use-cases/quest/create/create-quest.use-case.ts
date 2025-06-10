import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { QuestCreation } from "@hoe/db"

export class CreateQuestUseCase implements UseCase<QuestCreation> {
  constructor(private readonly questRepository: QuestRepository) { }

  async execute(
    name: string,
    description: string,
  ): Promise<QuestCreation> {
    const quest: QuestCreation = {
      name,
      description,
    }
    return this.questRepository.create(quest)
  }
}
