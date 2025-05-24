import { Elysia } from 'elysia'
import { usersModule } from './modules/users'
import { authModule } from './modules/auth'
import { charactersModule } from './modules/characters'
import { chatModule } from './modules/chat'

import { version } from '../../../package.json'

import swagger from '@elysiajs/swagger'
import cors from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .use(swagger({ version }))
  .get('/', () => 'Hello Elysia')
  .use(usersModule)
  .use(authModule)
  .use(charactersModule)
  .use(chatModule)
  .listen(process.env.PORT ?? 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

export type App = typeof app
