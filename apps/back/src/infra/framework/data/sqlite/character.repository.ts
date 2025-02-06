import { CharacterRepository } from '@/core/domain/repositories/character.repository'
import { CharacterEntity, CharacterCreation, charactersTable } from '@hoe/db'
import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { and, eq, or } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'

export class SqliteCharacterRepository implements CharacterRepository {
  constructor(private readonly client: LibSQLDatabase) {}

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

    return character
  }

  async findAll(filter?: Partial<CharacterEntity>, operator: OPERATOR = OPERATOR.OR): Promise<CharacterEntity[]> {
    const fieldsFilters = []

    if (filter?.id) {
      fieldsFilters.push(eq(charactersTable.id, filter.id))
    }

    if (filter?.name) {
      fieldsFilters.push(eq(charactersTable.name, filter.name))
    }

    if (!fieldsFilters.length) {
      return await this.client.select().from(charactersTable)
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    return await this.client
      .select()
      .from(charactersTable)
      .where(whereRequest)
  }

  async update(id: string, data: Partial<CharacterEntity>): Promise<CharacterEntity | null> {
    await this.client
      .update(charactersTable)
      .set(data)
      .where(eq(charactersTable.id, id))

    return this.findOne({ id })
  }

  async remove(id: string): Promise<void> {
    await this.client.delete(charactersTable).where(eq(charactersTable.id, id))
  }
}
