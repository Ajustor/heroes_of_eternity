import { UseCase } from "@/core/base/use-case"
import { CharacterRepository } from "@/core/domain/repositories/character.repository"
import { CharacterEntity } from "@hoe/db"

export class GetCharacterUseCase implements UseCase<CharacterEntity | null> {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<CharacterEntity | null> {
    return await this.characterRepository.findOne({ id })
  }
}
