import { wsClient } from '../api/client'

export type ChatApi = ReturnType<typeof wsClient.chat['subscribe']>

export function connectChat(token: string) {
    console.log('Connecting chat system', token)

    const chat = wsClient.chat.subscribe()

    chat.on('open', () => {
        console.log('Chat connected')
    })

    chat.on('close', () => {
        console.log('Chat closed')
    })

    return chat
}