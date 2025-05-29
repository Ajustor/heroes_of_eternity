import { Repository } from "@/core/base/repository"
import { BeastCreation, BeastEntity } from '@hoe/db'

export interface BeastRepository extends Repository<BeastEntity, BeastCreation> {
}
