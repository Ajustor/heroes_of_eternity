import { treaty } from '@elysiajs/eden'
import type { App } from '@hoe/server'

export const client = treaty<App>(process.env.BACKEND_HOST ?? 'http://back:3000', {
  fetch: {
    credentials: 'include'
  }
})
