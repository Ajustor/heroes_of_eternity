import { Elysia, NotFoundError, t } from 'elysia'
import { authorization } from '../../../../libs/handlers/authorization'
import { LoginUsecase } from '@/use-cases/auth/login/login'
import { addDays } from 'date-fns'
import { IForgotUsecase } from '@/use-cases/auth/i-forgot/i-forgot'
import { EmailSender } from '@/infra/framework/notifications/email'
import { jwtMiddleware } from '../../../../libs/jwt'
import { SecurityService } from '@/core/domain/secutiry.service'
import { PostgresUserRepository } from '../../data/postgres/user.repository'
import { db } from '../../data/postgres/database'

export const authModule = new Elysia({ prefix: 'auth' })
  .decorate({ usersRepository: new PostgresUserRepository(db) })
  .decorate(({ usersRepository }) => ({
    loginUsecase: new LoginUsecase(usersRepository, new SecurityService()),
    iForgotUsecase: new IForgotUsecase(usersRepository, new EmailSender())
  }))
  .use(jwtMiddleware)
  .post('', async ({ body, loginUsecase, cookie: { auth }, set, jwt }) => {
    const user = await loginUsecase.execute(body).catch((error) => {
      console.error(error)
    })

    if (!user) {
      set.status = 404
      throw new NotFoundError('User not found')
    }
    auth.set({
      value: await jwt.sign(user),
      expires: addDays(new Date(), 7),
      secure: false,
      httpOnly: false,
      sameSite: false,
    })
  }, {
    body: t.Object(
      {
        username: t.String(),
        password: t.String()
      }
    )
  })
  .get('/i-forgot', async ({ query, iForgotUsecase }) => {
    await iForgotUsecase.execute(query.email)
  }, {
    query: t.Object(
      {
        email: t.String(),
      }
    )
  })
  .use(authorization('You need to connect to check your auth'))
  .get('', ({ user }) => {
    return user
  })

