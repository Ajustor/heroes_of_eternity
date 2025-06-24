import { UseCase } from "@/core/base/use-case"
import { QuestRepository } from "@/core/domain/repositories/quest.repository"
import { QuestEntity } from "@hoe/db"

export class ListQuestsUseCase implements UseCase<QuestEntity[]> {
  constructor(private readonly questRepository: QuestRepository) { }

  async execute(): Promise<QuestEntity[]> {
    return this.questRepository.findAll()
  }
}
