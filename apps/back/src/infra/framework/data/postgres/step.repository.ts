import { StepRepository } from '@/core/domain/repositories/step.repository'
import { StepEntity, StepCreation, stepsTable, questTable, stepsRelations } from '@hoe/db'
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
      .insert(questTable)
      .values({
        id: questId,
        name: 'New Quest',
        description: 'New Quest Description',
      })
      .onConflictDoNothing()

    await this.client
      .insert(stepsTable)
      .values({ id: stepId })
      .onConflictDoNothing()
  }

  async removeQuestStep(questId: string, stepId: string): Promise<void> {
    await this.client
      .delete(stepsTable)
      .where(and(eq(stepsTable.id, stepId), eq(ste)))
  }

  async getQuestSteps(questId: string): Promise<StepEntity[]> {
    return await this.client
      .select()
      .from(stepsTable)
      .where(eq(stepsTable.id, questId))
  }

  // Méthodes pour gérer les relations avec les monstres
  async addBeastToStep(stepId: string, beastId: string, count: number): Promise<void> {
    await this.client
      .insert(stepsRelations)
      .values({ stepId, beastId, count })
      .onConflictDoUpdate({
        target: [stepsRelations.stepId, stepsRelations.beastId],
        set: { count: stepsRelations.count + count }
      })
  }

  async removeBeastFromStep(stepId: string, beastId: string): Promise<void> {
    await this.client
      .delete(stepsRelations)
      .where(and(eq(stepsRelations.stepId, stepId), eq(stepsRelations.beastId, beastId)))
  }

  async getBeastsForStep(stepId: string): Promise<{ beastId: string; count: number }[]> {
    const result = await this.client
      .select({
        beastId: stepsRelations.beastId,
        count: stepsRelations.count
      })
      .from(stepsRelations)
      .where(eq(stepsRelations.stepId, stepId))

    return result.filter((item): item is { beastId: string; count: number } =>
      item.beastId !== null && item.count !== null
    )
  }
}
