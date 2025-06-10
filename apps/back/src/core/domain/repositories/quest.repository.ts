import { QuestEntity, QuestCreation } from "@hoe/db"
import { Repository } from "@/core/base/repository"

export interface QuestRepository extends Repository<QuestEntity, QuestCreation> {
}
