import { UseCase } from "@/core/base/use-case"
import { CharacterRepository } from "@/core/domain/repositories/character.repository"
import { CharacterEntity } from "@hoe/db"

export class ListCharactersUseCase implements UseCase<CharacterEntity[]> {
  constructor(private readonly characterRepository: CharacterRepository) { }

  execute(filters?: Record<string, any>): Promise<CharacterEntity[]> {
    return this.characterRepository.findAll(filters as Partial<CharacterEntity>)
  }
}
