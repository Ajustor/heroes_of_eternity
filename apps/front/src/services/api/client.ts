import { treaty } from '@elysiajs/eden'
import type { App } from '@hoe/server'
import { PUBLIC_BACK_URL } from '$env/static/public'

export const client = treaty<App>(PUBLIC_BACK_URL, {
  fetch: {
    credentials: 'include'
  }
})
<<<<<<< HEAD
=======

export const wsClient = treaty<App>(PUBLIC_BACK_WS_URL, {
  fetch: {
    credentials: 'include'
  },
})
>>>>>>> f159038 (Feat(sockets): start replacing sockets)
