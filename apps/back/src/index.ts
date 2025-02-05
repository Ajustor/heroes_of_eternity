import { Elysia } from 'elysia'
import { usersModule } from './modules/users'

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .use(usersModule)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

export type App = typeof app
