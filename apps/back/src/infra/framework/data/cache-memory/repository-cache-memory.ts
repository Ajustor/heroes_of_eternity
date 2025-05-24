import { Entity } from '@/core/base/entity'
import { Repository } from '@/core/base/repository'
import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { randomUUIDv7 } from 'bun'

export class RepositoryCacheMemory<
  TEntity extends Entity
> extends Repository<TEntity> {
  protected readonly items: TEntity[]

  constructor() {
    super()
    this.items = []
  }

  async create(data: TEntity): Promise<TEntity> {
    data.id = data.id ?? randomUUIDv7()
    const count = this.items.push(data)
    return this.items[count - 1]
  }

  async findAll(filter?: Partial<TEntity>, operator = OPERATOR.OR): Promise<TEntity[]> {
    if (!filter) {
      return this.items
    }

    return this.items.filter((item) => {
      switch (operator) {
        case OPERATOR.AND:
          return Object.entries(filter).every(([key, value]) => item[key as keyof TEntity] === value)
        case OPERATOR.OR:
          return Object.entries(filter).some(([key, value]) => item[key as keyof TEntity] === value)
      }
    })

  }

  async findOne(filter: Partial<TEntity>, operator = OPERATOR.OR): Promise<TEntity | null> {
    return this.findAll(filter, operator).then((items) =>
      items.length > 0 ? items[0] : null,
    )
  }

  async update(id: string, data: Partial<TEntity>): Promise<TEntity | null> {
    const index = this.getIndexById(id)
    if (index === -1) {
      // TODO: handle the case of not finding the item to update
      return null
    }
    for (const key in data) {
      this.items[index] = { ...this.items[index], [key]: data[key] }
    }
    return this.items[index]
  }

  async remove(id: string): Promise<void> {
    const index = this.getIndexById(id)
    if (index === -1) {
      // TODO: handle the case of not finding the item to be deleted
    }
    this.items.splice(index, 1)
  }

  private getIndexById(id: string) {
    return this.items.findIndex((item) => item.id === id)
  }
}
