import { wsClient } from '../api/client'

export type ChatApi = ReturnType<typeof wsClient.chat['subscribe']>

export function connectChat(token: string) {
    const chat = wsClient.chat.subscribe({
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return chat
}