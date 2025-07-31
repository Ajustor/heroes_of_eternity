import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { DatabaseConnection } from './database'
import { QuestRepository } from '@/core/domain/repositories/quest.repository'
import { QuestCreation, QuestEntity, questOnStepTable, questTable, RewardEntity, rewardTable, StepEntity, stepsTable } from '@hoe/db'
import { eq, or, and, SQL, inArray } from 'drizzle-orm'

export class PostgresQuestRepository implements QuestRepository {
    constructor(private readonly client: DatabaseConnection) {}

    async create(data: QuestCreation): Promise<QuestEntity> {
        const [createdQuest] = await this.client.insert(questTable).values(data).returning()
        return createdQuest
    }

    async findAll(filter?: Partial<QuestEntity> | undefined, operator?: OPERATOR): Promise<QuestEntity[]> {
        const fieldsFilters: SQL[] = []

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

        const quests: QuestEntity[] = await this.client.select().from(questTable).where(whereRequest)

        return quests
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

        const [foundQuest]: QuestEntity[] = await this.client.select().from(questTable).where(whereRequest).limit(1)

        return foundQuest
    }

    async update(id: string, data: Partial<QuestEntity>): Promise<QuestEntity | null> {
        const [updatedQuest]: QuestEntity[] = await this.client.update(questTable).set(data).where(eq(questTable.id, id)).returning()
        if (!updatedQuest) {
            return null
        }

        return updatedQuest || null
    }

    async remove(id: string): Promise<void> {
        await this.client.delete(questTable).where(eq(questTable.id, id))
    }
}