import { connectChat, type ChatApi } from '../services/ws/chat'
import { rune } from './rune.svelte'
import { userStore } from './user'

export type ChatMessage = { username: string, message: string }
export type Chat = ChatMessage[]

const chatData = (defaultChat: Chat) => rune<Chat>(defaultChat, 'chat')
let chatApi = $state<ChatApi | null>(null)

export const chatStore = () => {
    let user = userStore()
    let chat = chatData([])


    function onMessage(message: ChatMessage) {
        if (message.message === 'NOT_AUTHENTICATED') {
            chatApi?.send({ accessToken: user.value?.token, message: 'Salut je viens de me connecter !' })
            return
        }
        chat.value?.push(message)
    }

    function sendMessage(message: string) {
        if (!chatApi) {
            throw new Error('Chat is not connected')
        }
        chatApi.send({ message })
    }

    function connect() {
        if (!user.value?.token) {
            throw new Error('User is not logged')
        }

        chatApi = connectChat(user.value?.token ?? '')
        chatApi.on('message', (message) => onMessage(message.data))
    }

    return {
        get value() {
            return chat.value
        },
        connect,
        disconnect: () => {
            if (!chatApi) {
                throw new Error('Chat is not connected')
            }
            chatApi.close()
        },
        send: sendMessage,
    }
}
