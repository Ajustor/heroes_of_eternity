import { OPERATOR } from '@/core/domain/repositories/base.repository'

export abstract class Repository<TEntity, TCreationEntity = TEntity> {
  abstract create(data: TCreationEntity): Promise<TEntity>
  abstract findAll(filter?: Partial<TEntity>, operator?: OPERATOR): Promise<TEntity[]>
  abstract findOne(filter: Partial<TEntity>, operator?: OPERATOR): Promise<TEntity | null>
  abstract update(id: string, data: Partial<TEntity>): Promise<TEntity | null>
  abstract remove(id: string): Promise<void>
}
