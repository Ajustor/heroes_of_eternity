import { BeastCreation, BeastEntity, beastsTable } from '@hoe/db'
import { DatabaseConnection } from './database'
import { BeastRepository } from '@/core/domain/repositories/beast.repository'
import { eq, or, and } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'

export class PostgresBeastRepository implements BeastRepository {
  constructor(private readonly client: DatabaseConnection) {}

  async list(): Promise<BeastEntity[]> {
    return this.client.select().from(beastsTable)
  }

  async create(beast: BeastCreation): Promise<BeastEntity> {
    const [createdBeast] = await this.client.insert(beastsTable).values(beast).returning()
    return createdBeast
  }

  async findAll(): Promise<BeastEntity[]> {
    return this.client.select().from(beastsTable)
  }

  async findOne(filters: Partial<BeastEntity>, operator = OPERATOR.OR): Promise<BeastEntity | null> {

    const fieldsFilters = []

    if (filters.id) {
      fieldsFilters.push(eq(beastsTable.id, filters.id))
    }

    if (filters.name) {
      fieldsFilters.push(eq(beastsTable.name, filters.name))
    }

    if (!fieldsFilters.length) {
      return null
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)


    const [retrievedBeast] = await this.client.select().from(beastsTable).where(whereRequest)

    return retrievedBeast
  }

  async update(id: string, entity: BeastEntity): Promise<BeastEntity> {
    const [updatedBeast] = await this.client.update(beastsTable).set(entity).where(eq(beastsTable.id, id)).returning()
    return updatedBeast
  }

  async remove(id: string): Promise<void> {
    await this.client.delete(beastsTable).where(eq(beastsTable.id, id))
  }
}
