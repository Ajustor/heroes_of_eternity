import { wsClient } from '../api/client'

export type ChatApi = ReturnType<typeof wsClient.chat['subscribe']>

export function connectChat(token: string) {
    console.log('Connecting chat system', token)

    const chat = wsClient.chat.subscribe()

    console.log('Chat connected')
    return chat
}