import { UseCase } from "@/core/base/use-case"
import { CharacterRepository } from "@/core/domain/repositories/character.repository"
import { CharacterEntity } from "@hoe/db"

export class ListCharactersUseCase implements UseCase<CharacterEntity[]> {
  constructor(private readonly characterRepository: CharacterRepository) { }

  async execute(filters?: Partial<CharacterEntity>): Promise<CharacterEntity[]> {
    return await this.characterRepository.findAll(filters)
  }
}
