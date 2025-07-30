import { Elysia } from 'elysia'
import { usersModule } from './modules/users'
import { authModule } from './modules/auth'
import { charactersModule } from './modules/characters'
import { questsModule } from './modules/quests'
import { itemsModule } from './modules/items'
import { beastsModule } from './modules/beasts'
import { stepsModule } from './modules/steps'

import { version } from '../../../package.json'

import swagger from '@elysiajs/swagger'
import cors from '@elysiajs/cors'
import { logger } from "@tqman/nice-logger"

const app = new Elysia()
  .use(cors())
  .use(swagger({ version }))
  .get('/', () => 'Hello There')
  .use(logger({
    mode: 'live',
    enabled: true,
    withBanner: true,
    withTimestamp: true,
  }))
  .use(usersModule)
  .use(authModule)
  .use(charactersModule)
  .use(questsModule)
  .use(beastsModule)
  .use(itemsModule)
  .use(stepsModule)
  .listen(process.env.PORT ?? 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

export type App = typeof app
