import Elysia from 'elysia'
import { User } from '@hoe/db'
import { bearer } from '@elysiajs/bearer'
import { validateUser } from '../jwt'


export const authorization = (message: string) => {
  return new Elysia()
    .use(bearer())
    .derive({ as: 'scoped', }, async ({ cookie: { auth }, status, bearer }) => {
      const token = auth.value ?? bearer

      if (!token) {
        return status(401, message)
      }

      const user = validateUser(token)

      if (!user) {
        return status(401, message)
      }

      return { user }
    })
}

export const authorizationV2 = (message: string) => new Elysia()
  .use(bearer())
  .onBeforeHandle(async ({ cookie: { auth }, bearer, status }) => {
    const user = validateUser(auth.value ?? bearer)

    if (!user) {
      return status(401, message)
    }
  })
  .resolve(async ({ cookie: { auth }, bearer }) => {
    const user = validateUser(auth.value ?? bearer) as User
    return { user }
  })