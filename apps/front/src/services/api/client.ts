import { treaty } from '@elysiajs/eden'
import type { App } from '@hoe/server'
import { PUBLIC_BACK_URL, PUBLIC_BACK_WS_URL } from '$env/static/public'

export const client = treaty<App>(PUBLIC_BACK_URL, {
  fetch: {
    credentials: 'include'
  }
})

export const wsClient = treaty<App>(`ws://${PUBLIC_BACK_WS_URL}`, {
  fetch: {
    credentials: 'include'
  }
})
