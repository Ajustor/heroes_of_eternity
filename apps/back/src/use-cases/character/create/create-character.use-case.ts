import { UseCase } from "@/core/base/use-case"
import { CharacterRepository } from "@/core/domain/repositories/character.repository"
import { CharacterCreation } from "@hoe/db"
import { CHARACTERS_KEYS } from '@hoe/assets'
import { randomInt } from '@hoe/system'

export class CreateCharacterUseCase implements UseCase<CharacterCreation> {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(name: string, userId: string): Promise<CharacterCreation> {
    const maxLife = randomInt(100, 200)
    const maxMana = randomInt(100, 200)
    const character: CharacterCreation = {
      name,
      userId,
      level: 1,
      maxLife,
      life: maxLife,
      maxMana,
      mana: maxMana,
      skin: CHARACTERS_KEYS.Claude,
      intelligence: randomInt(1, 10),
      strength: randomInt(1, 10),
      agility: randomInt(1, 10),
      dexterity: randomInt(1, 10),
      experience: 0,
    }
    return await this.characterRepository.create(character)
  }
}
