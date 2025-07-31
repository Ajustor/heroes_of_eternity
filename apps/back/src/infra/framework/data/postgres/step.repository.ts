import { StepRepository } from '@/core/domain/repositories/step.repository'
import { StepEntity, StepCreation, stepsTable, questTable, beastOnStepTable, questOnStepTable } from '@hoe/db'
import { DatabaseConnection } from './database'
import { and, eq, or } from 'drizzle-orm'


export class PostgresStepRepository implements StepRepository {
  constructor(private readonly client: DatabaseConnection) { }

  // Méthodes CRUD existantes
  async create(step: StepCreation): Promise<StepEntity> {
    const [createdStep] = await this.client
      .insert(stepsTable)
      .values(step)
      .returning()

    return createdStep
  }

  async findOne(filter: Partial<StepEntity>): Promise<StepEntity | null> {
    const [step] = await this.client
      .select()
      .from(stepsTable)
      .where(eq(stepsTable.id, filter.id))

    return step || null
  }

  async findAll(): Promise<StepEntity[]> {
    return await this.client
      .select()
      .from(stepsTable)
  }

  async update(id: string, step: Partial<StepEntity>): Promise<StepEntity | null> {
    const [updatedStep] = await this.client
      .update(stepsTable)
      .set(step)
      .where(eq(stepsTable.id, id))
      .returning()

    return updatedStep || null
  }

  async remove(id: string): Promise<void> {
    await this.client
      .delete(stepsTable)
      .where(eq(stepsTable.id, id))
  }

  // Méthodes pour gérer les relations avec les quêtes
  async addQuestStep(questId: string, stepId: string): Promise<void> {
    await this.client
      .insert(questOnStepTable)
      .values({ stepId, questId })
      .onConflictDoNothing()
  }

  async removeQuestStep(questId: string, stepId: string): Promise<void> {
    await this.client
      .delete(questOnStepTable)
      .where(and(eq(questOnStepTable.stepId, stepId), eq(questOnStepTable.questId, questId)))
  }

  async getQuestSteps(questId: string): Promise<StepEntity[]> {
    return await this.client
      .select()
      .from(stepsTable)
      .where(eq(questOnStepTable.questId, questId))
  }

  // Méthodes pour gérer les relations avec les monstres
  async addBeastToStep(stepId: string, beastId: string, count: number): Promise<void> {
    await this.client
      .insert(beastOnStepTable)
      .values({ stepId, beastId, count })
      .onConflictDoUpdate({
        target: [beastOnStepTable.stepId, beastOnStepTable.beastId],
        set: { count: beastOnStepTable.count + count }
      })
  }

  async removeBeastFromStep(stepId: string, beastId: string): Promise<void> {
    await this.client
      .delete(beastOnStepTable)
      .where(and(eq(beastOnStepTable.stepId, stepId), eq(beastOnStepTable.beastId, beastId)))
  }

  async getBeastsForStep(stepId: string): Promise<{ beastId: string; count: number }[]> {
    const result = await this.client
      .select({
        beastId: beastOnStepTable.beastId,
        count: beastOnStepTable.count
      })
      .from(beastOnStepTable)
      .where(eq(beastOnStepTable.stepId, stepId))

    return result.filter((item): item is { beastId: string; count: number } =>
      item.beastId !== null && item.count !== null
    )
  }
}
