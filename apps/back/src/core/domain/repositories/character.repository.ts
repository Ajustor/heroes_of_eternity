import { Repository } from "@/core/base/repository"
import { CharacterEntity, CharacterCreation } from "@hoe/db"

export abstract class CharacterRepository extends Repository<CharacterEntity, CharacterCreation> {}