import { UseCase } from "@/core/base/use-case"
import { CharacterRepository } from "@/core/domain/repositories/character.repository"

export class DeleteCharacterUseCase implements UseCase<void> {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<void> {
    await this.characterRepository.remove(id)
  }
}
