import { Elysia, t } from 'elysia'
import { BEASTS_KEYS, BOSSES_KEYS } from '@hoe/assets'
import { PostgresBeastRepository } from '../../data/postgres/beast.repository'
import { db } from '../../data/postgres/database'
import { ListBeastsUseCase } from '../../../../use-cases/beast/list/list-beasts.use-case'
import { CreateBeastUseCase } from '../../../../use-cases/beast/create/create-beast.use-case'

export const beastsModule = new Elysia({ prefix: 'beasts' })
  .decorate({ beastsRepository: new PostgresBeastRepository(db) })
  .decorate(({ beastsRepository }) => {
    return {
      listBeastsUseCase: new ListBeastsUseCase(beastsRepository),
      createBeastUseCase: new CreateBeastUseCase(beastsRepository),
    }
  })
  .get('', async ({ listBeastsUseCase }) => listBeastsUseCase.execute())
  .post('', async ({ createBeastUseCase, body: { adminKey, ...body }, set }) => {
    try {
      if (adminKey !== process.env.ADMIN_KEY) {
        throw new Error('Invalid admin key')
      }
      await createBeastUseCase.execute(body)
      set.status = 201
    } catch (error) {
      set.status = 409
      throw new Error('An error occurred while creating the beast', {
        cause: error?.message,
      })
    }
  }, {
    body: t.Object({
      adminKey: t.String(),
      name: t.String(),
      skin: t.Enum(BEASTS_KEYS),
      maxMana: t.Number(),
      maxLife: t.Number(),
      intelligence: t.Number(),
      strength: t.Number(),
      agility: t.Number(),
      dexterity: t.Number(),
      experience: t.Optional(t.Number()),
    }),
  })
  .post('/boss', async ({ createBeastUseCase, body: { adminKey, ...body }, set }) => {
    try {
      if (adminKey !== process.env.ADMIN_KEY) {
        throw new Error('Invalid admin key')
      }
      await createBeastUseCase.execute({ ...body, isBoss: true })
      set.status = 201
    } catch (error) {
      set.status = 409
      throw new Error('An error occurred while creating the beast', {
        cause: error?.message,
      })
    }
  }, {
    body: t.Object({
      adminKey: t.String(),
      name: t.String(),
      skin: t.Enum(BOSSES_KEYS),
      maxMana: t.Number(),
      maxLife: t.Number(),
      intelligence: t.Number(),
      strength: t.Number(),
      agility: t.Number(),
      dexterity: t.Number(),
      experience: t.Optional(t.Number()),
    }),
  })