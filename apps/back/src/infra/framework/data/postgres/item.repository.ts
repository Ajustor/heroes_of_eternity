import { DatabaseConnection } from './database'
import { ItemRepository } from '@/core/domain/repositories/item.repository'
import { ItemEntity, ItemCreation } from '@hoe/db'
import { itemsTable } from '@hoe/db'
import { eq, or, and } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'

export class PostgresItemRepository implements ItemRepository {
  constructor(private readonly db: DatabaseConnection) {}


  async findAll(): Promise<ItemEntity[]> {
    return this.db.select().from(itemsTable)
  }

  async findOne(filter: Partial<ItemEntity>, operator?: OPERATOR): Promise<ItemEntity | null> {

    const fieldsFilters = []

    if (filter.id) {
      fieldsFilters.push(eq(itemsTable.id, filter.id))
    }

    if (filter.name) {
      fieldsFilters.push(eq(itemsTable.name, filter.name))
    }

    if (!fieldsFilters.length) {
      return null
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    const [item] = await this.db.select().from(itemsTable).where(whereRequest)

    return item || null
  }

  async create(item: ItemCreation): Promise<ItemEntity> {
    const [created] = await this.db
      .insert(itemsTable)
      .values(item)
      .returning()
    return created
  }

  async update(id: string, item: Partial<ItemCreation>): Promise<ItemEntity | null> {
    const [updated] = await this.db
      .update(itemsTable)
      .set(item)
      .where(eq(itemsTable.id, id))
      .returning()
    return updated
  }

  async remove(id: string): Promise<void> {
    await this.db.delete(itemsTable).where(eq(itemsTable.id, id))
  }
}
