import { RewardRepository } from '@/core/domain/repositories/reward.repository'
import { DatabaseConnection } from './database'
import { RewardCreation, RewardEntity } from '@hoe/db'
import { rewardTable } from '@hoe/db'
import { eq, or, and } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'

export class PostgresRewardRepository implements RewardRepository {
  constructor(private readonly client: DatabaseConnection) {}

  async create(data: RewardCreation): Promise<RewardEntity> {
    const [createdReward] = await this.client.insert(rewardTable).values(data).returning()
    return createdReward
  }

  async findAll(): Promise<RewardEntity[]> {
    return this.client.select().from(rewardTable)
  }

  async findOne(filter: Partial<RewardEntity>, operator?: OPERATOR): Promise<RewardEntity | null> {
    const fieldsFilters = []

    if (filter?.questId) {
      fieldsFilters.push(eq(rewardTable.questId, filter.questId))
    }

    if (filter?.itemId) {
      fieldsFilters.push(eq(rewardTable.itemId, filter.itemId))
    }

    if (filter?.amount) {
      fieldsFilters.push(eq(rewardTable.amount, filter.amount))
    }

    if (!fieldsFilters.length) {
      return null
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    const [foundReward] = await this.client.select().from(rewardTable).where(whereRequest).limit(1)
    return foundReward || null
  }

  async update(id: string, data: Partial<RewardEntity>): Promise<RewardEntity | null> {
    const [updatedReward] = await this.client.update(rewardTable).set(data).where(eq(rewardTable.id, id)).returning()
    return updatedReward || null
  }

  async remove(id: string): Promise<void> {
    await this.client.delete(rewardTable).where(eq(rewardTable.id, id))
  }

  async deleteWithQuestId(id: string): Promise<void> {
    await this.client.delete(rewardTable).where(eq(rewardTable.questId, id))
  }
}