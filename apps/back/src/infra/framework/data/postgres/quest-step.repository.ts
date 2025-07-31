import { OPERATOR } from "@/core/domain/repositories/base.repository"
import { DatabaseConnection } from "./database"
import { QuestStepRepository } from "@/core/domain/repositories/quest-step.repository"
import { QuestStepsCreation, questOnStepTable, QuestStepsEntity, stepsTable } from "@hoe/db"
import { and, eq, inArray, or, SQL } from "drizzle-orm"

export class PostgresQuestStepRepository implements QuestStepRepository {
    constructor(private readonly client: DatabaseConnection) { }
    deleteWithQuestId(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }

    async create(data: QuestStepsCreation): Promise<QuestStepsEntity> {
        const [createdStep] = await this.client.insert(questOnStepTable).values(data).returning()
        return createdStep
    }

    async findAll(filter?: Partial<QuestStepsEntity> | undefined, operator?: OPERATOR): Promise<QuestStepsEntity[]> {
        const fieldsFilters: SQL[] = []

        if (filter?.questId) {
            fieldsFilters.push(eq(questOnStepTable.questId, filter.questId))
        }

        if (filter?.stepId) {
            fieldsFilters.push(eq(questOnStepTable.stepId, filter.stepId))
        }

        if (!fieldsFilters.length) {
            return this.client.select().from(questOnStepTable)
        }

        const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

        return this.client.select().from(questOnStepTable).where(whereRequest)
    }

    async findOne(filter: Partial<QuestStepsEntity>): Promise<QuestStepsEntity | null> {
        const [step] = await this.client.select().from(questOnStepTable).where(eq(questOnStepTable.id, filter.id)).limit(1)
        return step || null
    }

    async update(id: string, step: Partial<QuestStepsEntity>): Promise<QuestStepsEntity | null> {
        const [updatedStep] = await this.client.update(questOnStepTable).set(step).where(eq(questOnStepTable.id, id)).returning()
        return updatedStep || null
    }

    async remove(id: string): Promise<void> {
        await this.client.delete(questOnStepTable).where(eq(questOnStepTable.id, id))
    }
}