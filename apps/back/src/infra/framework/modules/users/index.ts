import { Elysia, NotFoundError, t } from 'elysia'
import { authorization } from '../../../../libs/handlers/authorization'
import { PostgresUserRepository } from '../../data/postgres/user.repository'
import { GetUsersUseCase } from '@/use-cases/user/get-users/get-users'
import { CreateUserUseCase } from '@/use-cases/user/create-user/create-user'
import { ResetPasswordUseCase } from '@/use-cases/user/reset-password/reset-password'
import { GetUserUseCase } from '@/use-cases/user/get-user/get-user'
import { UpdatePasswordUseCase } from '@/use-cases/user/update-password/update-password'
import { db } from '@/infra/framework/data/postgres/database'
import { SecurityService } from '@/core/domain/secutiry.service'

export const usersModule = new Elysia({ prefix: 'users', name: 'users' })
  .decorate({ usersRepository: new PostgresUserRepository(db) })
  .decorate(({ usersRepository }) => {
    return {
      getUsersUsecase: new GetUsersUseCase(usersRepository),
      createUserUsecase: new CreateUserUseCase(usersRepository, new SecurityService()),
      resetPasswordUseCase: new ResetPasswordUseCase(usersRepository),
      getUserUseCase: new GetUserUseCase(usersRepository),
      updatePasswordUseCase: new UpdatePasswordUseCase(usersRepository, new SecurityService())
    }
  })
  .get('', async ({ getUsersUsecase }) => getUsersUsecase.execute())
  .post(
    '',
    async ({ createUserUsecase, body, set }) => {
      try {
        await createUserUsecase.execute(body)
        set.status = 201
      } catch (error) {
        // log.error(error)
        set.status = 409
        throw new Error('An error occured while create your account', {
          cause: error?.message,
        })
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
        email: t.String(),
      }),
    },
  )
  .post(
    '/i-forgot',
    async ({ body, resetPasswordUseCase }) => {
      try {
        await resetPasswordUseCase.execute({ ...body })
      } catch (error) {
        console.error(error)
        throw new NotFoundError(error.message)
      }
    },
    {
      body: t.Object({
        userId: t.String(),
        password: t.String(),
        authorizationKey: t.String(),
      }),
    },
  )
  .use(authorization('You need to login to access this route'))
  .get('/me', async ({ user, getUserUseCase }) => {
    const selectedUser = await getUserUseCase.execute(user.id)
    return { user: selectedUser }
  })
  .get('/:userId', async ({ params: { userId }, getUserUseCase }) => {
    const selectedUser = await getUserUseCase.execute(userId)
    return { user: selectedUser }
  })
  .patch(
    '/update-password',
    ({ user, updatePasswordUseCase, body: { oldPassword, newPassword } }) =>
      updatePasswordUseCase.execute({ userId: user.id, oldPassword, newPassword }),
    {
      body: t.Object({
        oldPassword: t.String(),
        newPassword: t.String(),
      }),
    },
  )
