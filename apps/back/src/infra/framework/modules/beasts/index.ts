import { Elysia } from 'elysia'
import { PostgresBeastRepository } from '@/infra/framework/data/postgres/beast.repository'
import { db } from '@/infra/framework/data/postgres/database'
import { ListBeastsUseCase } from '@/use-cases/monster/list'

export const beastsModule = new Elysia({ prefix: 'beasts', name: 'beasts' })
  .decorate({ beastsRepository: new PostgresBeastRepository(db) })
  .decorate(({ beastsRepository }) => {
    return {
      listBeastsUseCase: new ListBeastsUseCase(beastsRepository),
    }
  })
  .get('', async ({ listBeastsUseCase }) => listBeastsUseCase.execute())