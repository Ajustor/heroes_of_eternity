import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"

export class DeleteQuestUseCase implements UseCase<void> {
  constructor(private readonly questRepository: QuestRepository) { }

  async execute(id: string): Promise<void> {
    await this.questRepository.remove(id)
  }
}
