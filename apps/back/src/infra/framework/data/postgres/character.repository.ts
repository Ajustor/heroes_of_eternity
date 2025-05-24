import { CharacterRepository } from '@/core/domain/repositories/character.repository'
import { CharacterEntity, CharacterCreation, charactersTable } from '@hoe/db'
import { and, eq, or } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { DatabaseConnection } from './database'

export class PostgresCharacterRepository implements CharacterRepository {
  constructor(private readonly client: DatabaseConnection) { }

  async create(character: CharacterCreation): Promise<CharacterEntity> {
    const [createdCharacter] = await this.client
      .insert(charactersTable)
      .values(character)
      .returning()

    return createdCharacter
  }

  async findOne(filter: Partial<CharacterEntity>, operator: OPERATOR = OPERATOR.OR): Promise<CharacterEntity | null> {
    const fieldsFilters = []

    if (filter.id) {
      fieldsFilters.push(eq(charactersTable.id, filter.id))
    }

    if (filter.name) {
      fieldsFilters.push(eq(charactersTable.name, filter.name))
    }

    if (!fieldsFilters.length) {
      return null
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    const [character] = await this.client
      .select()
      .from(charactersTable)
      .where(whereRequest)

    return character || null
  }

  async findAll(filters?: Partial<CharacterEntity>, operator = OPERATOR.OR): Promise<CharacterEntity[]> {
    const fieldsFilters = []
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          fieldsFilters.push(eq(charactersTable[key as keyof CharacterEntity], value))
        }
      }
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    return await this.client
      .select()
      .from(charactersTable)
      .where(whereRequest)
  }

  async update(id: string, character: Partial<CharacterEntity>): Promise<CharacterEntity | null> {
    const [updatedCharacter] = await this.client
      .update(charactersTable)
      .set(character)
      .where(eq(charactersTable.id, id))
      .returning()

    return updatedCharacter || null
  }

  async delete(id: string): Promise<void> {
    await this.client
      .delete(charactersTable)
      .where(eq(charactersTable.id, id))
  }

  async remove(id: string): Promise<void> {
    await this.delete(id)
  }
}
