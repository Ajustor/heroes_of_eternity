import { io, Socket } from "socket.io-client"

import { rune } from './rune.svelte'
import { userStore } from './user'
import { PUBLIC_BACK_WS_URL } from "$env/static/public"

export type ChatMessage = { username: string, message: string }
export type Chat = ChatMessage[]

const chatData = (defaultChat: Chat) => rune<Chat>(defaultChat, 'chat')
let chatApi = $state<Socket | null>(null)
let isConnected = $state(false)

enum ServerMessages {
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
}

export const chatStore = () => {
    let user = userStore()
    let chat = chatData([])

    function onMessage(message: ChatMessage) {
        if (message.username === 'Server') {
            switch (message.message) {
                case ServerMessages.NOT_AUTHENTICATED:
                    chatApi?.emit('helloThere', { accessToken: user.value?.token, message: 'Salut je viens de me connecter !' })
                    break
            }
            console.log(message)
            return
        }
        chat.value?.push(message)
    }

    function sendMessage(message: string) {
        if (!isConnected || !chatApi) {
            throw new Error('Chat is not connected')
        }
        chatApi.emit('message', { message })
    }

    function connect() {
        if (!user.value?.token) {
            throw new Error('User is not logged')
        }

        chatApi = io(PUBLIC_BACK_WS_URL)
        chatApi.on('connect', () => {
            console.log('Chat connected')
            isConnected = true
        })

        chatApi.on('message', (response) => onMessage(response))

        chatApi.on('disconnect', () => {
            console.log('Chat closed')
            isConnected = false
        })

        chatApi?.emit('helloThere', { accessToken: user.value?.token, message: 'Salut je viens de me connecter !' })
    }

    return {
        get isConnected() {
            return isConnected
        },
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
