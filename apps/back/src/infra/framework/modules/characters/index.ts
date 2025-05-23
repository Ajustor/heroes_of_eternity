import { Elysia, t } from "elysia"
import { PostgresCharacterRepository } from "../../data/postgres/character.repository"
import { db } from '@/infra/framework/data/postgres/database'
import { CreateCharacterUseCase } from "@/use-cases/character/create/create-character.use-case"
import { authorization } from '../../../../libs/handlers/authorization'
import { ListCharactersUseCase } from "@/use-cases/character/list/list-characters.use-case"
import { OPERATOR } from "@/core/domain/repositories/base.repository"
import { CharacterEntity } from "@hoe/db"

export const charactersModule = new Elysia({ prefix: '/characters' })
  .decorate({ characterRepository: new PostgresCharacterRepository(db) })
  .decorate(({ characterRepository }) => {
    return {
      listCharactersUsecase: new ListCharactersUseCase(characterRepository),
      createCharacterUsecase: new CreateCharacterUseCase(characterRepository)
    }
  })
  .get('', async ({ listCharactersUsecase, query }) => listCharactersUsecase.execute(query as Partial<CharacterEntity>), {
    query: t.Optional(t.Object({
      operator: t.Optional(t.Enum(OPERATOR)),
      name: t.Optional(t.String()),
      userId: t.Optional(t.String()),
      job: t.Optional(t.String()),
      skin: t.Optional(t.String()),
      level: t.Optional(t.Number()),
      experience: t.Optional(t.Number()),
      maxLife: t.Optional(t.Number()),
      life: t.Optional(t.Number()),
      maxMana: t.Optional(t.Number()),
      mana: t.Optional(t.Number()),
      intelligence: t.Optional(t.Number()),
      strength: t.Optional(t.Number()),
      agility: t.Optional(t.Number()),
      dexterity: t.Optional(t.Number()),
    })),
  })
  .use(authorization('You need to be connected to create a character'))
  .post('', async ({ createCharacterUsecase, body, set, user }) => {
    try {
      await createCharacterUsecase.execute(body.name, user.id)
      set.status = 201
    } catch (error) {
      set.status = 409
      throw new Error('An error occured while create your character', {
        cause: error?.message,
      })
    }
  }, {
    body: t.Object({
      name: t.String(),
    }),
  })