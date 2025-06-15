import { client } from '../api/client'

export type ChatApi = ReturnType<typeof client.chat['subscribe']>

export function connectChat(token: string) {
    const chat = client.chat.subscribe({
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return chat
}