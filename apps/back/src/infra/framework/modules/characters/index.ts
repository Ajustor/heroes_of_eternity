import { Elysia, t } from "elysia"
import { PostgresCharacterRepository } from "../../data/postgres/character.repository"
import { db } from '../../data/postgres/database'
import { CreateCharacterUseCase } from "../../../../use-cases/character/create/create-character.use-case"
import { authorization } from '../../../../libs/handlers/authorization'
import { ListCharactersUseCase } from "../../../../use-cases/character/list/list-characters.use-case"

export const charactersModule = new Elysia({ prefix: 'characters' })
  .decorate({ characterRepository: new PostgresCharacterRepository(db) })
  .decorate(({ characterRepository }) => {
    return {
      listCharactersUsecase: new ListCharactersUseCase(characterRepository),
      createCharacterUsecase: new CreateCharacterUseCase(characterRepository)
    }
  })
  .get('', async ({ listCharactersUsecase, query }) => listCharactersUsecase.execute(query), {
    query: t.Object({
      name: t.Optional(t.String()),
      userId: t.Optional(t.String()),
    }),
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