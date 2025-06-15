import { Elysia, t } from "elysia"
import { validateUser } from "@/libs/jwt"
import bearer from "@elysiajs/bearer"
import { authorization } from "../../../../libs/handlers/authorization"
import { Server } from "socket.io"
import { createServer } from 'http'

export type ChatMessage = { username: string, id: string, message: string }

export const initWebsocketServer = (port: number) => {
    const io = new Server(port)

    io.on('connection', (socket) => {
        console.info('User connected')
    })
}


export const chatModule = new Elysia({ prefix: 'chat' })
    .use(bearer())
    .use(authorization('You need to be connected to chat'))
    .ws('', {
        body: t.Object({
            message: t.String(),
            accessToken: t.Optional(t.String())
        }),
        response: t.Object({
            username: t.String(),
            message: t.String(),
            token: t.Optional(t.String())
        }),
        open(ws) {
            if (!ws.data.user) {
                console.info('User is not authenticated start authentication process')
                ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
            }
        },
        message(ws, body) {

            if (body.accessToken) {
                const user = validateUser(body.accessToken)
                if (!user) {
                    console.info('User is not authenticated start authentication process')
                    ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                    return
                }

                ws.data = { ...ws.data, user }
            }

            const { user } = ws.data

            if (!user || (!body.accessToken && !user)) {
                console.info('User is not authenticated start authentication process')
                ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                return
            }

            ws.publish('global', { message: body.message, username: user.username })
            ws.send({ message: body.message, username: user.username })
        }
    })