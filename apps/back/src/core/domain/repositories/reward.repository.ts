import { RewardEntity, RewardCreation } from "@hoe/db"
import { Repository } from '@/core/base/repository'

export interface RewardRepository extends Repository<RewardEntity, RewardCreation> {
  deleteWithQuestId(id: string): Promise<void>
}
