import {Elysia, t } from "elysia";
import { SqliteCharacterRepository } from "../../data/sqlite/character.repository";
import { db } from '@/infra/framework/data/sqlite/database'
import { CreateCharacterUseCase } from "@/use-cases/character/create/create-character.use-case";
import { authorization } from "@/libs/handlers/authorization";

export const charactersModule = new Elysia({prefix: '/characters'})
.decorate({characterRepository: new SqliteCharacterRepository(db)})
.decorate(({characterRepository}) => {
  return {
    createCharacterUsecase: new CreateCharacterUseCase(characterRepository)
  }
})
.use(authorization('You need to be connected to create a character'))
.post('', async ({createCharacterUsecase, body, set, user}) => {
  try {
    await createCharacterUsecase.execute(body)
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