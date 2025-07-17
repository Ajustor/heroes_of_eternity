import { Repository } from "@/core/base/repository"
import { ItemEntity, ItemCreation } from "@hoe/db"

export abstract class ItemRepository extends Repository<ItemEntity, ItemCreation> {}