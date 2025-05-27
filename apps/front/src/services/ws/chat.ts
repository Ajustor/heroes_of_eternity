import { wsClient } from '../api/client'

export type ChatApi = ReturnType<typeof wsClient.chat['subscribe']>

export function connectChat() {
    const chat = wsClient.chat.subscribe()

    return chat
}