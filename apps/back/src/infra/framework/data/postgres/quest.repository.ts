import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { DatabaseConnection } from './database'
import { QuestRepository } from '@/core/domain/repositories/quest.repository'
import { QuestCreation, QuestEntity, questTable } from '@hoe/db';
import { eq, or, and } from 'drizzle-orm'

export class PostgresQuestRepository implements QuestRepository {
    constructor(private readonly client: DatabaseConnection) { }

    async create(data: QuestCreation): Promise<QuestEntity> {
        const [createdQuest] = await this.client.insert(questTable).values(data).returning()
        return createdQuest
    }

    async findAll(filter?: Partial<QuestEntity> | undefined, operator?: OPERATOR): Promise<QuestEntity[]> {
        const fieldsFilters = []

        if (filter?.id) {
            fieldsFilters.push(eq(questTable.id, filter.id))
        }

        if (filter?.name) {
            fieldsFilters.push(eq(questTable.name, filter.name))
        }

        if (filter?.description) {
            fieldsFilters.push(eq(questTable.description, filter.description))
        }

        if (!fieldsFilters.length) {
            return this.client.select().from(questTable)
        }

        const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

        return this.client.select().from(questTable).where(whereRequest)
    }

    async findOne(filter: Partial<QuestEntity>, operator?: OPERATOR): Promise<QuestEntity | null> {
        const fieldsFilters = []

        if (filter?.id) {
            fieldsFilters.push(eq(questTable.id, filter.id))
        }

        if (filter?.name) {
            fieldsFilters.push(eq(questTable.name, filter.name))
        }

        if (filter?.description) {
            fieldsFilters.push(eq(questTable.description, filter.description))
        }

        if (!fieldsFilters.length) {
            return null
        }

        const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

        const [foundQuest] = await this.client.select().from(questTable).where(whereRequest).limit(1)
        return foundQuest || null
    }

    async update(id: string, data: Partial<QuestEntity>): Promise<QuestEntity | null> {
        const [updatedQuest] = await this.client.update(questTable).set(data).where(eq(questTable.id, id)).returning()
        return updatedQuest || null
    }

    async remove(id: string): Promise<void> {
        await this.client.delete(questTable).where(eq(questTable.id, id))
    }
}